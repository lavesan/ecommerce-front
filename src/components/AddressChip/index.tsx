import { useMemo } from "react";
import { Chip, ChipProps } from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { useGoBack } from "@/hooks/useGoBack";
import { useResponsive } from "@/hooks/useResponsive";
import { useAppContext } from "@/hooks/useAppContext";
import { useRouter } from "next/router";

export const AddressChip = (chipProps: Partial<ChipProps>) => {
  const { storeGoBackUrl } = useGoBack();
  const { isMobile } = useResponsive();

  const { token, toogleAddressModal } = useAppContext();
  const { address } = useCheckoutContext();

  const router = useRouter();

  const addressLabel = useMemo(() => {
    return address
      ? `${address.street}, ${address.number}`
      : "Adicione um endereço";
  }, [address]);

  const onClick = () => {
    if (!token) {
      if (isMobile) storeGoBackUrl("/endereco");
      else storeGoBackUrl(router.pathname);
      return router.push("/login");
    }

    if (isMobile) return router.push("/endereco");

    toogleAddressModal();
  };

  return (
    <Chip
      {...chipProps}
      icon={address ? <LocationOnIcon /> : <AddLocationAltIcon />}
      label={addressLabel}
      onClick={onClick}
      variant="outlined"
      sx={{
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    />
  );
};
