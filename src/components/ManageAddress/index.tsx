import { useMemo } from "react";
import { IAddress } from "@/models/entities/IAddress";
import { Chip, ChipProps } from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface IManageAddressProps extends ChipProps {
  address?: IAddress;
}

export const ManageAddress = ({
  address,
  ...chipProps
}: IManageAddressProps) => {
  const addressLabel = useMemo(() => {
    return address
      ? `${address.street} ${address.number}`
      : "Adicione um endereço";
  }, [address]);

  const onClick = () => {};

  return (
    <Chip
      {...chipProps}
      icon={address ? <LocationOnIcon /> : <AddLocationAltIcon />}
      label={addressLabel}
      onClick={onClick}
      variant="outlined"
    />
  );
};
