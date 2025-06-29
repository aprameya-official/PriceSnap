import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Flame, Clock, ShoppingCart, Zap } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

interface Deal {
  id: string;
  name: string;
  category: string;
  image: string;
  originalPrice: number;
  dealPrice: number;
  discount: number;
  platform: string;
  platformColor: string;
  timeLeft: string;
  soldCount: number;
  totalStock: number;
  isFlashDeal: boolean;
}

const dealsOfTheDay: Deal[] = [
  {
    id: '1',
    name: 'Fortune Sunflower Oil 1L',
    category: 'Cooking Oil',
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=300',
    originalPrice: 180,
    dealPrice: 145,
    discount: 19,
    platform: 'Zepto',
    platformColor: '#E91E63',
    timeLeft: '18:24:33',
    soldCount: 234,
    totalStock: 500,
    isFlashDeal: true,
  },
  {
    id: '2',
    name: 'Tata Tea Premium 1kg',
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=300',
    originalPrice: 420,
    dealPrice: 350,
    discount: 17,
    platform: 'Blinkit',
    platformColor: '#FFC107',
    timeLeft: '18:24:33',
    soldCount: 156,
    totalStock: 300,
    isFlashDeal: false,
  },
  {
    id: '3',
    name: 'Surf Excel Liquid 1L',
    category: 'Home Care',
    image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=300',
    originalPrice: 280,
    dealPrice: 220,
    discount: 21,
    platform: 'BigBasket',
    platformColor: '#4CAF50',
    timeLeft: '18:24:33',
    soldCount: 89,
    totalStock: 200,
    isFlashDeal: true,
  },
];

export function DealsOfTheDay() {
  const { colors } = useTheme();

  const handleBuyNow = (deal: Deal) => {
    Alert.alert(
      'Buy Now',
      `Purchase ${deal.name} for ₹${deal.dealPrice} from ${deal.platform}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Buy Now', onPress: () => Alert.alert('Success', 'Redirecting to purchase...') }
      ]
    );
  };

  const DealCard = ({ deal }: { deal: Deal }) => {
    const progressPercentage = (deal.soldCount / deal.totalStock) * 100;
    
    return (
      <View style={styles.dealCard}>
        {deal.isFlashDeal && (
          <View style={styles.flashBadge}>
            <Zap size={12} color="#ffffff" fill="#ffffff" strokeWidth={2} />
            <Text style={styles.flashText}>FLASH</Text>
          </View>
        )}
        
        <Image source={{ uri: deal.image }} style={styles.dealImage} />
        
        <View style={styles.dealContent}>
          <View style={styles.dealHeader}>
            <View style={styles.dealInfo}>
              <Text style={styles.dealName}>{deal.name}</Text>
              <Text style={styles.dealCategory}>{deal.category}</Text>
            </View>
            
            <View style={[styles.platformBadge, { backgroundColor: deal.platformColor }]}>
              <Text style={styles.platformText}>{deal.platform}</Text>
            </View>
          </View>

          <View style={styles.priceSection}>
            <View style={styles.priceContainer}>
              <Text style={styles.dealPrice}>₹{deal.dealPrice}</Text>
              <Text style={styles.originalPrice}>₹{deal.originalPrice}</Text>
            </View>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{deal.discount}% OFF</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressInfo}>
              <Text style={styles.soldText}>{deal.soldCount} sold</Text>
              <Text style={styles.stockText}>{deal.totalStock - deal.soldCount} left</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${progressPercentage}%` }]} 
              />
            </View>
          </View>

          <View style={styles.timerSection}>
            <Clock size={14} color={colors.warning} strokeWidth={2} />
            <Text style={styles.timerText}>Ends in {deal.timeLeft}</Text>
          </View>

          <TouchableOpacity 
            style={styles.buyButton}
            onPress={() => handleBuyNow(deal)}
          >
            <ShoppingCart size={16} color="#ffffff" strokeWidth={2} />
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      marginVertical: 8,
    },
    scrollContainer: {
      paddingHorizontal: 20,
      gap: 16,
    },
    dealCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      width: 260,
      overflow: 'hidden',
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 5,
      position: 'relative',
    },
    flashBadge: {
      position: 'absolute',
      top: 12,
      left: 12,
      backgroundColor: colors.warning,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      gap: 4,
      zIndex: 1,
    },
    flashText: {
      fontSize: 10,
      fontFamily: 'Inter-Bold',
      color: '#ffffff',
    },
    dealImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
    },
    dealContent: {
      padding: 16,
    },
    dealHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    dealInfo: {
      flex: 1,
    },
    dealName: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 4,
    },
    dealCategory: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    platformBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    platformText: {
      fontSize: 10,
      fontFamily: 'Inter-SemiBold',
      color: '#ffffff',
    },
    priceSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    dealPrice: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.secondary,
    },
    originalPrice: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textTertiary,
      textDecorationLine: 'line-through',
    },
    discountBadge: {
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#dcfce7',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    discountText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.success,
    },
    progressSection: {
      marginBottom: 12,
    },
    progressInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    soldText: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
    stockText: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.error,
    },
    progressBar: {
      height: 4,
      backgroundColor: colors.border,
      borderRadius: 2,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.warning,
      borderRadius: 2,
    },
    timerSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 12,
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#fef3c7',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      alignSelf: 'flex-start',
    },
    timerText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.warning,
    },
    buyButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.secondary,
      paddingVertical: 10,
      borderRadius: 8,
      gap: 6,
    },
    buyButtonText: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: '#ffffff',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {dealsOfTheDay.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </ScrollView>
    </View>
  );
}