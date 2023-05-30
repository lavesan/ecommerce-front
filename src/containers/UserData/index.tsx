import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppContext } from "@/hooks/useAppContext";
import { validationSchema } from "./validation";
import { useEffect, useMemo } from "react";
import { ClientService } from "@/services/client.service";
import { AppInput } from "@/components/AppInput";
import { AppMaskedInput } from "@/components/AppMaskedInput";
import { cpfMask, phoneMask } from "@/helpers/mask.helper";
import { useAuthContext } from "@/hooks/useAuthContext";

interface IForm {
  name: string;
  email: string;
  password?: string;
  cpf: string;
  phone: string;
}

const UserData = () => {
  const clientService = ClientService.getInstance();

  const router = useRouter();

  const { showToast, setIsLoading } = useAppContext();
  const { user } = useAuthContext();

  const userForm = useMemo<Partial<IForm>>(() => {
    if (!user) return {};

    const { name, email, cpf, phone } = user;

    return {
      name,
      email,
      cpf,
      phone,
    };
  }, [user]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: userForm,
  });

  const onSubmit = handleSubmit(
    async ({ cpf, email, name, phone, ...values }) => {
      if (!user) {
        showToast({
          status: "error",
          message: "Entre em uma conta, você está desconectado",
        });
        return router.push("/login");
      }

      if (!values.password) delete values.password;
      else values.password = values.password.trim();

      await clientService
        .update(user.id, {
          ...values,
          cpf: cpf.trim().replace(/\D/g, ""),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim().replace(/\D/g, ""),
        })
        .then(() => {
          console.log("deu sucesso");
          showToast({
            status: "success",
            message: "Seus dados foram atualizados com sucesso",
          });
        })
        .catch(() => {
          showToast({
            status: "error",
            message: "Aconteceu um erro ao atualizar seus dados",
          });
        })
        .finally(() => setIsLoading(false));
    }
  );

  useEffect(() => {
    if (userForm) {
      setValue("cpf", userForm.cpf || "");
      setValue("name", userForm.name || "");
      setValue("email", userForm.email || "");
      setValue("phone", userForm.phone || "");
    }
  }, [userForm, setValue]);

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
        Seus dados
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
        Atualizar
      </Button>
    </Box>
  );
};

export default UserData;
