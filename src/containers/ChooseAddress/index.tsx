import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Radio,
  Slide,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppContext } from "@/hooks/useAppContext";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import AddressForm from "./AddressForm";
import { IAddress } from "@/models/entities/IAddress";

interface IChooseAddressProps {
  onChoose?: VoidFunction;
}

const ChooseAddress = ({ onChoose }: IChooseAddressProps) => {
  const { addresses, token } = useAppContext();
  const { address: checkoutAddress, setAddress } = useCheckoutContext();

  const [editAddress, setEditAddress] = useState<number | null>(null);

  const toogleEditAddress = (element: any, index: number) => {
    element.stopPropagation();
    setEditAddress((actual) => (actual === index ? null : index));
  };

  const selectAddress = (address: IAddress) => {
    setAddress(address);
    if (onChoose) onChoose();
  };

  useEffect(() => {
    if (!addresses.length) setEditAddress(-1);
    else setEditAddress(null);
  }, [addresses]);

  return (
    <Box display="flex" flexDirection="column">
      <Typography component="h2" fontSize="large" textAlign="center" mb={2}>
        {token ? "Adicione um endereço" : "Selecione um endereço"}
      </Typography>
      <Paper elevation={3}>
        <Grid
          component="button"
          container
          type="button"
          onClick={(element) => toogleEditAddress(element, -1)}
          py={3}
          sx={{ backgroundColor: "white", border: "none", cursor: "pointer" }}
        >
          <Grid item xs={3} display="flex" justifyContent="flex-start" pl={3}>
            {/* <Radio name="address" checked={editAddress === -1} /> */}
          </Grid>
          <Grid item xs={6} my="auto">
            <Typography>Adicionar endereço</Typography>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Slide
          direction="down"
          in={editAddress === -1}
          mountOnEnter
          unmountOnExit
        >
          <Box>
            <AddressForm />
          </Box>
        </Slide>
      </Paper>
      {addresses.map((address, index) => (
        <Paper elevation={3} key={`address_${address.id}`} sx={{ mt: 2 }}>
          <Grid
            component="button"
            container
            type="button"
            onClick={() => selectAddress(address)}
            py={2}
            sx={{ backgroundColor: "white", border: "none", cursor: "pointer" }}
          >
            <Grid item xs={3} display="flex" justifyContent="flex-start" pl={3}>
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
              <IconButton title="Remover" color="error">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Slide
            direction="down"
            in={editAddress === index}
            mountOnEnter
            unmountOnExit
          >
            <Box>
              <AddressForm address={address} />
            </Box>
          </Slide>
        </Paper>
      ))}
    </Box>
  );
};

export default ChooseAddress;
