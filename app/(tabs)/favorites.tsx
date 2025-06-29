import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Heart, Bell, TrendingDown, ShoppingCart, Trash2, Star } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface FavoriteItem {
  id: string;
  name: string;
  category: string;
  image: string;
  targetPrice: number;
  currentBestPrice: number;
  currentBestPlatform: string;
  platformColor: string;
  priceAlert: boolean;
  lastPriceChange: {
    amount: number;
    direction: 'up' | 'down';
    timeAgo: string;
  };
  timesCompared: number;
  totalSavings: number;
}

interface PriceAlert {
  id: string;
  productName: string;
  oldPrice: number;
  newPrice: number;
  platform: string;
  timeAgo: string;
  savings: number;
}

const favoriteItems: FavoriteItem[] = [
  {
    id: '1',
    name: 'Amul Milk 1L',
    category: 'Dairy',
    image: 'https://images.pexels.com/photos/416458/pexels-photo-416458.jpeg?auto=compress&cs=tinysrgb&w=300',
    targetPrice: 55,
    currentBestPrice: 58,
    currentBestPlatform: 'BigBasket',
    platformColor: '#10B981',
    priceAlert: true,
    lastPriceChange: {
      amount: 2,
      direction: 'down',
      timeAgo: '2h ago',
    },
    timesCompared: 15,
    totalSavings: 24,
  },
  {
    id: '2',
    name: 'Maggi Noodles 2-Minute',
    category: 'Instant Food',
    image: 'https://images.pexels.com/photos/8629172/pexels-photo-8629172.jpeg?auto=compress&cs=tinysrgb&w=300',
    targetPrice: 12,
    currentBestPrice: 13,
    currentBestPlatform: 'BigBasket',
    platformColor: '#10B981',
    priceAlert: false,
    lastPriceChange: {
      amount: 1,
      direction: 'up',
      timeAgo: '1d ago',
    },
    timesCompared: 8,
    totalSavings: 12,
  },
  {
    id: '3',
    name: 'Britannia Bread',
    category: 'Bakery',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300',
    targetPrice: 22,
    currentBestPrice: 23,
    currentBestPlatform: 'BigBasket',
    platformColor: '#10B981',
    priceAlert: true,
    lastPriceChange: {
      amount: 1,
      direction: 'down',
      timeAgo: '3h ago',
    },
    timesCompared: 12,
    totalSavings: 18,
  },
];

