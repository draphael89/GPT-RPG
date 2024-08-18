import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';

// Dynamically import ClientOnly component
const DynamicClientOnly = dynamic(() => import('../../components/client/ClientOnly'), {
  ssr: false,
});

// Dynamically import LoginContent component
const DynamicLoginContent = dynamic(() => import('../../components/client/LoginContext'), {
  ssr: false,
});

export default function LoginPage() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicClientOnly>
          <DynamicLoginContent />
        </DynamicClientOnly>
      </Suspense>
    </Layout>
  );
}

// This is optional, but can be used to generate static params if needed
export function generateStaticParams() {
  return [];
}