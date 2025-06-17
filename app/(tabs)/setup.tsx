import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Wrench, Zap, Droplets, Wind, Users, Target, DollarSign, Clock, TrendingUp, Star, Shield, Award, ChevronRight, Building, CreditCard, Percent, Info } from 'lucide-react-native';
import { useAppStore, TRADE_DEFAULTS, TradeDefaults, CompanySettings, DailyGoals } from '@/stores/useAppStore';

interface Trade {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  avgJobsPerDay: number;
  avgHourlyRate: number;
  specialties: string[];
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  color: string;
  onChange: (value: number) => void;
  tooltip?: string;
}

function CustomSlider({ label, value, min, max, step, unit, color, onChange, tooltip }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  
  const handlePress = (event: any) => {
    const { locationX } = event.nativeEvent;
    const sliderWidth = 280;
    const newPercentage = Math.max(0, Math.min(100, (locationX / sliderWidth) * 100));
    const newValue = min + (newPercentage / 100) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;
    onChange(Math.max(min, Math.min(max, steppedValue)));
  };

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderHeader}>
        <View style={styles.sliderLabelContainer}>
          <Text style={styles.sliderLabel}>{label}</Text>
          {tooltip && (
            <TouchableOpacity 
              style={styles.tooltipButton}
              onPress={() => Alert.alert('Info', tooltip)}
            >
              <Info color="#64748b" size={14} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={[styles.sliderValue, { color }]}>
          {unit === '%' ? `${value}${unit}` : `${unit}${value}`}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.sliderTrack} 
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={[styles.sliderFill, { width: `${percentage}%`, backgroundColor: color }]} />
        <View style={[styles.sliderThumb, { left: `${percentage}%`, backgroundColor: color }]} />
      </TouchableOpacity>
    </View>
  );
}

