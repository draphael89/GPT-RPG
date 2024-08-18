import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Box, 
  Heading, 
  VStack, 
  Checkbox, 
  Button, 
  Text, 
  SimpleGrid, 
  Tooltip, 
  HStack,
  Badge
} from "@chakra-ui/react";
import { InfoIcon } from '@chakra-ui/icons';
import { RootState } from '../../lib/store';
import { updateEquipment } from '../../lib/characterSlice';
import { EquipmentItem } from '../../types/equipment';
import { getEquipmentByClass } from '../../utils/equipmentUtils';
import { logDebug } from '../../utils/logger';
import { CharacterClass } from '../../types/character';

const Equipment: React.FC = () => {
  const dispatch = useDispatch();
  const character = useSelector((state: RootState) => state.character);
  const [availableEquipment, setAvailableEquipment] = useState<EquipmentItem[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem[]>([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const equipment = await getEquipmentByClass(character.class as CharacterClass);
        setAvailableEquipment(equipment);
        logDebug('Equipment fetched successfully', { class: character.class, equipmentCount: equipment.length });
      } catch (error) {
        logDebug('Error fetching equipment', { error });
      }
    };

    fetchEquipment();
  }, [character.class]);

  const handleEquipmentChange = (item: EquipmentItem) => {
    setSelectedEquipment(prev => {
      const index = prev.findIndex(equip => equip.id === item.id);
      if (index !== -1) {
        return prev.filter(equip => equip.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleSubmit = () => {
    dispatch(updateEquipment(selectedEquipment));
    logDebug('Equipment updated', { selectedEquipment });
  };

  const getEquipmentTypeColor = (type: string) => {
    switch (type) {
      case 'Weapon': return 'red';
      case 'Armor': return 'blue';
      case 'Tool': return 'green';
      case 'Gear': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <VStack spacing={6} align="stretch" bg="parchment.100" p={6} borderRadius="lg" boxShadow="md">
      <Heading as="h2" size="lg" color="brand.700">Equipment</Heading>
      <Text>Select your character&apos;s starting equipment. These items will be crucial for your adventures.</Text>
      <Text fontWeight="bold">Selected items: {selectedEquipment.length}</Text>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {availableEquipment.map((item) => (
          <Box 
            key={item.id} 
            borderWidth={1} 
            borderRadius="md" 
            p={3} 
            bg="white"
            borderColor={selectedEquipment.some(equip => equip.id === item.id) ? "brand.500" : "gray.200"}
            transition="all 0.2s"
            _hover={{ boxShadow: "md" }}
          >
            <Checkbox
              isChecked={selectedEquipment.some(equip => equip.id === item.id)}
              onChange={() => handleEquipmentChange(item)}
              colorScheme="brand"
            >
              <HStack spacing={2}>
                <Text fontWeight="bold">{item.name}</Text>
                <Tooltip label={item.description} placement="top">
                  <InfoIcon color="brand.500" />
                </Tooltip>
              </HStack>
            </Checkbox>
            <HStack mt={2} spacing={2}>
              <Badge colorScheme={getEquipmentTypeColor(item.type)}>{item.type}</Badge>
              {item.weight && <Text fontSize="sm" color="gray.600">Weight: {item.weight} lbs</Text>}
              {item.value && <Text fontSize="sm" color="gray.600">Value: {item.value} gp</Text>}
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
      <Button
        mt={6}
        colorScheme="brand"
        onClick={handleSubmit}
        isDisabled={selectedEquipment.length === 0}
      >
        Confirm Equipment
      </Button>
    </VStack>
  );
};

export default Equipment;