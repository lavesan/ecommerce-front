import { forwardRef, ForwardRefRenderFunction, useMemo, useState } from "react";
import {
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  IconButton,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface IAppMaskedInputProps {
  helperText?: string;
}

const AppMaskedInput: ForwardRefRenderFunction<
  HTMLInputElement,
  IAppMaskedInputProps & OutlinedInputProps
> = ({ type, label, helperText, ...input }, ref) => {
  const [showPwd, setShowPwd] = useState(false);

  const toogleShowPwd = () => setShowPwd((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const inputType = useMemo(() => {
    if (type !== "password") return type;

    return showPwd ? "text" : "password";
  }, [showPwd, type]);

  const propsWithPwd = useMemo(() => {
    if (type !== "password") return {};

    return {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={toogleShowPwd}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPwd ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    };
  }, [type, showPwd]);

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor={input.name}>{label}</InputLabel>
      <OutlinedInput
        id={input.name}
        ref={ref}
        type={inputType}
        label={label}
        {...input}
        {...propsWithPwd}
      />
      {!!input.error && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default forwardRef(AppMaskedInput);