const recentAlerts: PriceAlert[] = [
  {
    id: '1',
    productName: 'Amul Milk 1L',
    oldPrice: 60,
    newPrice: 58,
    platform: 'BigBasket',
    timeAgo: '2h ago',
    savings: 2,
  },
  {
    id: '2',
    productName: 'Britannia Bread',
    oldPrice: 24,
    newPrice: 23,
    platform: 'BigBasket',
    timeAgo: '3h ago',
    savings: 1,
  },
  {
    id: '3',
    productName: 'Fortune Oil 1L',
    oldPrice: 165,
    newPrice: 158,
    platform: 'Zepto',
    timeAgo: '5h ago',
    savings: 7,
  },
];

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const [favorites, setFavorites] = useState(favoriteItems);
  const [activeTab, setActiveTab] = useState<'favorites' | 'alerts'>('favorites');

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
    Alert.alert('Removed', 'Item removed from favorites');
  };

  const togglePriceAlert = (id: string) => {
    setFavorites(favorites.map(item => 
      item.id === id ? { ...item, priceAlert: !item.priceAlert } : item
    ));
  };

  const handleCompareNow = (item: FavoriteItem) => {
    Alert.alert(
      'Compare Prices',
      `Compare prices for ${item.name}?\nCurrent best: ₹${item.currentBestPrice} on ${item.currentBestPlatform}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Compare', onPress: () => Alert.alert('Success', 'Opening price comparison...') }
      ]
    );
  };

  const getTotalSavings = () => {
    return favorites.reduce((total, item) => total + item.totalSavings, 0);
  };

  const getActiveAlerts = () => {
    return favorites.filter(item => item.priceAlert).length;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    title: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 16,
    },
    statsContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    statCard: {
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 12,
      flex: 1,
      alignItems: 'center',
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    statValue: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
    tabContainer: {
      flexDirection: 'row',
      marginHorizontal: 20,
      marginBottom: 20,
      backgroundColor: colors.border,
      borderRadius: 12,
      padding: 4,
    },
    tab: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      gap: 8,
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
    activeTabText: {
      color: '#FFFFFF',
    },
    content: {
      flex: 1,
    },
    favoritesContainer: {
      paddingHorizontal: 20,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
    },
    emptyTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.textSecondary,
      marginTop: 16,
      marginBottom: 8,
    },
    emptyDescription: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
      paddingHorizontal: 40,
    },
    favoriteCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      marginBottom: 16,
      overflow: 'hidden',
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    favoriteImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
    },
    favoriteContent: {
      padding: 16,
    },
    favoriteHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    favoriteInfo: {
      flex: 1,
    },
    favoriteName: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 4,
    },
    favoriteCategory: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    removeButton: {
      padding: 4,
    },
    priceSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    currentPrice: {
      flex: 1,
    },
    targetPrice: {
      alignItems: 'flex-end',
    },
    priceLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      marginBottom: 4,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    price: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    targetReached: {
      color: colors.success,
    },
    platformBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    platformText: {
      fontSize: 10,
      fontFamily: 'Inter-SemiBold',
      color: '#FFFFFF',
    },
    statsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      gap: 20,
    },
    stat: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 16,
      fontFamily: 'Inter-Bold',
      color: colors.textSecondary,
    },
    statText: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    priceChange: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      flex: 1,
      justifyContent: 'flex-end',
    },
    priceChangeText: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
    },
    alertSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    alertToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    alertText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
    },
    compareButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      gap: 6,
    },
    compareButtonText: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: '#FFFFFF',
    },
    alertsContainer: {
      paddingHorizontal: 20,
    },
    alertCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      gap: 12,
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    alertIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#ECFDF5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    alertContent: {
      flex: 1,
    },
    alertTitle: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 4,
    },
    alertProduct: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.textSecondary,
      marginBottom: 4,
    },
    alertDescription: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      lineHeight: 18,
      marginBottom: 8,
    },
    alertFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    alertTime: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textTertiary,
    },
    savingsHighlight: {
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#ECFDF5',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    savingsHighlightText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.success,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites & Alerts</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₹{getTotalSavings()}</Text>
            <Text style={styles.statLabel}>Total Saved</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{getActiveAlerts()}</Text>
            <Text style={styles.statLabel}>Active Alerts</Text>
          </View>
        </View>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
          onPress={() => setActiveTab('favorites')}
        >
          <Heart size={16} color={activeTab === 'favorites' ? '#FFFFFF' : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'favorites' && styles.activeTabText]}>
            Favorites ({favorites.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'alerts' && styles.activeTab]}
          onPress={() => setActiveTab('alerts')}
        >
          <Bell size={16} color={activeTab === 'alerts' ? '#FFFFFF' : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'alerts' && styles.activeTabText]}>
            Price Alerts ({recentAlerts.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'favorites' ? (
          <View style={styles.favoritesContainer}>
            {favorites.length === 0 ? (
              <View style={styles.emptyState}>
                <Heart size={48} color={colors.textTertiary} />
                <Text style={styles.emptyTitle}>No favorites yet</Text>
                <Text style={styles.emptyDescription}>
                  Add products to your favorites to track prices and get alerts
                </Text>
              </View>
            ) : (
              favorites.map((item) => (
                <View key={item.id} style={styles.favoriteCard}>
                  <Image source={{ uri: item.image }} style={styles.favoriteImage} />
                  
                  <View style={styles.favoriteContent}>
                    <View style={styles.favoriteHeader}>
                      <View style={styles.favoriteInfo}>
                        <Text style={styles.favoriteName}>{item.name}</Text>
                        <Text style={styles.favoriteCategory}>{item.category}</Text>
                      </View>
                      
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeFavorite(item.id)}
                      >
                        <Trash2 size={16} color={colors.error} />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.priceSection}>
                      <View style={styles.currentPrice}>
                        <Text style={styles.priceLabel}>Current Best</Text>
                        <View style={styles.priceRow}>
                          <Text style={styles.price}>₹{item.currentBestPrice}</Text>
                          <View style={[styles.platformBadge, { backgroundColor: item.platformColor }]}>
                            <Text style={styles.platformText}>{item.currentBestPlatform}</Text>
                          </View>
                        </View>
                      </View>
                      
                      <View style={styles.targetPrice}>
                        <Text style={styles.priceLabel}>Target Price</Text>
                        <Text style={[
                          styles.price,
                          item.currentBestPrice <= item.targetPrice && styles.targetReached
                        ]}>
                          ₹{item.targetPrice}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.statsRow}>
                      <View style={styles.stat}>
                        <Text style={styles.statNumber}>{item.timesCompared}</Text>
                        <Text style={styles.statText}>Comparisons</Text>
                      </View>
                      <View style={styles.stat}>
                        <Text style={styles.statNumber}>₹{item.totalSavings}</Text>
                        <Text style={styles.statText}>Saved</Text>
                      </View>
                      <View style={styles.priceChange}>
                        {item.lastPriceChange.direction === 'down' ? (
                          <TrendingDown size={14} color={colors.success} />
                        ) : (
                          <TrendingDown size={14} color={colors.error} style={{ transform: [{ rotate: '180deg' }] }} />
                        )}
                        <Text style={[
                          styles.priceChangeText,
                          { color: item.lastPriceChange.direction === 'down' ? colors.success : colors.error }
                        ]}>
                          ₹{item.lastPriceChange.amount} {item.lastPriceChange.timeAgo}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.alertSection}>
                      <TouchableOpacity
                        style={styles.alertToggle}
                        onPress={() => togglePriceAlert(item.id)}
                      >
                        <Bell 
                          size={16} 
                          color={item.priceAlert ? colors.primary : colors.textTertiary}
                          fill={item.priceAlert ? colors.primary : 'none'}
                        />
                        <Text style={[
                          styles.alertText,
                          { color: item.priceAlert ? colors.primary : colors.textTertiary }
                        ]}>
                          Price Alert {item.priceAlert ? 'ON' : 'OFF'}
                        </Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={styles.compareButton}
                        onPress={() => handleCompareNow(item)}
                      >
                        <ShoppingCart size={16} color="#FFFFFF" />
                        <Text style={styles.compareButtonText}>Compare Now</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        ) : (
          <View style={styles.alertsContainer}>
            {recentAlerts.length === 0 ? (
              <View style={styles.emptyState}>
                <Bell size={48} color={colors.textTertiary} />
                <Text style={styles.emptyTitle}>No price alerts</Text>
                <Text style={styles.emptyDescription}>
                  Enable price alerts on your favorite items to get notified of price drops
                </Text>
              </View>
            ) : (
              recentAlerts.map((alert) => (
                <View key={alert.id} style={styles.alertCard}>
                  <View style={styles.alertIcon}>
                    <TrendingDown size={20} color={colors.success} />
                  </View>
                  
                  <View style={styles.alertContent}>
                    <Text style={styles.alertTitle}>Price Drop Alert! 🎉</Text>
                    <Text style={styles.alertProduct}>{alert.productName}</Text>
                    <Text style={styles.alertDescription}>
                      Price dropped from ₹{alert.oldPrice} to ₹{alert.newPrice} on {alert.platform}
                    </Text>
                    <View style={styles.alertFooter}>
                      <Text style={styles.alertTime}>{alert.timeAgo}</Text>
                      <View style={styles.savingsHighlight}>
                        <Text style={styles.savingsHighlightText}>Save ₹{alert.savings}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}