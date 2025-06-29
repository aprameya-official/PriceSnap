import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  ScrollView, 
  Alert,
  Dimensions,
  Animated
} from 'react-native';
import { 
  X, 
  Check, 
  Star, 
  Truck, 
  DollarSign, 
  MapPin, 
  Clock,
  Filter,
  RotateCcw,
  Zap,
  ShoppingBag
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/useTheme';
import { categoryPlatforms } from '@/data/mockData';

const { width, height } = Dimensions.get('window');

interface Platform {
  id: string;
  name: string;
  color: string;
  deliveryTime: string;
  rating: number;
  category: string;
}

interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

interface FilterOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  count: number;
}

// Enhanced platform data with category-specific information
const allPlatforms: Platform[] = [
  // Grocery Platforms
  { id: '1', name: 'Zepto', color: '#E91E63', deliveryTime: '10 min', rating: 4.5, category: 'Groceries' },
  { id: '2', name: 'Blinkit', color: '#FFC107', deliveryTime: '15 min', rating: 4.3, category: 'Groceries' },
  { id: '3', name: 'BigBasket', color: '#4CAF50', deliveryTime: '2-4 hrs', rating: 4.2, category: 'Groceries' },
  { id: '4', name: 'Swiggy Instamart', color: '#FF5722', deliveryTime: '25 min', rating: 4.4, category: 'Groceries' },
  { id: '5', name: 'Dunzo', color: '#9C27B0', deliveryTime: '30 min', rating: 4.1, category: 'Groceries' },
  { id: '6', name: 'Flipkart Minutes', color: '#047BD6', deliveryTime: '20 min', rating: 4.0, category: 'Groceries' },
  
  // Electronics Platforms
  { id: '7', name: 'Amazon', color: '#FF9900', deliveryTime: '1-2 days', rating: 4.4, category: 'Electronics' },
  { id: '8', name: 'Flipkart', color: '#047BD6', deliveryTime: '2-3 days', rating: 4.3, category: 'Electronics' },
  { id: '9', name: 'Croma', color: '#7B68EE', deliveryTime: '1 day', rating: 4.5, category: 'Electronics' },
  { id: '10', name: 'Reliance Digital', color: '#0078D4', deliveryTime: '2 days', rating: 4.1, category: 'Electronics' },
  { id: '11', name: 'Samsung Store', color: '#1428A0', deliveryTime: '1 day', rating: 4.6, category: 'Electronics' },
  { id: '12', name: 'Vijay Sales', color: '#E74C3C', deliveryTime: '2 days', rating: 4.2, category: 'Electronics' },
  
  // Food Platforms
  { id: '13', name: 'Zomato', color: '#E23744', deliveryTime: '30-40 min', rating: 4.3, category: 'Food' },
  { id: '14', name: 'Swiggy', color: '#FF5722', deliveryTime: '25-35 min', rating: 4.4, category: 'Food' },
  { id: '15', name: 'Uber Eats', color: '#000000', deliveryTime: '35-45 min', rating: 4.2, category: 'Food' },
  { id: '16', name: 'Dominos', color: '#0078AD', deliveryTime: '20-30 min', rating: 4.1, category: 'Food' },
  { id: '17', name: 'Pizza Hut', color: '#EE3124', deliveryTime: '25-35 min', rating: 4.0, category: 'Food' },
  { id: '18', name: 'Foodpanda', color: '#E91E63', deliveryTime: '40-50 min', rating: 4.0, category: 'Food' },
  { id: '19', name: 'EatSure', color: '#FF6B35', deliveryTime: '30-40 min', rating: 4.1, category: 'Food' },
  
  // Medicine Platforms
  { id: '20', name: '1mg', color: '#FF6F61', deliveryTime: '2-4 hrs', rating: 4.5, category: 'Medicine' },
  { id: '21', name: 'NetMeds', color: '#00A859', deliveryTime: '1-3 hrs', rating: 4.4, category: 'Medicine' },
  { id: '22', name: 'Apollo Pharmacy', color: '#0066CC', deliveryTime: '2-4 hrs', rating: 4.3, category: 'Medicine' },
  { id: '23', name: 'PharmEasy', color: '#59C3C3', deliveryTime: '1-2 hrs', rating: 4.2, category: 'Medicine' },
  { id: '24', name: 'MedPlus', color: '#E74C3C', deliveryTime: '3-5 hrs', rating: 4.1, category: 'Medicine' },
  { id: '25', name: 'Tata 1mg', color: '#FF6F61', deliveryTime: '2-3 hrs', rating: 4.4, category: 'Medicine' },
  
  // Fashion Platforms
  { id: '26', name: 'Amazon Fashion', color: '#FF9900', deliveryTime: '2-3 days', rating: 4.4, category: 'Fashion' },
  { id: '27', name: 'Flipkart Fashion', color: '#047BD6', deliveryTime: '3-4 days', rating: 4.3, category: 'Fashion' },
  { id: '28', name: 'Myntra', color: '#FF3F6C', deliveryTime: '2-3 days', rating: 4.5, category: 'Fashion' },
  { id: '29', name: 'Ajio', color: '#D4AF37', deliveryTime: '3-5 days', rating: 4.2, category: 'Fashion' },
  { id: '30', name: 'Nike Store', color: '#000000', deliveryTime: '1-2 days', rating: 4.6, category: 'Fashion' },
  { id: '31', name: 'Levi\'s Store', color: '#003F7F', deliveryTime: '1-2 days', rating: 4.6, category: 'Fashion' },
];

