import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { IHomeProps } from "@/models/pages/IHomeProps";
import { EnterpriseService } from "@/services/enterprise.service";
import { ImageService } from "@/services/image.service";
import { Typography } from "@mui/material";
import { EnterpriseCard } from "@/components/EnterpriseCard";
import { getImgUrl } from "@/helpers/image.helper";
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export default function Home({ enterprises }: IHomeProps) {
  const router = useRouter();

  const onCardClick = (enterpriseId: string) => {
    router.push(`/loja/${enterpriseId}`);
  };

  return (
    <>
      <Head>
        <title>Ecommerce</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Typography variant="h2">Lojas</Typography>
        {enterprises.map(({ name, imageKey, id }) => (
          <EnterpriseCard
            key={id}
            id={id}
            alt="Logo Empresa"
            imgBase64={getImgUrl(imageKey)}
            name={name}
            onClick={onCardClick}
          />
        ))}
      </main>
    </>
  );
}

// SSG
export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
  const enterpriseService = EnterpriseService.getInstance();

  const enterprises = await enterpriseService.findAll();

  return {
    props: {
      enterprises,
    },
    // revalidate: 60 * 60 * 24, // Props para executar novamente este código. 24 horas
  };
};
