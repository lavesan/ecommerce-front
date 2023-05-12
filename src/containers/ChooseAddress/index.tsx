import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Radio,
  Grid,
  IconButton,
  Paper,
  Collapse,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AddressForm from "./AddressForm";
import { useAppContext } from "@/hooks/useAppContext";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { IAddress } from "@/models/entities/IAddress";
import { DeleteAddressDialog } from "./DeleteAddressDialog";
import { AddressService } from "@/services/address.service";

interface IChooseAddressProps {
  onChoose: VoidFunction;
}

const ChooseAddress = ({ onChoose }: IChooseAddressProps) => {
  const addressService = AddressService.getInstance();

  const { addresses, user, token, isDarkMode, setIsLoading, showToast, getMe } =
    useAppContext();
  const { address: checkoutAddress, setAddress } = useCheckoutContext();

  const [editAddress, setEditAddress] = useState<number | null>(null);

  const [deleteDialog, setDeleteDialog] = useState<{
    address: IAddress | null;
    open: boolean;
  }>({
    open: false,
    address: null,
  });

  const toogleEditAddress = (element: any, index: number) => {
    element.stopPropagation();
    setEditAddress((actual) => (actual === index ? null : index));
  };

  const onDeleteClick = (element: any, address: IAddress) => {
    element.stopPropagation();
    setDeleteDialog({
      address,
      open: true,
    });
  };

  const onCloseDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      address: null,
    });
  };

  const onDeleteAddressConfirm = async (address: IAddress) => {
    onCloseDeleteDialog();

    await addressService
      .delete(address.id)
      .then(async () => {
        showToast({ status: "success", message: "Endereço removido" });
        await getMe();
      })
      .catch(() =>
        showToast({
          status: "error",
          message: "Aconteceu um erro ao remover o endereço",
        })
      )
      .finally(() => setIsLoading(false));
  };

  const selectAddress = (address: IAddress) => {
    setAddress(address);
    addressService.updateDefault(address.id, { clientId: user?.id || "" });
    setEditAddress(null);
    onChoose();
  };

  const onCreateSuccess = (address?: IAddress) => {
    if (address) selectAddress(address);
  };

  const addressButtonProps = useMemo(
    () => ({
      container: true,
      title: "Selecionar",
      component: "button",
      type: "button",
      py: 3,
      sx: {
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.3s",
        color: isDarkMode ? "white" : "inherit",
        backgroundColor: isDarkMode ? "grey.800" : "white",
        ":hover": {
          backgroundColor: isDarkMode ? "grey.600" : "grey.200",
        },
      },
    }),
    [isDarkMode]
  );

  useEffect(() => {
    if (!addresses.length) setEditAddress(-1);
    else setEditAddress(null);
  }, [addresses]);

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Typography component="h2" fontSize="large" textAlign="center" mb={2}>
          {token ? "Adicione um endereço" : "Selecione um endereço"}
        </Typography>
        <Paper elevation={3}>
          <Grid
            onClick={(element) => toogleEditAddress(element, -1)}
            {...addressButtonProps}
          >
            <Grid
              item
              xs={3}
              display="flex"
              justifyContent="flex-start"
              pl={3}
            ></Grid>
            <Grid item xs={6} my="auto">
              <Typography>Adicionar endereço</Typography>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
          <Collapse in={editAddress === -1}>
            <Box overflow="hidden">
              <AddressForm onSuccess={onCreateSuccess} />
            </Box>
          </Collapse>
        </Paper>
        <TransitionGroup>
          {addresses.map((address, index) => (
            <Collapse key={`address_${address.id}`}>
              <Paper elevation={3} sx={{ mt: 2 }}>
                <Grid
                  onClick={() => selectAddress(address)}
                  {...addressButtonProps}
                >
                  <Grid
                    item
                    xs={3}
                    display="flex"
                    justifyContent="flex-start"
                    pl={3}
                  >
                    <Radio
                      name="address"
                      checked={checkoutAddress?.id === address.id}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{address.shortName}</Typography>
                    <Typography>
                      {address.street}, {address.number}
                    </Typography>
                    <Typography>{address.complement}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <IconButton
                      title="Editar"
                      onClick={(element) => toogleEditAddress(element, index)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      title="Remover"
                      color="error"
                      onClick={(element) => onDeleteClick(element, address)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Collapse in={editAddress === index}>
                  <Box>
                    <AddressForm
                      address={address}
                      onSuccess={() => selectAddress(address)}
                    />
                  </Box>
                </Collapse>
              </Paper>
            </Collapse>
          ))}
        </TransitionGroup>
      </Box>
      <DeleteAddressDialog
        isOpen={deleteDialog.open}
        address={deleteDialog.address}
        onClose={onCloseDeleteDialog}
        onConfirm={onDeleteAddressConfirm}
      />
    </>
  );
};

export default ChooseAddress;
