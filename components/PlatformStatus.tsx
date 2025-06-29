import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CircleCheck as CheckCircle, Circle as XCircle, Clock, Zap } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

interface Platform {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'slow';
  responseTime: string;
  color: string;
  deliveryTime: string;
  activeDeals: number;
}

const platforms: Platform[] = [
  {
    id: '1',
    name: 'Zepto',
    status: 'online',
    responseTime: '1.2s',
    color: '#E91E63',
    deliveryTime: '10 min',
    activeDeals: 47,
  },
  {
    id: '2',
    name: 'Blinkit',
    status: 'online',
    responseTime: '0.8s',
    color: '#FFC107',
    deliveryTime: '15 min',
    activeDeals: 32,
  },
  {
    id: '3',
    name: 'BigBasket',
    status: 'slow',
    responseTime: '3.1s',
    color: '#4CAF50',
    deliveryTime: '2-4 hrs',
    activeDeals: 28,
  },
  {
    id: '4',
    name: 'Swiggy',
    status: 'online',
    responseTime: '1.5s',
    color: '#FF5722',
    deliveryTime: '25 min',
    activeDeals: 19,
  },
  {
    id: '5',
    name: 'Dunzo',
    status: 'offline',
    responseTime: 'N/A',
    color: '#9C27B0',
    deliveryTime: 'N/A',
    activeDeals: 0,
  },
];

export function PlatformStatus() {
  const { colors } = useTheme();

  const handlePlatformPress = (platform: Platform) => {
    Alert.alert(
      platform.name,
      `Status: ${platform.status}\nResponse Time: ${platform.responseTime}\nDelivery: ${platform.deliveryTime}\nActive Deals: ${platform.activeDeals}`
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle size={16} color={colors.success} strokeWidth={2} />;
      case 'slow':
        return <Clock size={16} color={colors.warning} strokeWidth={2} />;
      case 'offline':
        return <XCircle size={16} color={colors.error} strokeWidth={2} />;
      default:
        return <CheckCircle size={16} color={colors.success} strokeWidth={2} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return colors.success;
      case 'slow':
        return colors.warning;
      case 'offline':
        return colors.error;
      default:
        return colors.success;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'slow':
        return 'Slow';
      case 'offline':
        return 'Offline';
      default:
        return 'Online';
    }
  };

  const PlatformCard = ({ platform }: { platform: Platform }) => (
    <TouchableOpacity 
      style={styles.platformCard}
      onPress={() => handlePlatformPress(platform)}
    >
      <View style={styles.platformHeader}>
        <View style={[styles.platformIndicator, { backgroundColor: platform.color }]} />
        <Text style={styles.platformName}>{platform.name}</Text>
        <View style={styles.statusContainer}>
          {getStatusIcon(platform.status)}
          <Text style={[styles.statusText, { color: getStatusColor(platform.status) }]}>
            {getStatusText(platform.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.platformStats}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Response</Text>
          <Text style={styles.statValue}>{platform.responseTime}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Delivery</Text>
          <Text style={styles.statValue}>{platform.deliveryTime}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Deals</Text>
          <View style={styles.dealsContainer}>
            <Text style={styles.statValue}>{platform.activeDeals}</Text>
            {platform.activeDeals > 0 && (
              <Zap size={12} color={colors.warning} fill={colors.warning} strokeWidth={2} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      gap: 12,
    },
    platformCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      width: 160,
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    platformHeader: {
      marginBottom: 12,
    },
    platformIndicator: {
      width: 4,
      height: 24,
      borderRadius: 2,
      marginBottom: 8,
    },
    platformName: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 6,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    statusText: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
    },
    platformStats: {
      gap: 8,
    },
    stat: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    statLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    statValue: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    dealsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
  });

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {platforms.map((platform) => (
        <PlatformCard key={platform.id} platform={platform} />
      ))}
    </ScrollView>
  );
}