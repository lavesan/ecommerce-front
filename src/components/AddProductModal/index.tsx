import { Modal, Fade, Backdrop } from "@mui/material";
import { AddProduct } from "../AddProduct";
import { IEnterpriseMenuProduct } from "@/models/pages/IEnterpriseMenuProps";
import { IEnterprise } from "@/models/entities/IEnterprise";
import { useEffect } from "react";

interface IAddProductModalProps {
  isOpen: boolean;
  product?: IEnterpriseMenuProduct;
  enterprise: IEnterprise;
  onClose: VoidFunction;
}

export const AddProductModal = ({
  onClose,
  isOpen,
  ...props
}: IAddProductModalProps) => {
  useEffect(() => {
    console.log("abrindo: ", isOpen);
  }, [isOpen]);

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
      <AddProduct {...props} onSuccess={onClose} />
    </Modal>
  );
};
