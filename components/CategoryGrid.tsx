import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ShoppingCart, Apple, Carrot, Milk, Coffee, Pill, Shirt, Chrome as Home, Baby, Sparkles } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  backgroundColor: string;
  itemCount: number;
}

export function CategoryGrid() {
  const { colors } = useTheme();

  const handleCategoryPress = (category: Category) => {
    Alert.alert(category.name, `Browse ${category.itemCount} items in ${category.name}`);
  };

  const categories: Category[] = [
    {
      id: '1',
      name: 'Groceries',
      icon: <ShoppingCart size={24} color="#16a34a" strokeWidth={2} />,
      color: '#16a34a',
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(22, 163, 74, 0.2)' : '#dcfce7',
      itemCount: 2500,
    },
    {
      id: '2',
      name: 'Fruits',
      icon: <Apple size={24} color="#ea580c" strokeWidth={2} />,
      color: '#ea580c',
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(234, 88, 12, 0.2)' : '#fed7aa',
      itemCount: 450,
    },
    {
      id: '3',
      name: 'Vegetables',
      icon: <Carrot size={24} color="#16a34a" strokeWidth={2} />,
      color: '#16a34a',
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(22, 163, 74, 0.2)' : '#dcfce7',
      itemCount: 380,
    },
    {
      id: '4',
      name: 'Dairy',
      icon: <Milk size={24} color="#0891b2" strokeWidth={2} />,
      color: '#0891b2',
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(8, 145, 178, 0.2)' : '#cffafe',
      itemCount: 220,
    },
    {
      id: '5',
      name: 'Beverages',
      icon: <Coffee size={24} color="#7c2d12" strokeWidth={2} />,
      color: '#7c2d12',
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(124, 45, 18, 0.2)' : '#fed7aa',
      itemCount: 180,
    },
    {
      id: '6',
      name: 'Medicine',
      icon: <Pill size={24} color="#dc2626" strokeWidth={2} />,
      color: '#dc2626',
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(220, 38, 38, 0.2)' : '#fecaca',
      itemCount: 150,
    },
    {
      id: '7',
      name: 'Fashion',
      icon: <Shirt size={24} color="#7c3aed" strokeWidth={2} />,
      color: '#7c3aed',
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(124, 58, 237, 0.2)' : '#e9d5ff',
      itemCount: 890,
    },
    {
      id: '8',
      name: 'Home',
      icon: <Home size={24} color="#059669" strokeWidth={2} />,
      color: '#059669',
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(5, 150, 105, 0.2)' : '#d1fae5',
      itemCount: 320,
    },
    {
      id: '9',
      name: 'Baby Care',
      icon: <Baby size={24} color="#ec4899" strokeWidth={2} />,
      color: '#ec4899',
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(236, 72, 153, 0.2)' : '#fce7f3',
      itemCount: 95,
    },
    {
      id: '10',
      name: 'Beauty',
      icon: <Sparkles size={24} color="#f59e0b" strokeWidth={2} />,
      color: '#f59e0b',
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#fef3c7',
      itemCount: 240,
    },
  ];

  const CategoryCard = ({ category }: { category: Category }) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(category)}
    >
      <View style={[styles.iconContainer, { backgroundColor: category.backgroundColor }]}>
        {category.icon}
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>
      <Text style={styles.itemCount}>{category.itemCount} items</Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      marginVertical: 8,
    },
    scrollContainer: {
      paddingHorizontal: 20,
      gap: 12,
    },
    categoryCard: {
      alignItems: 'center',
      width: 80,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    categoryName: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 2,
    },
    itemCount: {
      fontSize: 10,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </ScrollView>
    </View>
  );
}