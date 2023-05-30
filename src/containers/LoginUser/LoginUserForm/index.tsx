import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Typography, Button, Link as MUILink } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

import { ClientService } from "@/services/client.service";
import { useAppContext } from "@/hooks/useAppContext";
import { validationSchema } from "./validations";
import { AppInput } from "@/components/AppInput";
import { parseError } from "@/helpers/axiosError.helper";
import { useGoBack } from "@/hooks/useGoBack";
import { useAuthContext } from "@/hooks/useAuthContext";

interface IForm {
  email: string;
  password: string;
}

export const LoginUserForm = () => {
  const clientService = ClientService.getInstance();

  const { goStoreBackOrBack } = useGoBack();

  const { showToast, setIsLoading, isDarkMode } = useAppContext();
  const { login } = useAuthContext();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const { credentials, ...client } = await clientService.login(values);
      login({ client, credentials });
      goStoreBackOrBack();
    } catch (err: any) {
      showToast({
        status: "error",
        message: "Email ou senha inválidos",
      });
    } finally {
      setIsLoading(false);
    }
  });

  const googleSuccess = async ({ credential, ...rest }: CredentialResponse) => {
    if (credential) {
      try {
        const { credentials, ...client } = await clientService.loginByGoogle(
          credential
        );
        login({ client, credentials });
        goStoreBackOrBack();
        return;
      } catch (err: any) {
        if (err?.response?.status === 404) {
          const data = parseError(err) as { email: string; name: string };

          router.push({
            pathname: "/criar-usuario",
            query: data,
          });
          return;
        }

        showToast({
          status: "error",
          message: "Aconteceu um erro ao fazer o login com o google",
        });
      } finally {
        setIsLoading(false);
      }
    }
    router.push("/criar-usuario");
  };

  const googleError = () => {
    showToast({
      status: "error",
      message: "Aconteceu um erro ao fazer o login com o google",
    });
  };

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
        Faça seu login
      </Typography>
      <AppInput<IForm>
        fullWidth
        control={control}
        errorMsg={errors.email?.message}
        name="email"
        label="Email"
        type="email"
      />
      <AppInput<IForm>
        fullWidth
        control={control}
        errorMsg={errors.password?.message}
        name="password"
        label="Senha"
        type="password"
      />
      <Button type="submit" variant="contained" sx={{ textTransform: "none" }}>
        Submeter
      </Button>
      <Box display="flex" justifyContent="center">
        <GoogleLogin
          onSuccess={googleSuccess}
          onError={googleError}
          useOneTap={false}
          auto_select={false}
          size="large"
          theme={isDarkMode ? "filled_black" : "outline"}
        />
      </Box>
      <MUILink
        component={Link}
        href="/criar-usuario"
        underline="hover"
        textAlign="center"
      >
        Não tem uma conta? Cadastre-se
      </MUILink>
    </Box>
  );
};
