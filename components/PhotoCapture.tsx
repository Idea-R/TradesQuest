import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { Camera, Image as ImageIcon, Trash2, Plus } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

interface PhotoCaptureProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
  color?: string;
}

export function PhotoCapture({ 
  photos, 
  onPhotosChange, 
  maxPhotos = 5,
  color = '#2563eb' 
}: PhotoCaptureProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestPermissions = async () => {
    if (Platform.OS === 'web') {
      setHasPermission(true);
      return true;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    
    const granted = status === 'granted' && cameraStatus.status === 'granted';
    setHasPermission(granted);
    
    if (!granted) {
      Alert.alert(
        'Permission Required',
        'Please grant camera and photo library permissions to capture job photos.',
        [{ text: 'OK' }]
      );
    }
    
    return granted;
  };

  const showImagePicker = () => {
    Alert.alert(
      'Add Photo',
      'Choose how you want to add a photo',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Photo Library', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const takePhoto = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newPhotos = [...photos, result.assets[0].uri];
        onPhotosChange(newPhotos);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const pickImage = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newPhotos = [...photos, result.assets[0].uri];
        onPhotosChange(newPhotos);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  const canAddMore = photos.length < maxPhotos;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.cameraIcon, { backgroundColor: color + '15' }]}>
          <Camera color={color} size={20} />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Job Photos</Text>
          <Text style={styles.subtitle}>
            {photos.length} of {maxPhotos} photos
          </Text>
        </View>
        {canAddMore && (
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: color }]}
            onPress={showImagePicker}
          >
            <Plus color="#ffffff" size={20} />
          </TouchableOpacity>
        )}
      </View>

      {photos.length > 0 && (
        <View style={styles.photosGrid}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.photo} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removePhoto(index)}
              >
                <Trash2 color="#ffffff" size={16} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {photos.length === 0 && (
        <TouchableOpacity style={styles.emptyState} onPress={showImagePicker}>
          <ImageIcon color="#94a3b8" size={48} />
          <Text style={styles.emptyTitle}>No photos yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap to add before/after photos of your work
          </Text>
        </TouchableOpacity>
      )}

      {!canAddMore && (
        <View style={styles.maxReachedContainer}>
          <Text style={styles.maxReachedText}>
            Maximum number of photos reached
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cameraIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  photoContainer: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  removeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginTop: 4,
  },
  maxReachedContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  maxReachedText: {
    fontSize: 12,
    color: '#f59e0b',
    fontFamily: 'Inter-Medium',
  },
});