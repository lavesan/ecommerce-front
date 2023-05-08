import { Box } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100%"
      flex={1}
    >
      404 not found page
      <Box
        component="a"
        display="none"
        href="https://br.freepik.com/vetores-gratis/design-chamativo-de-adesivos-de-energia_21578652.htm?query=cart%20cartoon#from_view=detail_alsolike"
      >
        Imagem de pikisuperstar no Freepik
      </Box>
    </Box>
  );
};

export default NotFoundPage;
