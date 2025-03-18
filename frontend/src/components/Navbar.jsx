import {
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

import { FaRegPlusSquare } from "react-icons/fa";
import { useColorMode } from "./ui/color-mode";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{
            base: 22,
            sm: 28,
          }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="linear-gradient({colors.cyan.400}, {colors.blue.500})"
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack alignItems={"center"}>
          <Link to={"/create"}>
            <Button variant="outline">
              <Text fontSize={20}>
                <FaRegPlusSquare />
              </Text>
            </Button>
          </Link>
          <Button onClick={toggleColorMode} variant="outline" marginLeft={2}>
            {colorMode === "light" ? (
              <Text fontSize={20}>
                <IoMoon />
              </Text>
            ) : (
              <Text fontSize={20}>
                <LuSun />
              </Text>
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}
