"use client"

import React, { useState } from 'react';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';

const RecentMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative z-50">
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Destinos Recentes'
                    icon={<AccessTimeIcon />}
                    variant='outline'
                />
                <MenuList>
                    <MenuItem icon={<ShareLocationIcon />}>
                        Sala 1
                    </MenuItem>
                    <MenuItem icon={<ShareLocationIcon />}>
                        Banheiro
                    </MenuItem>
                    <MenuItem icon={<ShareLocationIcon />}>
                        Cantina 1
                    </MenuItem>
                    <MenuItem icon={<ShareLocationIcon />}>
                        Laboratório 2
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
};

export default RecentMenu;