function TradeCard({ trade, isSelected, onSelect }: { 
  trade: Trade; 
  isSelected: boolean; 
  onSelect: () => void; 
}) {
  return (
    <TouchableOpacity
      style={[
        styles.tradeCard,
        isSelected && { borderColor: trade.color, borderWidth: 2 }
      ]}
      onPress={onSelect}
    >
      <View style={[styles.tradeIcon, { backgroundColor: trade.color + '15' }]}>
        {trade.icon}
      </View>
      <View style={styles.tradeInfo}>
        <Text style={styles.tradeName}>{trade.name}</Text>
        <Text style={styles.tradeDescription}>{trade.description}</Text>
        <View style={styles.tradeStats}>
          <Text style={styles.tradeStat}>~{trade.avgJobsPerDay} jobs/day</Text>
          <Text style={styles.tradeStat}>${trade.avgHourlyRate}/hr avg</Text>
        </View>
        <View style={styles.specialties}>
          {trade.specialties.slice(0, 2).map((specialty, index) => (
            <View key={index} style={[styles.specialtyTag, { backgroundColor: trade.color + '10' }]}>
              <Text style={[styles.specialtyText, { color: trade.color }]}>{specialty}</Text>
            </View>
          ))}
        </View>
      </View>
      {isSelected && (
        <View style={[styles.selectedIndicator, { backgroundColor: trade.color }]}>
          <Star color="#ffffff" size={16} fill="#ffffff" />
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function Setup() {
  const [currentStep, setCurrentStep] = useState<'trade' | 'company' | 'goals'>('trade');
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);
  const [companySettings, setCompanySettings] = useState<Partial<CompanySettings>>({
    name: '',
    type: 'hourly',
    baseHourlyRate: 45,
    commissionRates: {
      serviceCalls: 15,
      parts: 12,
      emergency: 22,
      weekend: 18,
      afterHours: 20,
      holiday: 25,
    },
    partsMarkup: 35,
    emergencyMultiplier: 1.5,
    weekendMultiplier: 1.25,
    afterHoursMultiplier: 1.3,
    holidayMultiplier: 2.0,
  });
  const [dailyGoals, setDailyGoals] = useState<DailyGoals>({
    jobsPerDay: 4,
    hoursPerDay: 8,
    revenuePerDay: 360,
    xpPerDay: 400,
  });

  const { completeSetup, updateUser, user } = useAppStore();

  const trades: Trade[] = [
    {
      id: 'appliance',
      name: 'Appliance Repair',
      icon: <Wrench color="#2563eb" size={32} />,
      color: '#2563eb',
      description: 'Repair and maintain household appliances',
      avgJobsPerDay: 5,
      avgHourlyRate: 42,
      specialties: ['Refrigeration', 'Washers', 'Dryers', 'Ovens']
    },
    {
      id: 'hvac',
      name: 'HVAC Technician',
      icon: <Wind color="#16a34a" size={32} />,
      color: '#16a34a',
      description: 'Install and service heating & cooling systems',
      avgJobsPerDay: 3,
      avgHourlyRate: 48,
      specialties: ['Installation', 'Maintenance', 'Repair', 'Diagnostics']
    },
    {
      id: 'electrician',
      name: 'Electrician',
      icon: <Zap color="#f59e0b" size={32} />,
      color: '#f59e0b',
      description: 'Install and repair electrical systems',
      avgJobsPerDay: 4,
      avgHourlyRate: 52,
      specialties: ['Wiring', 'Panels', 'Outlets', 'Lighting']
    },
    {
      id: 'plumber',
      name: 'Plumber',
      icon: <Droplets color="#06b6d4" size={32} />,
      color: '#06b6d4',
      description: 'Install and repair plumbing systems',
      avgJobsPerDay: 4,
      avgHourlyRate: 46,
      specialties: ['Pipes', 'Fixtures', 'Drains', 'Water Heaters']
    }
  ];

  const selectedTradeData = trades.find(t => t.id === selectedTrade);
  const tradeDefaults = selectedTrade ? TRADE_DEFAULTS.find(t => t.id === selectedTrade) : null;

  // Update defaults when trade is selected
  React.useEffect(() => {
    if (tradeDefaults) {
      setCompanySettings(prev => ({
        ...prev,
        baseHourlyRate: tradeDefaults.avgHourlyRate,
        commissionRates: {
          serviceCalls: tradeDefaults.commissionDefaults.serviceCalls.default,
          parts: tradeDefaults.commissionDefaults.parts.default,
          emergency: tradeDefaults.commissionDefaults.emergency.default,
          weekend: Math.round(tradeDefaults.commissionDefaults.serviceCalls.default * 1.2),
          afterHours: Math.round(tradeDefaults.commissionDefaults.serviceCalls.default * 1.3),
          holiday: Math.round(tradeDefaults.commissionDefaults.serviceCalls.default * 1.6),
        },
        partsMarkup: tradeDefaults.partsMarkupDefault,
      }));
      
      setDailyGoals(prev => ({
        ...prev,
        jobsPerDay: tradeDefaults.avgJobsPerDay,
        revenuePerDay: tradeDefaults.avgJobsPerDay * tradeDefaults.avgRevenuePerJob,
      }));
    }
  }, [tradeDefaults]);

  const handleContinue = () => {
    if (currentStep === 'trade' && selectedTrade) {
      // Update user with selected trade
      if (user) {
        const trade = trades.find(t => t.id === selectedTrade);
        if (trade) {
          updateUser({
            trade: {
              id: trade.id,
              name: trade.name,
              color: trade.color,
            }
          });
        }
      }
      setCurrentStep('company');
    } else if (currentStep === 'company') {
      setCurrentStep('goals');
    } else if (currentStep === 'goals') {
      // Complete setup
      if (companySettings.name && selectedTrade) {
        const finalCompanySettings: CompanySettings = {
          name: companySettings.name!,
          type: companySettings.type!,
          baseHourlyRate: companySettings.baseHourlyRate!,
          commissionRates: companySettings.commissionRates!,
          partsMarkup: companySettings.partsMarkup!,
          emergencyMultiplier: companySettings.emergencyMultiplier!,
          weekendMultiplier: companySettings.weekendMultiplier!,
          afterHoursMultiplier: companySettings.afterHoursMultiplier!,
          holidayMultiplier: companySettings.holidayMultiplier!,
        };
        
        completeSetup(finalCompanySettings, dailyGoals);
        Alert.alert('Setup Complete!', 'Your TradesQuest profile is ready. Welcome to your adventure!');
      }
    }
  };

  const canContinue = () => {
    if (currentStep === 'trade') return selectedTrade !== null;
    if (currentStep === 'company') return companySettings.name && companySettings.name.length > 0;
    if (currentStep === 'goals') return true;
    return false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop' }}
            style={styles.headerImage}
          />
          <View style={styles.headerOverlay}>
            <Text style={styles.headerTitle}>Prepare Your Quest</Text>
            <Text style={styles.headerSubtitle}>
              {currentStep === 'trade' && 'Choose your trade specialization'}
              {currentStep === 'company' && 'Configure your company details'}
              {currentStep === 'goals' && 'Set your daily goals and targets'}
            </Text>
          </View>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressSteps}>
            {['trade', 'company', 'goals'].map((step, index) => (
              <View key={step} style={styles.progressStep}>
                <View style={[
                  styles.progressDot,
                  currentStep === step && styles.progressDotActive,
                  ['trade', 'company', 'goals'].indexOf(currentStep) > index && styles.progressDotCompleted
                ]} />
                {index < 2 && <View style={styles.progressLine} />}
              </View>
            ))}
          </View>
          <Text style={styles.progressText}>
            Step {['trade', 'company', 'goals'].indexOf(currentStep) + 1} of 3
          </Text>
        </View>

        {/* Trade Selection */}
        {currentStep === 'trade' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Shield color="#7c3aed" size={24} />
              <Text style={styles.sectionTitle}>Choose Your Trade</Text>
            </View>
            <Text style={styles.sectionDescription}>
              Select your primary trade specialization. This will customize your XP calculations, 
              achievements, and daily goals based on industry standards.
            </Text>
            
            <View style={styles.tradesGrid}>
              {trades.map((trade) => (
                <TradeCard
                  key={trade.id}
                  trade={trade}
                  isSelected={selectedTrade === trade.id}
                  onSelect={() => setSelectedTrade(trade.id)}
                />
              ))}
            </View>
          </View>
        )}

        {/* Company Configuration */}
        {currentStep === 'company' && selectedTradeData && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Building color="#7c3aed" size={24} />
              <Text style={styles.sectionTitle}>Company Details</Text>
            </View>
            <Text style={styles.sectionDescription}>
              Set up your company information and payment structure for accurate tracking.
            </Text>

            <View style={styles.companyCard}>
              <Text style={styles.companyCardTitle}>Company Information</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Company/Employer Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={companySettings.name}
                  onChangeText={(text) => setCompanySettings(prev => ({ ...prev, name: text }))}
                  placeholder="Enter company name"
                  placeholderTextColor="#94a3b8"
                  maxLength={50}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Payment Structure</Text>
                <View style={styles.paymentOptions}>
                  {[
                    { key: 'hourly', label: 'Hourly Rate', icon: <Clock color="#2563eb" size={20} /> },
                    { key: 'commission', label: 'Commission', icon: <TrendingUp color="#16a34a" size={20} /> },
                    { key: 'salary', label: 'Salary + Commission', icon: <DollarSign color="#f59e0b" size={20} /> }
                  ].map((option) => (
                    <TouchableOpacity
                      key={option.key}
                      style={[
                        styles.paymentOption,
                        companySettings.type === option.key && styles.paymentOptionSelected
                      ]}
                      onPress={() => setCompanySettings(prev => ({ ...prev, type: option.key as any }))}
                    >
                      <View style={styles.paymentOptionIcon}>
                        {option.icon}
                      </View>
                      <Text style={[
                        styles.paymentOptionText,
                        companySettings.type === option.key && styles.paymentOptionTextSelected
                      ]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Base Rate */}
              <CustomSlider
                label="Base Hourly Rate"
                value={companySettings.baseHourlyRate || 45}
                min={15}
                max={100}
                step={1}
                unit="$"
                color={selectedTradeData.color}
                onChange={(value) => setCompanySettings(prev => ({ 
                  ...prev, 
                  baseHourlyRate: value 
                }))}
                tooltip="Your base hourly wage before any commission or bonuses"
              />

              {/* Commission Rates */}
              {(companySettings.type === 'commission' || companySettings.type === 'salary') && tradeDefaults && (
                <>
                  <Text style={styles.commissionSectionTitle}>Commission Rates</Text>
                  
                  <CustomSlider
                    label="Service Calls"
                    value={companySettings.commissionRates?.serviceCalls || 15}
                    min={tradeDefaults.commissionDefaults.serviceCalls.min}
                    max={tradeDefaults.commissionDefaults.serviceCalls.max}
                    step={1}
                    unit="%"
                    color={selectedTradeData.color}
                    onChange={(value) => setCompanySettings(prev => ({ 
                      ...prev, 
                      commissionRates: { ...prev.commissionRates!, serviceCalls: value }
                    }))}
                    tooltip={`Industry average: ${tradeDefaults.commissionDefaults.serviceCalls.default}% for ${selectedTradeData.name}`}
                  />

                  <CustomSlider
                    label="Parts Sales"
                    value={companySettings.commissionRates?.parts || 12}
                    min={tradeDefaults.commissionDefaults.parts.min}
                    max={tradeDefaults.commissionDefaults.parts.max}
                    step={1}
                    unit="%"
                    color={selectedTradeData.color}
                    onChange={(value) => setCompanySettings(prev => ({ 
                      ...prev, 
                      commissionRates: { ...prev.commissionRates!, parts: value }
                    }))}
                    tooltip={`Industry average: ${tradeDefaults.commissionDefaults.parts.default}% for ${selectedTradeData.name}`}
                  />

                  <CustomSlider
                    label="Emergency Calls"
                    value={companySettings.commissionRates?.emergency || 22}
                    min={tradeDefaults.commissionDefaults.emergency.min}
                    max={tradeDefaults.commissionDefaults.emergency.max}
                    step={1}
                    unit="%"
                    color={selectedTradeData.color}
                    onChange={(value) => setCompanySettings(prev => ({ 
                      ...prev, 
                      commissionRates: { ...prev.commissionRates!, emergency: value }
                    }))}
                    tooltip={`Industry average: ${tradeDefaults.commissionDefaults.emergency.default}% for emergency calls`}
                  />

                  <CustomSlider
                    label="Parts Markup"
                    value={companySettings.partsMarkup || 35}
                    min={15}
                    max={100}
                    step={5}
                    unit="%"
                    color={selectedTradeData.color}
                    onChange={(value) => setCompanySettings(prev => ({ 
                      ...prev, 
                      partsMarkup: value 
                    }))}
                    tooltip={`Standard markup on parts sold to customers. Industry average: ${tradeDefaults.partsMarkupDefault}%`}
                  />
                </>
              )}
            </View>
          </View>
        )}

        {/* Goals Configuration */}
        {currentStep === 'goals' && selectedTradeData && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Target color="#7c3aed" size={24} />
              <Text style={styles.sectionTitle}>Set Your Goals</Text>
            </View>
            <Text style={styles.sectionDescription}>
              Configure your daily targets and expectations. These will be used to calculate 
              your XP rewards and track your progress.
            </Text>

            <View style={styles.goalCard}>
              <Text style={styles.goalCardTitle}>Daily Targets</Text>
              
              <CustomSlider
                label="Jobs per Day"
                value={dailyGoals.jobsPerDay}
                min={1}
                max={10}
                step={1}
                unit=""
                color={selectedTradeData.color}
                onChange={(value) => setDailyGoals(prev => ({ ...prev, jobsPerDay: value }))}
                tooltip="Target number of jobs to complete each day"
              />
              
              <CustomSlider
                label="Hours per Day"
                value={dailyGoals.hoursPerDay}
                min={4}
                max={12}
                step={0.5}
                unit="h"
                color={selectedTradeData.color}
                onChange={(value) => setDailyGoals(prev => ({ ...prev, hoursPerDay: value }))}
                tooltip="Target working hours per day"
              />
              
              <CustomSlider
                label="Daily Revenue Goal"
                value={dailyGoals.revenuePerDay}
                min={200}
                max={1000}
                step={20}
                unit="$"
                color={selectedTradeData.color}
                onChange={(value) => setDailyGoals(prev => ({ ...prev, revenuePerDay: value }))}
                tooltip="Target revenue to generate per day"
              />
              
              <CustomSlider
                label="Daily XP Goal"
                value={dailyGoals.xpPerDay}
                min={200}
                max={800}
                step={25}
                unit=" XP"
                color={selectedTradeData.color}
                onChange={(value) => setDailyGoals(prev => ({ ...prev, xpPerDay: value }))}
                tooltip="Target experience points to earn per day"
              />
            </View>

            <View style={styles.projectionCard}>
              <Text style={styles.projectionTitle}>Weekly Projections</Text>
              <View style={styles.projectionStats}>
                <View style={styles.projectionStat}>
                  <Text style={styles.projectionLabel}>Jobs</Text>
                  <Text style={[styles.projectionValue, { color: selectedTradeData.color }]}>
                    {dailyGoals.jobsPerDay * 5}
                  </Text>
                </View>
                <View style={styles.projectionStat}>
                  <Text style={styles.projectionLabel}>Revenue</Text>
                  <Text style={[styles.projectionValue, { color: selectedTradeData.color }]}>
                    ${(dailyGoals.revenuePerDay * 5).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.projectionStat}>
                  <Text style={styles.projectionLabel}>XP</Text>
                  <Text style={[styles.projectionValue, { color: selectedTradeData.color }]}>
                    {(dailyGoals.xpPerDay * 5).toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Quest Summary</Text>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Trade:</Text>
                <Text style={styles.summaryValue}>{selectedTradeData.name}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Company:</Text>
                <Text style={styles.summaryValue}>{companySettings.name}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Payment:</Text>
                <Text style={styles.summaryValue}>
                  {companySettings.type === 'hourly' ? 'Hourly' : 
                   companySettings.type === 'commission' ? 'Commission' : 'Salary + Commission'}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Daily Goal:</Text>
                <Text style={styles.summaryValue}>
                  {dailyGoals.jobsPerDay} jobs, ${dailyGoals.revenuePerDay}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Continue Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !canContinue() && styles.continueButtonDisabled,
              selectedTradeData && { backgroundColor: selectedTradeData.color }
            ]}
            onPress={handleContinue}
            disabled={!canContinue()}
          >
            <Text style={styles.continueButtonText}>
              {currentStep === 'goals' ? 'Start Your Quest' : 'Continue'}
            </Text>
            <ChevronRight color="#ffffff" size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    height: 200,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e2e8f0',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  progressContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  progressSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e2e8f0',
  },
  progressDotActive: {
    backgroundColor: '#7c3aed',
  },
  progressDotCompleted: {
    backgroundColor: '#16a34a',
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
    marginLeft: 12,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    marginBottom: 24,
  },
  tradesGrid: {
    gap: 16,
  },
  tradeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  tradeIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  tradeInfo: {
    flex: 1,
  },
  tradeName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  tradeDescription: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  tradeStats: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tradeStat: {
    fontSize: 12,
    color: '#475569',
    fontFamily: 'Inter-Medium',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  companyCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
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
  paymentOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  paymentOption: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  paymentOptionSelected: {
    backgroundColor: '#eff6ff',
    borderColor: '#2563eb',
  },
  paymentOptionIcon: {
    marginBottom: 8,
  },
  paymentOptionText: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  paymentOptionTextSelected: {
    color: '#2563eb',
  },
  commissionSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginTop: 20,
    marginBottom: 16,
  },
  sliderContainer: {
    marginBottom: 24,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sliderLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderLabel: {
    fontSize: 16,
    color: '#374151',
    fontFamily: 'Inter-Medium',
  },
  tooltipButton: {
    marginLeft: 8,
    padding: 4,
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  sliderTrack: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 4,
  },
  sliderThumb: {
    position: 'absolute',
    top: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: -8,
  },
  goalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  goalCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 20,
  },
  projectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  projectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  projectionStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectionStat: {
    alignItems: 'center',
  },
  projectionLabel: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  projectionValue: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
  },
  summaryValue: {
    fontSize: 14,
    color: '#0f172a',
    fontFamily: 'Inter-Medium',
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: '#7c3aed',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'Inter-SemiBold',
    marginRight: 8,
  },
});