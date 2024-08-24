"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ChakraProvider>
      <Box position="relative" zIndex="50">
        <Button
          as={IconButton}
          onClick={toggleMenu}
          icon={<HamburgerIcon boxSize={6}/>}
          w="10"
          h="10"
          color="#F8A801"
          bg="#1c1c1c"
          _hover={{ bg: "#F8A801", color: "#1C1C1C" }}
        />

        <Box
          position="fixed"
          top="0"
          left="0"
          w="full"
          h="100vh"
          bg="black"
          transform={isOpen ? "translateX(0)" : "translateX(-100%)"}
          transition="transform 0.3s ease-in-out"
        >
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            h="full"
          >
            <Link
              href="#"
              color="#F8A801"
              fontSize="2xl"
              fontWeight="semibold"
              p="4"
            >
              Home
            </Link>
            <Link
              href="#"
              color="#F8A801"
              fontSize="2xl"
              fontWeight="semibold"
              p="4"
            >
              Ambientes
            </Link>
            <Link
              href="#"
              color="#F8A801"
              fontSize="2xl"
              fontWeight="semibold"
              p="4"
            >
              Contato
            </Link>
            <Button
              onClick={toggleMenu}
              color="#F8A801"
              fontSize="2xl"
              fontWeight="semibold"
              p="8"
              bg="transparent"
              _hover={{ textDecoration: "underline" }}
              _active={{ background: "transparent" }}
            >
              Fechar
            </Button>
          </Flex>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default BurgerMenu;