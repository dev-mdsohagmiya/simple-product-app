import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useColorModeValue } from "./ui/color-mode";

export default function ProductCard(product) {
  console.log("product", product.product._id);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={" all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
      m={3}
    >
      <Image
        src={product.product.image}
        alt={product.product.name}
        h={48}
        w="full"
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor}>
          {product.product.price}$
        </Text>
      </Box>

      {/* <HStack m={2}>
        <IconButton _icon={<EditIcon}></IconButton>
      </HStack> */}
    </Box>
  );
}
