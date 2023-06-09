import { useState, useEffect, useRef, useMemo } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Skeleton,
  Link as MUILink,
  LinkProps as MUILinkProps,
} from "@mui/material";
import Link from "next/link";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

import { IEnterprise } from "@/models/entities/IEnterprise";
import { getImgUrl } from "@/helpers/image.helper";
import { useAppContext } from "@/hooks/useAppContext";
import { enterpriseIsClosed } from "@/helpers/enterprise.helper";

interface IEnterpriseCardProps extends MUILinkProps {
  enterprise: IEnterprise;
}

export const EnterpriseCard = ({
  enterprise,
  ...linkProps
}: IEnterpriseCardProps) => {
  const { isDarkMode } = useAppContext();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);

  const isClosed = useMemo(() => {
    if (enterprise.isDisabled) return true;
    return enterpriseIsClosed(enterprise);
  }, [enterprise]);

  useEffect(() => {
    if (imgRef.current?.complete) setIsLoading(false);
  }, []);

  return (
    <MUILink
      {...linkProps}
      component={Link}
      color="inherit"
      href={`/loja/${enterprise.id}`}
      underline="none"
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          wrap: "nowrap",
          height: "100%",
          transition: "0.3s",
          ":hover": {
            boxShadow: "1px 1px 8px gray",
          },
          filter: isClosed
            ? isDarkMode
              ? "brightness(30%)"
              : "brightness(80%)"
            : "brightness(100%)",
        }}
      >
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              position: "relative",
              width: "30%",
              minWidth: "30%",
              height: 0,
              paddingBottom: "30%",
            }}
          >
            <CardMedia
              ref={imgRef}
              component="img"
              image={getImgUrl(enterprise.imageKey)}
              alt="Logo Empresa"
              onLoad={() => {
                setIsLoading(false);
              }}
              onError={() => {
                setIsError(true);
              }}
            />
          </Skeleton>
        ) : (
          <CardMedia
            ref={imgRef}
            component="img"
            sx={{ width: "30%" }}
            image={getImgUrl(enterprise.imageKey)}
            alt="Logo empresa"
            onError={() => {
              setIsError(true);
            }}
          />
        )}
        <CardContent>
          <Typography
            variant="h3"
            fontWeight="bold"
            fontSize={["1rem", "2rem"]}
            marginBottom={2}
          >
            {enterprise.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <DeliveryDiningIcon sx={{ marginRight: 1 }} />
            {enterprise.estimatedTime}h
          </Typography>
        </CardContent>
      </Card>
    </MUILink>
  );
};
