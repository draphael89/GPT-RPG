'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Box, VStack, Heading, FormControl, FormLabel, Input, Button, Text, Link as ChakraLink } from "@chakra-ui/react";
import { signIn } from '../../lib/firebase';
import { setUser, setError } from '../../lib/userSlice';
import NextLink from 'next/link';

const LoginContent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await signIn(email, password);
      dispatch(setUser({ uid: user.uid, email: user.email }));
      router.push('/game');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  return (
    <VStack spacing={8} align="stretch" maxW="md" mx="auto" mt={8}>
      <Heading as="h1" size="xl" textAlign="center" color="brand.700">Login</Heading>
      <Box as="form" onSubmit={handleSubmit} bg="white" shadow="md" borderRadius="lg" p={8}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="brand" width="full">
            Login
          </Button>
        </VStack>
      </Box>
      <Text textAlign="center">
        Don&apos;t have an account?{' '}
        <NextLink href="/signup" passHref>
          <ChakraLink color="brand.500">Sign up</ChakraLink>
        </NextLink>
      </Text>
    </VStack>
  );
};

export default LoginContent;