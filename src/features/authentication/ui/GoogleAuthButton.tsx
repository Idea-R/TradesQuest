import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface GoogleAuthButtonProps {
  onPress: () => void;
  isLoading?: boolean;
}

export function GoogleAuthButton({ onPress, isLoading = false }: GoogleAuthButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={isLoading}
    >
      <View style={styles.icon}>
        <Text style={styles.iconText}>G</Text>
      </View>
      <Text style={styles.text}>Continue with Google</Text>
      <ChevronRight color="#374151" size={18} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4285f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  text: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    fontFamily: 'Inter-Medium',
  },
});