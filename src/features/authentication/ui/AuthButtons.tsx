import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Mail, Smartphone } from 'lucide-react-native';
import { Button } from '@/shared/ui';

interface AuthButtonsProps {
  onSignUp: () => void;
  onSignIn: () => void;
  isLoading?: boolean;
}

export function AuthButtons({ onSignUp, onSignIn, isLoading = false }: AuthButtonsProps) {
  return (
    <View style={styles.container}>
      <Button
        title="Sign Up"
        onPress={onSignUp}
        variant="primary"
        disabled={isLoading}
        icon={<Mail color="#ffffff" size={18} />}
        style={styles.button}
      />
      
      <Button
        title="Sign In"
        onPress={onSignIn}
        variant="outline"
        disabled={isLoading}
        icon={<Smartphone color="#2563eb" size={18} />}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    flex: 1,
  },
});