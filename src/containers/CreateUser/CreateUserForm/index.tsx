import { Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import { validationSchema } from "./validations";
import AppMaskedInput from "@/components/AppMaskedInput";
import { cpfMask, phoneMask } from "@/helpers/mask.helper";
import AppInput from "@/components/AppInput";
import { ClientService } from "@/services/client.service";
import { useAppContext } from "@/hooks/useAppContext";

interface IDecodedGoogleToken {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string; // image url
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

interface IForm {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
}

export const CreateUserForm = () => {
  const clientService = ClientService.getInstance();

  const { setToken, setUser } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const { credentials, ...client } = await clientService.create(values);
    setUser(client);
    setToken(credentials.accessToken);
  });

  const responseMessage = ({ credential }: CredentialResponse) => {
    if (credential) {
      const user = jwt_decode<IDecodedGoogleToken>(credential);

      setValue("email", user.email);
      setValue("name", user.name);
    }
  };

  const errorMessage = () => {
    console.log("err");
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
        fontSize={["1.25rem", "2.5rem"]}
        marginTop={[0, 4]}
      >
        Digite seus dados!
      </Typography>
      <AppInput
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register("name")}
        label="Nome"
      />
      <AppInput
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
        label="Email"
        type="email"
      />
      <AppMaskedInput
        fullWidth
        mask={cpfMask}
        error={!!errors.cpf}
        helperText={errors.cpf?.message}
        {...register("cpf")}
        label="CPF"
        variant="outlined"
      />
      <AppMaskedInput
        fullWidth
        mask={phoneMask}
        error={!!errors.phone}
        helperText={errors.phone?.message}
        {...register("phone")}
        label="Celular"
        variant="outlined"
      />
      <Button type="submit" variant="contained">
        Criar
      </Button>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </Box>
  );
};
