// components/ModalDestino.tsx
"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

interface ModalStartLocationProps {
  isOpen: boolean;
  onClose: () => void;
  destino: string;
  startOptions: string[];
  onConfirm: (startNode: string) => void;
}

const ModalStartLocation: React.FC<ModalStartLocationProps> = ({
  isOpen,
  onClose,
  destino,
  startOptions,
  onConfirm,
}) => {
  const [selectedStartNode, setSelectedStartNode] = useState("Entrada");

  const handleConfirm = () => {
    onConfirm(selectedStartNode);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="#1c1c1c"
        color="white"
        borderRadius="md"
        p={4}
        maxW="80%"
      >
        <ModalHeader fontSize="lg" fontWeight="bold">
          O destino escolhido é {destino}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>Onde você está?</Text>
          <Select
            value={selectedStartNode}
            onChange={(e) => setSelectedStartNode(e.target.value)}
            bg="#1c1c1c"
            color="white"
            borderColor="#FCA311"
            _hover={{ bg: "#2e2e2e" }}
            _focus={{ bg: "#2e2e2e", borderColor: "#FCA311" }}
            _expanded={{ bg: "#1c1c1c" }}
          >
            {startOptions.map((option, index) => (
              <option
                key={index}
                value={option}
                style={{ backgroundColor: "#1c1c1c", color: "white" }}
              >
                {option}
              </option>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="#FCA311"
            color="#1c1c1c"
            onClick={handleConfirm}
            width="100%"
            _hover={{ bg: "#F78900" }}
          >
            Confirmar Rota
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalStartLocation;
