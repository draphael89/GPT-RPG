const getEnvVar = (key: string): string => {
  if (typeof window !== 'undefined') {
    return process.env[key] || '';
  }
  return '';
};

export function checkRequiredEnvVars() {
  if (typeof window === 'undefined') {
    return true; // Skip check on server-side
  }

  const requiredEnvVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
    'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'
  ];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !getEnvVar(envVar)
  );

  if (missingEnvVars.length > 0) {
    console.warn('⚠️ Missing environment variables:', missingEnvVars);
    missingEnvVars.forEach(envVar => {
      console.warn(`   Missing: ${envVar}`);
    });
    console.warn('Please check your .env.local file and ensure all required variables are set.');
    return false;
  }

  return true;
}

export function getFirebaseConfig() {
  if (typeof window === 'undefined') {
    return {}; // Return empty config on server-side
  }

  return {
    apiKey: getEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY'),
    authDomain: getEnvVar('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
    projectId: getEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVar('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVar('NEXT_PUBLIC_FIREBASE_APP_ID'),
    measurementId: getEnvVar('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID')
  };
}