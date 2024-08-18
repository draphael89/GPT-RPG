'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import {
  Box,
  Heading,
  Text,
  VStack,
  Link,
  Container,
  Skeleton,
  useColorModeValue,
} from '@chakra-ui/react';
import Layout from '../components/Layout';
import { isServer } from '../utils/isServer';
import getLogger from '../utils/logger';

// Initialize logger
const logger = getLogger();

// Dynamically import HomeContent to avoid potential circular dependencies
const DynamicHomeContent = dynamic(() => import('../components/HomeContent'), {
  ssr: false,
  loading: () => <Skeleton height="200px" />,
});

// StaticContent component for the home page
const StaticContent: React.FC = () => {
  const linkColor = useColorModeValue('blue.600', 'blue.300');

  return (
    <Box mt={8}>
      <Heading as="h2" size="xl" mb={4}>
        About Our Game
      </Heading>
      <Text fontSize="lg" mb={4}>
        Embark on an epic journey in our Dungeons & Dragons inspired web game. 
        Create your character, explore vast lands, and face challenging quests!
      </Text>
      <VStack spacing={2} align="stretch">
        <Link as={NextLink} href="/rules" color={linkColor} fontWeight="medium">
          Game Rules
        </Link>
        <Link as={NextLink} href="/faq" color={linkColor} fontWeight="medium">
          FAQ
        </Link>
      </VStack>
    </Box>
  );
};

// Main Home component
const Home: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  logger.info('Rendering Home component');

  return (
    <Layout>
      <Box bg={bgColor} minHeight="100vh" py={10}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Heading as="h1" size="2xl" textAlign="center" color={textColor}>
              Welcome to D&D Next.js Game
            </Heading>
            {!isServer && <DynamicHomeContent />}
            <StaticContent />
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
};

export default Home;