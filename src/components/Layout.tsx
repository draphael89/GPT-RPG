'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Box, Flex, Heading, Button, VStack, HStack, Text } from "@chakra-ui/react";
import { RootState } from '../lib/store';
import { signOutUser } from '../lib/firebase';
import { clearUser } from '../lib/userSlice';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      dispatch(clearUser());
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Box minHeight="100vh" bg="parchment.50">
      <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="brand.700" color="white">
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            D&D Next.js
          </Heading>
        </Flex>

        <HStack spacing={4}>
          <Link href="/" passHref>
            <Button as="a" variant="ghost">Home</Button>
          </Link>
          <Link href="/character-creation" passHref>
            <Button as="a" variant="ghost">Create Character</Button>
          </Link>
          <Link href="/game" passHref>
            <Button as="a" variant="ghost">Play Game</Button>
          </Link>
          <Link href="/inventory" passHref>
            <Button as="a" variant="ghost">Inventory</Button>
          </Link>
          {user ? (
            <>
              <Text>{user.email}</Text>
              <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button as="a" variant="outline">Login</Button>
              </Link>
              <Link href="/signup" passHref>
                <Button as="a" variant="solid" colorScheme="brand">Sign Up</Button>
              </Link>
            </>
          )}
        </HStack>
      </Flex>
      <VStack spacing={8} p={8}>
        {children}
      </VStack>
    </Box>
  );
};

export default Layout;