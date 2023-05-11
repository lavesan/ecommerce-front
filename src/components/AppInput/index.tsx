import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  IconButton,
  FormControl,
  FormControlProps,
  InputLabel,
  Collapse,
  Typography,
} from "@mui/material";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface IAppInputProps<IForm extends FieldValues> {
  errorMsg?: string;
  control: Control<IForm>;
  name: Path<IForm>;
  formControl?: FormControlProps;
}

export function AppInput<IForm extends FieldValues>({
  type,
  label,
  control,
  name,
  errorMsg,
  formControl = {},
  ...input
}: IAppInputProps<IForm> & OutlinedInputProps) {
  const [showPwd, setShowPwd] = useState(false);
  const [innerErrorMsg, setInnerErroMsg] = useState("");

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

  useEffect(() => {
    if (errorMsg) return setInnerErroMsg(errorMsg);

    setTimeout(() => {
      setInnerErroMsg("");
    }, 200);
  }, [errorMsg]);

  return (
    <FormControl {...formControl} variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <OutlinedInput
            id={name}
            type={inputType}
            label={label}
            {...input}
            {...propsWithPwd}
            onChange={onChange}
            value={value}
          />
        )}
      />
      <Collapse in={!!errorMsg}>
        <Typography sx={{ color: "error.main" }}>
          {errorMsg || innerErrorMsg}
        </Typography>
      </Collapse>
    </FormControl>
  );
}
