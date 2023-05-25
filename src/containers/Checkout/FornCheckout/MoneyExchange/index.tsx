import {
  Box,
  Typography,
  Tooltip,
  Button,
  Collapse,
  Grid,
  IconButton,
  Divider,
  BoxProps,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import {
  Control,
  useFieldArray,
  FieldErrors,
  useWatch,
  Controller,
} from "react-hook-form";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DeleteIcon from "@mui/icons-material/Delete";

import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { IForm } from "..";
import { AppSelect } from "@/components/AppSelect";
import { exchangeNotesOpts } from "@/helpers/select.helper";
import { AppInput } from "@/components/AppInput";
import { useAppContext } from "@/hooks/useAppContext";
import { exchangeIsEnough } from "@/helpers/checkout.helper";
import { useEffect, useMemo } from "react";

interface IMoneyExchangeProps extends BoxProps {
  open: boolean;
  control: Control<IForm>;
  errors: FieldErrors<IForm>;
}

export function MoneyExchange({
  open,
  control,
  errors,
  ...boxProps
}: IMoneyExchangeProps) {
  const { showToast } = useAppContext();
  const { total } = useCheckoutContext();

  const defaultField = { quantity: "", value: 2000 };

  const { append, fields, remove } = useFieldArray({
    control,
    name: "exchangeNotes",
  });

  const exchangeNotes = useWatch({
    control,
    name: "exchangeNotes",
  });

  const hasMoreThanOneField = useMemo(() => fields.length > 1, [fields]);

  const addExchange = () => {
    if (exchangeIsEnough(exchangeNotes, total)) {
      return showToast({
        status: "warning",
        message: "O Troco já é o suficiente",
      });
    }

    append(defaultField);
  };

  useEffect(() => {
    if (open && !fields.length) append(defaultField);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Box {...boxProps}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          Troco para
          <Tooltip
            title="Cédulas que vão ser utilizadas para o troco"
            placement="top-end"
          >
            <HelpOutlineIcon />
          </Tooltip>
        </Typography>
        <Button
          type="button"
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={addExchange}
        >
          Adicionar cédula
        </Button>
      </Box>
      <TransitionGroup>
        {fields.map(({ id }, index) => (
          <Collapse key={`money_exchange_${id}`}>
            <Divider sx={{ mt: 2, mb: hasMoreThanOneField ? 0 : 2 }} />
            <Collapse in={hasMoreThanOneField}>
              <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={() => remove(index)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            </Collapse>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AppSelect<IForm>
                  formControl={{ fullWidth: true }}
                  control={control}
                  data={exchangeNotesOpts}
                  name={`exchangeNotes.${index}.value`}
                  errorMsg={
                    errors.exchangeNotes &&
                    errors.exchangeNotes[index]?.value?.message
                  }
                  label="Nota"
                />
              </Grid>
              <Grid item xs={6}>
                <AppInput
                  formControl={{ fullWidth: true }}
                  control={control}
                  name={`exchangeNotes.${index}.quantity`}
                  errorMsg={
                    errors.exchangeNotes &&
                    errors.exchangeNotes[index]?.quantity?.message
                  }
                  label="Quantidade"
                />
              </Grid>
            </Grid>
          </Collapse>
        ))}
      </TransitionGroup>
      <Controller
        control={control}
        name="hasCents"
        render={({ field: { onChange, value } }) => (
          <FormControlLabel
            control={<Checkbox checked={value} onChange={onChange} />}
            label="Tenho as moedas do troco"
            sx={{ mt: 2 }}
          />
        )}
      />
    </Box>
  );
}
