import {
  Backdrop,
  Fade,
  Modal,
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

import { ProductImage } from "@/containers/EnterpriseMenu/Category/ProductImage";
import { Additional } from "./Additional";
import { useResponsive } from "@/hooks/useResponsive";
import { IEnterpriseMenuProduct } from "@/models/pages/IEnterpriseMenuProps";
import { useEffect, useMemo, useState } from "react";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { maskMoney } from "@/helpers/money.helper";
import { useAppContext } from "@/hooks/useAppContext";
import { IEnterprise } from "@/models/entities/IEnterprise";
import { DifferentEnterpriseDialog } from "./DifferentEnterpriseDialog";
import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";

interface IAddProductProps {
  isOpen: boolean;
  product?: IEnterpriseMenuProduct;
  enterprise: IEnterprise;
  onClose: VoidFunction;
}

export const AddProduct = ({
  isOpen,
  enterprise,
  product,
  onClose,
}: IAddProductProps) => {
  const { addProduct, enterprise: checkoutEnterprise } = useCheckoutContext();
  const { showToast } = useAppContext();

  const { isMobile } = useResponsive();

  const [dialogOpt, setDialogOpt] = useState<{
    open: boolean;
    product: ICheckoutProduct | null;
  }>({
    open: false,
    product: null,
  });

  const [quantity, setQuantity] = useState(1);

  const totalValue = useMemo<string>(() => {
    const prodValue: number =
      (product?.promotionId ? product.promotionValue : product?.value) || 0;

    return maskMoney(prodValue * quantity);
  }, [quantity, product]);

  const addQuantity = () => {
    setQuantity((actual) => actual + 1);
  };

  const removeQuantity = () => {
    if (quantity >= 2) setQuantity((actual) => actual - 1);
  };

  const addToCart = () => {
    if (!product) {
      showToast({ status: "error", message: "Selecione um produto" });
      return;
    }

    const productToAdd = {
      ...product,
      quantity,
    };

    if (checkoutEnterprise && checkoutEnterprise.id !== enterprise.id) {
      setDialogOpt({ open: true, product: productToAdd });
      return;
    }

    console.log("veio pra cá");

    addProduct(enterprise, productToAdd);
    onClose();
  };

  const confirmEnterpriseChange = (product: ICheckoutProduct) => {
    console.log("confirmando: ", product);
    addProduct(enterprise, product);
    setDialogOpt({ open: false, product: null });
    onClose();
  };

  useEffect(() => {
    setQuantity(1);
  }, [isOpen]);

  return (
    <>
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
        <Fade in={isOpen}>
          <Box
            display="flex"
            flexDirection={["column", "row"]}
            width={["100vw", "90vw"]}
            height={["100vh", "90vh"]}
            borderRadius={[0, 4]}
            justifyContent={"space-between"}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              border: "none",
              ":focus": {
                border: "none",
              },
            }}
          >
            {isMobile && (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                paddingBottom={1}
              >
                <IconButton onClick={onClose} title="Fechar">
                  <CloseIcon fontSize="medium" />
                </IconButton>
              </Box>
            )}
            <Box
              width={["100%", "49%"]}
              display="flex"
              alignItems="center"
              overflow="hidden"
              height={["50px", "auto"]}
            >
              <ProductImage
                imageKey={product?.imageKey || ""}
                productName={product?.name || ""}
                width={["100%", "100%"]}
                height={["auto", "auto"]}
              />
            </Box>
            <Box width={["100%", "49%"]}>
              {!isMobile && (
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                  paddingBottom={2}
                >
                  <IconButton onClick={onClose} title="Fechar">
                    <CloseIcon fontSize="large" />
                  </IconButton>
                </Box>
              )}
              <Box
                display="flex"
                flexDirection="column"
                maxHeight={["40%", "70%"]}
                sx={{
                  "-webkit-overflow-scrolling": "touch",
                  overflowY: "scroll",
                }}
              >
                <Box paddingX={4} paddingY={2}>
                  <Typography variant="h2" fontWeight="bold" fontSize={40}>
                    {product?.name}
                  </Typography>
                  {/* @ts-ignore */}
                  <Typography
                    mt={2}
                    dangerouslySetInnerHTML={{ __html: product?.description }}
                  />
                  <Typography mt={2} fontWeight="bold">
                    {product?.boldDescription}
                  </Typography>
                  <Typography mt={2}>
                    {product?.promotionId && (
                      <Box
                        component="span"
                        color="primary.main"
                        fontWeight="bold"
                      >
                        {product?.promotionValueFormat}
                      </Box>
                    )}{" "}
                    <Box
                      component="span"
                      color={product?.promotionId ? "grey.500" : "primary.main"}
                      fontWeight={product?.promotionId ? "normal" : "bold"}
                      fontSize={product?.promotionId ? "small" : "large"}
                      sx={{
                        textDecoration: product?.promotionId
                          ? "line-through"
                          : "none",
                        textDecorationColor: "grey.500",
                      }}
                    >
                      {product?.valueFormat}
                    </Box>
                  </Typography>
                </Box>
                {product?.productAdditionalCategory?.map((additionaCat) => (
                  <Additional
                    key={`additional_category_${additionaCat.id}`}
                    additionaCat={additionaCat}
                  />
                ))}
              </Box>
              <Divider />
              <Box
                component="footer"
                height={150}
                alignSelf="flex-end"
                justifySelf="flex-end"
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                flexDirection={isMobile ? "column" : "row"}
                gap={2}
                paddingY={2}
                paddingX={4}
              >
                <Box
                  width={["100%", "30%"]}
                  border={(theme) => `thin solid ${theme.palette.grey[400]}`}
                  borderRadius={2}
                  paddingY={[0, 1]}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton onClick={removeQuantity}>
                    <RemoveIcon />
                  </IconButton>
                  {quantity}
                  <IconButton onClick={addQuantity}>
                    <AddIcon />
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: isMobile ? "100%" : "40%",
                    paddingBlock: isMobile ? 1 : 2,
                  }}
                  type="button"
                  onClick={addToCart}
                >
                  <Box>Adicionar</Box>
                  <Box>{totalValue}</Box>
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <DifferentEnterpriseDialog
        isOpen={dialogOpt.open}
        product={dialogOpt.product}
        onClose={() =>
          setDialogOpt({
            open: false,
            product: null,
          })
        }
        onConfirm={confirmEnterpriseChange}
      />
    </>
  );
};
