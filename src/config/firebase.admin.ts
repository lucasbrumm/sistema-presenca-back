import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../config/sistema-presenca-70f56-firebase-adminsdk-fbsvc-9e996c704f.json';

export const firebaseAdmin = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

export const auth = getAuth(firebaseAdmin);
