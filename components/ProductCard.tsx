import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Heart, TrendingUp, TrendingDown, ShoppingCart, Star, Clock, Truck, ChevronDown, ChevronUp, Percent } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

interface Price {
  platform: string;
  price: number;
  originalPrice?: number;
  color: string;
  available: boolean;
  deliveryTime?: string;
  rating?: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  prices: Price[];
  bestPrice: number;
  savings: number;
  trend: 'up' | 'down';
  trendPercentage: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { colors } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    Alert.alert(
      isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
      `${product.name} ${isFavorite ? 'removed from' : 'added to'} your favorites`
    );
  };

  const handleCompareAndBuy = () => {
    const bestPlatform = product.prices.find(p => p.price === product.bestPrice && p.available);
    Alert.alert(
      'Compare & Buy',
      `Best price: ₹${product.bestPrice} on ${bestPlatform?.platform}\nDelivery: ${bestPlatform?.deliveryTime}\nRating: ${bestPlatform?.rating}⭐`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Buy Now', onPress: () => Alert.alert('Success', `Redirecting to ${bestPlatform?.platform}...`) }
      ]
    );
  };

  const toggleShowAllPlatforms = () => {
    setShowAllPlatforms(!showAllPlatforms);
  };

  const getCategoryIcon = () => {
    switch (product.category) {
      case 'Medicine':
        return '💊';
      case 'Electronics':
        return '📱';
      case 'Food':
        return '🍕';
      case 'Fashion':
        return '👕';
      case 'Groceries':
        return '🛒';
      case 'Home & Garden':
        return '🏠';
      case 'Books':
        return '📚';
      default:
        return '🛍️';
    }
  };

  const getBestPlatform = () => {
    return product.prices.find(p => p.price === product.bestPrice && p.available);
  };

  // Calculate original MRP (highest original price or highest current price + 20%)
  const getOriginalMRP = () => {
    const originalPrices = product.prices
      .filter(p => p.originalPrice)
      .map(p => p.originalPrice!);
    
    if (originalPrices.length > 0) {
      return Math.max(...originalPrices);
    }
    
    // If no original prices, calculate based on highest current price + estimated markup
    const highestPrice = Math.max(...product.prices.map(p => p.price));
    return Math.round(highestPrice * 1.2); // Assume 20% markup
  };

  // Calculate discount percentage for each platform
  const getPlatformDiscount = (price: Price) => {
    if (price.originalPrice) {
      return Math.round(((price.originalPrice - price.price) / price.originalPrice) * 100);
    }
    const mrp = getOriginalMRP();
    return Math.round(((mrp - price.price) / mrp) * 100);
  };

  // Sort platforms by discount percentage (highest discount first)
  const getSortedPlatforms = () => {
    const availablePrices = product.prices.filter(p => p.available);
    return availablePrices.sort((a, b) => getPlatformDiscount(b) - getPlatformDiscount(a));
  };

  const styles = StyleSheet.create({
    productCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      marginHorizontal: 20,
      marginVertical: 8,
      overflow: 'hidden',
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.15,
      shadowRadius: 12,
      elevation: 6,
      borderWidth: 1,
      borderColor: colors.border,
    },
    productImage: {
      width: '100%',
      height: 160,
      resizeMode: 'cover',
    },
    categoryBadge: {
      position: 'absolute',
      top: 16,
      left: 16,
      backgroundColor: colors.secondary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    categoryEmoji: {
      fontSize: 12,
    },
    categoryText: {
      fontSize: 11,
      fontFamily: 'Inter-Bold',
      color: '#ffffff',
    },
    productContent: {
      padding: 20,
    },
    productHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    productInfo: {
      flex: 1,
    },
    productName: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 6,
      lineHeight: 24,
    },
    productCategory: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
    favoriteButton: {
      padding: 8,
      borderRadius: 12,
      backgroundColor: colors.surface,
    },
    priceSection: {
      marginBottom: 20,
    },
    mrpSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8,
    },
    mrpLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
    mrpPrice: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textTertiary,
      textDecorationLine: 'line-through',
    },
    totalSavingsChip: {
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : '#fef2f2',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    totalSavingsText: {
      fontSize: 11,
      fontFamily: 'Inter-Bold',
      color: colors.error,
    },
    bestPriceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    priceInfo: {
      flex: 1,
    },
    bestPriceLabel: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.textSecondary,
      marginBottom: 6,
    },
    bestPrice: {
      fontSize: 28,
      fontFamily: 'Inter-Bold',
      color: colors.secondary,
      marginBottom: 8,
    },
    bestPlatformInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    bestPlatformBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    bestPlatformText: {
      fontSize: 12,
      fontFamily: 'Inter-Bold',
      color: '#ffffff',
    },
    deliveryInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: colors.surface,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
    },
    deliveryText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.textSecondary,
    },
    savingsContainer: {
      alignItems: 'flex-end',
    },
    savingsText: {
      fontSize: 16,
      fontFamily: 'Inter-Bold',
      color: colors.success,
      marginBottom: 6,
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#dcfce7',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    trendIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      gap: 4,
    },
    trendText: {
      fontSize: 12,
      fontFamily: 'Inter-Bold',
    },
    platformPrices: {
      gap: 12,
      marginBottom: 20,
    },
    platformPrice: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    platformPriceHighDiscount: {
      borderColor: colors.success,
      borderWidth: 2,
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(16, 185, 129, 0.1)' : '#f0fdf4',
    },
    unavailable: {
      opacity: 0.5,
    },
    platformIndicator: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    platformContent: {
      flex: 1,
    },
    platformHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    platformName: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    platformDiscountBadge: {
      backgroundColor: colors.success,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    platformDiscountText: {
      fontSize: 10,
      fontFamily: 'Inter-Bold',
      color: '#ffffff',
    },
    platformPriceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    platformPriceText: {
      fontSize: 16,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    platformOriginalPrice: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textTertiary,
      textDecorationLine: 'line-through',
    },
    unavailableText: {
      color: colors.textTertiary,
    },
    platformMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginTop: 4,
    },
    platformRating: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(255, 215, 0, 0.2)' : '#fef3c7',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    platformRatingText: {
      fontSize: 12,
      fontFamily: 'Inter-Bold',
      color: colors.warning,
    },
    platformDelivery: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.textSecondary,
      backgroundColor: colors.card,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    morePlatformsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 8,
    },
    morePlatformsText: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.secondary,
    },
    compareButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.secondary,
      paddingVertical: 16,
      borderRadius: 16,
      gap: 8,
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    compareButtonText: {
      fontSize: 16,
      fontFamily: 'Inter-Bold',
      color: '#ffffff',
    },
  });

  const bestPlatform = getBestPlatform();
  const sortedPlatforms = getSortedPlatforms();
  const originalMRP = getOriginalMRP();
  const totalSavingsFromMRP = originalMRP - product.bestPrice;
  const totalDiscountPercentage = Math.round((totalSavingsFromMRP / originalMRP) * 100);
  
  // Show first 4 platforms, or all if showAllPlatforms is true
  const platformsToShow = showAllPlatforms ? sortedPlatforms : sortedPlatforms.slice(0, 4);
  const remainingCount = sortedPlatforms.length - 4;

  return (
    <View style={styles.productCard}>
      <View style={{ position: 'relative' }}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryEmoji}>{getCategoryIcon()}</Text>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>
      </View>
      
      <View style={styles.productContent}>
        <View style={styles.productHeader}>
          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
            <Text style={styles.productCategory}>{product.category}</Text>
          </View>
          
          <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
            <Heart 
              size={20} 
              color={isFavorite ? colors.error : colors.textSecondary} 
              fill={isFavorite ? colors.error : 'none'}
              strokeWidth={2} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.priceSection}>
          {/* Original MRP Section */}
          <View style={styles.mrpSection}>
            <Text style={styles.mrpLabel}>MRP:</Text>
            <Text style={styles.mrpPrice}>₹{originalMRP}</Text>
            <View style={styles.totalSavingsChip}>
              <Percent size={10} color={colors.error} strokeWidth={2} />
              <Text style={styles.totalSavingsText}>{totalDiscountPercentage}% OFF</Text>
            </View>
          </View>

          <View style={styles.bestPriceContainer}>
            <View style={styles.priceInfo}>
              <Text style={styles.bestPriceLabel}>Best Price</Text>
              <Text style={styles.bestPrice}>₹{product.bestPrice}</Text>
              {bestPlatform && (
                <View style={styles.bestPlatformInfo}>
                  <View style={[styles.bestPlatformBadge, { backgroundColor: bestPlatform.color }]}>
                    <Text style={styles.bestPlatformText}>{bestPlatform.platform}</Text>
                  </View>
                  {bestPlatform.deliveryTime && (
                    <View style={styles.deliveryInfo}>
                      <Clock size={12} color={colors.textSecondary} strokeWidth={2} />
                      <Text style={styles.deliveryText}>{bestPlatform.deliveryTime}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
            
            <View style={styles.savingsContainer}>
              <Text style={styles.savingsText}>Save ₹{totalSavingsFromMRP}</Text>
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
          {platformsToShow.map((price, index) => {
            const discount = getPlatformDiscount(price);
            const isHighDiscount = discount >= 15; // Highlight platforms with 15%+ discount
            
            return (
              <View 
                key={index} 
                style={[
                  styles.platformPrice, 
                  !price.available && styles.unavailable,
                  isHighDiscount && styles.platformPriceHighDiscount
                ]}
              >
                <View style={[styles.platformIndicator, { backgroundColor: price.color }]} />
                
                <View style={styles.platformContent}>
                  <View style={styles.platformHeader}>
                    <Text style={[styles.platformName, !price.available && styles.unavailableText]}>
                      {price.platform}
                    </Text>
                    {price.available && discount > 0 && (
                      <View style={[
                        styles.platformDiscountBadge,
                        { backgroundColor: isHighDiscount ? colors.success : colors.warning }
                      ]}>
                        <Percent size={8} color="#ffffff" strokeWidth={2} />
                        <Text style={styles.platformDiscountText}>{discount}% OFF</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.platformPriceRow}>
                    <Text style={[styles.platformPriceText, !price.available && styles.unavailableText]}>
                      {price.available ? `₹${price.price}` : 'N/A'}
                    </Text>
                    {price.originalPrice && price.available && (
                      <Text style={styles.platformOriginalPrice}>₹{price.originalPrice}</Text>
                    )}
                  </View>

                  {price.available && (
                    <View style={styles.platformMeta}>
                      {price.rating && (
                        <View style={styles.platformRating}>
                          <Star size={10} color={colors.warning} fill={colors.warning} strokeWidth={1} />
                          <Text style={styles.platformRatingText}>{price.rating}</Text>
                        </View>
                      )}
                      {price.deliveryTime && (
                        <Text style={styles.platformDelivery}>{price.deliveryTime}</Text>
                      )}
                    </View>
                  )}
                </View>
              </View>
            );
          })}
          
          {remainingCount > 0 && (
            <TouchableOpacity 
              style={styles.morePlatformsButton}
              onPress={toggleShowAllPlatforms}
            >
              <Text style={styles.morePlatformsText}>
                {showAllPlatforms ? 'Show Less' : `+${remainingCount} more platforms`}
              </Text>
              {showAllPlatforms ? (
                <ChevronUp size={16} color={colors.secondary} strokeWidth={2} />
              ) : (
                <ChevronDown size={16} color={colors.secondary} strokeWidth={2} />
              )}
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.compareButton} onPress={handleCompareAndBuy}>
          <ShoppingCart size={18} color="#ffffff" strokeWidth={2} />
          <Text style={styles.compareButtonText}>Compare & Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}