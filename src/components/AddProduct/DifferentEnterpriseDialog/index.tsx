import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface IDifferentEnterpriseDialogProps {
  isOpen: boolean;
  product: ICheckoutProduct | null;
  onClose: VoidFunction;
  onConfirm: (product: ICheckoutProduct) => void;
}

export const DifferentEnterpriseDialog = ({
  isOpen,
  product,
  onClose,
  onConfirm,
}: IDifferentEnterpriseDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Você selecionou um produto de outra loja
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Você quer limpar seu carrinho e adicionar este produto?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={onClose}>
          Não
        </Button>
        <Button
          type="button"
          onClick={() => {
            if (product) onConfirm(product);
          }}
        >
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};
