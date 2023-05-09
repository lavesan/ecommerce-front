import { forwardRef, ForwardRefRenderFunction, useMemo, useState } from "react";
import {
  InputAdornment,
  OutlinedInput,
  FormControlProps,
  IconButton,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import { ISelectData } from "@/models/components/ISelectData";

interface IAppSelectProps {
  helperText?: string;
  label: string;
  data: ISelectData[];
  formControl?: FormControlProps;
}

const AppSelect: ForwardRefRenderFunction<
  HTMLSelectElement,
  IAppSelectProps & { [key: string]: any }
> = ({ label, helperText, data, formControl = {}, ...select }, ref) => {
  return (
    <FormControl {...formControl} fullWidth variant="outlined">
      <InputLabel id={`select_${label}`}>{label}</InputLabel>
      <Select
        ref={ref}
        {...select}
        labelId={`select_${label}`}
        id="demo-simple-select"
        label="Age"
      >
        {data.map(({ label, value }) => (
          <MenuItem key={`${label}_${value}`} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default forwardRef(AppSelect);
