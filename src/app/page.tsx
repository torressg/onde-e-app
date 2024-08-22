'use client'
import FullScreenMap from "./components/Map/index";
import SearchBar from "./components/SearchBar/index";
import BurgerMenu from "./components/BurgerMenu";
import RecentMenu from "./components/RecentMenu";
import { useState } from "react";

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  return (

    <div>
      <header>
        <div className="absolute top-4 left-4 z-50">
          <BurgerMenu />
        </div>
        <div className="absolute top-4 right-4 z-50">
          <RecentMenu inputValue={inputValue} />
        </div>
      </header>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 w-80 mb-11">
        <SearchBar inputValue={inputValue} setInputValue={setInputValue} />
      </div>
      <FullScreenMap />
    </div>
  );
};

export default Home;