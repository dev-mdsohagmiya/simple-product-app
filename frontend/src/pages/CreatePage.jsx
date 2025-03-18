import container from "../constents/container";
import { useColorModeValue } from "../components/ui/color-mode";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product.js";
import { Toaster, toaster } from "@/components/ui/toaster";
useColorModeValue;
export default function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };
  return (
    <Container maxW={container.sm}>
      <VStack marginY={10}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack m={4}>
            <Input
              placeholder="Product Name"
              name="name"
              variant="outline"
              value={newProduct?.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </VStack>
          <VStack m={4}>
            <Input
              placeholder="Product Price"
              name="price"
              type="number"
              variant="outline"
              value={newProduct?.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
          </VStack>
          <VStack m={4}>
            <Input
              placeholder="Product Image URL"
              name="image"
              value={newProduct?.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
          </VStack>

          <VStack m={4}>
            <Button onClick={handleAddProduct} w={"full"} colorPalette={"cyan"}>
              <Text>Add Product</Text>
            </Button>
          </VStack>
        </Box>
      </VStack>
      <Toaster />
    </Container>
  );
}
