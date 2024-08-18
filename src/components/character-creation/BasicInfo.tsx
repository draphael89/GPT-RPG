import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  VStack, 
  FormControl, 
  FormLabel, 
  Input, 
  Select, 
  Text, 
  Box, 
  Image, 
  Grid, 
  GridItem 
} from "@chakra-ui/react";
import { RootState } from '../../lib/store';
import { updateCharacterInfo } from '../../lib/characterSlice';

const races = [
  { value: 'Human', description: 'Versatile and adaptable, humans are the most common race in many worlds.' },
  { value: 'Elf', description: 'Graceful and long-lived, elves are known for their magic and connection to nature.' },
  { value: 'Dwarf', description: 'Stout and hardy, dwarves are skilled craftsmen and formidable warriors.' },
  { value: 'Halfling', description: 'Small but brave, halflings are known for their luck and stealth.' },
];

const classes = [
  { value: 'Fighter', description: 'Masters of martial combat, skilled with a variety of weapons and armor.' },
  { value: 'Wizard', description: 'Scholarly magic-users capable of manipulating the structures of reality.' },
  { value: 'Rogue', description: 'Skilled tricksters and stealthy operators, masters of subterfuge.' },
  { value: 'Cleric', description: 'Priestly champions who wield divine magic in service of a higher power.' },
];

const BasicInfo: React.FC = () => {
  const dispatch = useDispatch();
  const character = useSelector((state: RootState) => state.character);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch(updateCharacterInfo({ [e.target.name]: e.target.value }));
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box borderWidth={1} borderRadius="lg" p={4} bg="parchment.100">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>Basic Information</Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel htmlFor="name">Character Name</FormLabel>
              <Input
                id="name"
                name="name"
                value={character.name}
                onChange={handleInputChange}
                placeholder="Enter character name"
                bg="white"
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel htmlFor="race">Race</FormLabel>
              <Select
                id="race"
                name="race"
                value={character.race}
                onChange={handleInputChange}
                placeholder="Select race"
                bg="white"
              >
                {races.map(race => (
                  <option key={race.value} value={race.value}>{race.value}</option>
                ))}
              </Select>
            </FormControl>
            {character.race && (
              <Text mt={2} fontSize="sm">
                {races.find(r => r.value === character.race)?.description}
              </Text>
            )}
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel htmlFor="class">Class</FormLabel>
              <Select
                id="class"
                name="class"
                value={character.class}
                onChange={handleInputChange}
                placeholder="Select class"
                bg="white"
              >
                {classes.map(cls => (
                  <option key={cls.value} value={cls.value}>{cls.value}</option>
                ))}
              </Select>
            </FormControl>
            {character.class && (
              <Text mt={2} fontSize="sm">
                {classes.find(c => c.value === character.class)?.description}
              </Text>
            )}
          </GridItem>
        </Grid>
      </Box>
      {character.race && character.class && (
        <Box borderWidth={1} borderRadius="lg" p={4} bg="parchment.100">
          <Image 
            src={`/images/${character.race.toLowerCase()}_${character.class.toLowerCase()}.jpg`} 
            alt={`${character.race} ${character.class}`}
            borderRadius="md"
            fallbackSrc="/images/placeholder_character.jpg"
          />
        </Box>
      )}
    </VStack>
  );
};

export default BasicInfo;