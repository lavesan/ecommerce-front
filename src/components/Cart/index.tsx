import {
  SwipeableDrawer,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  BoxProps,
} from "@mui/material";
import Link from "next/link";

import { useResponsive } from "@/hooks/useResponsive";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import CloseIcon from "@mui/icons-material/Close";
import { maskMoney } from "@/helpers/money.helper";
import React, { useMemo, useState } from "react";
import { AddProduct } from "../AddProduct";
import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";
import { IEnterprise } from "@/models/entities/IEnterprise";

interface CartProps {
  onClose?: VoidFunction;
  isOnCheckoutPage?: boolean;
}

export const Cart = ({ onClose, isOnCheckoutPage }: CartProps) => {
  const {
    enterprise,
    products = [],
    total,
    prodTotal,
    freightTotal,
    removeProduct,
  } = useCheckoutContext();

  const { isMobile } = useResponsive();

  const [selectedProd, setSelectedProd] = useState<ICheckoutProduct | null>();

  const isMobileContainerStyle = useMemo<BoxProps>(() => {
    return isMobile
      ? {}
      : {
          width: "600px",
        };
  }, [isMobile]);

  const openModal = (product: ICheckoutProduct) => {
    setSelectedProd(product);
  };

  const onPropClose = () => {
    if (onClose) onClose();
  };

  return (
    <>
      <Box
        pt={4}
        pl={1}
        pr={4}
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        flex={1}
        {...isMobileContainerStyle}
      >
        {onClose && (
          <IconButton
            onClick={onClose}
            sx={{ position: "sticky", top: 16, left: 0 }}
          >
            <CloseIcon />
          </IconButton>
        )}
        {enterprise ? (
          <Box display="flex" flexDirection="column" width="100%" height="100%">
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="nowrap"
              gap={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography component="h2" fontSize="small">
                Pedido em
                <br />
                <Box component="span" fontWeight="bold" fontSize="large">
                  {enterprise?.name}
                </Box>
              </Typography>
              <Button
                variant="outlined"
                component={Link}
                href={`/loja/${enterprise?.id}`}
                sx={{ textTransform: "none" }}
                onClick={onPropClose}
              >
                Ver menu
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            {products.map((product, index) => (
              <React.Fragment key={`checkout_${product.id}`}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Box>
                    <Typography component="p">
                      {product.quantity}x {product.name}
                    </Typography>
                    <Typography component="p">
                      {product.productAdditionalCategory
                        ?.map((addCat) =>
                          addCat.productAdditionals?.map(
                            (additional) => additional.name
                          )
                        )
                        .join(", ")}
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="flex-start"
                    >
                      <Button type="button" onClick={() => openModal(product)}>
                        Editar
                      </Button>
                      <Button
                        type="button"
                        onClick={() => removeProduct(product.id)}
                      >
                        Remover
                      </Button>
                    </Box>
                  </Box>
                  <Typography component="p" sx={{ color: "primary.main" }}>
                    {product.promotionId
                      ? product.promotionValueFormat
                      : product.valueFormat}
                  </Typography>
                </Box>
                {index < products.length - 1 ? (
                  <Divider sx={{ mb: 2 }} />
                ) : (
                  <></>
                )}
              </React.Fragment>
            ))}
            <Box
              marginTop="auto"
              position="sticky"
              bottom={0}
              right={0}
              pb={2}
              sx={{ backgroundColor: "white" }}
            >
              <Divider sx={{ mb: 2 }} />
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography>Subtotal</Typography>
                <Typography>{maskMoney(prodTotal)}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography>Frete</Typography>
                <Typography>{maskMoney(freightTotal)}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mb={isOnCheckoutPage ? 0 : 3}
              >
                <Typography fontWeight="bold">Total</Typography>
                <Typography fontWeight="bold">{maskMoney(total)}</Typography>
              </Box>
              {!isOnCheckoutPage && (
                <Button
                  fullWidth
                  component={Link}
                  href="/pagamento"
                  variant="contained"
                  type="button"
                  size="large"
                  sx={{ textTransform: "none" }}
                  onClick={onPropClose}
                >
                  Ir para o pagamento
                </Button>
              )}
            </Box>
          </Box>
        ) : (
          <>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
            >
              <Box
                component="img"
                alt="Página não enctrada"
                src="/static/empty-cart.png"
                width={300}
                height={300}
              />
              <Typography component="p" fontWeight="bold">
                Seu carrinho está vazio, adicione itens
              </Typography>
              <Box
                display="none"
                component="a"
                href="https://br.freepik.com/vetores-gratis/conjunto-de-itens-de-compras-chamativos_19965532.htm#query=cart%20cartoon&position=0&from_view=search&track=ais"
              >
                Imagem de pikisuperstar no Freepik
              </Box>
            </Box>
          </>
        )}
      </Box>
      <AddProduct
        isOpen={!!selectedProd}
        product={selectedProd || ({} as ICheckoutProduct)}
        enterprise={enterprise || ({} as IEnterprise)}
        onClose={() => setSelectedProd(null)}
      />
    </>
  );
};
