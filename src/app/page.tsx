"use client";
import FullScreenMap from "./components/Map";
import SearchBar from "./components/SearchBar/index";
import BurgerMenu from "./components/BurgerMenu";
import RecentMenu from "./components/RecentMenu";
import { calcularCaminhoEGeoJSON } from "@/services/shortest-path";
import { useState } from "react";
import { Button } from "@chakra-ui/react";

type GeoJsonType = {
  type: string;
  features: (
    | {
      type: "Feature";
      properties: {
        message: string;
        iconSize: number[];
      };
      geometry: {
        type: "Point";
        coordinates: [number, number];
      };
    }
    | {
      type: "Feature";
      properties: {};
      geometry: {
        type: "LineString";
        coordinates: [number, number][];
      };
    }
  )[];
} | null;

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const [geoJson, setGeoJson] = useState<GeoJsonType>(null);

  const handleSearch = async (startNode: string, endNode: string) => {
    try {
      const result = await calcularCaminhoEGeoJSON(startNode, endNode);
      if (result) {
        setGeoJson(result);
      } else {
        setGeoJson(null);
      }
    } catch (error) {
      console.error("Erro ao calcular o caminho:", error);
    }
  };

  const handleCancelRoute = () => {
    setGeoJson(null);
  };

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

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-40 mb-24">
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

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 w-80 mb-11">
        <SearchBar
          onSearch={handleSearch}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </div>
      <FullScreenMap geoJson={geoJson} />
    </div>
  );
};

export default Home;