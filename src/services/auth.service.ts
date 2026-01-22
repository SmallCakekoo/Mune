import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  type User as FirebaseUser,
  type UserCredential,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { User } from '../types/user.types';

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<FirebaseUser> => {
  const credential: UserCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  
  // Update last login timestamp
  await updateLastLogin(credential.user.uid);
  
  return credential.user;
};

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName: string
): Promise<FirebaseUser> => {
  const credential: UserCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  
  // Update user profile with display name
  await updateProfile(credential.user, { displayName });
  
  // Create user document in Firestore
  await createUserDocument(credential.user, displayName);
  
  return credential.user;
};

/**
 * Sign in with Google
 */
export const signInWithGoogle = async (): Promise<FirebaseUser> => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
  });
  
  const credential: UserCredential = await signInWithPopup(auth, provider);
  
  // Check if user document exists, if not create it
  await ensureUserDocument(credential.user);
  
  return credential.user;
};

/**
 * Sign in with GitHub
 */
export const signInWithGithub = async (): Promise<FirebaseUser> => {
  const provider = new GithubAuthProvider();
  provider.setCustomParameters({
    allow_signup: 'true',
  });
  
  const credential: UserCredential = await signInWithPopup(auth, provider);
  
  // Check if user document exists, if not create it
  await ensureUserDocument(credential.user);
  
  return credential.user;
};

/**
 * Sign out current user
 */
export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

/**
 * Send password reset email
 */
export const sendPasswordReset = async (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};

/**
 * Delete current user from Firebase Auth
 */
export const deleteAuthUser = async (): Promise<void> => {
  if (auth.currentUser) {
    await auth.currentUser.delete();
  }
};

/**
 * Get current Firebase user
 */
export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (
  callback: (user: FirebaseUser | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Create user document in Firestore
 */
const createUserDocument = async (
  firebaseUser: FirebaseUser,
  displayName?: string
): Promise<void> => {
  const userRef = doc(db, 'users', firebaseUser.uid);
  
  // Generate username from email or displayName
  const username = generateUsername(
    displayName || firebaseUser.displayName || firebaseUser.email || 'user'
  );
  
  const userData: Omit<User, 'id'> & { lastLogin: unknown } = {
    name: displayName || firebaseUser.displayName || 'Anonymous User',
    email: firebaseUser.email || '',
    username,
    bio: '',
    avatar: firebaseUser.photoURL || '/src/assets/images/cats/Default.png',
    favoriteSongs: [],
    socialLinks: {},
    stats: {
      roomsCreated: 0,
      minutesSpent: 0,
    },
    categories: [],
    createdAt: serverTimestamp() as unknown as Date,
    lastLogin: serverTimestamp() as unknown as Date,
  };
  
  await setDoc(userRef, userData);
};

/**
 * Ensure user document exists (for OAuth logins)
 */
const ensureUserDocument = async (firebaseUser: FirebaseUser): Promise<void> => {
  const userRef = doc(db, 'users', firebaseUser.uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    // Create new user document
    await createUserDocument(
      firebaseUser,
      firebaseUser.displayName || undefined
    );
  } else {
    // Update last login
    await updateLastLogin(firebaseUser.uid);
  }
};

/**
 * Update user's last login timestamp
 */
const updateLastLogin = async (userId: string): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  await setDoc(
    userRef,
    { lastLogin: serverTimestamp() },
    { merge: true }
  );
};

/**
 * Generate username from name or email
 */
const generateUsername = (input: string): string => {
  // Remove special characters and spaces, convert to lowercase
  let username = input
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  
  // Add random suffix to ensure uniqueness
  const suffix = Math.random().toString(36).substring(2, 6);
  username = `${username}_${suffix}`;
  
  return username;
};

/**
 * Auth service error types
 */
export class AuthError extends Error {
  code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.code = code;
    this.name = 'AuthError';
  }
}

/**
 * Map Firebase auth errors to user-friendly messages
 */
export const getAuthErrorMessage = (error: unknown): string => {
  if (typeof error !== 'object' || error === null) {
    return 'An unknown error occurred';
  }
  
  const firebaseError = error as { code?: string; message?: string };
  
  switch (firebaseError.code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed';
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled';
    default:
      return firebaseError.message || 'An error occurred during authentication';
  }
};
