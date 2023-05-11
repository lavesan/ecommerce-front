import { Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { validationSchema } from "./validations";
import { cpfMask, phoneMask } from "@/helpers/mask.helper";
import { AppInput } from "@/components/AppInput";
import { AppMaskedInput } from "@/components/AppMaskedInput";
import { ClientService } from "@/services/client.service";
import { useAppContext } from "@/hooks/useAppContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { parseError } from "@/helpers/axiosError.helper";

interface IForm {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
}

export const CreateUserForm = () => {
  const clientService = ClientService.getInstance();

  const router = useRouter();

  const { login, showToast, setIsLoading } = useAppContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit(
    async ({ cpf, phone, name, email, password }) => {
      try {
        const { credentials, ...client } = await clientService.create({
          password,
          email: email.trim(),
          name: name.trim(),
          cpf: cpf.trim().replace(/\D/g, ""),
          phone: phone.trim().replace(/\D/g, ""),
        });
        login({ client, credentials });

        router.push("/");
      } catch (err: any) {
        const axiosErr = parseError(err);

        showToast({
          status: "error",
          message: axiosErr?.message || "Seu email já está cadastrado",
        });
      } finally {
        setIsLoading(false);
      }
    }
  );

  useEffect(() => {
    const { name, email } = router.query as { email: string; name: string };

    if (name) {
      setValue("name", name, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
    if (email) {
      setValue("email", email, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [router, setValue]);

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
        Se cadastre
      </Typography>
      <AppInput<IForm>
        fullWidth
        control={control}
        errorMsg={errors.name?.message}
        name="name"
        label="Nome"
      />
      <AppInput<IForm>
        fullWidth
        control={control}
        errorMsg={errors.email?.message}
        name="email"
        label="Email"
        type="email"
      />
      <AppMaskedInput<IForm>
        fullWidth
        control={control}
        mask={cpfMask}
        errorMsg={errors.cpf?.message}
        name="cpf"
        label="CPF"
        variant="outlined"
      />
      <AppMaskedInput<IForm>
        fullWidth
        control={control}
        mask={phoneMask}
        errorMsg={errors.phone?.message}
        name="phone"
        label="Celular"
        variant="outlined"
        type="tel"
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
        Criar
      </Button>
    </Box>
  );
};
