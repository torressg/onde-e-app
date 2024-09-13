"use client"

import BurgerMenu from "@/app/components/BurgerMenu";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Contato = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setError("");

    alert("Email enviado com sucesso!");

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <>
      <div className="bg-ambientBG min-h-screen">
        <header className="pt-4">
          <div className="fixed ml-4 z-50">
            <BurgerMenu />
          </div>
          <div className="mt-16 px-4 pb-4 inline-flex font-bold justify-between w-full">
            <h2 className="text-2xl text-branco">Suporte ao usuário</h2>
          </div>
        </header>
        <hr className="py-5 border-laranja" />
        <div className="grid justify-center space-y-5 pb-10">
          <form onSubmit={handleSubmit}>
            <VStack color="white" spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Nome</FormLabel>
                <Input
                  borderColor={"#F8A801"}
                  color="white"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  borderColor={"#F8A801"}
                  color="white"
                  placeholder="Seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="subject" isRequired>
                <FormLabel>Assunto</FormLabel>
                <Input
                  borderColor={"#F8A801"}
                  color="white"
                  placeholder="Assunto"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </FormControl>

              <FormControl id="message" isRequired>
                <FormLabel>Mensagem</FormLabel>
                <Textarea
                  borderColor={"#F8A801"}
                  color="white"
                  placeholder="Sua mensagem"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FormControl>

              <Button bg={"#F8A801"} type="submit">
                Enviar
              </Button>
            </VStack>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contato;
