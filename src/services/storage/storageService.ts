import { supabase, STORAGE_BUCKETS } from '../../lib/supabase';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

/**
 * Upload progress callback type
 */
export type UploadProgressCallback = (progress: number) => void;

/**
 * Validate image file
 */
const validateImageFile = (file: File): void => {
  // Check file type
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.');
  }
  
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 5MB.');
  }
};

/**
 * Generate unique filename
 */
const generateFilename = (userId: string, file: File): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const extension = file.name.split('.').pop() || 'jpg';
  return `${userId}_${timestamp}_${randomStr}.${extension}`;
};

/**
 * Upload profile picture to Supabase and update user document
 */
export const uploadProfilePicture = async (
  userId: string,
  file: File,
  onProgress?: UploadProgressCallback
): Promise<string> => {
  try {
    // Validate file
    validateImageFile(file);
    
    // Generate unique filename
    const filename = generateFilename(userId, file);
    const filePath = `${userId}/${filename}`;
    
    // Report initial progress
    onProgress?.(0);
    
    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKETS.PROFILE_PICTURES)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });
    
    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
    
    // Report 70% progress after upload
    onProgress?.(70);
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKETS.PROFILE_PICTURES)
      .getPublicUrl(data.path);
    
    if (!urlData?.publicUrl) {
      throw new Error('Failed to get public URL');
    }
    
    const publicUrl = urlData.publicUrl;
    
    // Report 85% progress
    onProgress?.(85);
    
    // Update user document in Firestore
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      avatar: publicUrl,
    });
    
    // Report 100% progress
    onProgress?.(100);
    
    return publicUrl;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to upload profile picture'
    );
  }
};

/**
 * Upload room image to Supabase
 */
export const uploadRoomImage = async (
  roomId: string,
  file: File,
  onProgress?: UploadProgressCallback
): Promise<string> => {
  try {
    // Validate file
    validateImageFile(file);
    
    // Generate unique filename
    const filename = generateFilename(roomId, file);
    const filePath = `${roomId}/${filename}`;
    
    // Report initial progress
    onProgress?.(0);
    
    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKETS.PROFILE_PICTURES)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });
    
    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
    
    // Report 90% progress after upload
    onProgress?.(90);
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKETS.PROFILE_PICTURES)
      .getPublicUrl(data.path);
    
    if (!urlData?.publicUrl) {
      throw new Error('Failed to get public URL');
    }
    
    // Report 100% progress
    onProgress?.(100);
    
    return urlData.publicUrl;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to upload room image'
    );
  }
};

/**
 * Delete image from Supabase storage
 */
export const deleteImage = async (
  bucket: keyof typeof STORAGE_BUCKETS,
  path: string
): Promise<void> => {
  const bucketName = STORAGE_BUCKETS[bucket];
  
  const { error } = await supabase.storage
    .from(bucketName)
    .remove([path]);
  
  if (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

/**
 * Get public URL for an image
 */
export const getPublicUrl = (
  bucket: keyof typeof STORAGE_BUCKETS,
  path: string
): string => {
  const bucketName = STORAGE_BUCKETS[bucket];
  
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(path);
  
  return data.publicUrl;
};

/**
 * Storage service error
 */
export class StorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StorageError';
  }
}
