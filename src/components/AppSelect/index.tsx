import {
  FormControlProps,
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  Collapse,
} from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

import { ISelectData } from "@/models/components/ISelectData";
import { useEffect, useState } from "react";

interface IAppSelectProps<IForm extends FieldValues> {
  label: string;
  data: ISelectData[];
  formControl?: FormControlProps;
  control: Control<IForm>;
  name: Path<IForm>;
  errorMsg?: string;
}

export function AppSelect<IForm extends FieldValues>({
  label,
  data,
  errorMsg,
  name,
  control,
  formControl = {},
}: IAppSelectProps<IForm>) {
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
        <FormControl {...formControl} fullWidth variant="outlined">
          <InputLabel id={`select_${label}`}>{label}</InputLabel>
          <Select
            labelId={`select_${label}`}
            id="demo-simple-select"
            label="Age"
            value={value}
            name={name}
            onChange={onChange}
            error={!!errorMsg}
          >
            {data.map(({ label, value }) => (
              <MenuItem key={`${label}_${value}`} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>

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
