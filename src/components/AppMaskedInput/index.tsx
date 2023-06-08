import { useState, useEffect } from "react";
import {
  OutlinedInput,
  FormControl,
  FormControlProps,
  OutlinedInputProps,
  InputLabel,
  Collapse,
  Typography,
} from "@mui/material";
import InputMask from "react-input-mask";
import { Controller, FieldValues, Control, Path } from "react-hook-form";

interface IAppMaskedInputProps<IForm extends FieldValues> {
  mask: string;
  control: Control<IForm>;
  name: Path<IForm>;
  errorMsg?: string;
  onCustomChange?: (value: string) => void;
  formControl?: FormControlProps;
}

export function AppMaskedInput<IForm extends FieldValues>({
  mask,
  name,
  control,
  onCustomChange,
  errorMsg,
  label,
  formControl = {},
  ...input
}: IAppMaskedInputProps<IForm> & OutlinedInputProps) {
  const [innerErrorMsg, setInnerErroMsg] = useState("");

  useEffect(() => {
    if (errorMsg) return setInnerErroMsg(errorMsg);

    setTimeout(() => {
      setInnerErroMsg("");
    }, 200);
  }, [errorMsg]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl {...formControl} variant="outlined">
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <InputMask
            mask={mask}
            {...input}
            name={name}
            error={!!errorMsg}
            value={value}
            onChange={(element) => {
              if (onCustomChange) onCustomChange(element.target.value);
              onChange(element);
            }}
          >
            {/* @ts-ignore */}
            {(inputProps) => <OutlinedInput label={label} {...inputProps} />}
          </InputMask>
          <Collapse in={!!errorMsg}>
            <Typography sx={{ color: "error.main" }}>
              {errorMsg || innerErrorMsg}
            </Typography>
          </Collapse>
        </FormControl>
      )}
    />
  );
}
