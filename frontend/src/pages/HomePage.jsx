import ProductCard from "@/components/ProductCard";
import { Toaster } from "@/components/ui/toaster";
import container from "@/constents/container";
import { useProductStore } from "@/store/product";
import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(products);
  return (
    <Container maxW={container.xl} py={12}>
      <VStack paddingY={2}>
        <Text
          fontSize={25}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient="linear-gradient({colors.cyan.400}, {colors.blue.500})"
          bgClip={"text"}
        >
          Current Products 🚀
        </Text>
      </VStack>
      {products.length === 0 ? (
        <Text
          fontSize={"lg"}
          textAlign={"center"}
          fontWeight={"bold"}
          color={"gray.500"}
        >
          No products found 😢{" "}
          <Link to={"/create"}>
            {" "}
            <Text
              fontSize={"lg"}
              as={"span"}
              color={"blue.500"}
              _hover={{ textDecoration: "underline" }}
            >
              Create a product
            </Text>{" "}
          </Link>
        </Text>
      ) : (
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </SimpleGrid>
      )}

      <Toaster />
    </Container>
  );
}
