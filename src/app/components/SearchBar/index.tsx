"use client";

import React, { useEffect, useState } from "react";
import { LocalStorageService } from "../../../services/LocalStorageService";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { fetchAmbientes } from "@/services/dbAmbientes";
import AutoCompleteList from "./AutoCompleteList";

const SearchBar: React.FC<{
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (startNode: string, endNode: string) => void; // Nova prop para a função de busca
}> = ({ inputValue, setInputValue, onSearch }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [suggestionsList, setSuggestionsList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [startNode, setStartNode] = useState("Entrada"); // Valor fixo para o ponto inicial
  const [endNode, setEndNode] = useState(""); // Novo estado para o ponto final/endNode

  useEffect(() => {
    const loadAmbientes = async () => {
      setLoading(true);
      try {
        const data = await fetchAmbientes();
        const verifyData = data.filter(
          (i: any) => i.nome !== "NADA" && i.nome.trim() !== ""
        );
        const names = verifyData.map((ambiente: any) => ambiente.nome); // Extrai os nomes dos ambientes
        setSuggestionsList(names);
      } catch (error) {
        console.error("Erro ao carregar ambientes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAmbientes();
  }, []);

  // Função combinada para procurar a rota e salvar no localStorage
  const handleCombinedClick = () => {
    if (inputValue.trim()) {
      // Adiciona o novo destino ao localStorage
      LocalStorageService.setRecentDestination(inputValue.trim());
      setInputValue(""); // Limpa o input após enviar
      console.log("Search icon clicked and destination saved");

      // Chama a função de busca com startNode e endNode
      onSearch(startNode, endNode);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setEndNode(value); // Define o valor do input como o endNode

    if (value) {
      const filtered = suggestionsList.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita o comportamento padrão do formulário
      handleCombinedClick(); // Chama a função combinada ao pressionar Enter
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setEndNode(suggestion); // Define a sugestão clicada como o endNode
    setFilteredSuggestions([]); // Remove sugestões após o clique
  };

  return (
    <Box position="relative" width="100%">
      <InputGroup size="md" className="w-80" style={{ zIndex: 1 }}>
        <InputLeftElement pointerEvents="none" height="100%" display="flex">
          <SearchIcon color="#F8A801" w="2rem" h="2rem" pl="0.813rem" />
        </InputLeftElement>
        <Input
          placeholder="Para onde?"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          type="search"
          enterKeyHint="go"
          bg="#1c1c1c"
          borderRadius="30px"
          boxShadow="0 4px 10px rgba(0, 0, 0, 0.3)"
          pl="3rem"
          className="w-80 h-12"
          border="1.5px solid"
          borderColor="#F8A801"
          focusBorderColor="#F8A801"
          _placeholder={{ color: "#474747" }}
          color="white"
        />
        {inputValue && (
          <InputRightElement width="3rem" height="100%" display="flex">
            <div
              onClick={handleCombinedClick} // Aqui chama a função combinada
              style={{ cursor: "pointer" }}
            >
              <ArrowForwardIcon color="#F8A801" w="24px" h="24px" />
            </div>
          </InputRightElement>
        )}
      </InputGroup>
      {filteredSuggestions.length > 0 && (
        <div className="flex justify-center">
          <AutoCompleteList
            suggestions={filteredSuggestions}
            onSelect={handleSuggestionClick}
            className="w-4/5"
          />
        </div>
      )}
    </Box>
  );
};

export default SearchBar;