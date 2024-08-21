import React from "react";
import BurgerMenu from "../components/BurgerMenu/index"; // Certifique-se de que o caminho esteja correto

const TestBurger: React.FC = () => {
    return (
        <div className="relative">
            <div>
                <BurgerMenu />
            </div>
        </div>
    );
};

export default TestBurger;
