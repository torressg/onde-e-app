"use client";

import BurgerMenu from "@/app/components/BurgerMenu";
import React, { useEffect, useState } from "react";

const AjudaPage: React.FC = () => {
  return (
    <>
      <div className="bg-ambientBG min-h-screen">
        <header className="pt-4">
          <div className="fixed ml-4 z-50">
            <BurgerMenu />
          </div>
          <div className="mt-16 px-4 pb-4 inline-flex font-bold justify-between w-full">
            <h2 className="text-2xl text-branco">Ajuda de uso</h2>
          </div>
        </header>
        <hr className="py-5 border-laranja" />
        <div className="grid justify-center space-y-5 pb-10">
          
        </div>
      </div>
    </>
  );
};

export default AjudaPage;
