import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  VStack, 
  Heading, 
  SimpleGrid, 
  Checkbox, 
  Text, 
  Box, 
  Tooltip, 
  HStack,
  Badge
} from "@chakra-ui/react";
import { InfoIcon } from '@chakra-ui/icons';
import { RootState } from '../../lib/store';
import { addSkill, removeSkill } from '../../lib/characterSlice';

interface Skill {
  name: string;
  attribute: string;
  description: string;
}

const skillList: Skill[] = [
  { name: 'Acrobatics', attribute: 'Dexterity', description: 'Your ability to stay on your feet in tricky situations.' },
  { name: 'Animal Handling', attribute: 'Wisdom', description: 'Your ability to calm down a domesticated animal or intuit an animal\'s intentions.' },
  { name: 'Arcana', attribute: 'Intelligence', description: 'Your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes.' },
  { name: 'Athletics', attribute: 'Strength', description: 'Your ability in difficult situations while climbing, jumping, or swimming.' },
  { name: 'Deception', attribute: 'Charisma', description: 'Your ability to convincingly hide the truth, either verbally or through your actions.' },
  { name: 'History', attribute: 'Intelligence', description: 'Your ability to recall lore about historical events, legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations.' },
  { name: 'Insight', attribute: 'Wisdom', description: 'Your ability to determine the true intentions of a creature.' },
  { name: 'Intimidation', attribute: 'Charisma', description: 'Your ability to influence someone through overt threats, hostile actions, and physical violence.' },
  { name: 'Investigation', attribute: 'Intelligence', description: 'Your ability to look around for clues and make deductions based on those clues.' },
  { name: 'Medicine', attribute: 'Wisdom', description: 'Your ability to stabilize a dying companion or diagnose an illness.' },
  { name: 'Nature', attribute: 'Intelligence', description: 'Your ability to recall lore about terrain, plants and animals, the weather, and natural cycles.' },
  { name: 'Perception', attribute: 'Wisdom', description: 'Your ability to spot, hear, or otherwise detect the presence of something.' },
  { name: 'Performance', attribute: 'Charisma', description: 'Your ability to delight an audience with music, dance, acting, storytelling, or some other form of entertainment.' },
  { name: 'Persuasion', attribute: 'Charisma', description: 'Your ability to influence someone or a group of people with tact, social graces, or good nature.' },
  { name: 'Religion', attribute: 'Intelligence', description: 'Your ability to recall lore about deities, rites and prayers, religious hierarchies, holy symbols, and the practices of secret cults.' },
  { name: 'Sleight of Hand', attribute: 'Dexterity', description: 'Your ability to perform acts of legerdemain or manual trickery, such as planting something on someone else or concealing an object on your person.' },
  { name: 'Stealth', attribute: 'Dexterity', description: 'Your ability to conceal yourself from enemies, slink past guards, slip away without being noticed, or sneak up on someone without being seen or heard.' },
  { name: 'Survival', attribute: 'Wisdom', description: 'Your ability to follow tracks, hunt wild game, guide your group through frozen wastelands, identify signs that owlbears live nearby, predict the weather, or avoid quicksand and other natural hazards.' },
];

const Skills: React.FC = () => {
  const dispatch = useDispatch();
  const character = useSelector((state: RootState) => state.character);

  const handleSkillToggle = (skill: string) => {
    if (character.skills.includes(skill)) {
      dispatch(removeSkill(skill));
    } else {
      dispatch(addSkill(skill));
    }
  };

  const getAttributeColor = (attribute: string) => {
    switch (attribute) {
      case 'Strength': return 'red.500';
      case 'Dexterity': return 'green.500';
      case 'Constitution': return 'orange.500';
      case 'Intelligence': return 'blue.500';
      case 'Wisdom': return 'purple.500';
      case 'Charisma': return 'pink.500';
      default: return 'gray.500';
    }
  };

  return (
    <VStack spacing={6} align="stretch" bg="parchment.100" p={6} borderRadius="lg" boxShadow="md">
      <Heading as="h2" size="lg" color="brand.700">Skills</Heading>
      <Text>Select your character&apos;s skills. Choose wisely, as these will define your character&apos;s non-combat abilities.</Text>
      <Text fontWeight="bold">Selected skills: {character.skills.length}</Text>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {skillList.map((skill) => (
          <Box
            key={skill.name} 
            borderWidth={1} 
            borderRadius="md" 
            p={3} 
            bg="white"
            borderColor={character.skills.includes(skill.name) ? "brand.500" : "gray.200"}
            transition="all 0.2s"
            _hover={{ boxShadow: "md" }}
          >
            <Checkbox
              isChecked={character.skills.includes(skill.name)}
              onChange={() => handleSkillToggle(skill.name)}
              colorScheme="brand"
            >
              <HStack spacing={2}>
                <Text fontWeight="bold">{skill.name}</Text>
                <Tooltip label={skill.description} placement="top">
                  <InfoIcon color="brand.500" />
                </Tooltip>
              </HStack>
            </Checkbox>
            <HStack mt={2} spacing={2}>
              <Badge colorScheme={getAttributeColor(skill.attribute)}>{skill.attribute}</Badge>
              <Text fontSize="sm" color="gray.600">
                ({skill.attribute.slice(0, 3)})
              </Text>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Skills;