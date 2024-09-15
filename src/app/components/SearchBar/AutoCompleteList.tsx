import React from "react";
import { List, ListItem, Box } from "@chakra-ui/react";

interface AutoCompleteListProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  className: string;
}

const AutoCompleteList: React.FC<AutoCompleteListProps> = ({
  suggestions,
  onSelect,
  className,
}) => {
  return (
    <Box
      bg="#1c1c1c"
      borderRadius="10px 10px 0 0"
      maxH="150px"
      overflowY="auto"
      position="absolute"
      bottom="48px"
      zIndex="10"
      width="100%" 
      boxShadow="0 -4px 10px rgba(0, 0, 0, 0.3)"
      className={`${className}`}
      border="1.5px solid"
      borderColor="#F8A801"
    >
      <List>
        {suggestions.map((suggestion, index) => (
          <ListItem
            key={index}
            p="12px 20px"
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