import { Box, Typography, Button, Collapse } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import { AppInput } from "@/components/AppInput";
import { ClientService } from "@/services/client.service";
import { validationSchema } from "./validations";
import { useState } from "react";
import { useAppContext } from "@/hooks/useAppContext";

interface IForm {
  email: string;
}

const ForgotPassword = () => {
  const clientService = ClientService.getInstance();

  const { setIsLoading, showToast } = useAppContext();

  const [emailSent, setEmailSent] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsLoading(true);

    await clientService
      .forgotPwd(values)
      .then(() => {
        setEmailSent(true);
      })
      .catch(() => {
        showToast({
          status: "error",
          message:
            "Aconteceu um erro ao enviar uma mensagem para seu email. Por favor, tente mais tarde",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  return (
    <Box width="100%">
      <Collapse unmountOnExit in={!emailSent}>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          width="100%"
          gap={4}
          onSubmit={onSubmit}
        >
          <Typography
            component="h1"
            textAlign={["center", "start"]}
            fontSize={["1.5rem", "2.5rem"]}
            marginTop={[0, 4]}
          >
            Digite seu email
          </Typography>
          <AppInput<IForm>
            fullWidth
            control={control}
            errorMsg={errors.email?.message}
            name="email"
            label="Email"
            type="email"
          />
          <Button fullWidth type="submit" variant="contained" size="large">
            Enviar
          </Button>
        </Box>
      </Collapse>
      <Collapse unmountOnExit in={emailSent}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <CheckCircleOutlineOutlinedIcon fontSize="large" color="success" />
          <Typography variant="h3">Email enviado!</Typography>
          <Typography textAlign="center">
            Cheque sua caixa de email para prosseguir com a alteração de senha
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default ForgotPassword;
