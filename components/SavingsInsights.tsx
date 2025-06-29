import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TrendingUp, Target, Calendar, ArrowRight } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

export function SavingsInsights() {
  const { colors } = useTheme();

  const handleViewAll = () => {
    Alert.alert('Savings Insights', 'Detailed insights would open here');
  };

  const insights = [
    {
      id: 1,
      icon: TrendingUp,
      title: 'Weekly Savings',
      value: '₹3,247',
      change: '+12%',
      color: colors.success,
      bgColor: colors.colorScheme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#d1fae5',
    },
    {
      id: 2,
      icon: Target,
      title: 'Monthly Goal',
      value: '₹15,000',
      progress: '68%',
      color: colors.secondary,
      bgColor: colors.colorScheme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#dbeafe',
    },
    {
      id: 3,
      icon: Calendar,
      title: 'Best Day',
      value: 'Tuesday',
      subtitle: 'Avg ₹450 saved',
      color: '#8b5cf6',
      bgColor: colors.colorScheme === 'dark' ? 'rgba(139, 92, 246, 0.2)' : '#ede9fe',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 8,
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    viewAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    viewAllText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
    insightsGrid: {
      gap: 12,
    },
    insightCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      gap: 12,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    insightContent: {
      flex: 1,
    },
    insightTitle: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      marginBottom: 2,
    },
    insightValue: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 2,
    },
    insightChange: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
    },
    insightProgress: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
    insightSubtitle: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>💡 Savings Insights</Text>
        <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAll}>
          <Text style={styles.viewAllText}>View All</Text>
          <ArrowRight size={16} color={colors.textSecondary} strokeWidth={2} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.insightsGrid}>
        {insights.map((insight) => {
          const IconComponent = insight.icon;
          return (
            <TouchableOpacity key={insight.id} style={styles.insightCard}>
              <View style={[styles.iconContainer, { backgroundColor: insight.bgColor }]}>
                <IconComponent size={20} color={insight.color} strokeWidth={2} />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <Text style={styles.insightValue}>{insight.value}</Text>
                {insight.change && (
                  <Text style={[styles.insightChange, { color: insight.color }]}>
                    {insight.change}
                  </Text>
                )}
                {insight.progress && (
                  <Text style={styles.insightProgress}>{insight.progress} complete</Text>
                )}
                {insight.subtitle && (
                  <Text style={styles.insightSubtitle}>{insight.subtitle}</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}