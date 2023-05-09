import { Box, Button, Grid } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppContext } from "@/hooks/useAppContext";
import { IAddress } from "@/models/entities/IAddress";
import { AddressService } from "@/services/address.service";
import { useCallback, useEffect } from "react";
import AppMaskedInput from "@/components/AppMaskedInput";
import { cepMask } from "@/helpers/mask.helper";
import AppInput from "@/components/AppInput";
import AppSelect from "@/components/AppSelect";
import { districtOptions } from "@/helpers/select.helper";
import { validationSchema } from "./validation";

interface IForm {
  cep: string;
  street: string;
  complement: string;
  number: string;
  district: string;
  shortName: string;
}

interface IAddressFormProps {
  address?: IAddress;
}

const AddressForm = ({ address }: IAddressFormProps) => {
  const addressService = AddressService.getInstance();

  const { user, getMe, setIsLoading, addresses, showToast } = useAppContext();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<IForm>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const cep = useWatch({
    control,
    name: "cep",
  });

  const onSubmit = handleSubmit(
    async ({ cep, complement, district, number, shortName, street }) => {
      try {
        await addressService.create({
          district,
          isDefault: true,
          clientId: user?.id || "",
          state: "PE",
          city: "Arco verde",
          cep: cep.trim().replace(/\D/g, ""),
          complement: complement.trim(),
          number: number.trim(),
          shortName: shortName
            ? shortName.trim()
            : `Endereço ${addresses.length + 1}`,
          street: street.trim(),
        });

        await getMe();
      } catch {
        showToast({
          status: "error",
          message:
            "Aconteceu um erro ao salvar seu endereço, tente novamente mais tarde",
        });
      } finally {
        setIsLoading(false);
      }
    }
  );

  const onCepChange = useCallback(async () => {
    if (!cep) return;

    const formatedCep = cep.replace(/\D/g, "");

    if (formatedCep.length === 8) {
      const res = await addressService
        .findByCep(formatedCep)
        .finally(() => setIsLoading(false));

      const config = {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      };

      setValue("street", res.logradouro, config);
      setValue("complement", res.complemento, config);
      setValue("district", res.bairro, config);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cep]);

  useEffect(() => {
    onCepChange();
  }, [onCepChange]);

  return (
    <Box component="form" onSubmit={onSubmit} p={4}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <AppMaskedInput
            fullWidth
            mask={cepMask}
            error={!!errors.cep}
            helperText={errors.cep?.message}
            {...register("cep")}
            label="CEP"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <AppSelect
            formControl={{ fullWidth: true }}
            data={districtOptions}
            error={!!errors.district}
            helperText={errors.district?.message}
            {...register("district")}
            label="Bairro"
          />
        </Grid>
        <Grid item xs={6}>
          <AppInput
            formControl={{ fullWidth: true }}
            error={!!errors.street}
            helperText={errors.street?.message}
            {...register("street")}
            label="Rua"
          />
        </Grid>
        <Grid item xs={6}>
          <AppInput
            formControl={{ fullWidth: true }}
            error={!!errors.number}
            helperText={errors.number?.message}
            {...register("number")}
            label="Número"
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <AppInput
            formControl={{ fullWidth: true }}
            error={!!errors.complement}
            helperText={errors.complement?.message}
            {...register("complement")}
            label="Complemento"
          />
        </Grid>
        <Grid item xs={12}>
          <AppInput
            formControl={{ fullWidth: true }}
            error={!!errors.shortName}
            helperText={errors.shortName?.message}
            {...register("shortName")}
            label="Nome do endereço (opcional)"
          />
        </Grid>
      </Grid>
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{ mt: 2, textTransform: "none" }}
      >
        Salvar
      </Button>
    </Box>
  );
};

export default AddressForm;
