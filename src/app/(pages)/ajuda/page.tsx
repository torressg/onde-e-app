"use client";

import BurgerMenu from "@/app/components/BurgerMenu";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

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
        <div className="grid space-y-5 pb-10">
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton width="100%">
                  <Box flex="1" textAlign="left" textColor="#fff">
                    Utilizando o Sistema de Rotas
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} textColor="#fff">
                <div className="text-branco">
                  <h3 className="font-bold pb-4">Gerando uma Rota</h3>
                  <p>
                    O usuário será direcionado à tela principal, onde poderá
                    gerar rotas de acordo com sua localização atual:
                  </p>
                  <ol className="pb-4">
                    <li>
                      -Na tela principal, selecione o seu local de origem.
                    </li>
                    <li>-Escolha o destino dentro da barra de pesquisa.</li>
                    <li>-Clique em Gerar Rota.</li>
                    <li>
                      -A rota será exibida com a melhor opção de trajeto e
                      indicações visuais no mapa.
                    </li>
                  </ol>
                </div>
                <div className="text-branco">
                  <h3 className="font-bold pb-4">Modificando a Rota</h3>
                  <p>Se você deseja mudar o destino ou ajustar a rota:</p>
                  <ol className="pb-4">
                    <li>-Clique no ícone de Configurações de Rota.</li>
                    <li>
                      -Selecione um novo destino ou altere o ponto de partida.
                    </li>
                    <li>-Clique em Atualizar Rota.</li>
                  </ol>
                </div>
                <div className="text-branco">
                  <h3 className="font-bold pb-4">
                    Seleção de Ambientes e Filtragem
                  </h3>
                  <p>
                    O aplicativo oferece uma tela dedicada à listagem de todos
                    os ambientes, onde você pode filtrar os locais por categoria
                    para facilitar a navegação:
                  </p>
                  <ol className="pb-4">
                    <li>
                      -Acesse a tela de Ambientes clicando no ícone
                      correspondente no menu principal.
                    </li>
                    <li>
                      -Uma lista de todos os ambientes do térreo será exibida.
                      Para filtrar os ambientes, utilize as seguintes opções:
                      <strong> Salas / Laboratórios / Ambiente comum </strong>
                    </li>
                    <li>
                      -Após selecionar uma das categorias, a lista será
                      atualizada com os ambientes correspondentes.
                    </li>
                    <li>-Escolha o ambiente desejado clicando sobre ele.</li>
                    <li>
                      -Clique em Gerar Rota para que o sistema trace o caminho
                      do seu local atual até o ambiente selecionado.
                    </li>
                  </ol>
                </div>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton width="100%">
                  <Box flex="1" textAlign="left" textColor="#fff">
                    Funcionalidades Extras
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div className="text-branco">
                  <h3 className="font-bold pb-4">Suporte</h3>
                  <p>
                    Caso tenha dúvidas ou encontre dificuldades no uso do
                    aplicativo, você pode acessar a aba de Suporte:
                  </p>
                  <ol className="pb-4">
                    <li>-Clique no ícone de Ajuda no menu principal.</li>
                    <li>
                      -Selecione a opção Ajuda de uso para respostas das
                      perguntas mais frequentes.
                    </li>
                    <li>
                      -Se sua dúvida não for solucionada, clique em Suporte ao
                      usuário e envie uma mensagem com sua dúvida. Você receberá
                      uma resposta em até 24 horas.
                    </li>
                  </ol>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default AjudaPage;
