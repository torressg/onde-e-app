"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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
import AmbienteCard from "./AmbienteCard";
import { fetchAmbientes } from "@/services/dbAmbientes";

interface Ambiente {
  nome: string;
  tipo_ambiente: string;
}

const AmbientesPage: React.FC = () => {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [filtro, setFiltro] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmbiente, setSelectedAmbiente] = useState<Ambiente | null>(
    null
  );

  useEffect(() => {
    const loadAmbientes = async () => {
      try {
        const data = await fetchAmbientes();
        const verifyData = data.filter(
          (i: any) => i.nome !== "NADA" && i.nome.trim() !== ""
        );
        setAmbientes(verifyData);
      } catch (error) {
        console.error("Erro ao carregar ambientes:", error);
      }
    };

    loadAmbientes();
  }, []);

  const openModal = (ambiente: Ambiente) => {
    setSelectedAmbiente(ambiente);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedAmbiente(null);
  };

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
                <MenuItem
                  background={"#1c1c1c"}
                  onClick={() => setFiltro("Sala de Aula")}
                >
                  Salas
                </MenuItem>
                <MenuItem
                  background={"#1c1c1c"}
                  onClick={() => setFiltro("Laboratório")}
                >
                  Laboratórios
                </MenuItem>
                <MenuItem
                  background={"#1c1c1c"}
                  onClick={() => setFiltro("Ambiente Comum")}
                >
                  Ambiente Comum
                </MenuItem>
                <MenuItem
                  background={"#1c1c1c"}
                  onClick={() => setFiltro(null)}
                >
                  Todos
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </header>
        <hr className="text-laranja py-5" />
        <div className="grid justify-center space-y-5 pb-10">
          {ambientes
            .filter((ambiente) => !filtro || ambiente.tipo_ambiente === filtro)
            .sort((a, b) =>
              a.nome.localeCompare(b.nome, undefined, { numeric: true })
            )
            .map((ambiente, index) => (
              <AmbienteCard
                key={index}
                nome={ambiente.nome}
                tipo={ambiente.tipo_ambiente}
                onClick={() => openModal(ambiente)}
              />
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
            borderRadius="md"
          >
            <ModalHeader>{selectedAmbiente.nome}</ModalHeader>
            <ModalBody>
              <p>{selectedAmbiente.tipo_ambiente}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                bg="#F8A801"
                color="white"
                _hover={{ bg: "#F78900" }}
                mr={3}
                onClick={closeModal}
              >
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default AmbientesPage;