import { Modal, Backdrop, Box } from "@mui/material";
import { AddProduct } from "../AddProduct";
import { IEnterpriseMenuProduct } from "@/models/pages/IEnterpriseMenuProps";
import { IEnterprise } from "@/models/entities/IEnterprise";
import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";

interface IAddProductModalProps {
  isOpen: boolean;
  product?: IEnterpriseMenuProduct;
  enterprise: IEnterprise;
  onClose: VoidFunction;
  filled: ICheckoutProduct | null;
}

export const AddProductModal = ({
  onClose,
  isOpen,
  filled,
  ...props
}: IAddProductModalProps) => {
  return (
    <Modal
      disableAutoFocus
      disableRestoreFocus
      disableEnforceFocus
      aria-labelledby="add-product"
      aria-describedby="add-product-to-checkout"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Box>
        <AddProduct {...props} onSuccess={onClose} filled={filled} />
      </Box>
    </Modal>
  );
};
