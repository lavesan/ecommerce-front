import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";

interface IEnterpriseCardProps {
  id: string;
  alt: string;
  imgBase64?: string | null;
  name: string;
  onClick: (enterpriseId: string) => void;
}

export const EnterpriseCard = ({
  id,
  alt,
  name,
  imgBase64,
  onClick,
}: IEnterpriseCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => onClick(id)}>
        {imgBase64 && (
          <CardMedia
            component="img"
            // height="194"
            image={imgBase64}
            alt={alt}
          />
        )}
        <CardContent>
          <Typography variant="body2" color="text.secondary" fontWeight="bold">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
