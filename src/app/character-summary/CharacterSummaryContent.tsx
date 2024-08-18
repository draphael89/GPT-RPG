'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Box, VStack, Heading, Text, Button, Grid, GridItem } from "@chakra-ui/react";
import { RootState } from '../../lib/store';
import { Attributes } from '../../lib/characterSlice';
import AttributeBox from '../../components/character-creation/AttributeBox';

const AttributesList: React.FC<{ attributes: Attributes }> = ({ attributes }) => (
  <Grid templateColumns="repeat(3, 1fr)" gap={4}>
    {Object.entries(attributes).map(([attr, value]) => (
      <GridItem key={attr}>
        <AttributeBox name={attr} value={value} max={20} />
      </GridItem>
    ))}
  </Grid>
);

const CharacterSummaryContent: React.FC = () => {
  const character = useSelector((state: RootState) => state.character);
  const router = useRouter();

  return (
    <VStack spacing={6} align="stretch" maxW="2xl" mx="auto">
      <Heading as="h1" size="2xl" textAlign="center" color="brand.700">Character Summary</Heading>
      <Box bg="white" shadow="md" borderRadius="lg" p={6}>
        <Heading as="h2" size="xl" mb={4} color="brand.500">{character.name}</Heading>
        <Text><strong>Race:</strong> {character.race}</Text>
        <Text><strong>Class:</strong> {character.class}</Text>
        <Heading as="h3" size="lg" mt={6} mb={3} color="brand.600">Attributes</Heading>
        <AttributesList attributes={character.attributes} />
        <Heading as="h3" size="lg" mt={6} mb={3} color="brand.600">Skills</Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {Array.from(character.skills).map((skill: string) => (
            <Text key={skill}>{skill}</Text>
          ))}
        </Grid>
        <Heading as="h3" size="lg" mt={6} mb={3} color="brand.600">Background</Heading>
        <Text><strong>Name:</strong> {character.background.name}</Text>
        <Text><strong>Personality Traits:</strong> {character.background.personalityTraits.join(', ')}</Text>
        <Text><strong>Ideals:</strong> {character.background.ideals.join(', ')}</Text>
        <Text><strong>Bonds:</strong> {character.background.bonds.join(', ')}</Text>
        <Text><strong>Flaws:</strong> {character.background.flaws.join(', ')}</Text>
      </Box>
      <Button
        onClick={() => router.push('/game')}
        colorScheme="brand"
        size="lg"
        width="full"
      >
        Start Your Adventure
      </Button>
    </VStack>
  );
};

export default CharacterSummaryContent;