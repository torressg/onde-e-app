import FullScreenMap from "../app/components/Map/index";
import SearchBar from "../app/components/SearchBar/index";
import BurgerMenu from "../app/components/BurgerMenu";
import RecentMenu from "../app/components/RecentMenu";

import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';


const Home: React.FC = () => {
  return (

    <div>
      <header>
        <div className="absolute top-4 left-4 z-50">
          <BurgerMenu />
        </div>
        <div className="absolute top-4 right-4 z-50">
            <RecentMenu />
        </div>
      </header>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 w-80 mb-11">
        <SearchBar />
      </div>
      <FullScreenMap />
    </div>
  );
};

export default Home;