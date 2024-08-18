'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Spinner, Box } from '@chakra-ui/react';

const DynamicLayout = dynamic(() => import('../../components/Layout'), { ssr: false });
const DynamicProtectedRoute = dynamic<{ children: React.ReactNode }>(
  () => import('../../components/ProtectedRoute').then(mod => mod.default),
  { ssr: false }
);

const DynamicCharacterCreationContent = dynamic(() => import('./CharacterCreationContent'), {
  ssr: false,
  loading: () => <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Spinner size="xl" /></Box>
});

const CharacterCreation: React.FC = () => {
  return (
    <DynamicLayout>
      <DynamicCharacterCreationContent />
    </DynamicLayout>
  );
};

const ProtectedCharacterCreation: React.FC = () => {
  return (
    <DynamicProtectedRoute>
      <CharacterCreation />
    </DynamicProtectedRoute>
  );
};

export default function Page() {
  return <ProtectedCharacterCreation />;
}