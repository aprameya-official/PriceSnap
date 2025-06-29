import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ShoppingCart, Search, Heart, Bell, Gift, Zap } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

export function QuickActions() {
  const { colors } = useTheme();

  const handleActionPress = (actionName: string) => {
    Alert.alert(actionName, `${actionName} feature would open here`);
  };

  const actions = [
    { id: 1, icon: ShoppingCart, label: 'Shop Now', color: colors.secondary, bgColor: colors.colorScheme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#dbeafe' },
    { id: 2, icon: Search, label: 'Compare', color: colors.success, bgColor: colors.colorScheme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#d1fae5' },
    { id: 3, icon: Heart, label: 'Wishlist', color: colors.error, bgColor: colors.colorScheme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : '#fee2e2' },
    { id: 4, icon: Bell, label: 'Alerts', color: colors.warning, bgColor: colors.colorScheme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#fef3c7' },
    { id: 5, icon: Gift, label: 'Rewards', color: '#8b5cf6', bgColor: colors.colorScheme === 'dark' ? 'rgba(139, 92, 246, 0.2)' : '#ede9fe' },
    { id: 6, icon: Zap, label: 'Flash Sale', color: '#ec4899', bgColor: colors.colorScheme === 'dark' ? 'rgba(236, 72, 153, 0.2)' : '#fce7f3' },
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
    title: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 16,
    },
    actionsContainer: {
      gap: 16,
      paddingHorizontal: 4,
    },
    actionItem: {
      alignItems: 'center',
      minWidth: 80,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    actionLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actionsContainer}
      >
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            <TouchableOpacity 
              key={action.id} 
              style={styles.actionItem}
              onPress={() => handleActionPress(action.label)}
            >
              <View style={[styles.iconContainer, { backgroundColor: action.bgColor }]}>
                <IconComponent size={24} color={action.color} strokeWidth={2} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}