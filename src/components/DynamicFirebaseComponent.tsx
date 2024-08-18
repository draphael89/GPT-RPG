import dynamic from 'next/dynamic';

const DynamicFirebaseComponent = dynamic(
  () => import('./FirebaseComponent'),
  { ssr: false }
);

export default DynamicFirebaseComponent;