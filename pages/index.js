//pages/index.js
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Box, Container, Text } from "@chakra-ui/core";
import { getCuratedPhotos } from "../lib/api";

export default function Home({ data }) {
  const [photos, setPhotos] = useState(data);
  return (
    <div>
      <Head>
        <title> NextJS Image Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box overflow="hidden" bg="purple.100" minH="100vh">
        <Container>
          <Text
            color="pink.800"
            fontWeight="semibold"
            mb="1rem"
            textAlign="center"
            textDecoration="underline"
            fontSize={["4xl", "4xl", "5xl", "5xl"]}
          >
            NextJS Image Gallery
          </Text>
        </Container>
        {
  photos.map((pic) => (
    <Image
      src={pic.src.portrait}
      height={600}
      width={400}
      alt={pic.url}
    />
  ))
}

      </Box>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getCuratedPhotos();
  return {
    props: {
      data,
    },
  };
}
