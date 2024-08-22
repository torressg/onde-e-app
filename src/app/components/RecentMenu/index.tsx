"use client"

import React, { useState } from 'react';
import { ChakraProvider, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';

const RecentMenu = () => {

    return (
        <ChakraProvider>
            <div className="relative z-50">
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Destinos Recentes'
                        icon={<AccessTimeIcon />}
                        variant='outline'
                    />
                    <MenuList>
                        <MenuItem icon={<ShareLocationIcon />} command='⌘T'>
                            Sala 1
                        </MenuItem>
                        <MenuItem icon={<ShareLocationIcon />} command='⌘N'>
                            Banheiro
                        </MenuItem>
                        <MenuItem icon={<ShareLocationIcon />} command='⌘⇧N'>
                            Cantina 1
                        </MenuItem>
                        <MenuItem icon={<ShareLocationIcon />} command='⌘O'>
                            Laboratório 2
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </ChakraProvider>
    );
};

export default RecentMenu;