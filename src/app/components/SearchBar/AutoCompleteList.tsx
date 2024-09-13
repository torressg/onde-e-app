import React from "react";
import { List, ListItem, Box } from "@chakra-ui/react";

interface AutoCompleteListProps {
    suggestions: string[];
    onSelect: (suggestion: string) => void;
}

const AutoCompleteList: React.FC<AutoCompleteListProps> = ({
    suggestions,
    onSelect,
}) => {
    return (
        <Box
            bg="#1c1c1c"
            borderRadius="20px"
            maxH="150px"
            overflowY="auto"
            position="absolute"
            top="-160px"
            zIndex="10"
            width="100%"
        >
            <List>
                {suggestions.map((suggestion, index) => (
                    <ListItem
                        key={index}
                        p="2"
                        color="white"
                        cursor="pointer"
                        _hover={{ bg: "#474747" }}
                        onClick={() => onSelect(suggestion)}
                    >
                        {suggestion}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default AutoCompleteList;