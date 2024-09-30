"use client";

import React, { useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { LocalStorageService } from "@/services/LocalStorageService";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";

const RecentMenu = ({
  inputValue,
  setInputValue,
}: {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [destinations, setDestinations] = useState<string[]>([]);

  useEffect(() => {
    // Carrega os destinos do localStorage
    const storedDestinations = LocalStorageService.getRecentDestinations();
    setDestinations(storedDestinations);
  }, [inputValue]); // Executa toda vez que o inputValue mudar

  // Função para lidar com a seleção de um destino recente
  const handleSelectDestination = (destination: string) => {
    setInputValue(destination); // Atualiza o inputValue no SearchBar
  };

  return (
    <div className="relative z-50">
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Destinos Recentes"
          icon={<AccessTimeIcon />}
          bg="#1C1C1C"
          color="#FCA311"
          _hover={{ bg: "#FCA311", color: "#1C1C1C" }}
          _active={{ bg: "#FCA311", color: "#1C1C1C" }}
        />
        <MenuList
          bg="#1C1C1C"
          position="absolute"
          sx={{
            borderWidth: 0,
          }}
          right={-10}
        >
          <MenuGroup title="Destinos recentes" color="white">
            {destinations.map((item, index) => (
              <MenuItem
                key={index}
                icon={<ShareLocationIcon />}
                bg="#1C1C1C"
                color="white"
                _hover={{ bg: "#FCA311", color: "#1C1C1C" }}
                _focus={{ bg: "#FCA311", color: "#1C1C1C" }}
                onClick={() => handleSelectDestination(item)} // Chama a função ao clicar no item
              >
                {item}
              </MenuItem>
            ))}
          </MenuGroup>
        </MenuList>
      </Menu>
    </div>
  );
};

export default RecentMenu;
