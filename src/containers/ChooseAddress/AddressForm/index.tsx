import { useEffect, useMemo } from "react";
import { Box, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppContext } from "@/hooks/useAppContext";
import { IAddress } from "@/models/entities/IAddress";
import { AddressService } from "@/services/address.service";

import { AppInput } from "@/components/AppInput";
import { AppMaskedInput } from "@/components/AppMaskedInput";
import { AppSelect } from "@/components/AppSelect";

import { districtOptions } from "@/helpers/select.helper";
import { cepMask } from "@/helpers/mask.helper";

import { validationSchema } from "./validation";
import { useResponsive } from "@/hooks/useResponsive";
import { useRouter } from "next/router";
import { useAuthContext } from "@/hooks/useAuthContext";

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
  onSuccess: (response?: IAddress) => void;
}

const AddressForm = ({ address, onSuccess }: IAddressFormProps) => {
  const addressService = AddressService.getInstance();

  const { setIsLoading, showToast, toogleAddressModal } = useAppContext();
  const { user, getMe, addresses } = useAuthContext();

  const { isMobile } = useResponsive();

  const router = useRouter();

  const addressForm = useMemo<IForm>(
    () => ({
      cep: address?.cep || "",
      street: address?.street || "",
      district: address?.district || "",
      number: address?.number || "",
      shortName: address?.shortName || "",
      complement: address?.complement || "",
    }),
    [address]
  );

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: addressForm,
  });

  const onSubmit = handleSubmit(
    async ({ cep, complement, district, number, shortName, street }) => {
      if (!user) {
        showToast({
          status: "warning",
          message: "Entre em sua conta ou se cadastre",
        });
        if (isMobile) return toogleAddressModal();
        return router.push("/login");
      }

      setIsLoading(true);
      try {
        const body = {
          district,
          isDefault: true,
          state: "PE",
          city: "Arco verde",
          cep: cep.trim().replace(/\D/g, ""),
          complement: complement.trim(),
          number: number.trim(),
          shortName: shortName
            ? shortName.trim()
            : `Endereço ${addresses.length + 1}`,
          street: street.trim(),
        };

        let response: IAddress | undefined;

        if (address) await addressService.update(address.id, body);
        else response = await addressService.create(body);

        await getMe();
        onSuccess(response);
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

  const onCepChange = async (value: string) => {
    const formatedCep = value.replace(/\D/g, "");

    if (!formatedCep) return;

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
    }
  };

  useEffect(() => {
    reset();
  }, [address, reset]);

  return (
    <Box component="form" onSubmit={onSubmit} p={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <AppMaskedInput<IForm>
            fullWidth
            mask={cepMask}
            errorMsg={errors.district?.message}
            control={control}
            onCustomChange={onCepChange}
            name="cep"
            label="CEP"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppSelect<IForm>
            formControl={{ fullWidth: true }}
            data={districtOptions}
            errorMsg={errors.district?.message}
            control={control}
            name="district"
            label="Bairro"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppInput<IForm>
            formControl={{ fullWidth: true }}
            control={control}
            errorMsg={errors.street?.message}
            name="street"
            label="Rua"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppInput<IForm>
            formControl={{ fullWidth: true }}
            control={control}
            errorMsg={errors.number?.message}
            name="number"
            label="Número"
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <AppInput<IForm>
            formControl={{ fullWidth: true }}
            control={control}
            errorMsg={errors.complement?.message}
            name="complement"
            label="Complemento"
          />
        </Grid>
        <Grid item xs={12}>
          <AppInput<IForm>
            formControl={{ fullWidth: true }}
            control={control}
            errorMsg={errors.shortName?.message}
            name="shortName"
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
        {address ? "Atualizar" : "Criar"}
      </Button>
    </Box>
  );
};

export default AddressForm;
