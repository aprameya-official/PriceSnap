import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { TrendingUp, Hash } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

export function TrendingSearches() {
  const { colors } = useTheme();

  const handleTrendingPress = (search: any) => {
    Alert.alert('Trending Search', `Searching for "${search.term}" (${search.searches} searches)`);
  };

  const handleViewAllTrending = () => {
    Alert.alert('All Trending', 'View all trending searches');
  };

  const trendingSearches = [
    { id: 1, term: 'iPhone 15 Pro', searches: '12.5K', trend: '+15%' },
    { id: 2, term: 'Samsung Galaxy S24', searches: '8.2K', trend: '+8%' },
    { id: 3, term: 'MacBook Air M3', searches: '6.7K', trend: '+22%' },
    { id: 4, term: 'AirPods Pro', searches: '5.1K', trend: '+5%' },
    { id: 5, term: 'iPad Pro', searches: '4.8K', trend: '+12%' },
    { id: 6, term: 'PlayStation 5', searches: '4.2K', trend: '+18%' },
    { id: 7, term: 'Nintendo Switch', searches: '3.9K', trend: '+7%' },
    { id: 8, term: 'Dell XPS 13', searches: '3.5K', trend: '+10%' },
  ];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 20,
      marginVertical: 16,
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    header: {
      marginBottom: 20,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 4,
    },
    title: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    subtitle: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    searchList: {
      maxHeight: 300,
    },
    searchItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 4,
      gap: 12,
    },
    rankContainer: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rankNumber: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.textSecondary,
    },
    searchContent: {
      flex: 1,
    },
    searchTerm: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      marginBottom: 4,
    },
    searchStats: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    searchCount: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    trendIndicator: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.success,
    },
    trendIcon: {
      padding: 4,
    },
    viewMoreButton: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: 'center',
      marginTop: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    viewMoreText: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.secondary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <TrendingUp size={20} color={colors.warning} strokeWidth={2} />
          <Text style={styles.title}>Trending Searches</Text>
        </View>
        <Text style={styles.subtitle}>What others are looking for</Text>
      </View>

      <ScrollView style={styles.searchList} showsVerticalScrollIndicator={false}>
        {trendingSearches.map((search, index) => (
          <TouchableOpacity 
            key={search.id} 
            style={styles.searchItem}
            onPress={() => handleTrendingPress(search)}
          >
            <View style={styles.rankContainer}>
              <Text style={styles.rankNumber}>{index + 1}</Text>
            </View>
            
            <View style={styles.searchContent}>
              <Text style={styles.searchTerm}>{search.term}</Text>
              <View style={styles.searchStats}>
                <Hash size={12} color={colors.textSecondary} strokeWidth={2} />
                <Text style={styles.searchCount}>{search.searches} searches</Text>
                <Text style={styles.trendIndicator}>
                  {search.trend}
                </Text>
              </View>
            </View>

            <View style={styles.trendIcon}>
              <TrendingUp size={16} color={colors.success} strokeWidth={2} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.viewMoreButton} onPress={handleViewAllTrending}>
        <Text style={styles.viewMoreText}>View All Trending</Text>
      </TouchableOpacity>
    </View>
  );
}