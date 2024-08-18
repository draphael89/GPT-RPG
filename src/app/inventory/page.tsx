import React from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ProtectedRoute from '../../components/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Inventory | DnD Game',
  description: 'View and manage your inventory items',
};

// Dynamically import the InventoryContent component with SSR disabled
const DynamicInventoryContent = dynamic(
  () => import('./InventoryContent'),
  { ssr: false }
);

const InventoryPage = () => {
  return (
    <ProtectedRoute>
      <DynamicInventoryContent />
    </ProtectedRoute>
  );
};

export default InventoryPage;