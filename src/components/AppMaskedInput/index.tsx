import { TextField, TextFieldProps } from "@mui/material";
import InputMask from "react-input-mask";
import { Controller, FieldValues, Control, Path } from "react-hook-form";

interface IAppMaskedInputProps<IForm extends FieldValues> {
  mask: string;
  control: Control<IForm>;
  name: Path<IForm>;
  errorMsg?: string;
  onCustomChange?: (value: string) => void;
}

export function AppMaskedInput<IForm extends FieldValues>({
  mask,
  name,
  control,
  onCustomChange,
  errorMsg,
  ...input
}: IAppMaskedInputProps<IForm> & TextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputMask
          mask={mask}
          {...input}
          name={name}
          helperText={errorMsg}
          error={!!errorMsg}
          value={value}
          onChange={(element) => {
            if (onCustomChange) onCustomChange(element.target.value);
            onChange(element);
          }}
        >
          {/* @ts-ignore */}
          {(inputProps) => <TextField {...inputProps} />}
        </InputMask>
      )}
    />
  );
}
