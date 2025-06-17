import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView, Alert } from 'react-native';
import { X, DollarSign, Clock, MapPin, User, FileText, Zap, Calendar, Chrome as Home } from 'lucide-react-native';
import { useAppStore } from '@/stores/useAppStore';

interface AddJobModalProps {
  visible: boolean;
  onClose: () => void;
  tradeColor: string;
}

export function AddJobModal({ visible, onClose, tradeColor }: AddJobModalProps) {
  const [jobData, setJobData] = useState({
    title: '',
    client: '',
    location: '',
    description: '',
    laborCost: '',
    partsCost: '',
    estimatedTime: '2 hours',
    scheduledTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    priority: 'medium' as 'high' | 'medium' | 'low',
    callType: 'regular' as 'regular' | 'emergency' | 'weekend' | 'after-hours' | 'holiday',
  });

  const { addJob, companySettings } = useAppStore();

  const handleSubmit = () => {
    if (!jobData.title.trim() || !jobData.client.trim() || !jobData.laborCost) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const laborCost = parseFloat(jobData.laborCost) || 0;
    const partsCost = parseFloat(jobData.partsCost) || 0;
    
    // Calculate XP reward based on job value and type
    let baseXP = Math.floor((laborCost + partsCost) / 2); // Base XP calculation
    
    // Apply multipliers for call types
    if (jobData.callType === 'emergency') baseXP *= 1.5;
    else if (jobData.callType === 'weekend') baseXP *= 1.25;
    else if (jobData.callType === 'after-hours') baseXP *= 1.3;
    else if (jobData.callType === 'holiday') baseXP *= 2.0;

    // Apply parts markup if configured
    let adjustedPartsCost = partsCost;
    if (companySettings && partsCost > 0) {
      adjustedPartsCost = partsCost * (1 + companySettings.partsMarkup / 100);
    }

    const newJob = {
      title: jobData.title,
      client: jobData.client,
      location: jobData.location,
      description: jobData.description,
      laborCost,
      partsCost: adjustedPartsCost,
      estimatedTime: jobData.estimatedTime,
      scheduledTime: jobData.scheduledTime,
      priority: jobData.priority,
      status: 'pending' as const,
      callType: jobData.callType,
      xpReward: Math.round(baseXP),
    };

    addJob(newJob);
    
    // Reset form
    setJobData({
      title: '',
      client: '',
      location: '',
      description: '',
      laborCost: '',
      partsCost: '',
      estimatedTime: '2 hours',
      scheduledTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      priority: 'medium',
      callType: 'regular',
    });

    onClose();
    Alert.alert('Success', 'Job added successfully!');
  };

  const callTypeOptions = [
    { key: 'regular', label: 'Regular', icon: <Home color="#64748b" size={16} />, color: '#64748b' },
    { key: 'emergency', label: 'Emergency', icon: <Zap color="#ef4444" size={16} />, color: '#ef4444' },
    { key: 'weekend', label: 'Weekend', icon: <Calendar color="#f59e0b" size={16} />, color: '#f59e0b' },
    { key: 'after-hours', label: 'After Hours', icon: <Clock color="#7c3aed" size={16} />, color: '#7c3aed' },
    { key: 'holiday', label: 'Holiday', icon: <Calendar color="#16a34a" size={16} />, color: '#16a34a' },
  ];

  const priorityOptions = [
    { key: 'low', label: 'Low', color: '#10b981' },
    { key: 'medium', label: 'Medium', color: '#f59e0b' },
    { key: 'high', label: 'High', color: '#ef4444' },
  ];

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Add New Job</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X color="#64748b" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Job Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Job Title *</Text>
              <TextInput
                style={styles.textInput}
                value={jobData.title}
                onChangeText={(text) => setJobData(prev => ({ ...prev, title: text }))}
                placeholder="e.g., AC Repair, Water Heater Installation"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Client Name *</Text>
              <TextInput
                style={styles.textInput}
                value={jobData.client}
                onChangeText={(text) => setJobData(prev => ({ ...prev, client: text }))}
                placeholder="Customer name"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.textInput}
                value={jobData.location}
                onChangeText={(text) => setJobData(prev => ({ ...prev, location: text }))}
                placeholder="Job site address"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={jobData.description}
                onChangeText={(text) => setJobData(prev => ({ ...prev, description: text }))}
                placeholder="Job details and requirements"
                placeholderTextColor="#94a3b8"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* Pricing */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pricing</Text>
            
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Labor Cost *</Text>
                <View style={styles.inputWithIcon}>
                  <DollarSign color="#64748b" size={20} />
                  <TextInput
                    style={styles.textInputWithIcon}
                    value={jobData.laborCost}
                    onChangeText={(text) => setJobData(prev => ({ ...prev, laborCost: text }))}
                    placeholder="0.00"
                    placeholderTextColor="#94a3b8"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Parts Cost</Text>
                <View style={styles.inputWithIcon}>
                  <DollarSign color="#64748b" size={20} />
                  <TextInput
                    style={styles.textInputWithIcon}
                    value={jobData.partsCost}
                    onChangeText={(text) => setJobData(prev => ({ ...prev, partsCost: text }))}
                    placeholder="0.00"
                    placeholderTextColor="#94a3b8"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            {companySettings && parseFloat(jobData.partsCost) > 0 && (
              <View style={styles.markupInfo}>
                <Text style={styles.markupText}>
                  Parts markup ({companySettings.partsMarkup}%): $
                  {(parseFloat(jobData.partsCost) * companySettings.partsMarkup / 100).toFixed(2)}
                </Text>
              </View>
            )}
          </View>

          {/* Call Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Call Type</Text>
            <View style={styles.optionsGrid}>
              {callTypeOptions.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.optionButton,
                    jobData.callType === option.key && { 
                      backgroundColor: option.color + '15',
                      borderColor: option.color 
                    }
                  ]}
                  onPress={() => setJobData(prev => ({ ...prev, callType: option.key as any }))}
                >
                  {option.icon}
                  <Text style={[
                    styles.optionText,
                    jobData.callType === option.key && { color: option.color }
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Priority */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Priority</Text>
            <View style={styles.priorityOptions}>
              {priorityOptions.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.priorityButton,
                    jobData.priority === option.key && { 
                      backgroundColor: option.color + '15',
                      borderColor: option.color 
                    }
                  ]}
                  onPress={() => setJobData(prev => ({ ...prev, priority: option.key as any }))}
                >
                  <Text style={[
                    styles.priorityText,
                    jobData.priority === option.key && { color: option.color }
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Scheduling */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Scheduling</Text>
            
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Estimated Time</Text>
                <TextInput
                  style={styles.textInput}
                  value={jobData.estimatedTime}
                  onChangeText={(text) => setJobData(prev => ({ ...prev, estimatedTime: text }))}
                  placeholder="2 hours"
                  placeholderTextColor="#94a3b8"
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Scheduled Time</Text>
                <TextInput
                  style={styles.textInput}
                  value={jobData.scheduledTime}
                  onChangeText={(text) => setJobData(prev => ({ ...prev, scheduledTime: text }))}
                  placeholder="10:00 AM"
                  placeholderTextColor="#94a3b8"
                />
              </View>
            </View>
          </View>

          {/* XP Preview */}
          {(jobData.laborCost || jobData.partsCost) && (
            <View style={styles.xpPreview}>
              <Text style={styles.xpPreviewTitle}>XP Reward Preview</Text>
              <Text style={[styles.xpPreviewValue, { color: tradeColor }]}>
                +{Math.round(((parseFloat(jobData.laborCost) || 0) + (parseFloat(jobData.partsCost) || 0)) / 2 * 
                  (jobData.callType === 'emergency' ? 1.5 : 
                   jobData.callType === 'weekend' ? 1.25 :
                   jobData.callType === 'after-hours' ? 1.3 :
                   jobData.callType === 'holiday' ? 2.0 : 1))} XP
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.submitButton, { backgroundColor: tradeColor }]} 
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Add Job</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#0f172a',
    fontFamily: 'Inter-Regular',
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  textInputWithIcon: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#0f172a',
    fontFamily: 'Inter-Regular',
  },
  markupInfo: {
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  markupText: {
    fontSize: 14,
    color: '#0369a1',
    fontFamily: 'Inter-Medium',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: '30%',
  },
  optionText: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  priorityOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
  },
  xpPreview: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  xpPreviewTitle: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  xpPreviewValue: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Inter-SemiBold',
  },
});