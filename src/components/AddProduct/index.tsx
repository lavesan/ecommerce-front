import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  BoxProps,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

import { ProductImage } from "@/containers/EnterpriseMenu/Category/ProductImage";
import { Additional } from "./Additional";
import { useResponsive } from "@/hooks/useResponsive";
import { IEnterpriseMenuProduct } from "@/models/pages/IEnterpriseMenuProps";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { maskMoney } from "@/helpers/money.helper";
import { useAppContext } from "@/hooks/useAppContext";
import { IEnterprise } from "@/models/entities/IEnterprise";
import { DifferentEnterpriseDialog } from "./DifferentEnterpriseDialog";
import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";
import { IAddProductAdditional } from "@/models/components/IAddProductAdditional";

interface IAddProductProps {
  product?: IEnterpriseMenuProduct;
  enterprise: IEnterprise;
  onSuccess: VoidFunction;
}

const useAddProduct = (product?: IEnterpriseMenuProduct) => {
  const [selectedOptions, setSelectedOptions] = useState<
    IAddProductAdditional[]
  >([]);

  const addAdditional = (additional: IAddProductAdditional) => {
    setSelectedOptions((actual) => {
      const additionalExists = actual.find((elem) => elem.id === additional.id);

      // Adds one more additional on quantity
      if (additionalExists) {
        return actual.map((elem) => {
          if (elem.id === additional.id) {
            return {
              ...elem,
              quantity: elem.quantity + 1,
            };
          }

          return elem;
        });
      }

      return [...actual, additional];
    });
  };

  const subtractAdditional = (id: string) => {
    setSelectedOptions((actual) => {
      const additionalExists = actual.find((elem) => elem.id === id);

      if (additionalExists) {
        if (additionalExists.quantity === 1) {
          return actual.filter((elem) => elem.id !== id);
        }

        return actual.map((elem) => {
          if (elem.id === id) {
            return {
              ...elem,
              quantity: elem.quantity - 1,
            };
          }

          return elem;
        });
      }

      return actual;
    });
  };

  const addToCartIsDisabled = useMemo(() => {
    if (!product) return true;

    return product.productAdditionalCategory?.some(
      ({ id, isOptional, limit }) => {
        const additionalOptions = selectedOptions.filter(
          (opt) => opt.addCategoryId === id
        );
        const additionalCount: number = additionalOptions.reduce(
          (opt1, opt2) => opt1 + opt2.quantity,
          0
        );

        return !isOptional && additionalCount < limit;
      }
    );
  }, [product, selectedOptions]);

  const disabledAddAddditional = ({
    addCategoryId,
    limit,
  }: {
    addCategoryId: string;
    limit: number;
  }): boolean => {
    if (!limit) return false;

    const categoryOptions = selectedOptions.filter(
      (opt) => opt.addCategoryId === addCategoryId
    );
    const additionalCount: number = categoryOptions.reduce(
      (opt1, opt2) => opt1 + opt2.quantity,
      0
    );

    return additionalCount >= limit;
  };

  const getAdditionalQuantity = (id: string): number => {
    const additional = selectedOptions.find((opt) => opt.id === id);

    if (additional) return additional.quantity;

    return 0;
  };

  const getAdditionalCategoryQuantity = useCallback(
    (id: string): number => {
      const additionals = selectedOptions.filter(
        (opt) => opt.addCategoryId === id
      );
      return additionals.reduce((opt1, opt2) => opt1 + opt2.quantity, 0);
    },
    [selectedOptions]
  );

  return {
    addAdditional,
    subtractAdditional,
    disabledAddAddditional,
    getAdditionalQuantity,
    getAdditionalCategoryQuantity,
    addToCartIsDisabled,
    selectedOptions,
  };
};