const priceRanges: PriceRange[] = [
  { id: '1', label: 'Under ₹50', min: 0, max: 50 },
  { id: '2', label: '₹50 - ₹100', min: 50, max: 100 },
  { id: '3', label: '₹100 - ₹500', min: 100, max: 500 },
  { id: '4', label: '₹500 - ₹1000', min: 500, max: 1000 },
  { id: '5', label: '₹1000 - ₹5000', min: 1000, max: 5000 },
  { id: '6', label: 'Above ₹5000', min: 5000, max: 100000 },
];

const deliveryOptions: FilterOption[] = [
  { id: '1', label: 'Express Delivery', icon: <Zap size={16} color="#E91E63" strokeWidth={2} />, count: 1247 },
  { id: '2', label: 'Free Delivery', icon: <DollarSign size={16} color="#4CAF50" strokeWidth={2} />, count: 892 },
  { id: '3', label: 'Same Day', icon: <Clock size={16} color="#FF9800" strokeWidth={2} />, count: 634 },
  { id: '4', label: 'Near Me', icon: <MapPin size={16} color="#2196F3" strokeWidth={2} />, count: 456 },
  { id: '5', label: 'Bulk Orders', icon: <ShoppingBag size={16} color="#9C27B0" strokeWidth={2} />, count: 234 },
];

const ratingOptions: FilterOption[] = [
  { id: '1', label: '4.5+ Stars', icon: <Star size={16} color="#FFD700" fill="#FFD700" strokeWidth={2} />, count: 789 },
  { id: '2', label: '4.0+ Stars', icon: <Star size={16} color="#FFD700" fill="#FFD700" strokeWidth={2} />, count: 1234 },
  { id: '3', label: '3.5+ Stars', icon: <Star size={16} color="#FFD700" fill="#FFD700" strokeWidth={2} />, count: 1567 },
  { id: '4', label: '3.0+ Stars', icon: <Star size={16} color="#FFD700" fill="#FFD700" strokeWidth={2} />, count: 1890 },
];

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedPlatforms: string[];
  onPlatformsChange: (platforms: string[]) => void;
  selectedCategory: string;
  availablePlatforms: string[];
}

