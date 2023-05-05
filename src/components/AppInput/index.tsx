import { forwardRef, ForwardRefRenderFunction, useMemo, useState } from "react";
import {
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AppMaskedInput: ForwardRefRenderFunction<
  HTMLInputElement,
  OutlinedInputProps
> = ({ type, ...input }, ref) => {
  const [showPwd, setShowPwd] = useState(false);

  const toogleShowPwd = () => setShowPwd((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
  }, [type]);

  return <OutlinedInput ref={ref} type={type} {...input} {...propsWithPwd} />;
};

export default forwardRef(AppMaskedInput);
