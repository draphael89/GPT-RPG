import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  VStack,
  Heading,
  Progress,
  useToast,
  Grid,
  GridItem,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { RootState } from '../../lib/store';
import { updateCharacterInfo } from '../../lib/characterSlice';
import BasicInfo from '../../components/character-creation/BasicInfo';
import Attributes from '../../components/character-creation/Attributes';
import Skills from '../../components/character-creation/Skills';
import Background from '../../components/character-creation/Background';
import Equipment from '../../components/character-creation/Equipment';
import StepNavigation from '../../components/character-creation/StepNavigation';
import CharacterPreview from '../../components/character-creation/CharacterPreview';
import { validateCharacter, CharacterState as CharacterStateType } from '../../types/character';

const steps = ['Basic Info', 'Attributes', 'Skills', 'Background', 'Equipment'];

const CharacterCreationContent: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useDispatch();
  const character = useSelector((state: RootState) => state.character);
  const toast = useToast();

  useEffect(() => {
    const validationErrors = validateCharacter(character as unknown as CharacterStateType);
    setErrors(validationErrors);
  }, [character]);

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateStep = (step: number): string[] => {
    switch (step) {
      case 1:
        return !character.name ? ['Character name is required'] : [];
      case 2:
        return character.attributePoints > 0 ? ['You must allocate all attribute points'] : [];
      case 3:
        return character.skills.length < 2 ? ['Select at least 2 skills'] : [];
      case 4:
        return !character.background.name ? ['Background name is required'] : [];
      case 5:
        return character.equipment.length === 0 ? ['Select at least one equipment item'] : [];
      default:
        return [];
    }
  };

  const handleSubmit = () => {
    if (errors.length > 0) {
      toast({
        title: 'Character Creation Incomplete',
        description: 'Please fix the errors before submitting.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    console.log('Character created:', character);
    toast({
      title: 'Character Created',
      description: `${character.name} the ${character.race} ${character.class} has been created!`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    // Here you would typically send this data to your backend or navigate to the next page
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfo />;
      case 2:
        return <Attributes />;
      case 3:
        return <Skills />;
      case 4:
        return <Background />;
      case 5:
        return <Equipment />;
      default:
        return null;
    }
  };

  return (
    <Box maxWidth="1200px" margin="auto" padding={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={6} color="brand.700">
        Create Your Character
      </Heading>
      <Progress value={(currentStep / steps.length) * 100} mb={6} colorScheme="brand" />
      <Grid templateColumns="3fr 2fr" gap={8}>
        <GridItem>
          <Box bg="parchment.100" borderRadius="lg" boxShadow="xl" p={6}>
            <VStack spacing={8} align="stretch">
              {renderStep()}
              {errors.length > 0 && (
                <Alert status="error">
                  <AlertIcon />
                  {errors.join(', ')}
                </Alert>
              )}
              <StepNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            </VStack>
          </Box>
        </GridItem>
        <GridItem>
          <CharacterPreview character={character} />
          {currentStep === steps.length && (
            <Button
              mt={4}
              colorScheme="brand"
              size="lg"
              width="full"
              onClick={handleSubmit}
              isDisabled={errors.length > 0}
            >
              Create Character
            </Button>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CharacterCreationContent;