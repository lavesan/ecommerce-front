import { IAddress } from "@/models/entities/IAddress";
import { Chip } from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useMemo } from "react";

interface IManageAddressProps {
  address?: IAddress;
}

export const ManageAddress = ({ address }: IManageAddressProps) => {
  const addressLabel = useMemo(() => {
    return address
      ? `${address.street} ${address.number}`
      : "Adicione um endereço";
  }, [address]);

  const onClick = () => {};

  return (
    <Chip
      icon={address ? <LocationOnIcon /> : <AddLocationAltIcon />}
      label={addressLabel}
      onClick={onClick}
      variant="outlined"
    />
  );
};
