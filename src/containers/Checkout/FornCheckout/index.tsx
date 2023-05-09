import { Box, Typography, BoxProps } from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation";

interface IForm {}

export const FormCheckout = (props: BoxProps) => {
  const { handleSubmit, register } = useForm<IForm>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit(async () => {});

  return <Box {...props} component="form" onSubmit={onSubmit}></Box>;
};
