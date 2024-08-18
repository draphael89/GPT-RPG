import React from 'react';
import { Box, Text, VStack, HStack, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface AttributeBoxProps {
  name: string;
  value: number;
  max: number;
}

const AttributeBox: React.FC<AttributeBoxProps> = ({ name, value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <Box borderWidth={2} borderRadius="lg" p={4} borderColor="brand.500" bg="white">
      <VStack spacing={2} align="center">
        <Text fontWeight="bold" fontSize="lg">{name}</Text>
        <HStack spacing={4}>
          <CircularProgress value={percentage} color="brand.500" size="60px">
            <CircularProgressLabel>{value}</CircularProgressLabel>
          </CircularProgress>
          <Text>/ {max}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default AttributeBox;