import { IAddress } from "@/models/entities/IAddress";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface IDeleteAddressDialogProps {
  isOpen: boolean;
  address: IAddress | null;
  onClose: VoidFunction;
  onConfirm: (address: IAddress) => void;
}

export const DeleteAddressDialog = ({
  isOpen,
  address,
  onClose,
  onConfirm,
}: IDeleteAddressDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Você irá remover este endereço
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Você tem certeza?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={onClose}>
          Não
        </Button>
        <Button
          type="button"
          onClick={() => {
            if (address) onConfirm(address);
          }}
          color="error"
        >
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};
