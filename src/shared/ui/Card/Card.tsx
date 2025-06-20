import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export function Card({
  children,
  variant = 'default',
  padding = 'medium',
  style,
}: CardProps) {
  const cardStyle = [
    styles.base,
    styles[variant],
    styles[padding],
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
  },
  default: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  outlined: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: 'transparent',
    elevation: 0,
  },
  none: {
    padding: 0,
  },
  small: {
    padding: 12,
  },
  medium: {
    padding: 20,
  },
  large: {
    padding: 24,
  },
});