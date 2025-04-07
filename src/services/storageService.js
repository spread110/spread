import { firebaseStorage } from '../config/firebase';

const storageService = {
  // Upload image to Firebase Storage
  uploadImage: async (uri, path, filename) => {
    try {
      // Create storage reference
      const storageRef = firebaseStorage.ref(`${path}/${filename || Date.now()}`);
      
      // Upload the file
      const response = await fetch(uri);
      const blob = await response.blob();
      const uploadTask = storageRef.put(blob);
      
      // Monitor upload progress
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% complete`);
          },
          (error) => {
            reject(error);
          },
          async () => {
            // Get download URL
            const downloadUrl = await storageRef.getDownloadURL();
            resolve(downloadUrl);
          }
        );
      });
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  },
  
  // Delete image from Firebase Storage
  deleteImage: async (fileUrl) => {
    try {
      // Get storage reference from the URL
      const storageRef = firebaseStorage.refFromURL(fileUrl);
      
      // Delete the file
      await storageRef.delete();
      return true;
    } catch (error) {
      console.error('Image delete error:', error);
      throw error;
    }
  },
  
  // Get image URL
  getImageUrl: async (path, filename) => {
    try {
      const storageRef = firebaseStorage.ref(`${path}/${filename}`);
      return await storageRef.getDownloadURL();
    } catch (error) {
      console.error('Get image URL error:', error);
      throw error;
    }
  }
};

export default storageService; 