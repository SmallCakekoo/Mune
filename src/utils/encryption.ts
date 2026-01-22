import CryptoJS from 'crypto-js';

/**
 * Hash a string using SHA-256
 */
export const hashPassword = async (password: string): Promise<string> => {
  return CryptoJS.SHA256(password).toString();
};
