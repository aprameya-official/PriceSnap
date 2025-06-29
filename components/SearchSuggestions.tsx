import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { TrendingUp, Clock, Star, Zap } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

interface Suggestion {
  id: string;
  text: string;
  type: 'trending' | 'recent' | 'popular' | 'deal';
  icon: React.ReactNode;
  color: string;
}

export function SearchSuggestions() {
  const { colors } = useTheme();

  const handleSuggestionPress = (suggestion: Suggestion) => {
    Alert.alert('Search Suggestion', `Searching for "${suggestion.text}" (${suggestion.type})`);
  };

  const suggestions: Suggestion[] = [
    {
      id: '1',
      text: 'Organic vegetables',
      type: 'trending',
      icon: <TrendingUp size={16} color={colors.success} strokeWidth={2} />,
      color: colors.success,
    },
    {
      id: '2',
      text: 'Milk 1L',
      type: 'recent',
      icon: <Clock size={16} color={colors.textSecondary} strokeWidth={2} />,
      color: colors.textSecondary,
    },
    {
      id: '3',
      text: 'Premium tea',
      type: 'popular',
      icon: <Star size={16} color={colors.warning} strokeWidth={2} />,
      color: colors.warning,
    },
    {
      id: '4',
      text: 'Flash sale items',
      type: 'deal',
      icon: <Zap size={16} color={colors.error} strokeWidth={2} />,
      color: colors.error,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 24,
    },
    title: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginBottom: 16,
    },
    suggestionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    suggestionCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      width: '48%',
      alignItems: 'center',
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    iconContainer: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    suggestionText: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 4,
    },
    suggestionType: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      textTransform: 'capitalize',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💡 Smart Suggestions</Text>
      <Text style={styles.subtitle}>Based on your shopping patterns</Text>
      
      <View style={styles.suggestionsGrid}>
        {suggestions.map((suggestion) => (
          <TouchableOpacity 
            key={suggestion.id} 
            style={styles.suggestionCard}
            onPress={() => handleSuggestionPress(suggestion)}
          >
            <View style={[styles.iconContainer, { backgroundColor: `${suggestion.color}20` }]}>
              {suggestion.icon}
            </View>
            <Text style={styles.suggestionText}>{suggestion.text}</Text>
            <Text style={[styles.suggestionType, { color: suggestion.color }]}>
              {suggestion.type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}