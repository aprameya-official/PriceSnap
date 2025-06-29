import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { TrendingUp, TrendingDown, Heart, ShoppingCart } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  prices: {
    platform: string;
    price: number;
    originalPrice?: number;
    color: string;
    available: boolean;
  }[];
  bestPrice: number;
  savings: number;
  trend: 'up' | 'down';
  trendPercentage: number;
}

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Amul Fresh Milk 1L',
    category: 'Dairy',
    image: 'https://images.pexels.com/photos/416458/pexels-photo-416458.jpeg?auto=compress&cs=tinysrgb&w=300',
    prices: [
      { platform: 'Zepto', price: 62, originalPrice: 65, color: '#E91E63', available: true },
      { platform: 'Blinkit', price: 58, color: '#FFC107', available: true },
      { platform: 'BigBasket', price: 60, color: '#4CAF50', available: true },
      { platform: 'Swiggy', price: 64, color: '#FF5722', available: false },
    ],
    bestPrice: 58,
    savings: 7,
    trend: 'down',
    trendPercentage: 5.2,
  },
  {
    id: '2',
    name: 'Maggi 2-Minute Noodles',
    category: 'Instant Food',
    image: 'https://images.pexels.com/photos/8629172/pexels-photo-8629172.jpeg?auto=compress&cs=tinysrgb&w=300',
    prices: [
      { platform: 'Zepto', price: 14, color: '#E91E63', available: true },
      { platform: 'Blinkit', price: 12, color: '#FFC107', available: true },
      { platform: 'BigBasket', price: 13, color: '#4CAF50', available: true },
      { platform: 'Swiggy', price: 15, color: '#FF5722', available: true },
    ],
    bestPrice: 12,
    savings: 3,
    trend: 'up',
    trendPercentage: 2.1,
  },
  {
    id: '3',
    name: 'Britannia Bread 400g',
    category: 'Bakery',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300',
    prices: [
      { platform: 'Zepto', price: 25, color: '#E91E63', available: true },
      { platform: 'Blinkit', price: 23, color: '#FFC107', available: true },
      { platform: 'BigBasket', price: 24, color: '#4CAF50', available: false },
      { platform: 'Swiggy', price: 26, color: '#FF5722', available: true },
    ],
    bestPrice: 23,
    savings: 3,
    trend: 'down',
    trendPercentage: 1.8,
  },
];

export function FeaturedProducts() {
  const { colors } = useTheme();

  const handleCompareAndBuy = (product: Product) => {
    Alert.alert(
      'Compare & Buy',
      `Compare prices for ${product.name}?\nBest price: ₹${product.bestPrice}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Compare', onPress: () => Alert.alert('Success', 'Opening price comparison...') }
      ]
    );
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      
      <View style={styles.productContent}>
        <View style={styles.productHeader}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productCategory}>{product.category}</Text>
          </View>
          
          <TouchableOpacity style={styles.favoriteButton}>
            <Heart size={20} color={colors.textSecondary} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View style={styles.priceSection}>
          <View style={styles.bestPriceContainer}>
            <Text style={styles.bestPriceLabel}>Best Price</Text>
            <Text style={styles.bestPrice}>₹{product.bestPrice}</Text>
            <View style={styles.savingsContainer}>
              <Text style={styles.savingsText}>Save ₹{product.savings}</Text>
              <View style={[styles.trendIndicator, { backgroundColor: product.trend === 'down' ? (colors.colorScheme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#dcfce7') : (colors.colorScheme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : '#fef2f2') }]}>
                {product.trend === 'down' ? (
                  <TrendingDown size={12} color={colors.success} strokeWidth={2} />
                ) : (
                  <TrendingUp size={12} color={colors.error} strokeWidth={2} />
                )}
                <Text style={[styles.trendText, { color: product.trend === 'down' ? colors.success : colors.error }]}>
                  {product.trendPercentage}%
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.platformPrices}>
          {product.prices.map((price, index) => (
            <View key={index} style={[styles.platformPrice, !price.available && styles.unavailable]}>
              <View style={[styles.platformIndicator, { backgroundColor: price.color }]} />
              <Text style={[styles.platformName, !price.available && styles.unavailableText]}>
                {price.platform}
              </Text>
              <Text style={[styles.platformPriceText, !price.available && styles.unavailableText]}>
                {price.available ? `₹${price.price}` : 'N/A'}
              </Text>
              {price.originalPrice && price.available && (
                <Text style={styles.originalPrice}>₹{price.originalPrice}</Text>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.compareButton}
          onPress={() => handleCompareAndBuy(product)}
        >
          <ShoppingCart size={16} color="#ffffff" strokeWidth={2} />
          <Text style={styles.compareButtonText}>Compare & Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      gap: 16,
    },
    productCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      width: 280,
      overflow: 'hidden',
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    productImage: {
      width: '100%',
      height: 140,
      resizeMode: 'cover',
    },
    productContent: {
      padding: 16,
    },
    productHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    productInfo: {
      flex: 1,
    },
    productName: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 4,
    },
    productCategory: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    favoriteButton: {
      padding: 4,
    },
    priceSection: {
      marginBottom: 16,
    },
    bestPriceContainer: {
      alignItems: 'flex-start',
    },
    bestPriceLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      marginBottom: 4,
    },
    bestPrice: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.secondary,
      marginBottom: 8,
    },
    savingsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    savingsText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.success,
    },
    trendIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 12,
      gap: 2,
    },
    trendText: {
      fontSize: 10,
      fontFamily: 'Inter-SemiBold',
    },
    platformPrices: {
      gap: 8,
      marginBottom: 16,
    },
    platformPrice: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    unavailable: {
      opacity: 0.5,
    },
    platformIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    platformName: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      flex: 1,
    },
    platformPriceText: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    originalPrice: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textTertiary,
      textDecorationLine: 'line-through',
    },
    unavailableText: {
      color: colors.textTertiary,
    },
    compareButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.secondary,
      paddingVertical: 12,
      borderRadius: 8,
      gap: 6,
    },
    compareButtonText: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: '#ffffff',
    },
  });

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ScrollView>
  );
}