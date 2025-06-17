import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Play, Pause, Square, Clock } from 'lucide-react-native';
import { useAppStore } from '@/stores/useAppStore';

interface JobTimerProps {
  jobId: string;
  jobTitle: string;
  color?: string;
}

export function JobTimer({ jobId, jobTitle, color = '#2563eb' }: JobTimerProps) {
  const { activeTimer, startJobTimer, pauseJobTimer, stopJobTimer } = useAppStore();
  const [displayTime, setDisplayTime] = useState('00:00:00');
  const [isThisJobActive, setIsThisJobActive] = useState(false);

  useEffect(() => {
    setIsThisJobActive(activeTimer?.jobId === jobId);
  }, [activeTimer, jobId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isThisJobActive && activeTimer?.isRunning) {
      interval = setInterval(() => {
        const elapsed = Date.now() - activeTimer.startTime - activeTimer.pausedDuration;
        setDisplayTime(formatTime(elapsed));
      }, 1000);
    } else if (isThisJobActive && activeTimer && !activeTimer.isRunning) {
      // Timer is paused, show current elapsed time
      const elapsed = Date.now() - activeTimer.startTime - activeTimer.pausedDuration;
      setDisplayTime(formatTime(elapsed));
    } else {
      setDisplayTime('00:00:00');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isThisJobActive, activeTimer]);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (Platform.OS !== 'web') {
      // On mobile, we could add haptic feedback
      // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    startJobTimer(jobId);
  };

  const handlePause = () => {
    if (Platform.OS !== 'web') {
      // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    pauseJobTimer();
  };

  const handleStop = () => {
    if (Platform.OS !== 'web') {
      // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    stopJobTimer();
  };

  const canStart = !activeTimer || activeTimer.jobId === jobId;
  const isRunning = isThisJobActive && activeTimer?.isRunning;
  const isPaused = isThisJobActive && activeTimer && !activeTimer.isRunning;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.timerIcon, { backgroundColor: color + '15' }]}>
          <Clock color={color} size={20} />
        </View>
        <View style={styles.timerInfo}>
          <Text style={styles.jobTitle} numberOfLines={1}>
            {jobTitle}
          </Text>
          <Text style={[styles.timerDisplay, { color }]}>{displayTime}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        {!isThisJobActive && canStart && (
          <TouchableOpacity
            style={[styles.controlButton, styles.startButton, { backgroundColor: color }]}
            onPress={handleStart}
          >
            <Play color="#ffffff" size={16} fill="#ffffff" />
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        )}

        {isThisJobActive && (
          <>
            <TouchableOpacity
              style={[
                styles.controlButton,
                isRunning ? styles.pauseButton : styles.resumeButton,
                { backgroundColor: isRunning ? '#f59e0b' : color },
              ]}
              onPress={isRunning ? handlePause : handleStart}
            >
              {isRunning ? (
                <>
                  <Pause color="#ffffff" size={16} fill="#ffffff" />
                  <Text style={styles.controlButtonText}>Pause</Text>
                </>
              ) : (
                <>
                  <Play color="#ffffff" size={16} fill="#ffffff" />
                  <Text style={styles.controlButtonText}>Resume</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.stopButton]}
              onPress={handleStop}
            >
              <Square color="#ffffff" size={16} fill="#ffffff" />
              <Text style={styles.controlButtonText}>Stop</Text>
            </TouchableOpacity>
          </>
        )}

        {activeTimer && activeTimer.jobId !== jobId && (
          <View style={styles.blockedState}>
            <Text style={styles.blockedText}>Another job is active</Text>
          </View>
        )}
      </View>

      {isThisJobActive && (
        <View style={styles.statusIndicator}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: isRunning ? '#16a34a' : '#f59e0b',
              },
            ]}
          />
          <Text style={styles.statusText}>
            {isRunning ? 'Timer Running' : 'Timer Paused'}
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
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timerIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  timerInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  timerDisplay: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    letterSpacing: 1,
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
  },
  startButton: {
    backgroundColor: '#16a34a',
  },
  pauseButton: {
    backgroundColor: '#f59e0b',
  },
  resumeButton: {
    backgroundColor: '#2563eb',
  },
  stopButton: {
    backgroundColor: '#ef4444',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  controlButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  blockedState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  blockedText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
  },
});