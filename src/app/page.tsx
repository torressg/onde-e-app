"use client";
import FullScreenMap from "./components/Map";
import SearchBar from "./components/SearchBar/index";
import BurgerMenu from "./components/BurgerMenu";
import RecentMenu from "./components/RecentMenu";
import { calcularCaminhoEGeoJSON } from "@/services/shortest-path";
import { useEffect, useState } from "react";
import { Box, Button, Spinner } from "@chakra-ui/react";

type GeoJsonType = {
  type: string;
  features: Array<{
    type: "Feature";
    properties: {
      message?: string;
      iconSize?: number[];
    };
    geometry: {
      type: "Point" | "LineString";
      coordinates: [number, number] | [number, number][];
    };
  }>;
} | null;

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [geoJson, setGeoJson] = useState<GeoJsonType>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (startNode: string, endNode: string) => {
    setLoading(true);
    try {
      const result = await calcularCaminhoEGeoJSON(startNode, endNode);
      if (result) {
        setGeoJson(result);
      } else {
        setGeoJson(null);
      }
    } catch (error) {
      console.error("Erro ao calcular o caminho:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRoute = () => {
    setGeoJson(null); // Limpa o GeoJSON quando a rota for cancelada
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const ambiente = params.get("ambiente");
      if (ambiente) {
        setInputValue(decodeURIComponent(ambiente));
      }
    }
  }, []);

  return (
    <div>
      <header>
        <div className="fixed top-4 left-4 z-50">
          <BurgerMenu />
        </div>
        <div className="fixed top-4 right-4 z-40">
          <RecentMenu inputValue={inputValue} setInputValue={setInputValue} />
        </div>
      </header>

      {/* Condicional para o botão de Cancelar Rota */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 w-40 mb-24">
        {geoJson && (
          <Button
            onClick={handleCancelRoute}
            colorScheme="red"
            size="md"
            variant="solid"
            boxShadow="md"
            width="100%"
          >
            Cancelar Rota
          </Button>
        )}
      </div>

      {/* Barra de pesquisa */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 w-80 mb-11">
        <SearchBar
          onSearch={handleSearch}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </div>

      {loading && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={1000}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          height="100%"
          width="100%"
        >
          <Spinner size="xl" color="#F8A801" />
          <p className="mt-2 text-white">
            Gerando rota, por favor aguarde...
          </p>
        </Box>
      )}

      <FullScreenMap geoJson={geoJson} />
    </div>
  );
};

export default Home;
