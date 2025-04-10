import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  BoxProps,
  Collapse,
} from "@mui/material";
import Link from "next/link";
import { TransitionGroup } from "react-transition-group";

import { useResponsive } from "@/hooks/useResponsive";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import CloseIcon from "@mui/icons-material/Close";
import { maskMoney } from "@/helpers/money.helper";
import React, { useMemo, useState } from "react";
import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";
import { IEnterprise } from "@/models/entities/IEnterprise";
import { AddProductModal } from "../AddProductModal";
import { useRouter } from "next/router";
import { useAppContext } from "@/hooks/useAppContext";

interface CartProps {
  onClose?: VoidFunction;
  isOnCheckoutPage?: boolean;
}

export const Cart = ({ onClose, isOnCheckoutPage }: CartProps) => {
  const { isDarkMode } = useAppContext();

  const {
    enterprise,
    products = [],
    total,
    prodTotal,
    freightTotal,
    removeProduct,
    getProdTotalValue,
  } = useCheckoutContext();

  const { isMobile } = useResponsive();

  const router = useRouter();

  const [selectedProd, setSelectedProd] = useState<ICheckoutProduct | null>();

  const hideSubmitButton = useMemo(() => {
    return router.pathname.includes("/pagamento");
  }, [router.pathname]);

  const isMobileContainerStyle = useMemo<BoxProps>(() => {
    return isMobile
      ? {}
      : {
          width: "600px",
        };
  }, [isMobile]);

  const isOnCheckoutPageStyle = useMemo<BoxProps>(() => {
    return isOnCheckoutPage
      ? {
          width: "100%",
        }
      : {};
  }, [isOnCheckoutPage]);

  const openModal = (product: ICheckoutProduct) => {
    if (isMobile) {
      onPropClose();
      return router.push({
        pathname: `/produto/${enterprise?.id}/${product.id}`,
        query: { product: JSON.stringify(product) },
      });
    }

    setSelectedProd(product);
    onPropClose();
  };

  const onPropClose = () => {
    if (onClose) onClose();
  };

  return (
    <>
      <Box
        pt={4}
        px={2}
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        flex={1}
        {...isMobileContainerStyle}
        {...isOnCheckoutPageStyle}
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
                sx={{
                  textTransform: "none",
                  textAlign: isMobile ? "end" : "start",
                }}
                onClick={onPropClose}
              >
                Ver menu
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <TransitionGroup>
              {products.map((product, index) => (
                <Collapse key={`checkout_${product.id}`}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    mb={2}
                  >
                    <Box>
                      <Typography component="p" fontSize="large">
                        {product.quantity}x {product.name}
                      </Typography>
                      <Typography component="p" color="grey.600">
                        {product.additionals
                          .map(({ name, quantity }) => `${quantity}x ${name}`)
                          .join(", ")}
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-start"
                      >
                        <Button
                          type="button"
                          onClick={() => openModal(product)}
                        >
                          Editar
                        </Button>
                        <Button
                          type="button"
                          onClick={() => removeProduct(product.key || null)}
                          color="error"
                        >
                          Remover
                        </Button>
                      </Box>
                    </Box>
                    <Typography component="p" sx={{ color: "primary.main" }}>
                      {getProdTotalValue(product).formatted}
                    </Typography>
                  </Box>
                  {index < products.length - 1 ? (
                    <Divider sx={{ mb: 2 }} />
                  ) : (
                    <></>
                  )}
                </Collapse>
              ))}
            </TransitionGroup>
            <Box
              marginTop="auto"
              position="sticky"
              bottom={0}
              right={0}
              pb={2}
              sx={{ backgroundColor: isDarkMode ? "invisible" : "white" }}
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
              {!hideSubmitButton && (
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
      <AddProductModal
        isOpen={!!selectedProd}
        product={selectedProd || ({} as ICheckoutProduct)}
        enterprise={enterprise || ({} as IEnterprise)}
        onClose={() => setSelectedProd(null)}
        filled={selectedProd || null}
      />
    </>
  );
};
