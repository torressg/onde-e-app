import BurgerMenu from "@/app/components/BurgerMenu";
import React from "react";

const Contato = () => {
  return (
    <>
      <div className=" bg-ambientBG min-h-screen">
        <header className="pt-4">
          <div className="fixed ml-4 z-50">
            <BurgerMenu />
          </div>
          <div className="mt-16 px-4 pb-4 inline-flex font-bold justify-between w-full">
            <h2 className="text-2xl text-branco">Contato</h2>
          </div>
        </header>
        <hr className="text-laranja py-5" />
      </div>
    </>
  );
};

export default Contato;
