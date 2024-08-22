"use client"

import React, { useEffect, useState } from 'react';
import { ChakraProvider, IconButton, Menu, MenuButton, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react';
import { LocalStorageService } from '@/services/LocalStorageService';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';

const RecentMenu = ({ inputValue }: {
    inputValue: string;
}) => {
    const [destinations, setDestinations] = useState<string[]>([]);

    useEffect(() => {
        const storedDestinations = LocalStorageService.getRecentDestinations();

        // Verifique se inputValue não está vazio antes de adicionar à lista
        if (inputValue.trim() !== "") {
            setDestinations([...storedDestinations, inputValue]);
        } else {
            setDestinations(storedDestinations);
        }
    }, [inputValue]);

    return (
        <ChakraProvider>
            <div className="relative z-50">
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Destinos Recentes'
                        icon={<AccessTimeIcon />}
                        bg="#1C1C1C" // Cor de fundo do botão
                        color="#FCA311" // Cor do ícone
                        _hover={{ bg: '#FCA311', color: '#1C1C1C' }} // Estilo do botão no hover
                        _active={{ bg: '#FCA311', color: '#1C1C1C' }} // Estilo do botão ao clicar
                    />
                    <MenuList
                        bg="#1C1C1C"
                        position="absolute"
                        right={-10}
                    >
                        <MenuGroup title="Destinos recentes" color="white"> {/* Título do menu */}
                            {destinations?.map((item, index) => {
                                console.log(item)
                                return (
                                    <MenuItem
                                        key={index}
                                        icon={<ShareLocationIcon />}
                                        bg="#1C1C1C"
                                        color="white"
                                        _hover={{ bg: '#FCA311', color: '#1C1C1C' }}
                                        _focus={{ bg: '#FCA311', color: '#1C1C1C' }}
                                    >
                                        {item}
                                    </MenuItem>
                                )
                            })}
                            {/* <MenuItem
                                icon={<ShareLocationIcon />}
                                bg="#1C1C1C"
                                color="white"
                                _hover={{ bg: '#FCA311', color: '#1C1C1C' }}
                                _focus={{ bg: '#FCA311', color: '#1C1C1C' }}
                            >
                                Sala 1
                            </MenuItem>
                            <MenuItem
                                icon={<ShareLocationIcon />}
                                bg="#1C1C1C"
                                color="white"
                                _hover={{ bg: '#FCA311', color: '#1C1C1C' }}
                                _focus={{ bg: '#FCA311', color: '#1C1C1C' }}
                            >
                                Banheiro
                            </MenuItem>
                            <MenuItem
                                icon={<ShareLocationIcon />}
                                bg="#1C1C1C"
                                color="white"
                                _hover={{ bg: '#FCA311', color: '#1C1C1C' }}
                                _focus={{ bg: '#FCA311', color: '#1C1C1C' }}
                            >
                                Cantina 1
                            </MenuItem>
                            <MenuItem
                                icon={<ShareLocationIcon />}
                                bg="#1C1C1C"
                                color="white"
                                _hover={{ bg: '#FCA311', color: '#1C1C1C' }}
                                _focus={{ bg: '#FCA311', color: '#1C1C1C' }}
                            >
                                Laboratório 2
                            </MenuItem> */}
                        </MenuGroup>
                    </MenuList>
                </Menu>
            </div>
        </ChakraProvider >
    );
};

export default RecentMenu;