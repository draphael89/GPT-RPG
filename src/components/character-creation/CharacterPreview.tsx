import React from 'react';
import { 
  Box, 
  VStack, 
  Text, 
  Heading, 
  Grid, 
  GridItem, 
  Badge, 
  Divider,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { CharacterState } from '../../lib/characterSlice';
import { EquipmentItem, EquipmentType } from '../../types/equipment';

interface CharacterPreviewProps {
  character: CharacterState;
}

const CharacterPreview: React.FC<CharacterPreviewProps> = ({ character }) => {
  const getModifier = (value: number) => Math.floor((value - 10) / 2);

  const getAttributeColor = (value: number) => {
    if (value >= 16) return "green.500";
    if (value >= 14) return "blue.500";
    if (value >= 12) return "yellow.500";
    if (value >= 10) return "orange.500";
    return "red.500";
  };

  const getEquipmentTypeColor = (type: EquipmentType) => {
    switch (type) {
      case EquipmentType.Weapon: return 'red';
      case EquipmentType.Armor: return 'blue';
      case EquipmentType.Potion: return 'green';
      case EquipmentType.Scroll: return 'purple';
      case EquipmentType.Wand: return 'pink';
      case EquipmentType.Ring: return 'yellow';
      default: return 'gray';
    }
  };

  return (
    <Box bg="parchment.100" borderRadius="lg" boxShadow="xl" p={6} position="sticky" top="20px">
      <Heading as="h2" size="lg" mb={4} color="brand.700">Character Preview</Heading>
      <VStack align="stretch" spacing={4}>
        <Text fontSize="xl" fontWeight="bold">{character.name || 'Unnamed Character'}</Text>
        <Text>
          <Badge colorScheme="blue" mr={2}>{character.race || 'No Race'}</Badge>
          <Badge colorScheme="green">{character.class || 'No Class'}</Badge>
        </Text>
        
        <Divider />
        
        <Heading as="h3" size="md" color="brand.600">Attributes</Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {Object.entries(character.attributes).map(([attr, value]) => (
            <GridItem key={attr}>
              <Text fontWeight="bold">{attr.charAt(0).toUpperCase() + attr.slice(1)}</Text>
              <Badge colorScheme={getAttributeColor(value)}>{value}</Badge>
              <Text fontSize="sm" color="gray.600">Modifier: {getModifier(value)}</Text>
            </GridItem>
          ))}
        </Grid>
        
        <Divider />
        
        <Heading as="h3" size="md" color="brand.600">Skills</Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          {character.skills.map((skill) => (
            <GridItem key={skill}>
              <Text fontSize="sm">{skill}</Text>
            </GridItem>
          ))}
        </Grid>
        
        <Divider />
        
        <Heading as="h3" size="md" color="brand.600">Background</Heading>
        <Text fontWeight="bold">{character.background.name || 'Not set'}</Text>
        {character.background.personalityTraits.length > 0 && (
          <List spacing={1}>
            <ListItem>
              <ListIcon as={ChevronRightIcon} color="brand.500" />
              <Text as="span" fontWeight="bold">Traits:</Text> {character.background.personalityTraits.join(', ')}
            </ListItem>
            <ListItem>
              <ListIcon as={ChevronRightIcon} color="brand.500" />
              <Text as="span" fontWeight="bold">Ideals:</Text> {character.background.ideals.join(', ')}
            </ListItem>
            <ListItem>
              <ListIcon as={ChevronRightIcon} color="brand.500" />
              <Text as="span" fontWeight="bold">Bonds:</Text> {character.background.bonds.join(', ')}
            </ListItem>
            <ListItem>
              <ListIcon as={ChevronRightIcon} color="brand.500" />
              <Text as="span" fontWeight="bold">Flaws:</Text> {character.background.flaws.join(', ')}
            </ListItem>
          </List>
        )}
        
        <Divider />
        
        <Heading as="h3" size="md" color="brand.600">Equipment</Heading>
        {character.equipment.length > 0 ? (
          <List spacing={1}>
            {character.equipment.map((item: EquipmentItem, index) => (
              <ListItem key={index}>
                <Badge mr={2} colorScheme={getEquipmentTypeColor(item.type)}>{item.type}</Badge>
                {item.name}
              </ListItem>
            ))}
          </List>
        ) : (
          <Text>No equipment selected</Text>
        )}
      </VStack>
    </Box>
  );
};

export default CharacterPreview;