export const AddProduct = ({
  product,
  enterprise,
  onSuccess,
}: IAddProductProps) => {
  const { isDarkMode, showToast } = useAppContext();
  const { addProduct, enterprise: checkoutEnterprise } = useCheckoutContext();

  const {
    selectedOptions,
    addToCartIsDisabled,
    addAdditional,
    subtractAdditional,
    disabledAddAddditional,
    getAdditionalQuantity,
    getAdditionalCategoryQuantity,
  } = useAddProduct(product);

  const { isMobile } = useResponsive();

  const [dialogOpt, setDialogOpt] = useState<{
    open: boolean;
    product: ICheckoutProduct | null;
  }>({
    open: false,
    product: null,
  });

  const [quantity, setQuantity] = useState(1);

  const [footerRef, setFooterRef] = useState<HTMLElement | null>(null);

  const getFooterRef = useCallback((node: HTMLElement) => {
    if (node) setFooterRef(node);
  }, []);

  const footerHeight = useMemo<number>(() => {
    return footerRef?.clientHeight || 0;
  }, [footerRef]);

  const footerStyle = useMemo<BoxProps>(() => {
    return isMobile
      ? {
          position: "fixed",
          bottom: 0,
          left: 0,
          mt: "auto",
          width: "100%",
          backgroundColor: isDarkMode ? "grey.900" : "white",
          WebkitBackfaceVisibility: "hidden",
        }
      : {};
  }, [isMobile, isDarkMode]);

  const totalValue = useMemo<string>(() => {
    const prodValue: number =
      (product?.promotionId ? product.promotionValue : product?.value) || 0;

    const additionalsValue = selectedOptions.reduce(
      (value, opt) => value + opt.value * opt.quantity,
      0
    );

    return maskMoney((prodValue + additionalsValue) * quantity);
  }, [quantity, product, selectedOptions]);

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

    const productToAdd: ICheckoutProduct = {
      ...product,
      quantity,
      additionals: selectedOptions,
    };

    if (checkoutEnterprise && checkoutEnterprise.id !== enterprise.id) {
      setDialogOpt({ open: true, product: productToAdd });
      return;
    }

    addProduct(enterprise, productToAdd);
    onSuccess();
  };

  const confirmEnterpriseChange = (product: ICheckoutProduct) => {
    addProduct(enterprise, product);
    setDialogOpt({ open: false, product: null });
    onSuccess();
  };

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  return (
    <>
      <Box
        display="flex"
        flexDirection={["column", "row"]}
        width={[, "90vw"]}
        height={[, "90vh"]}
        borderRadius={[0, 4]}
        justifyContent={"space-between"}
        sx={
          isMobile
            ? {}
            : {
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
              }
        }
      >
        <Box
          width={["100%", "49%"]}
          display="flex"
          alignItems="center"
          overflow="hidden"
          height={["20vh", "auto"]}
        >
          <ProductImage
            imageKey={product?.imageKey || ""}
            productName={product?.name || ""}
            width={["100%", "100%"]}
            height={["auto", "auto"]}
          />
        </Box>
        <Box width={["100%", "49%"]} display="flex" flexDirection="column">
          {!isMobile && (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              paddingBottom={2}
            >
              <IconButton onClick={onSuccess} title="Fechar">
                <CloseIcon fontSize="large" />
              </IconButton>
            </Box>
          )}
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            sx={
              isMobile
                ? {
                    mb: `${footerHeight}px`,
                  }
                : {
                    WebkitOverflowScrolling: "touch",
                    overflowY: "scroll",
                  }
            }
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
                  <Box component="span" color="primary.main" fontWeight="bold">
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
                addAdditional={addAdditional}
                subtractAdditional={subtractAdditional}
                disabledAddAddditional={disabledAddAddditional}
                getAdditionalQuantity={getAdditionalQuantity}
                getAdditionalCategoryQuantity={getAdditionalCategoryQuantity}
              />
            ))}
          </Box>
          <Box
            ref={getFooterRef}
            {...footerStyle}
            component="footer"
            width="100%"
            alignSelf="flex-end"
            justifySelf="flex-end"
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            flexDirection={isMobile ? "column" : "row"}
            gap={2}
            paddingY={2}
            px={2}
            borderTop={(theme) => `thin solid ${theme.palette.grey[500]}`}
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
              <IconButton disabled={quantity <= 1} onClick={removeQuantity}>
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
              disabled={addToCartIsDisabled}
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
