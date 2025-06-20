import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  backgroundColor?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
  style?: ViewStyle;
}

export function ProgressBar({
  progress,
  color = '#2563eb',
  backgroundColor = '#e2e8f0',
  height = 8,
  showLabel = false,
  label,
  style,
}: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={[styles.container, style]}>
      {showLabel && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.percentage}>{Math.round(clampedProgress)}%</Text>
        </View>
      )}
      
      <View
        style={[
          styles.track,
          { backgroundColor, height, borderRadius: height / 2 },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress}%`,
              backgroundColor: color,
              height,
              borderRadius: height / 2,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter-Medium',
  },
  percentage: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
  },
  track: {
    overflow: 'hidden',
  },
  fill: {
    transition: 'width 0.3s ease',
  },
});