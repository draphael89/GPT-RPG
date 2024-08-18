'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Spinner } from "@chakra-ui/react";

const DynamicLayout = dynamic(() => import('../../components/Layout'), { ssr: false });
const DynamicProtectedRoute = dynamic<{ children: React.ReactNode }>(
  () => import('../../components/ProtectedRoute').then(mod => mod.default),
  { ssr: false }
);

const DynamicCharacterSummaryContent = dynamic(() => import('./CharacterSummaryContent'), {
  ssr: false,
  loading: () => <Spinner size="xl" />
});

const CharacterSummary: React.FC = () => {
  return (
    <DynamicLayout>
      <DynamicCharacterSummaryContent />
    </DynamicLayout>
  );
};

const ProtectedCharacterSummary: React.FC = () => {
  return (
    <DynamicProtectedRoute>
      <CharacterSummary />
    </DynamicProtectedRoute>
  );
};

export default function Page() {
  return <ProtectedCharacterSummary />;
}