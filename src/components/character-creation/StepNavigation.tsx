import React from 'react';
import { Flex, Button, Box } from "@chakra-ui/react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ currentStep, totalSteps, onNext, onPrevious }) => {
  return (
    <Flex justifyContent="space-between" mt={6}>
      <Button 
        onClick={onPrevious} 
        isDisabled={currentStep === 1}
        colorScheme="brand"
        variant="outline"
      >
        Previous
      </Button>
      <Box>
        Step {currentStep} of {totalSteps}
      </Box>
      <Button 
        onClick={onNext} 
        isDisabled={currentStep === totalSteps}
        colorScheme="brand"
      >
        {currentStep === totalSteps ? 'Finish' : 'Next'}
      </Button>
    </Flex>
  );
};

export default StepNavigation;