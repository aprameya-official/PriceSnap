import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions, 
  Alert, 
  Image,
  RefreshControl 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, MapPin, Clock, Star, Zap, Bell, ShoppingCart, Smartphone, UtensilsCrossed, Pill, Shirt, Chrome as Home, BookOpen, ShoppingBag, ArrowRight, Target, Award, Wallet, Eye, Heart, Filter, Sparkles, Gift, Users, TrendingDown as TrendDown, Percent, Calendar, ChartBar as BarChart3, DollarSign, Package, Baby, Car, Gamepad2, Dumbbell, Palette, Wrench } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { mockProducts, categoryIcons } from '@/data/mockData';
import { ProductCard } from '@/components/ProductCard';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

interface InsightCard {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  trend?: string;
}

interface CategoryTab {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  dealCount: number;
  productCount: number;
}

interface PersonalizedRecommendation {
  id: string;
  title: string;
  subtitle: string;
  product: typeof mockProducts[0];
  reason: string;
  icon: React.ReactNode;
  color: string;
  priority: 'high' | 'medium' | 'low';
}

export default function HomeScreen() {
  const { colors } = useTheme();
  const [selectedLocation, setSelectedLocation] = useState('Mumbai, Maharashtra');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [userName] = useState('Rahul');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // User stats
  const [userStats] = useState({
    todaySavings: 1247,
    weeklyTarget: 5000,
    totalComparisons: 187,
    activeFavorites: 23,
    monthlyRank: 12,
    streakDays: 7
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const savingsProgress = (userStats.todaySavings / userStats.weeklyTarget) * 100;

  // Compact insights data
  const insightCards: InsightCard[] = [
    {
      id: '1',
      title: 'Today\'s Savings',
      value: `₹${userStats.todaySavings.toLocaleString()}`,
      subtitle: `${Math.round(savingsProgress)}% of goal`,
      icon: <Wallet size={18} color="#ffffff" strokeWidth={2} />,
      color: '#ffffff',
      bgColor: colors.success,
      trend: '+12%'
    },
    {
      id: '2',
      title: 'Active Deals',
      value: '47',
      subtitle: 'Ending soon',
      icon: <Zap size={18} color="#ffffff" strokeWidth={2} />,
      color: '#ffffff',
      bgColor: colors.warning,
      trend: '+5'
    },
    {
      id: '3',
      title: 'Total Saved',
      value: '₹12.4K',
      subtitle: 'This month',
      icon: <DollarSign size={18} color="#ffffff" strokeWidth={2} />,
      color: '#ffffff',
      bgColor: '#8b5cf6',
      trend: '↑15%'
    },
    {
      id: '4',
      title: 'Comparisons',
      value: `${userStats.totalComparisons}`,
      subtitle: 'Products',
      icon: <BarChart3 size={18} color="#ffffff" strokeWidth={2} />,
      color: '#ffffff',
      bgColor: colors.secondary,
      trend: '+23'
    }
  ];

  // Compact category tabs - smaller and more professional
  const categoryTabs: CategoryTab[] = [
    {
      id: 'all',
      name: 'All',
      icon: <Package size={16} color="#ffffff" strokeWidth={2} />,
      color: '#6B7280',
      bgColor: '#6B7280',
      dealCount: 89,
      productCount: 12450
    },
    {
      id: 'groceries',
      name: 'Groceries',
      icon: <ShoppingBag size={16} color="#ffffff" strokeWidth={2} />,
      color: '#10B981',
      bgColor: '#10B981',
      dealCount: 12,
      productCount: 2500
    },
    {
      id: 'electronics',
      name: 'Electronics',
      icon: <Smartphone size={16} color="#ffffff" strokeWidth={2} />,
      color: '#3B82F6',
      bgColor: '#3B82F6',
      dealCount: 8,
      productCount: 1200
    },
    {
      id: 'food',
      name: 'Food',
      icon: <UtensilsCrossed size={16} color="#ffffff" strokeWidth={2} />,
      color: '#F59E0B',
      bgColor: '#F59E0B',
      dealCount: 15,
      productCount: 850
    },
    {
      id: 'medicine',
      name: 'Medicine',
      icon: <Pill size={16} color="#ffffff" strokeWidth={2} />,
      color: '#EF4444',
      bgColor: '#EF4444',
      dealCount: 6,
      productCount: 450
    },
    {
      id: 'fashion',
      name: 'Fashion',
      icon: <Shirt size={16} color="#ffffff" strokeWidth={2} />,
      color: '#8B5CF6',
      bgColor: '#8B5CF6',
      dealCount: 9,
      productCount: 890
    },
    {
      id: 'books',
      name: 'Books',
      icon: <BookOpen size={16} color="#ffffff" strokeWidth={2} />,
      color: '#06B6D4',
      bgColor: '#06B6D4',
      dealCount: 4,
      productCount: 320
    },
    {
      id: 'home',
      name: 'Home',
      icon: <Home size={16} color="#ffffff" strokeWidth={2} />,
      color: '#059669',
      bgColor: '#059669',
      dealCount: 7,
      productCount: 680
    },
    {
      id: 'baby',
      name: 'Baby',
      icon: <Baby size={16} color="#ffffff" strokeWidth={2} />,
      color: '#EC4899',
      bgColor: '#EC4899',
      dealCount: 3,
      productCount: 180
    },
    {
      id: 'automotive',
      name: 'Auto',
      icon: <Car size={16} color="#ffffff" strokeWidth={2} />,
      color: '#DC2626',
      bgColor: '#DC2626',
      dealCount: 5,
      productCount: 420
    }
  ];

  // Enhanced personalized recommendations
  const personalizedRecommendations: PersonalizedRecommendation[] = [
    {
      id: '1',
      title: 'Frequently Bought',
      subtitle: 'Based on your purchase history',
      product: mockProducts.find(p => p.name.includes('Amul')) || mockProducts[0],
      reason: 'You buy this every week',
      icon: <Heart size={16} color="#EF4444" strokeWidth={2} />,
      color: '#EF4444',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Price Drop Alert',
      subtitle: 'Item from your wishlist',
      product: mockProducts.find(p => p.name.includes('iPhone')) || mockProducts[2],
      reason: '₹7,000 price drop',
      icon: <TrendDown size={16} color="#10B981" strokeWidth={2} />,
      color: '#10B981',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Trending in Your Area',
      subtitle: 'Popular in Mumbai',
      product: mockProducts.find(p => p.name.includes('Pizza')) || mockProducts[4],
      reason: 'Ordered 2.5K times today',
      icon: <TrendingUp size={16} color="#F59E0B" strokeWidth={2} />,
      color: '#F59E0B',
      priority: 'medium'
    }
  ];

  // Filter products based on selected category
  const getFilteredProducts = () => {
    if (selectedCategory === 'All') {
      return mockProducts;
    }
    
    const categoryMap: { [key: string]: string } = {
      'groceries': 'Groceries',
      'electronics': 'Electronics',
      'food': 'Food',
      'medicine': 'Medicine',
      'fashion': 'Fashion',
      'books': 'Books',
      'home': 'Home & Garden'
    };
    
    const categoryName = categoryMap[selectedCategory.toLowerCase()];
    return mockProducts.filter(product => product.category === categoryName);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Refreshed', 'Latest prices and deals updated!');
    }, 2000);
  }, []);

  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'You have 3 new price alerts!');
  };

  const handleLocationPress = () => {
    Alert.alert('Location', 'Location picker would open here');
  };

  const handleCategoryPress = (category: CategoryTab) => {
    setSelectedCategory(category.name);
    Alert.alert(
      `${category.name} Category`,
      `Showing ${category.productCount.toLocaleString()} products with ${category.dealCount} active deals`
    );
  };

  const handleViewAllCategories = () => {
    Alert.alert(
      'All Categories',
      `Browse all ${categoryTabs.length} categories with thousands of products and deals`
    );
  };

  const handleViewAllDeals = () => {
    // Navigate to the deals tab
    router.push('/(tabs)/deals');
  };

  const handleProductPress = (product: typeof mockProducts[0]) => {
    Alert.alert(
      product.name,
      `Best price: ₹${product.bestPrice}\nSavings: ₹${product.savings}\nCategory: ${product.category}`
    );
  };

  const handleRecommendationPress = (rec: PersonalizedRecommendation) => {
    Alert.alert(
      rec.title,
      `${rec.product.name}\n${rec.reason}\nBest price: ₹${rec.product.bestPrice}`
    );
  };

  const handleClearCategoryFilter = () => {
    setSelectedCategory('All');
    Alert.alert('Filter Cleared', 'Showing all products');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      paddingTop: 20,
      paddingBottom: 32,
      paddingHorizontal: 20,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      flex: 1,
      maxWidth: 200,
    },
    locationText: {
      color: '#ffffff',
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      flex: 1,
    },
    notificationButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    notificationBadge: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.error,
    },
    greetingSection: {
      marginBottom: 0,
    },
    greetingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8,
    },
    greetingText: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: 16,
      fontFamily: 'Inter-Regular',
    },
    userNameText: {
      color: '#ffffff',
      fontSize: 32,
      fontFamily: 'Inter-Bold',
      marginBottom: 8,
    },
    userSubtext: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: 16,
      fontFamily: 'Inter-Regular',
    },
    insightsContainer: {
      marginBottom: 32,
      marginTop: -16,
    },
    insightsScroll: {
      paddingHorizontal: 20,
      gap: 12,
    },
    insightCard: {
      width: 150,
      borderRadius: 16,
      padding: 16,
      position: 'relative',
      overflow: 'hidden',
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.4 : 0.2,
      shadowRadius: 12,
      elevation: 6,
    },
    insightCardGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    insightContent: {
      position: 'relative',
      zIndex: 1,
    },
    insightHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    insightIconContainer: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    insightTrend: {
      fontSize: 10,
      fontFamily: 'Inter-Bold',
      color: '#ffffff',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 8,
    },
    insightValue: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: '#ffffff',
      marginBottom: 2,
    },
    insightTitle: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: 2,
    },
    insightSubtitle: {
      fontSize: 10,
      fontFamily: 'Inter-Regular',
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: 14,
    },
    section: {
      paddingVertical: 32,
    },
    sectionHeader: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: 28,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      flex: 1,
    },
    sectionSubtitle: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      lineHeight: 24,
    },
    viewAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 24,
      gap: 8,
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    viewAllText: {
      color: colors.textSecondary,
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
    },
    categoriesContainer: {
      paddingHorizontal: 20,
    },
    categoriesScroll: {
      gap: 8,
      paddingRight: 20,
    },
    categoryTab: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      gap: 8,
      minWidth: 100,
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: selectedCategory === 'All' ? 2 : 0,
      borderColor: selectedCategory === 'All' ? colors.secondary : 'transparent',
    },
    categoryTabSelected: {
      borderWidth: 2,
      borderColor: colors.secondary,
      transform: [{ scale: 1.02 }],
    },
    categoryIconContainer: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryTabContent: {
      flex: 1,
    },
    categoryTabName: {
      fontSize: 12,
      fontFamily: 'Inter-Bold',
      color: '#ffffff',
      marginBottom: 1,
    },
    categoryTabDeals: {
      fontSize: 9,
      fontFamily: 'Inter-Medium',
      color: 'rgba(255, 255, 255, 0.8)',
    },
    categoryFilterInfo: {
      backgroundColor: colors.card,
      marginHorizontal: 20,
      marginBottom: 20,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    categoryFilterText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
    categoryFilterCount: {
      fontSize: 14,
      fontFamily: 'Inter-Bold',
      color: colors.secondary,
    },
    clearFilterButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: colors.error,
      borderRadius: 16,
    },
    clearFilterText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: '#ffffff',
    },
    categoryProductsSection: {
      paddingVertical: 24,
      backgroundColor: colors.surface,
    },
    categoryProductsHeader: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    categoryProductsTitle: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 8,
    },
    categoryProductsSubtitle: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      lineHeight: 24,
    },
    categoryProductsList: {
      gap: 0,
    },
    recommendationsContainer: {
      paddingHorizontal: 20,
    },
    recommendationsGrid: {
      gap: 20,
    },
    recommendationCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 24,
      flexDirection: 'row',
      gap: 20,
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 16,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    recommendationCardHigh: {
      borderColor: colors.secondary,
      borderWidth: 2,
    },
    recommendationImage: {
      width: 90,
      height: 90,
      borderRadius: 20,
      resizeMode: 'cover',
    },
    recommendationContent: {
      flex: 1,
      justifyContent: 'space-between',
    },
    recommendationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    recommendationTitleContainer: {
      flex: 1,
    },
    recommendationTitle: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    recommendationSubtitle: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    recommendationBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      gap: 6,
    },
    recommendationBadgeText: {
      fontSize: 12,
      fontFamily: 'Inter-Bold',
    },
    recommendationProduct: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 12,
    },
    recommendationFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    recommendationPrice: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.secondary,
    },
    recommendationSavings: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.success,
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#dcfce7',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    featuredProductsScroll: {
      paddingHorizontal: 20,
      gap: 20,
    },
    featuredProductCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      width: 300,
      overflow: 'hidden',
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.15,
      shadowRadius: 20,
      elevation: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    featuredProductImage: {
      width: '100%',
      height: 160,
      resizeMode: 'cover',
    },
    featuredProductContent: {
      padding: 20,
    },
    featuredProductHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    featuredProductName: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      flex: 1,
      marginRight: 12,
    },
    featuredProductCategory: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.textTertiary,
      backgroundColor: colors.surface,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    featuredProductPrices: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    featuredProductPrice: {
      fontSize: 26,
      fontFamily: 'Inter-Bold',
      color: colors.secondary,
    },
    featuredProductSavings: {
      fontSize: 14,
      fontFamily: 'Inter-Bold',
      color: colors.success,
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#dcfce7',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    featuredProductPlatforms: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 16,
    },
    featuredPlatformBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    featuredPlatformText: {
      fontSize: 12,
      fontFamily: 'Inter-Bold',
      color: '#ffffff',
    },
    featuredProductButton: {
      backgroundColor: colors.secondary,
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: 'center',
    },
    featuredProductButtonText: {
      fontSize: 16,
      fontFamily: 'Inter-Bold',
      color: '#ffffff',
    },
    bottomSpacing: {
      height: 40,
    },
  });

  const filteredProducts = getFilteredProducts();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false} 
        bounces={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Simplified Premium Header */}
        <LinearGradient
          colors={[...colors.gradient, colors.gradient[colors.gradient.length - 1] + '80']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.locationContainer} onPress={handleLocationPress}>
              <MapPin size={16} color="#ffffff" strokeWidth={2} />
              <Text style={styles.locationText} numberOfLines={1}>{selectedLocation}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.notificationButton} onPress={handleNotificationPress}>
              <Bell size={20} color="#ffffff" strokeWidth={2} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          <View style={styles.greetingSection}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>{getGreeting()}</Text>
            </View>
            <Text style={styles.userNameText}>{userName}!</Text>
            <Text style={styles.userSubtext}>Ready to save money today?</Text>
          </View>
        </LinearGradient>

        {/* Compact Insights Cards */}
        <View style={styles.insightsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.insightsScroll}
          >
            {insightCards.map((insight) => (
              <TouchableOpacity key={insight.id} style={styles.insightCard}>
                <LinearGradient
                  colors={[insight.bgColor, insight.bgColor + 'CC']}
                  style={styles.insightCardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <View style={styles.insightContent}>
                  <View style={styles.insightHeader}>
                    <View style={styles.insightIconContainer}>
                      {insight.icon}
                    </View>
                    {insight.trend && (
                      <Text style={styles.insightTrend}>{insight.trend}</Text>
                    )}
                  </View>
                  <Text style={styles.insightValue}>{insight.value}</Text>
                  <Text style={styles.insightTitle}>{insight.title}</Text>
                  <Text style={styles.insightSubtitle}>{insight.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Compact Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Shop by Category</Text>
              <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllCategories}>
                <Text style={styles.viewAllText}>View All</Text>
                <ArrowRight size={16} color={colors.textSecondary} strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionSubtitle}>
              Compare prices across all platforms and find the best deals
            </Text>
          </View>
          
          <View style={styles.categoriesContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScroll}
            >
              {categoryTabs.map((category) => (
                <TouchableOpacity 
                  key={category.id} 
                  style={[
                    styles.categoryTab, 
                    { backgroundColor: category.bgColor },
                    selectedCategory === category.name && styles.categoryTabSelected
                  ]}
                  onPress={() => handleCategoryPress(category)}
                >
                  <View style={styles.categoryIconContainer}>
                    {category.icon}
                  </View>
                  <View style={styles.categoryTabContent}>
                    <Text style={styles.categoryTabName}>{category.name}</Text>
                    <Text style={styles.categoryTabDeals}>{category.dealCount} deals</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Category Filter Info */}
        {selectedCategory !== 'All' && (
          <View style={styles.categoryFilterInfo}>
            <View>
              <Text style={styles.categoryFilterText}>
                Showing products in {selectedCategory}
              </Text>
              <Text style={styles.categoryFilterCount}>
                {filteredProducts.length} items found
              </Text>
            </View>
            <TouchableOpacity style={styles.clearFilterButton} onPress={handleClearCategoryFilter}>
              <Text style={styles.clearFilterText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Category Products Section - Show ALL products when category is selected */}
        {selectedCategory !== 'All' && (
          <View style={styles.categoryProductsSection}>
            <View style={styles.categoryProductsHeader}>
              <Text style={styles.categoryProductsTitle}>
                All {selectedCategory} Products
              </Text>
              <Text style={styles.categoryProductsSubtitle}>
                {filteredProducts.length} products with best prices and deals
              </Text>
            </View>
            
            <View style={styles.categoryProductsList}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </View>
          </View>
        )}

        {/* Enhanced Personalized Recommendations - Only show when All is selected */}
        {selectedCategory === 'All' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Just for You</Text>
              </View>
              <Text style={styles.sectionSubtitle}>
                Personalized recommendations based on your shopping patterns
              </Text>
            </View>
            
            <View style={styles.recommendationsContainer}>
              <View style={styles.recommendationsGrid}>
                {personalizedRecommendations.map((rec) => (
                  <TouchableOpacity 
                    key={rec.id} 
                    style={[
                      styles.recommendationCard,
                      rec.priority === 'high' && styles.recommendationCardHigh
                    ]}
                    onPress={() => handleRecommendationPress(rec)}
                  >
                    <Image source={{ uri: rec.product.image }} style={styles.recommendationImage} />
                    <View style={styles.recommendationContent}>
                      <View style={styles.recommendationHeader}>
                        <View style={styles.recommendationTitleContainer}>
                          <Text style={styles.recommendationTitle}>{rec.title}</Text>
                          <Text style={styles.recommendationSubtitle}>{rec.subtitle}</Text>
                        </View>
                        <View style={[styles.recommendationBadge, { backgroundColor: `${rec.color}20` }]}>
                          {rec.icon}
                          <Text style={[styles.recommendationBadgeText, { color: rec.color }]}>
                            {rec.priority === 'high' ? 'HOT' : 'NEW'}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.recommendationProduct} numberOfLines={2}>
                        {rec.product.name}
                      </Text>
                      <View style={styles.recommendationFooter}>
                        <Text style={styles.recommendationPrice}>₹{rec.product.bestPrice}</Text>
                        <Text style={styles.recommendationSavings}>Save ₹{rec.product.savings}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Enhanced Featured Products - Only show when All is selected */}
        {selectedCategory === 'All' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Best Deals Today</Text>
                <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllDeals}>
                  <Text style={styles.viewAllText}>See More</Text>
                  <ArrowRight size={16} color={colors.textSecondary} strokeWidth={2} />
                </TouchableOpacity>
              </View>
              <Text style={styles.sectionSubtitle}>
                Handpicked products with maximum savings and verified quality
              </Text>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredProductsScroll}
            >
              {mockProducts.slice(0, 6).map((product) => (
                <TouchableOpacity 
                  key={product.id} 
                  style={styles.featuredProductCard}
                  onPress={() => handleProductPress(product)}
                >
                  <Image source={{ uri: product.image }} style={styles.featuredProductImage} />
                  <View style={styles.featuredProductContent}>
                    <View style={styles.featuredProductHeader}>
                      <Text style={styles.featuredProductName} numberOfLines={2}>
                        {product.name}
                      </Text>
                      <Text style={styles.featuredProductCategory}>
                        {product.category}
                      </Text>
                    </View>
                    <View style={styles.featuredProductPrices}>
                      <Text style={styles.featuredProductPrice}>₹{product.bestPrice}</Text>
                      <Text style={styles.featuredProductSavings}>Save ₹{product.savings}</Text>
                    </View>
                    <View style={styles.featuredProductPlatforms}>
                      {product.prices.slice(0, 2).map((price, index) => (
                        <View key={index} style={[styles.featuredPlatformBadge, { backgroundColor: price.color }]}>
                          <Text style={styles.featuredPlatformText}>{price.platform}</Text>
                        </View>
                      ))}
                    </View>
                    <TouchableOpacity style={styles.featuredProductButton}>
                      <Text style={styles.featuredProductButtonText}>Compare & Buy</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}