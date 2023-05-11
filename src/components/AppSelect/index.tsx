import {
  FormControlProps,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

import { ISelectData } from "@/models/components/ISelectData";

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
          >
            {data.map(({ label, value }) => (
              <MenuItem key={`${label}_${value}`} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          {!!errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
