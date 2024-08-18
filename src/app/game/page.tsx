'use client';

import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, HStack, Button, Spinner } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import getLogger from '../../utils/logger';

// Initialize logger
const logger = getLogger();

// Dynamically import components to avoid potential circular dependencies
const Layout = dynamic(() => import('../../components/Layout'), { ssr: true });
const ProtectedRoute = dynamic(() => import('../../components/ProtectedRoute'), { ssr: false });
const ClientOnly = dynamic(() => import('../../components/client/ClientOnly'), { ssr: false });
const DynamicCharacterStats = dynamic(() => import('../../components/CharacterStats'), {
  ssr: false,
  loading: () => <Spinner size="xl" />
});

// Import the Firebase hook
import useFirebase from '../../hooks/useFirebase';

// GameContent component
const GameContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const firebase = useFirebase();

  useEffect(() => {
    logger.info('GameContent: Checking Firebase initialization');
    if (firebase) {
      logger.info('GameContent: Firebase initialized, setting isLoading to false');
      setIsLoading(false);
    }
  }, [firebase]);

  if (isLoading) {
    logger.info('GameContent: Rendering loading spinner');
    return <Spinner size="xl" />;
  }

  logger.info('GameContent: Rendering game content');
  return (
    <VStack spacing={6} align="stretch" maxW="4xl" mx="auto">
      <Heading as="h1" size="2xl" textAlign="center" color="brand.700">Game Screen</Heading>
      <HStack spacing={8} alignItems="flex-start">
        <Box flex={1}>
          <DynamicCharacterStats />
        </Box>
        <VStack flex={2} spacing={4} align="stretch">
          <Box bg="white" shadow="md" borderRadius="lg" p={6}>
            <Heading as="h2" size="lg" mb={4} color="brand.600">Adventure Log</Heading>
            <Text>Your adventure begins here...</Text>
          </Box>
          <HStack>
            <Button colorScheme="brand" flex={1}>Explore</Button>
            <Button colorScheme="brand" flex={1}>Rest</Button>
            <Button colorScheme="brand" flex={1}>Inventory</Button>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

// Main Game component
const Game: React.FC = () => {
  logger.info('Rendering Game component');
  return (
    <Layout>
      <ClientOnly>
        <GameContent />
      </ClientOnly>
    </Layout>
  );
};

// Export the protected game page
export default function GamePage() {
  logger.info('Rendering GamePage');
  return (
    <ProtectedRoute>
      <Game />
    </ProtectedRoute>
  );
}