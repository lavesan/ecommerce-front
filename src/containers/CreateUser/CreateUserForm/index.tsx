import { Box, Stack, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validations";
import AppMaskedInput from "@/components/AppMaskedInput";
import { cpfMask, phoneMask } from "@/helpers/mask.helper";

interface IForm {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
}

export const CreateUserForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<IForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      width="100%"
      gap={4}
    >
      <Typography
        component="h1"
        textAlign={["center", "start"]}
        fontSize={["1.25rem", "2.5rem"]}
        marginTop={[0, 4]}
      >
        Digite seus dados!
      </Typography>
      <TextField
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register("name")}
        label="Nome"
        variant="outlined"
      />
      <TextField
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
        label="Email"
        type="email"
        variant="outlined"
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
    </Box>
  );
};
