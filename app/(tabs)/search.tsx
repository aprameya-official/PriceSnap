import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Animated, 
  Alert,
  Dimensions,
  Platform
} from 'react-native';
import { Search, Filter, SlidersHorizontal, X, Mic, Camera, Sparkles, TrendingUp, Clock, Star, Zap, ArrowRight, Grid3x3 as Grid3X3, List, MapPin, ShoppingBag, Pill, Smartphone, UtensilsCrossed, Shirt, Chrome as Home, BookOpen } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProductCard } from '@/components/ProductCard';
import { FilterModal } from '@/components/FilterModal';
import { mockProducts, categoryPlatforms, categoryIcons } from '@/data/mockData';
import { useTheme } from '@/hooks/useTheme';

const { width, height } = Dimensions.get('window');

interface QuickFilter {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

interface TrendingItem {
  id: string;
  term: string;
  searches: string;
  trend: string;
  category: string;
}

interface RecentSearch {
  id: string;
  term: string;
  timestamp: string;
  category: string;
}

export default function SearchScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState('relevance');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const searchAnimation = useRef(new Animated.Value(0)).current;
  const suggestionAnimation = useRef(new Animated.Value(0)).current;
  const headerAnimation = useRef(new Animated.Value(0)).current;

  const categories = Object.keys(categoryPlatforms);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Groceries':
        return <ShoppingBag size={16} color="#ffffff" strokeWidth={2} />;
      case 'Electronics':
        return <Smartphone size={16} color="#ffffff" strokeWidth={2} />;
      case 'Food':
        return <UtensilsCrossed size={16} color="#ffffff" strokeWidth={2} />;
      case 'Medicine':
        return <Pill size={16} color="#ffffff" strokeWidth={2} />;
      case 'Fashion':
        return <Shirt size={16} color="#ffffff" strokeWidth={2} />;
      case 'Home & Garden':
        return <Home size={16} color="#ffffff" strokeWidth={2} />;
      case 'Books':
        return <BookOpen size={16} color="#ffffff" strokeWidth={2} />;
      default:
        return <Search size={16} color="#ffffff" strokeWidth={2} />;
    }
  };

  const quickFilters: QuickFilter[] = [
    {
      id: '1',
      label: 'On Sale',
      icon: <Zap size={16} color="#ffffff" strokeWidth={2} />,
      color: '#ffffff',
      bgColor: colors.error,
    },
    {
      id: '2',
      label: 'Free Delivery',
      icon: <ShoppingBag size={16} color="#ffffff" strokeWidth={2} />,
      color: '#ffffff',
      bgColor: colors.success,
    },
    {
      id: '3',
      label: 'Top Rated',
      icon: <Star size={16} color="#ffffff" strokeWidth={2} />,
      color: '#ffffff',
      bgColor: colors.warning,
    },
    {
      id: '4',
      label: 'Near Me',
      icon: <MapPin size={16} color="#ffffff" strokeWidth={2} />,
      color: '#ffffff',
      bgColor: colors.secondary,
    },
  ];

  const trendingSearches: TrendingItem[] = [
    { id: '1', term: 'iPhone 15 Pro', searches: '12.5K', trend: '+15%', category: 'Electronics' },
    { id: '2', term: 'Organic Vegetables', searches: '8.2K', trend: '+8%', category: 'Groceries' },
    { id: '3', term: 'Chicken Biryani', searches: '6.7K', trend: '+22%', category: 'Food' },
    { id: '4', term: 'Vitamin D3', searches: '5.1K', trend: '+5%', category: 'Medicine' },
    { id: '5', term: 'Nike Shoes', searches: '4.8K', trend: '+12%', category: 'Fashion' },
  ];

  const recentSearches: RecentSearch[] = [
    { id: '1', term: 'Paracetamol tablets', timestamp: '2 hours ago', category: 'Medicine' },
    { id: '2', term: 'Samsung Galaxy S24', timestamp: '1 day ago', category: 'Electronics' },
    { id: '3', term: 'Margherita Pizza', timestamp: '2 days ago', category: 'Food' },
    { id: '4', term: 'Amul Milk 1L', timestamp: '3 days ago', category: 'Groceries' },
  ];

  const aiSuggestions = [
    'Try "generic medicines" for better prices',
    'Search "combo offers" for electronics deals',
    'Look for "restaurant combos" for food savings',
    'Find "bulk groceries" for wholesale rates',
  ];

  useEffect(() => {
    Animated.timing(searchAnimation, {
      toValue: isSearchFocused ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(suggestionAnimation, {
      toValue: showSuggestions ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isSearchFocused, showSuggestions]);

  useEffect(() => {
    Animated.timing(headerAnimation, {
      toValue: searchQuery.length > 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [searchQuery]);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPlatforms = selectedPlatforms.length === 0 || 
      product.prices.some(price => selectedPlatforms.includes(price.platform));
    
    return matchesSearch && matchesCategory && matchesPlatforms;
  });

  const hasActiveFilters = selectedPlatforms.length > 0 || selectedCategory !== 'All';

  const handleVoiceSearch = () => {
    if (Platform.OS !== 'web') {
      Alert.alert('Voice Search', 'Voice search would be activated here');
    } else {
      Alert.alert('Voice Search', 'Voice search is not available on web');
    }
  };

  const handleCameraSearch = () => {
    Alert.alert('Visual Search', 'Camera search would be activated here');
  };

  const handleClearFilters = () => {
    setSelectedPlatforms([]);
    setSelectedCategory('All');
    Alert.alert('Filters Cleared', 'All filters have been cleared');
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    setTimeout(() => setShowSuggestions(false), 100);
  };

  const handleTrendingPress = (item: TrendingItem) => {
    setSearchQuery(item.term);
    setSelectedCategory(item.category);
    setShowSuggestions(false);
    Alert.alert('Trending Search', `Searching for "${item.term}" in ${item.category} (${item.searches} searches)`);
  };

  const handleRecentPress = (item: RecentSearch) => {
    setSearchQuery(item.term);
    setSelectedCategory(item.category);
    setShowSuggestions(false);
    Alert.alert('Recent Search', `Searching for "${item.term}" in ${item.category}`);
  };

  const handleQuickFilterPress = (filter: QuickFilter) => {
    Alert.alert(filter.label, `Applied ${filter.label} filter`);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Auto-clear platform filters when switching categories to show relevant platforms
    setSelectedPlatforms([]);
  };

  const getAvailablePlatforms = () => {
    return categoryPlatforms[selectedCategory as keyof typeof categoryPlatforms] || [];
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    header: {
      paddingTop: 20,
      paddingBottom: 16,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16,
    },
    searchInputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 14,
      gap: 12,
      borderWidth: 2,
      borderColor: colors.border,
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 12,
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      elevation: 8,
    },
    searchInputFocused: {
      borderColor: colors.secondary,
      shadowOpacity: colors.colorScheme === 'dark' ? 0.4 : 0.2,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.text,
    },
    searchActions: {
      flexDirection: 'row',
      gap: 8,
    },
    actionButton: {
      padding: 6,
      borderRadius: 8,
      backgroundColor: colors.surface,
    },
    clearButton: {
      padding: 4,
    },
    filterButton: {
      padding: 12,
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: colors.border,
      position: 'relative',
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    filterButtonActive: {
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
    },
    filterBadge: {
      position: 'absolute',
      top: 6,
      right: 6,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.error,
    },
    quickFiltersContainer: {
      marginBottom: 16,
    },
    quickFiltersScroll: {
      paddingHorizontal: 20,
      gap: 12,
    },
    quickFilterChip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      gap: 8,
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    quickFilterText: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
    },
    aiSuggestion: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      paddingHorizontal: 20,
      paddingVertical: 16,
      gap: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    aiSuggestionGradient: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    aiSuggestionText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      flex: 1,
    },
    categoryContainer: {
      backgroundColor: colors.card,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    categoryScroll: {
      paddingHorizontal: 20,
      gap: 12,
    },
    categoryChip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.surface,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 8,
    },
    categoryChipActive: {
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
    },
    categoryText: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.textSecondary,
    },
    categoryTextActive: {
      color: '#ffffff',
    },
    categoryEmoji: {
      fontSize: 16,
    },
    platformInfo: {
      backgroundColor: colors.card,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    platformInfoText: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      textAlign: 'center',
    },
    platformCount: {
      fontSize: 12,
      fontFamily: 'Inter-Bold',
      color: colors.secondary,
    },
    suggestionsOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.surface,
      zIndex: 1000,
    },
    suggestionsContainer: {
      flex: 1,
      paddingTop: 120,
    },
    suggestionsSection: {
      paddingHorizontal: 20,
      paddingVertical: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    sectionSubtitle: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginBottom: 16,
    },
    trendingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: 8,
      gap: 12,
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    trendingRank: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    trendingRankText: {
      fontSize: 12,
      fontFamily: 'Inter-Bold',
      color: colors.textSecondary,
    },
    trendingContent: {
      flex: 1,
    },
    trendingTerm: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 4,
    },
    trendingStats: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    trendingSearches: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    trendingChange: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.success,
    },
    trendingCategory: {
      fontSize: 10,
      fontFamily: 'Inter-Medium',
      color: colors.textTertiary,
      backgroundColor: colors.surface,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
    },
    recentItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: 8,
      gap: 12,
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    recentIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    recentContent: {
      flex: 1,
    },
    recentTerm: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      marginBottom: 4,
    },
    recentMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    recentTime: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    resultsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
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
    resultsActions: {
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
    productsList: {
      flex: 1,
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
    clearFiltersButton: {
      backgroundColor: colors.secondary,
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 24,
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
    clearFiltersText: {
      color: '#ffffff',
      fontSize: 16,
      fontFamily: 'Inter-Bold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Enhanced Header with Gradient */}
      <LinearGradient
        colors={colors.gradient}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.searchContainer}>
          <Animated.View style={[
            styles.searchInputContainer,
            isSearchFocused && styles.searchInputFocused,
            {
              transform: [{
                scale: searchAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.02],
                })
              }]
            }
          ]}>
            <Search size={20} color={colors.textSecondary} strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products, brands, or categories..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              placeholderTextColor={colors.textTertiary}
            />
            {searchQuery.length > 0 ? (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                <X size={18} color={colors.textSecondary} strokeWidth={2} />
              </TouchableOpacity>
            ) : (
              <View style={styles.searchActions}>
                <TouchableOpacity style={styles.actionButton} onPress={handleVoiceSearch}>
                  <Mic size={18} color={colors.textSecondary} strokeWidth={2} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleCameraSearch}>
                  <Camera size={18} color={colors.textSecondary} strokeWidth={2} />
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
          
          <TouchableOpacity
            style={[styles.filterButton, hasActiveFilters && styles.filterButtonActive]}
            onPress={() => setShowFilters(true)}
          >
            <SlidersHorizontal 
              size={20} 
              color={hasActiveFilters ? "#ffffff" : colors.textSecondary} 
              strokeWidth={2} 
            />
            {hasActiveFilters && <View style={styles.filterBadge} />}
          </TouchableOpacity>
        </View>

        {/* Quick Filters */}
        <View style={styles.quickFiltersContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickFiltersScroll}
          >
            {quickFilters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[styles.quickFilterChip, { backgroundColor: filter.bgColor }]}
                onPress={() => handleQuickFilterPress(filter)}
              >
                {filter.icon}
                <Text style={[styles.quickFilterText, { color: filter.color }]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </LinearGradient>

      {/* AI Suggestion */}
      {searchQuery.length > 0 && (
        <View style={styles.aiSuggestion}>
          <LinearGradient
            colors={['#8b5cf6', '#a855f7']}
            style={styles.aiSuggestionGradient}
          >
            <Sparkles size={16} color="#ffffff" strokeWidth={2} />
          </LinearGradient>
          <Text style={styles.aiSuggestionText}>
            AI suggests: {aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]}
          </Text>
          <ArrowRight size={16} color={colors.textSecondary} strokeWidth={2} />
        </View>
      )}

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              {getCategoryIcon(category)}
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Platform Info */}
      {selectedCategory !== 'All' && (
        <View style={styles.platformInfo}>
          <Text style={styles.platformInfoText}>
            Comparing prices from <Text style={styles.platformCount}>{getAvailablePlatforms().length}</Text> platforms for {selectedCategory}
          </Text>
        </View>
      )}

      {/* Suggestions Overlay */}
      {showSuggestions && (
        <Animated.View 
          style={[
            styles.suggestionsOverlay,
            {
              opacity: suggestionAnimation,
              transform: [{
                translateY: suggestionAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                })
              }]
            }
          ]}
        >
          <ScrollView style={styles.suggestionsContainer} showsVerticalScrollIndicator={false}>
            {/* Trending Searches */}
            <View style={styles.suggestionsSection}>
              <Text style={styles.sectionTitle}>🔥 Trending Now</Text>
              <Text style={styles.sectionSubtitle}>What others are searching for</Text>
              {trendingSearches.map((item, index) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.trendingItem}
                  onPress={() => handleTrendingPress(item)}
                >
                  <View style={styles.trendingRank}>
                    <Text style={styles.trendingRankText}>{index + 1}</Text>
                  </View>
                  <View style={styles.trendingContent}>
                    <Text style={styles.trendingTerm}>{item.term}</Text>
                    <View style={styles.trendingStats}>
                      <Text style={styles.trendingSearches}>{item.searches} searches</Text>
                      <Text style={styles.trendingChange}>{item.trend}</Text>
                      <Text style={styles.trendingCategory}>{item.category}</Text>
                    </View>
                  </View>
                  <TrendingUp size={16} color={colors.success} strokeWidth={2} />
                </TouchableOpacity>
              ))}
            </View>

            {/* Recent Searches */}
            <View style={styles.suggestionsSection}>
              <Text style={styles.sectionTitle}>🕒 Recent Searches</Text>
              <Text style={styles.sectionSubtitle}>Your search history</Text>
              {recentSearches.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.recentItem}
                  onPress={() => handleRecentPress(item)}
                >
                  <View style={styles.recentIcon}>
                    <Clock size={16} color={colors.textSecondary} strokeWidth={2} />
                  </View>
                  <View style={styles.recentContent}>
                    <Text style={styles.recentTerm}>{item.term}</Text>
                    <View style={styles.recentMeta}>
                      <Text style={styles.recentTime}>{item.timestamp}</Text>
                      <Text style={styles.trendingCategory}>{item.category}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      )}

      {/* Search Results */}
      {searchQuery.length > 0 && !showSuggestions && (
        <>
          {/* Results Header */}
          <View style={styles.resultsHeader}>
            <View style={styles.resultsInfo}>
              <Text style={styles.resultsText}>
                {filteredProducts.length} results found
              </Text>
              <Text style={styles.resultsSubtext}>
                for "{searchQuery}" in {selectedCategory} {selectedPlatforms.length > 0 && `• ${selectedPlatforms.length} platform filter(s)`}
              </Text>
            </View>
            
            <View style={styles.resultsActions}>
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
                  <Grid3X3 size={16} color={viewMode === 'grid' ? '#ffffff' : colors.textSecondary} strokeWidth={2} />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.sortButton}>
                <Text style={styles.sortText}>Best Price</Text>
                <ArrowRight size={12} color={colors.textSecondary} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Products List */}
          <ScrollView style={styles.productsList} showsVerticalScrollIndicator={false}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filteredProducts.length === 0 && (
              <View style={styles.emptyState}>
                <View style={styles.emptyIcon}>
                  <Search size={32} color={colors.textTertiary} strokeWidth={1} />
                </View>
                <Text style={styles.emptyTitle}>No products found</Text>
                <Text style={styles.emptyText}>
                  We couldn't find any products matching your search criteria in {selectedCategory}. Try adjusting your filters or search terms.
                </Text>
                <TouchableOpacity style={styles.clearFiltersButton} onPress={handleClearFilters}>
                  <Text style={styles.clearFiltersText}>Clear All Filters</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </>
      )}

      {/* Filter Modal */}
      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        selectedPlatforms={selectedPlatforms}
        onPlatformsChange={setSelectedPlatforms}
        selectedCategory={selectedCategory}
        availablePlatforms={getAvailablePlatforms()}
      />
    </SafeAreaView>
  );
}