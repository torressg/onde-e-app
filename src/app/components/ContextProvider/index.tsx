"use client";

import { ChakraProvider } from "@chakra-ui/react"

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ChakraProvider>{children}</ChakraProvider>
    )
}

export default ContextProvider