import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  Dialog,
  CloseButton,
  Portal,
  VStack,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useColorModeValue } from "./ui/color-mode";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDeleteSweep } from "react-icons/md";
import { useProductStore } from "@/store/product";
import { toaster, Toaster } from "./ui/toaster";

export default function ProductCard(product) {
  console.log("product", product.product._id);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProducts, updateProduct } = useProductStore();
  const [open, setOpen] = useState(false);
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProducts(pid);

    console.log(success, message);
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
  };

  const [newProduct, setNewProduct] = useState(product.product);

  const handleUpdateProduct = async (pid, newProduct) => {
    console.log("new product", newProduct);
    const updatedProduct = newProduct;
    const { success, message } = await updateProduct(pid, updatedProduct);

    console.log("success", success, message);
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

    setOpen(false);
  };
  return (
    <>
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

        <HStack m={2}>
          <Dialog.Root
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
            placement={"center"}
            motionPreset="slide-in-bottom"
          >
            <Dialog.Trigger asChild>
              <Button bg={"teal"}>
                <Text fontSize={20} color={"black"}>
                  <FaEdit />
                </Text>
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Update Product</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
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
                          setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                          })
                        }
                      />
                    </VStack>
                    <VStack m={4}>
                      <Input
                        placeholder="Product Image URL"
                        name="image"
                        value={newProduct?.image}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            image: e.target.value,
                          })
                        }
                      />
                    </VStack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button
                      onClick={() =>
                        handleUpdateProduct(product.product._id, newProduct)
                      }
                    >
                      Save
                    </Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
          <Button
            bg={"red.400"}
            onClick={() => handleDeleteProduct(product.product._id)}
          >
            <Text fontSize={20} color={"black"}>
              <MdDeleteSweep />
            </Text>
          </Button>
        </HStack>
      </Box>
    </>
  );
}
