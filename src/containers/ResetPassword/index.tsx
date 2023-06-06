import { Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

import { validationSchema } from "./validations";
import { ClientService } from "@/services/client.service";
import { useAppContext } from "@/hooks/useAppContext";
import { AppInput } from "@/components/AppInput";

interface IForm {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const clientService = ClientService.getInstance();

  const { setIsLoading, showToast } = useAppContext();

  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async ({ confirmPassword, ...values }) => {
    setIsLoading(true);

    const { token } = router.query as { token: string };

    if (!token)
      return showToast({
        status: "error",
        message: "Dados inválidos para fazer a operação",
      });

    await clientService
      .resetPwd(token, values)
      .then(() => {
        showToast({
          status: "success",
          message: "Sua senha foi alterada com sucesso!",
        });
        router.replace("/login");
      })
      .catch(() => {
        showToast({
          status: "error",
          message: "Aconteceu um erro ao atualizar sua senha",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  return (
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
        Digite uma nova senha
      </Typography>
      <AppInput<IForm>
        fullWidth
        control={control}
        errorMsg={errors.password?.message}
        name="password"
        label="Senha"
        type="password"
      />
      <AppInput<IForm>
        fullWidth
        control={control}
        errorMsg={errors.confirmPassword?.message}
        name="confirmPassword"
        label="Confirmar senha"
        type="password"
      />
      <Button fullWidth type="submit" variant="contained" size="large">
        Enviar
      </Button>
    </Box>
  );
};

export default ResetPassword;
