import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef, ForwardRefRenderFunction } from "react";
import InputMask from "react-input-mask";

interface IAppMaskedInputProps {
  mask: string;
}

const AppMaskedInput: ForwardRefRenderFunction<
  HTMLInputElement,
  IAppMaskedInputProps & TextFieldProps
> = ({ mask, ...input }, ref) => {
  return (
    <InputMask mask={mask} {...input}>
      {/* @ts-ignore */}
      {(inputProps) => <TextField ref={ref} {...inputProps} />}
    </InputMask>
  );
};

export default forwardRef(AppMaskedInput);
