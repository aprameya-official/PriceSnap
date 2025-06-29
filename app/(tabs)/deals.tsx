import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Alert,
  RefreshControl,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Filter, SlidersHorizontal, Grid3x3, List, Search, Star, TrendingUp, TrendingDown, Heart, ShoppingCart } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { ProductCard } from '@/components/ProductCard';
import { mockProducts } from '@/data/mockData';

const { width } = Dimensions.get('window');

interface SortOption {
  id: string;
  label: string;
  value: string;
}

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

export default function AllDealsScreen() {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState('bestPrice');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions: SortOption[] = [
    { id: 'bestPrice', label: 'Best Price', value: 'bestPrice' },
    { id: 'savings', label: 'Highest Savings', value: 'savings' },
    { id: 'trending', label: 'Trending', value: 'trending' },
    { id: 'newest', label: 'Newest', value: 'newest' },
    { id: 'rating', label: 'Top Rated', value: 'rating' },
  ];

  const categoryFilters: FilterOption[] = [
    { id: 'all', label: 'All Categories', count: mockProducts.length },
    { id: 'groceries', label: 'Groceries', count: mockProducts.filter(p => p.category === 'Groceries').length },
    { id: 'electronics', label: 'Electronics', count: mockProducts.filter(p => p.category === 'Electronics').length },
    { id: 'food', label: 'Food', count: mockProducts.filter(p => p.category === 'Food').length },
    { id: 'medicine', label: 'Medicine', count: mockProducts.filter(p => p.category === 'Medicine').length },
    { id: 'fashion', label: 'Fashion', count: mockProducts.filter(p => p.category === 'Fashion').length },
    { id: 'books', label: 'Books', count: mockProducts.filter(p => p.category === 'Books').length },
  ];

  const priceRangeFilters: FilterOption[] = [
    { id: 'all', label: 'All Prices', count: mockProducts.length },
    { id: 'under50', label: 'Under ₹50', count: mockProducts.filter(p => p.bestPrice < 50).length },
    { id: '50-200', label: '₹50 - ₹200', count: mockProducts.filter(p => p.bestPrice >= 50 && p.bestPrice <= 200).length },
    { id: '200-1000', label: '₹200 - ₹1,000', count: mockProducts.filter(p => p.bestPrice > 200 && p.bestPrice <= 1000).length },
    { id: '1000-10000', label: '₹1,000 - ₹10,000', count: mockProducts.filter(p => p.bestPrice > 1000 && p.bestPrice <= 10000).length },
    { id: 'above10000', label: 'Above ₹10,000', count: mockProducts.filter(p => p.bestPrice > 10000).length },
  ];

  const getFilteredAndSortedProducts = () => {
    let filtered = [...mockProducts];

    // Apply category filter
    if (selectedCategory !== 'All') {
      const categoryMap: { [key: string]: string } = {
        'groceries': 'Groceries',
        'electronics': 'Electronics',
        'food': 'Food',
        'medicine': 'Medicine',
        'fashion': 'Fashion',
        'books': 'Books'
      };
      const categoryName = categoryMap[selectedCategory.toLowerCase()];
      if (categoryName) {
        filtered = filtered.filter(product => product.category === categoryName);
      }
    }

    // Apply price range filter
    if (selectedPriceRange !== 'All') {
      switch (selectedPriceRange) {
        case 'under50':
          filtered = filtered.filter(p => p.bestPrice < 50);
          break;
        case '50-200':
          filtered = filtered.filter(p => p.bestPrice >= 50 && p.bestPrice <= 200);
          break;
        case '200-1000':
          filtered = filtered.filter(p => p.bestPrice > 200 && p.bestPrice <= 1000);
          break;
        case '1000-10000':
          filtered = filtered.filter(p => p.bestPrice > 1000 && p.bestPrice <= 10000);
          break;
        case 'above10000':
          filtered = filtered.filter(p => p.bestPrice > 10000);
          break;
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'bestPrice':
        filtered.sort((a, b) => a.bestPrice - b.bestPrice);
        break;
      case 'savings':
        filtered.sort((a, b) => b.savings - a.savings);
        break;
      case 'trending':
        filtered.sort((a, b) => b.trendPercentage - a.trendPercentage);
        break;
      case 'newest':
        // Simulate newest by reversing the array
        filtered.reverse();
        break;
      case 'rating':
        // Simulate rating sort by using trend as proxy
        filtered.sort((a, b) => (b.trend === 'down' ? 1 : 0) - (a.trend === 'down' ? 1 : 0));
        break;
    }

    return filtered;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Refreshed', 'Latest deals and prices updated!');
    }, 2000);
  }, []);

  const handleBackPress = () => {
    Alert.alert('Navigation', 'Would navigate back to home screen');
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    Alert.alert('Sort Applied', `Sorting by ${sortOptions.find(s => s.id === newSort)?.label}`);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    Alert.alert('Filter Applied', `Showing ${category} products`);
  };

  const handlePriceRangeFilter = (range: string) => {
    setSelectedPriceRange(range);
    Alert.alert('Filter Applied', `Showing ${range} price range`);
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedPriceRange('All');
    setSortBy('bestPrice');
    Alert.alert('Filters Cleared', 'All filters have been reset');
  };

  const handleProductPress = (product: typeof mockProducts[0]) => {
    Alert.alert(
      product.name,
      `Best price: ₹${product.bestPrice}\nSavings: ₹${product.savings}\nCategory: ${product.category}\nTrend: ${product.trend} ${product.trendPercentage}%`
    );
  };

  const filteredProducts = getFilteredAndSortedProducts();
  const activeFiltersCount = (selectedCategory !== 'All' ? 1 : 0) + (selectedPriceRange !== 'All' ? 1 : 0);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    header: {
      paddingTop: 20,
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
    headerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    headerTitle: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: '#ffffff',
    },
    headerActions: {
      flexDirection: 'row',
      gap: 12,
    },
    headerButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      position: 'relative',
    },
    filterBadge: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.error,
    },
    headerStats: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: '#ffffff',
    },
    statLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: 'rgba(255, 255, 255, 0.8)',
    },
    controlsContainer: {
      backgroundColor: colors.card,
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    controlsTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    resultsInfo: {
      flex: 1,
    },
    resultsText: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    resultsSubtext: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginTop: 2,
    },
    controlsRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    viewToggle: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 8,
      padding: 2,
    },
    viewButton: {
      padding: 8,
      borderRadius: 6,
    },
    viewButtonActive: {
      backgroundColor: colors.secondary,
    },
    sortButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 16,
      gap: 6,
    },
    sortText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.textSecondary,
    },
    filtersRow: {
      flexDirection: 'row',
      gap: 12,
    },
    filterChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 6,
    },
    filterChipActive: {
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
    },
    filterChipText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.textSecondary,
    },
    filterChipTextActive: {
      color: '#ffffff',
    },
    clearFiltersButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 16,
      backgroundColor: colors.error,
    },
    clearFiltersText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: '#ffffff',
    },
    filtersModal: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
      zIndex: 1000,
    },
    filtersContent: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 20,
      paddingVertical: 24,
      maxHeight: '80%',
    },
    filtersHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    filtersTitle: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterSection: {
      marginBottom: 24,
    },
    filterSectionTitle: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 12,
    },
    filterOptions: {
      gap: 8,
    },
    filterOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    filterOptionActive: {
      borderColor: colors.secondary,
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#f0f9ff',
    },
    filterOptionText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.text,
    },
    filterOptionCount: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      backgroundColor: colors.surface,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    productsList: {
      flex: 1,
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 10,
      gap: 10,
    },
    gridProductCard: {
      width: (width - 40) / 2,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 12,
      marginBottom: 10,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 80,
      paddingHorizontal: 40,
    },
    emptyIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    emptyTitle: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptyText: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 32,
    },
    bottomSpacing: {
      height: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Enhanced Header */}
      <LinearGradient
        colors={colors.gradient}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
              <ArrowLeft size={20} color="#ffffff" strokeWidth={2} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>All Deals</Text>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Search size={20} color="#ffffff" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton} 
              onPress={() => setShowFilters(true)}
            >
              <SlidersHorizontal size={20} color="#ffffff" strokeWidth={2} />
              {activeFiltersCount > 0 && <View style={styles.filterBadge} />}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.headerStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{filteredProducts.length}</Text>
            <Text style={styles.statLabel}>Products</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              ₹{filteredProducts.reduce((sum, p) => sum + p.savings, 0).toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Total Savings</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {filteredProducts.filter(p => p.trend === 'down').length}
            </Text>
            <Text style={styles.statLabel}>Price Drops</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.controlsTop}>
          <View style={styles.resultsInfo}>
            <Text style={styles.resultsText}>
              {filteredProducts.length} deals found
            </Text>
            <Text style={styles.resultsSubtext}>
              {selectedCategory !== 'All' && `in ${selectedCategory} • `}
              {selectedPriceRange !== 'All' && `${selectedPriceRange} • `}
              Sorted by {sortOptions.find(s => s.id === sortBy)?.label}
            </Text>
          </View>
          
          <View style={styles.controlsRight}>
            <View style={styles.viewToggle}>
              <TouchableOpacity 
                style={[styles.viewButton, viewMode === 'list' && styles.viewButtonActive]}
                onPress={() => setViewMode('list')}
              >
                <List size={16} color={viewMode === 'list' ? '#ffffff' : colors.textSecondary} strokeWidth={2} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.viewButton, viewMode === 'grid' && styles.viewButtonActive]}
                onPress={() => setViewMode('grid')}
              >
                <Grid3x3 size={16} color={viewMode === 'grid' ? '#ffffff' : colors.textSecondary} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
        >
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.filterChip,
                sortBy === option.id && styles.filterChipActive
              ]}
              onPress={() => handleSortChange(option.id)}
            >
              <Text style={[
                styles.filterChipText,
                sortBy === option.id && styles.filterChipTextActive
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
          
          {activeFiltersCount > 0 && (
            <TouchableOpacity style={styles.clearFiltersButton} onPress={handleClearFilters}>
              <Text style={styles.clearFiltersText}>Clear ({activeFiltersCount})</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

      {/* Products List */}
      <ScrollView 
        style={styles.productsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <ShoppingCart size={32} color={colors.textTertiary} strokeWidth={1} />
            </View>
            <Text style={styles.emptyTitle}>No deals found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your filters or search criteria to find more deals.
            </Text>
          </View>
        ) : viewMode === 'list' ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <View style={styles.gridContainer}>
            {filteredProducts.map((product) => (
              <TouchableOpacity 
                key={product.id} 
                style={styles.gridProductCard}
                onPress={() => handleProductPress(product)}
              >
                <Text numberOfLines={2}>{product.name}</Text>
                <Text>₹{product.bestPrice}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Filters Modal */}
      {showFilters && (
        <View style={styles.filtersModal}>
          <TouchableOpacity 
            style={{ flex: 1 }} 
            onPress={() => setShowFilters(false)} 
          />
          <View style={styles.filtersContent}>
            <View style={styles.filtersHeader}>
              <Text style={styles.filtersTitle}>Filters & Sort</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowFilters(false)}
              >
                <ArrowLeft size={16} color={colors.textSecondary} strokeWidth={2} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Category Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Category</Text>
                <View style={styles.filterOptions}>
                  {categoryFilters.map((filter) => (
                    <TouchableOpacity
                      key={filter.id}
                      style={[
                        styles.filterOption,
                        selectedCategory.toLowerCase() === filter.id && styles.filterOptionActive
                      ]}
                      onPress={() => handleCategoryFilter(filter.label)}
                    >
                      <Text style={styles.filterOptionText}>{filter.label}</Text>
                      <Text style={styles.filterOptionCount}>{filter.count}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Price Range Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Price Range</Text>
                <View style={styles.filterOptions}>
                  {priceRangeFilters.map((filter) => (
                    <TouchableOpacity
                      key={filter.id}
                      style={[
                        styles.filterOption,
                        selectedPriceRange.toLowerCase() === filter.id && styles.filterOptionActive
                      ]}
                      onPress={() => handlePriceRangeFilter(filter.label)}
                    >
                      <Text style={styles.filterOptionText}>{filter.label}</Text>
                      <Text style={styles.filterOptionCount}>{filter.count}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}