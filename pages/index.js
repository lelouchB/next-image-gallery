//pages/index.js
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Container,
  Text,
  Wrap,
  WrapItem,
  Input,
  IconButton,
  InputRightElement,
  InputGroup,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { getCuratedPhotos, getQueryPhotos } from "../lib/api";

export default function Home({ data }) {
  const [photos, setPhotos] = useState(data);
  const [query, setQuery] = useState("");
  const toast = useToast();
  const handleSubmit = async (e) => {
    await e.preventDefault();
    if (query == "") {
      toast({
        title: "Error.",
        description: "Empty Search",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } else {
      const res = await getQueryPhotos(query);
      await setPhotos(res);
      await setQuery("");
    }
  };

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
          <form onSubmit={handleSubmit}>
            <InputGroup pb="1rem">
              <Input
                placeholder="Search for Apple"
                variant="ghost"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <InputRightElement
                children={
                  <IconButton
                    aria-label="Search"
                    icon={<SearchIcon />}
                    bg="pink.400"
                    color="white"
                    onClick={handleSubmit}
                  />
                }
              />
            </InputGroup>
          </form>
        </Container>
        <Wrap px="1rem" spacing={4} justify="center">
          {photos.map((pic) => (
            <WrapItem
              key={pic.id}
              boxShadow="base"
              rounded="20px"
              overflow="hidden"
              bg="white"
              lineHeight="0"
              _hover={{ boxShadow: "dark-lg" }}
            >
              <Link href={`/photos/${pic.id}`}>
                <a>
                  <Image
                    src={pic.src.portrait}
                    height={600}
                    width={400}
                    alt={pic.url}
                  />
                </a>
              </Link>
            </WrapItem>
          ))}
        </Wrap>
        <Flex my="1rem" justify="center" align="center" direction="column">
          <a target="_blank" href="https://www.pexels.com">
            <Image
              src="https://images.pexels.com/lib/api/pexels.png"
              height={50}
              width={125}
            />
          </a>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by
            <Image
              src="/vercel.svg"
              width={283 / 4}
              height={64 / 4}
              alt="Vercel Logo"
            />
          </a>
        </Flex>
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
