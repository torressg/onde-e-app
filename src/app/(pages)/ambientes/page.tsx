"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import correto para o app directory
import BurgerMenu from "@/app/components/BurgerMenu";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Checkbox,
  CheckboxGroup,
  VStack,
  Spinner,
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
  const [filteredAmbientes, setFilteredAmbientes] = useState<Ambiente[]>([]);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmbiente, setSelectedAmbiente] = useState<Ambiente | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const loadAmbientes = async () => {
      setLoading(true); // Ativa o loading enquanto os dados são carregados
      try {
        const data = await fetchAmbientes();
        const verifyData = data.filter(
          (i: any) => i.nome !== "NADA" && i.nome.trim() !== ""
        );
        setAmbientes(verifyData);
        setFilteredAmbientes(verifyData); // Armazena todos os ambientes
      } catch (error) {
        console.error("Erro ao carregar ambientes:", error);
      } finally {
        setLoading(false); // Desativa o loading após o carregamento
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

  const aplicarFiltro = (onClose: () => void) => {
    if (filtrosSelecionados.length === 0) {
      setFilteredAmbientes(ambientes);
    } else {
      const ambientesFiltrados = ambientes.filter((ambiente) =>
        filtrosSelecionados.includes(ambiente.tipo_ambiente)
      );
      setFilteredAmbientes(ambientesFiltrados);
    }
    onClose();
  };

  const redefinirFiltro = () => {
    setFiltrosSelecionados([]);
    setFilteredAmbientes(ambientes);
  };

  const handleGoToMain = (nomeAmbiente: string) => {
    router.push(`/?ambiente=${encodeURIComponent(nomeAmbiente)}`);
  };

  return (
    <>
      <div className="bg-ambientBG min-h-screen">
        <header className="pt-4">
          <div className="fixed ml-4 z-50">
            <BurgerMenu />
          </div>
          <div className="mt-16 px-4 pb-4 inline-flex font-bold justify-between w-full">
            <h2 className="text-2xl text-branco">Ambientes</h2>
            <Menu>
              {({ onClose }) => (
                <>
                  <MenuButton
                    as={IconButton}
                    icon={<FilterAltOutlinedIcon />}
                    color={"#FCA311"}
                    background={"#1c1c1c"}
                    _hover={{ bg: "#F78900", color: "#1c1c1c" }}
                    _active={{ bg: "#FCA311", color: "#1c1c1c" }}
                    width={"32px"}
                    height={"32px"}
                  />
                  <MenuList background={"#1c1c1c"} borderColor={"#FCA311"}>
                    <VStack align="start" px={4} py={2}>
                      <h3 className="text-lg font-bold mb-2">Filtrar por:</h3>
                      <CheckboxGroup
                        value={filtrosSelecionados}
                        onChange={(val) => setFiltrosSelecionados(val as string[])}
                      >
                        <Checkbox value="Sala de Aula" colorScheme="customOrange">
                          Salas
                        </Checkbox>
                        <Checkbox value="Laboratório" colorScheme="customOrange">
                          Laboratórios
                        </Checkbox>
                        <Checkbox value="Ambiente Comum" colorScheme="customOrange">
                          Ambiente Comum
                        </Checkbox>
                      </CheckboxGroup>
                      <Button
                        onClick={() => aplicarFiltro(onClose)}
                        bg="#FCA311"
                        color="black"
                        size="sm"
                        width="100%"
                        mt={2}
                        _hover={{ bg: "#F78900" }}
                      >
                        Aplicar Filtro
                      </Button>
                      <Button
                        onClick={() => {
                          redefinirFiltro();
                          onClose();
                        }}
                        colorScheme="gray"
                        size="sm"
                        width="100%"
                      >
                        Redefinir Filtro
                      </Button>
                    </VStack>
                  </MenuList>
                </>
              )}
            </Menu>
          </div>
        </header>
        <hr className="text-laranja py-5" />
        <div className="grid justify-center space-y-5 pb-10">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner size="xl" color="#FCA311" />
            </div>
          ) : (
            filteredAmbientes
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
              ))
          )}
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
            p={4}
          >
            <ModalHeader fontSize="lg" fontWeight="bold">
              {selectedAmbiente?.nome}
              <p className="text-subtitulo text-sm font-normal mt-1">
                {selectedAmbiente?.tipo_ambiente}
              </p>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
                bg="#FCA311"
                color="#1c1c1c"
                onClick={() => handleGoToMain(selectedAmbiente?.nome || '')} // Redireciona ao clicar
                _hover={{ bg: "#F78900" }}
                borderRadius="md"
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

export default AmbientesPage;
