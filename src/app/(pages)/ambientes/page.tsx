"use client";

import React, { useState } from "react";
import Image from 'next/image';
import BurgerMenu from "@/app/components/BurgerMenu";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

interface Ambiente {
  nome: string;
  tipo: string;
}
const sala1 = {
  nome: "Sala 3",
  tipo: "Sala de Aula",
};

const sala2 = {
  nome: "Sala 4",
  tipo: "Sala de Aula",
};

const AmbientePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmbiente, setSelectedAmbiente] = useState<Ambiente | null>(null);

  const openModal = (ambiente: Ambiente) => {
    setSelectedAmbiente(ambiente);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedAmbiente(null);
  };

  let ambientes = [sala1, sala2];

  return (
    <>
      <div className="bg-ambientBG min-h-screen">
        <header className="pt-4">
          <div className="fixed ml-4 z-50">
            <BurgerMenu />
          </div>
          <div className="mt-16 px-4 pb-4 inline-flex font-bold justify-between w-full">
            <h2 className="text-2xl">Ambientes</h2>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<FilterAltOutlinedIcon />}
                color={"#F8A801"}
                background={"transparent"}
                _hover={{ bg: "transparent", color: "#F78900" }}
                width={"32px"}
                height={"32px"}
              />
              <MenuList background={"#1c1c1c"} borderColor={"#F8A801"}>
                <MenuItem background={"#1c1c1c"}>Salas</MenuItem>
                <MenuItem background={"#1c1c1c"}>Laboratórios</MenuItem>
                <MenuItem background={"#1c1c1c"}>Auditórios</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </header>
        <hr className="text-laranja py-5" />
        <div className="grid justify-center space-y-5">
          {ambientes.map((ambiente, index) => (
            <div
              key={index}
              className="bg-cinza w-80 h-14 rounded-2xl drop-shadow-md cursor-pointer"
              onClick={() => openModal(ambiente)}
            >
              <h2 className="px-5 pt-1 text-base">{ambiente.nome}</h2>
              <p className="px-5 text-xs text-subtitulo">{ambiente.tipo}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedAmbiente && (
        <Modal isOpen={isOpen} onClose={closeModal} isCentered>
          <ModalOverlay />
          <ModalContent
            bg="#1c1c1c"
            color="white"
            maxW="75%"
            mx="auto"
            borderRadius="md" // Arredonda as bordas do modal
          >
            <ModalHeader>{selectedAmbiente?.nome}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p className="text-subtitulo">{selectedAmbiente?.tipo}</p>
              <div className="flex justify-center mb-6">
                <Image
                  src="https://via.placeholder.com/200x200"
                  alt="Imagem do ambiente"
                  width={200}
                  height={200}
                  className="rounded-md object-cover"
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <Button
                width="100%"
                bg="#F8A801"
                color="#1c1c1c"
                _hover={{ bg: "#F78900" }}
                borderRadius="md"
              // onClick={handleGoClick} // Função que você deseja executar ao clicar no botão "Ir!"
              >
                Ir!
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default AmbientePage;