export function FilterModal({ 
  visible, 
  onClose, 
  selectedPlatforms, 
  onPlatformsChange, 
  selectedCategory,
  availablePlatforms 
}: FilterModalProps) {
  const { colors } = useTheme();
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [selectedDelivery, setSelectedDelivery] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [slideAnimation] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnimation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  // Filter platforms based on selected category
  const getFilteredPlatforms = () => {
    if (selectedCategory === 'All') {
      return allPlatforms;
    }
    return allPlatforms.filter(platform => 
      availablePlatforms.includes(platform.name)
    );
  };

  const togglePlatform = (platformName: string) => {
    if (selectedPlatforms.includes(platformName)) {
      onPlatformsChange(selectedPlatforms.filter(p => p !== platformName));
    } else {
      onPlatformsChange([...selectedPlatforms, platformName]);
    }
  };

  const toggleDeliveryOption = (optionId: string) => {
    if (selectedDelivery.includes(optionId)) {
      setSelectedDelivery(selectedDelivery.filter(d => d !== optionId));
    } else {
      setSelectedDelivery([...selectedDelivery, optionId]);
    }
  };

  const clearAllFilters = () => {
    onPlatformsChange([]);
    setSelectedPriceRange('');
    setSelectedDelivery([]);
    setSelectedRating('');
    Alert.alert('Filters Cleared', 'All filters have been cleared');
  };

  const selectAllPlatforms = () => {
    const availablePlatformNames = getFilteredPlatforms().map(p => p.name);
    onPlatformsChange(availablePlatformNames);
    Alert.alert('All Selected', `All ${availablePlatformNames.length} platforms selected`);
  };

  const handleApplyFilters = () => {
    const totalFilters = selectedPlatforms.length + 
      (selectedPriceRange ? 1 : 0) + 
      selectedDelivery.length + 
      (selectedRating ? 1 : 0);
    
    onClose();
    Alert.alert('Filters Applied', `${totalFilters} filter(s) applied for ${selectedCategory}`);
  };

  const getActiveFiltersCount = () => {
    return selectedPlatforms.length + 
      (selectedPriceRange ? 1 : 0) + 
      selectedDelivery.length + 
      (selectedRating ? 1 : 0);
  };

  const getCategorySpecificDeliveryOptions = () => {
    switch (selectedCategory) {
      case 'Groceries':
        return deliveryOptions.filter(option => 
          ['Express Delivery', 'Same Day', 'Near Me', 'Bulk Orders'].includes(option.label)
        );
      case 'Food':
        return deliveryOptions.filter(option => 
          ['Express Delivery', 'Near Me'].includes(option.label)
        );
      case 'Medicine':
        return deliveryOptions.filter(option => 
          ['Express Delivery', 'Same Day', 'Near Me'].includes(option.label)
        );
      case 'Electronics':
        return deliveryOptions.filter(option => 
          ['Free Delivery', 'Same Day', 'Near Me'].includes(option.label)
        );
      case 'Fashion':
        return deliveryOptions.filter(option => 
          ['Free Delivery', 'Near Me'].includes(option.label)
        );
      default:
        return deliveryOptions;
    }
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      maxHeight: height * 0.9,
      overflow: 'hidden',
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    title: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    categoryBadge: {
      backgroundColor: colors.secondary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    categoryBadgeText: {
      fontSize: 12,
      fontFamily: 'Inter-Bold',
      color: '#ffffff',
    },
    closeButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterCount: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    filterCountText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
    filterBadge: {
      backgroundColor: colors.secondary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    filterBadgeText: {
      fontSize: 12,
      fontFamily: 'Inter-Bold',
      color: '#ffffff',
    },
    content: {
      flex: 1,
    },
    section: {
      paddingHorizontal: 20,
      paddingVertical: 24,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    sectionSubtitle: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginTop: 2,
    },
    sectionActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    actionButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: colors.card,
    },
    actionText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.secondary,
    },
    platformList: {
      gap: 12,
    },
    platformItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    platformItemSelected: {
      borderColor: colors.secondary,
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#f0f9ff',
    },
    platformInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flex: 1,
    },
    platformIndicator: {
      width: 16,
      height: 16,
      borderRadius: 8,
    },
    platformDetails: {
      flex: 1,
    },
    platformName: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 4,
    },
    platformMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    platformDelivery: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    platformRating: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    platformRatingText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.textSecondary,
    },
    priceRangeGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    priceRangeItem: {
      flex: 1,
      minWidth: '45%',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.border,
      backgroundColor: colors.card,
      alignItems: 'center',
    },
    priceRangeItemSelected: {
      borderColor: colors.secondary,
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#f0f9ff',
    },
    priceRangeText: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.textSecondary,
    },
    priceRangeTextSelected: {
      color: colors.secondary,
    },
    optionsList: {
      gap: 12,
    },
    optionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    optionItemSelected: {
      borderColor: colors.secondary,
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#f0f9ff',
    },
    optionInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flex: 1,
    },
    optionText: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    optionCount: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      backgroundColor: colors.surface,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    footer: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    footerButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    clearButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      borderRadius: 16,
      backgroundColor: colors.card,
      borderWidth: 2,
      borderColor: colors.border,
      gap: 8,
    },
    clearButtonText: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.textSecondary,
    },
    applyButton: {
      flex: 2,
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: 'center',
      overflow: 'hidden',
    },
    applyButtonText: {
      fontSize: 16,
      fontFamily: 'Inter-Bold',
      color: '#ffffff',
    },
  });

  const filteredPlatforms = getFilteredPlatforms();
  const categoryDeliveryOptions = getCategorySpecificDeliveryOptions();

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.container,
            {
              transform: [{
                translateY: slideAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, 0],
                })
              }]
            }
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View>
                <Text style={styles.title}>Filters</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{selectedCategory}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <X size={24} color={colors.textSecondary} strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <View style={styles.filterCount}>
              <Filter size={16} color={colors.textSecondary} strokeWidth={2} />
              <Text style={styles.filterCountText}>Active filters:</Text>
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>{getActiveFiltersCount()}</Text>
              </View>
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Platforms Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Platforms</Text>
                  <Text style={styles.sectionSubtitle}>
                    {filteredPlatforms.length} platforms available for {selectedCategory}
                  </Text>
                </View>
                <View style={styles.sectionActions}>
                  <TouchableOpacity style={styles.actionButton} onPress={clearAllFilters}>
                    <Text style={styles.actionText}>Clear All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} onPress={selectAllPlatforms}>
                    <Text style={styles.actionText}>Select All</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.platformList}>
                {filteredPlatforms.map((platform) => (
                  <TouchableOpacity
                    key={platform.id}
                    style={[
                      styles.platformItem,
                      selectedPlatforms.includes(platform.name) && styles.platformItemSelected
                    ]}
                    onPress={() => togglePlatform(platform.name)}
                  >
                    <View style={styles.platformInfo}>
                      <View style={[styles.platformIndicator, { backgroundColor: platform.color }]} />
                      <View style={styles.platformDetails}>
                        <Text style={styles.platformName}>{platform.name}</Text>
                        <View style={styles.platformMeta}>
                          <Text style={styles.platformDelivery}>{platform.deliveryTime}</Text>
                          <View style={styles.platformRating}>
                            <Star size={12} color="#FFD700" fill="#FFD700" strokeWidth={1} />
                            <Text style={styles.platformRatingText}>{platform.rating}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    {selectedPlatforms.includes(platform.name) && (
                      <Check size={20} color={colors.secondary} strokeWidth={2} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Range Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Price Range</Text>
              </View>

              <View style={styles.priceRangeGrid}>
                {priceRanges.map((range) => (
                  <TouchableOpacity
                    key={range.id}
                    style={[
                      styles.priceRangeItem,
                      selectedPriceRange === range.id && styles.priceRangeItemSelected
                    ]}
                    onPress={() => setSelectedPriceRange(selectedPriceRange === range.id ? '' : range.id)}
                  >
                    <Text style={[
                      styles.priceRangeText,
                      selectedPriceRange === range.id && styles.priceRangeTextSelected
                    ]}>
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Delivery Options Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Delivery Options</Text>
                <Text style={styles.sectionSubtitle}>
                  Available for {selectedCategory}
                </Text>
              </View>

              <View style={styles.optionsList}>
                {categoryDeliveryOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionItem,
                      selectedDelivery.includes(option.id) && styles.optionItemSelected
                    ]}
                    onPress={() => toggleDeliveryOption(option.id)}
                  >
                    <View style={styles.optionInfo}>
                      {option.icon}
                      <Text style={styles.optionText}>{option.label}</Text>
                    </View>
                    <Text style={styles.optionCount}>{option.count}</Text>
                    {selectedDelivery.includes(option.id) && (
                      <Check size={20} color={colors.secondary} strokeWidth={2} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Rating Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Minimum Rating</Text>
              </View>

              <View style={styles.optionsList}>
                {ratingOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionItem,
                      selectedRating === option.id && styles.optionItemSelected
                    ]}
                    onPress={() => setSelectedRating(selectedRating === option.id ? '' : option.id)}
                  >
                    <View style={styles.optionInfo}>
                      {option.icon}
                      <Text style={styles.optionText}>{option.label}</Text>
                    </View>
                    <Text style={styles.optionCount}>{option.count}</Text>
                    {selectedRating === option.id && (
                      <Check size={20} color={colors.secondary} strokeWidth={2} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerButtons}>
              <TouchableOpacity style={styles.clearButton} onPress={clearAllFilters}>
                <RotateCcw size={16} color={colors.textSecondary} strokeWidth={2} />
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
                <LinearGradient
                  colors={[colors.secondary, colors.secondaryDark]}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
                <Text style={styles.applyButtonText}>
                  Apply Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}