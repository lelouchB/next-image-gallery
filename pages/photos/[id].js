import { getPhotoById } from "../../lib/api";
import {
  Box,
  Divider,
  Center,
  Text,
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { InfoIcon, AtSignIcon } from "@chakra-ui/icons";
export default function Photos({ pic }) {  
  return (
      <Box p="2rem" bg="gray.200" minH="100vh">
      <Head>
        <title> Image: {pic.id}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <Flex px="1rem" justify="center" align="center">
        <Text
          letterSpacing="wide"
          textDecoration="underline"
          as="h2"
          fontWeight="semibold"
          fontSize="xl"
          as="a"
          target="_blank"
          href={pic.photographer_url}
        >
          <AtSignIcon />
          {pic.photographer}
        </Text>
        <Spacer />
        <Box as="a" target="_blank" href={pic.url}>
          <InfoIcon focusable="true" boxSize="2rem" color="red.500" />{" "}
        </Box>{" "}
        <Spacer />
        <Link href={`/`} >
        <Button
          as="a"
          borderRadius="full"
          colorScheme="pink"
          fontSize="lg"
          size="lg"
          cursor="pointer"
        >
          🏠 Home
        </Button>
        </Link>
      </Flex>
      <Divider my="1rem" />
    
      <Center>
        <Box as="a" target="_blank" href={pic.url}>
          <Image
            src={pic.src.original}
            width={pic.width / 4}
            height={pic.height / 4}
            quality={50}
            priority
            loading="eager"
          />
        </Box>
      </Center>
    </Box>
    
  );
}

export async function getServerSideProps({ params }) {
  const pic = await getPhotoById(params.id);
  return {
    props: {
      pic,
    },
  };
}
