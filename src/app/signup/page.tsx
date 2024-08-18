'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ClientOnly from '../../components/client/ClientOnly';

// Dynamically import the FirebaseProvider component
const DynamicFirebaseProvider = dynamic(
  () => import('../../components/FirebaseProvider').then((mod) => mod.FirebaseProvider),
  { ssr: false }
);

// Dynamically import the SignUpContent component
const DynamicSignUpContent = dynamic(() => import('./SignupContent'), { ssr: false });

const SignUp: React.FC = () => {
  return (
    <ClientOnly>
      <DynamicFirebaseProvider>
        <DynamicSignUpContent />
      </DynamicFirebaseProvider>
    </ClientOnly>
  );
};

export default SignUp;