import FullScreenMap from "../app/components/Map/index";
import SearchBar from "../app/components/SearchBar/index";

const Home: React.FC = () => {
  return (
    <div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-80 mb-11">
        <SearchBar />
      </div>
      <FullScreenMap />
    </div>
  );
};

export default Home;
