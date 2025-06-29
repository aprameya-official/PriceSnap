import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Clock, X } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

const recentSearches = [
  'Amul Milk 1L',
  'Maggi Noodles',
  'Organic Vegetables',
  'Tata Tea Premium',
  'Fortune Oil',
  'Surf Excel',
];

export function RecentSearches() {
  const { colors } = useTheme();

  const handleSearchPress = (search: string) => {
    Alert.alert('Search', `Searching for "${search}"`);
  };

  const handleRemoveSearch = (search: string) => {
    Alert.alert('Removed', `"${search}" removed from recent searches`);
  };

  const handleClearAll = () => {
    Alert.alert('Clear All', 'All recent searches cleared');
  };

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    title: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.textSecondary,
    },
    clearButton: {
      padding: 4,
    },
    clearText: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
    searchesContainer: {
      gap: 8,
    },
    searchChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      gap: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
    removeButton: {
      padding: 2,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Clock size={18} color={colors.textSecondary} strokeWidth={2} />
          <Text style={styles.title}>Recent Searches</Text>
        </View>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.searchesContainer}
      >
        {recentSearches.map((search, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.searchChip}
            onPress={() => handleSearchPress(search)}
          >
            <Text style={styles.searchText}>{search}</Text>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => handleRemoveSearch(search)}
            >
              <X size={14} color={colors.textTertiary} strokeWidth={2} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}