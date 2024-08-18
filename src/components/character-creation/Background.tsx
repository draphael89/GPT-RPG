import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  VStack, 
  Heading, 
  FormControl, 
  FormLabel, 
  Input, 
  Textarea, 
  Text, 
  Box, 
  SimpleGrid,
  Tooltip
} from "@chakra-ui/react";
import { InfoIcon } from '@chakra-ui/icons';
import { RootState } from '../../lib/store';
import { updateBackground, Background } from '../../lib/characterSlice';

interface BackgroundOption {
  name: string;
  description: string;
}

const backgroundOptions: BackgroundOption[] = [
  { name: 'Acolyte', description: 'You have spent your life in service to a temple.' },
  { name: 'Charlatan', description: 'You have always had a way with people, and made your living by swindling them.' },
  { name: 'Criminal', description: 'You are an experienced criminal with a history of breaking the law.' },
  { name: 'Entertainer', description: 'You thrive in front of an audience, and know how to captivate them.' },
  { name: 'Folk Hero', description: 'You come from a humble background, but are destined for so much more.' },
  { name: 'Guild Artisan', description: 'You are a member of an artisan\'s guild, skilled in a particular field.' },
  { name: 'Hermit', description: 'You lived in seclusion for a formative part of your life.' },
  { name: 'Noble', description: 'You understand wealth, power, and privilege.' },
  { name: 'Outlander', description: 'You grew up in the wilds, far from civilization.' },
  { name: 'Sage', description: 'You spent years learning the lore of the multiverse.' },
  { name: 'Sailor', description: 'You sailed on a seagoing vessel for years.' },
  { name: 'Soldier', description: 'You were a soldier in an army, militia, or mercenary company.' },
  { name: 'Urchin', description: 'You grew up on the streets alone, orphaned and poor.' },
];

const BackgroundComponent: React.FC = () => {
  const dispatch = useDispatch();
  const character = useSelector((state: RootState) => state.character);

  const handleBackgroundChange = (field: keyof Background, value: string | string[]) => {
    dispatch(updateBackground({ field, value }));
  };

  return (
    <VStack spacing={6} align="stretch" bg="parchment.100" p={6} borderRadius="lg" boxShadow="md">
      <Heading as="h2" size="lg" color="brand.700">Character Background</Heading>
      <Text>Your character&apos;s background reveals where you came from, how you became an adventurer, and your place in the world.</Text>
      
      <FormControl>
        <FormLabel htmlFor="backgroundName">Background</FormLabel>
        <Input
          id="backgroundName"
          value={character.background.name}
          onChange={(e) => handleBackgroundChange('name', e.target.value)}
          placeholder="Select or enter a background"
          list="background-options"
          bg="white"
        />
        <datalist id="background-options">
          {backgroundOptions.map(option => (
            <option key={option.name} value={option.name} />
          ))}
        </datalist>
      </FormControl>

      {character.background.name && (
        <Text fontSize="sm" fontStyle="italic">
          {backgroundOptions.find(bg => bg.name === character.background.name)?.description || 'Custom background'}
        </Text>
      )}

      <SimpleGrid columns={[1, null, 2]} spacing={4}>
        <Box>
          <FormControl>
            <FormLabel htmlFor="personalityTraits">
              Personality Traits
              <Tooltip label="Characteristics that define your character's behavior and attitude" placement="top">
                <InfoIcon ml={2} color="brand.500" />
              </Tooltip>
            </FormLabel>
            <Textarea
              id="personalityTraits"
              value={character.background.personalityTraits.join('\n')}
              onChange={(e) => handleBackgroundChange('personalityTraits', e.target.value.split('\n').filter(Boolean))}
              placeholder="Enter personality traits (one per line)"
              rows={3}
              bg="white"
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel htmlFor="ideals">
              Ideals
              <Tooltip label="The principles and beliefs that drive your character" placement="top">
                <InfoIcon ml={2} color="brand.500" />
              </Tooltip>
            </FormLabel>
            <Textarea
              id="ideals"
              value={character.background.ideals.join('\n')}
              onChange={(e) => handleBackgroundChange('ideals', e.target.value.split('\n').filter(Boolean))}
              placeholder="Enter ideals (one per line)"
              rows={3}
              bg="white"
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel htmlFor="bonds">
              Bonds
              <Tooltip label="Connections to people, places, or events in the world" placement="top">
                <InfoIcon ml={2} color="brand.500" />
              </Tooltip>
            </FormLabel>
            <Textarea
              id="bonds"
              value={character.background.bonds.join('\n')}
              onChange={(e) => handleBackgroundChange('bonds', e.target.value.split('\n').filter(Boolean))}
              placeholder="Enter bonds (one per line)"
              rows={3}
              bg="white"
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel htmlFor="flaws">
              Flaws
              <Tooltip label="Character weaknesses or vices that can be exploited" placement="top">
                <InfoIcon ml={2} color="brand.500" />
              </Tooltip>
            </FormLabel>
            <Textarea
              id="flaws"
              value={character.background.flaws.join('\n')}
              onChange={(e) => handleBackgroundChange('flaws', e.target.value.split('\n').filter(Boolean))}
              placeholder="Enter flaws (one per line)"
              rows={3}
              bg="white"
            />
          </FormControl>
        </Box>
      </SimpleGrid>
    </VStack>
  );
};

export default BackgroundComponent;