'use client';

import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, SimpleGrid, Text, Spinner } from "@chakra-ui/react";
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import Layout from '../../components/Layout';
import useFirebase from '../../hooks/useFirebase';

interface InventoryItem {
  name: string;
  quantity: number;
}

const InventoryItemComponent: React.FC<InventoryItem> = ({ name, quantity }) => (
  <Box borderWidth={1} borderRadius="lg" p={4} bg="white">
    <Text fontWeight="bold">{name}</Text>
    <Text>Quantity: {quantity}</Text>
  </Box>
);

const InventoryContent: React.FC = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const firebase = useFirebase();

  useEffect(() => {
    const fetchInventory = async () => {
      if (firebase?.firestore && firebase?.auth.currentUser) {
        try {
          const userId = firebase.auth.currentUser.uid;
          const inventoryRef = collection(firebase.firestore, `users/${userId}/inventory`);
          const inventorySnapshot = await getDocs(inventoryRef);

          const items = inventorySnapshot.docs.map((doc: DocumentData) => ({
            name: doc.data().name,
            quantity: doc.data().quantity
          }));

          setInventoryItems(items);
        } catch (error) {
          console.error('Error fetching inventory:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInventory();
  }, [firebase]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Layout>
      <VStack spacing={6} align="stretch" maxW="4xl" mx="auto">
        <Heading as="h1" size="2xl" textAlign="center" color="brand.700">Inventory</Heading>
        <Box bg="parchment.100" shadow="md" borderRadius="lg" p={6}>
          <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {inventoryItems.map((item, index) => (
              <InventoryItemComponent key={index} name={item.name} quantity={item.quantity} />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Layout>
  );
};

export default InventoryContent;