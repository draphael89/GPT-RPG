import { useEffect, useState } from 'react';
import useFirebase from '../hooks/useFirebase';

const FirebaseComponent = () => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  const firebase = useFirebase();

  useEffect(() => {
    if (firebase) {
      setFirebaseInitialized(true);
    }
  }, [firebase]);

  if (!firebaseInitialized) {
    return <div>Loading...</div>;
  }

  // Your component logic here
};

export default FirebaseComponent;