import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { updateAttribute } from '../../lib/characterSlice';
import { VStack, HStack, Text, Button, Box, Tooltip, Progress } from "@chakra-ui/react";
import { InfoIcon } from '@chakra-ui/icons';

interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

const attributeDescriptions = {
  strength: "Measures physical power and carrying capacity",
  dexterity: "Measures agility, reflexes, and balance",
  constitution: "Measures endurance, stamina, and health",
  intelligence: "Measures reasoning and memory",
  wisdom: "Measures perception and insight",
  charisma: "Measures force of personality and leadership",
};

const Attributes: React.FC = () => {
  const dispatch = useDispatch();
  const character = useSelector((state: RootState) => state.character);

  const handleAttributeChange = (attribute: keyof Attributes, change: number) => {
    const newValue = character.attributes[attribute] + change;
    if (newValue >= 8 && newValue <= 15 && character.attributePoints - change >= 0) {
      dispatch(updateAttribute({ attribute, value: newValue }));
    }
  };

  const getModifier = (value: number) => Math.floor((value - 10) / 2);

  return (
    <VStack spacing={6} align="stretch" bg="parchment.100" p={6} borderRadius="lg" boxShadow="md">
      <Text fontSize="2xl" fontWeight="bold" color="brand.700">Attributes</Text>
      <Text>Points remaining: {character.attributePoints}</Text>
      <VStack spacing={4} align="stretch">
        {(Object.entries(character.attributes) as [keyof Attributes, number][]).map(([attr, value]) => (
          <Box key={attr} borderWidth={1} borderRadius="md" p={4} bg="white">
            <HStack justifyContent="space-between">
              <HStack>
                <Text fontWeight="bold">{attr.charAt(0).toUpperCase() + attr.slice(1)}</Text>
                <Tooltip label={attributeDescriptions[attr]}>
                  <InfoIcon color="brand.500" />
                </Tooltip>
              </HStack>
              <HStack>
                <Button size="sm" onClick={() => handleAttributeChange(attr, -1)} isDisabled={value <= 8}>-</Button>
                <Text fontWeight="bold">{value}</Text>
                <Button size="sm" onClick={() => handleAttributeChange(attr, 1)} isDisabled={value >= 15 || character.attributePoints <= 0}>+</Button>
              </HStack>
            </HStack>
            <Progress value={(value - 8) * 100 / 7} colorScheme="brand" mt={2} />
            <Text mt={2} fontSize="sm" color="gray.600">Modifier: {getModifier(value)}</Text>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default Attributes;