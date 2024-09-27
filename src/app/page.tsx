"use client";
import FullScreenMap from "./components/Map"
import SearchBar from "./components/SearchBar/index";
import BurgerMenu from "./components/BurgerMenu";
import RecentMenu from "./components/RecentMenu";
import { calcularCaminhoEGeoJSON } from "@/services/shortest-path";
import { useState } from "react";

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  type GeoJsonType = {
    type: string;
    features: {
      type: string;
      geometry: {
        type: string;
        properties: {};
        coordinates: any[];
      };
    }[];
  } | null;

  const [geoJson, setGeoJson] = useState<GeoJsonType>(null);

  const handleSearch = async (startNode: string, endNode: string) => {
    try {
      const result = await calcularCaminhoEGeoJSON(startNode, endNode);
      if (result) {
        setGeoJson(result); // Atualiza o estado com o GeoJSON se result existir
      } else {
        setGeoJson(null); // Se o result for undefined ou null, define null
      }
    } catch (error) {
      console.error('Erro ao calcular o caminho:', error);
    }
  };

  return (
    <div>
      <header>
        <div className="fixed top-4 left-4 z-50">
          <BurgerMenu />
        </div>
        <div className="fixed top-4 right-4 z-40">
          <RecentMenu inputValue={inputValue} />
        </div>
      </header>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 w-80 mb-11">
        <SearchBar onSearch={handleSearch} inputValue={inputValue} setInputValue={setInputValue} />
      </div>
      <FullScreenMap geoJson={geoJson} />
    </div>
  );
};

export default Home;