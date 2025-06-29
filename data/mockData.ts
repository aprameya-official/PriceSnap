export interface Product {
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
    deliveryTime?: string;
    rating?: number;
  }[];
  bestPrice: number;
  savings: number;
  trend: 'up' | 'down';
  trendPercentage: number;
}

export const mockProducts: Product[] = [
  // Groceries - Quick Delivery Apps
  {
    id: '1',
    name: 'Amul Fresh Milk 1L',
    category: 'Groceries',
    image: 'https://images.pexels.com/photos/416458/pexels-photo-416458.jpeg?auto=compress&cs=tinysrgb&w=300',
    prices: [
      { platform: 'Zepto', price: 62, originalPrice: 65, color: '#E91E63', available: true, deliveryTime: '10 min', rating: 4.5 },
      { platform: 'Blinkit', price: 58, color: '#FFC107', available: true, deliveryTime: '15 min', rating: 4.3 },
      { platform: 'BigBasket', price: 60, color: '#4CAF50', available: true, deliveryTime: '2-4 hrs', rating: 4.2 },
      { platform: 'Swiggy Instamart', price: 64, color: '#FF5722', available: true, deliveryTime: '25 min', rating: 4.4 },
      { platform: 'Dunzo', price: 66, color: '#9C27B0', available: false, deliveryTime: '30 min', rating: 4.1 },
    ],
    bestPrice: 58,
    savings: 7,
    trend: 'down',
    trendPercentage: 5.2,
  },
  {
    id: '2',
    name: 'Maggi 2-Minute Noodles',
    category: 'Groceries',
    image: 'https://images.pexels.com/photos/8629172/pexels-photo-8629172.jpeg?auto=compress&cs=tinysrgb&w=300',
    prices: [
      { platform: 'Zepto', price: 14, color: '#E91E63', available: true, deliveryTime: '10 min', rating: 4.5 },
      { platform: 'Blinkit', price: 12, color: '#FFC107', available: true, deliveryTime: '15 min', rating: 4.3 },
      { platform: 'BigBasket', price: 13, color: '#4CAF50', available: true, deliveryTime: '2-4 hrs', rating: 4.2 },
      { platform: 'Swiggy Instamart', price: 15, color: '#FF5722', available: true, deliveryTime: '25 min', rating: 4.4 },
      { platform: 'Flipkart Minutes', price: 13, color: '#047BD6', available: true, deliveryTime: '20 min', rating: 4.0 },
    ],
    bestPrice: 12,
    savings: 3,
    trend: 'up',
    trendPercentage: 2.1,
  },
  
  // Electronics - E-commerce Platforms
  {
    id: '3',
    name: 'iPhone 15 Pro 128GB',
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300',
    prices: [
      { platform: 'Amazon', price: 134900, originalPrice: 139900, color: '#FF9900', available: true, deliveryTime: '1-2 days', rating: 4.4 },
      { platform: 'Flipkart', price: 132900, color: '#047BD6', available: true, deliveryTime: '2-3 days', rating: 4.3 },
      { platform: 'Myntra', price: 136900, color: '#FF3F6C', available: false, deliveryTime: '3-4 days', rating: 4.2 },
      { platform: 'Croma', price: 139900, color: '#7B68EE', available: true, deliveryTime: '1 day', rating: 4.5 },
      { platform: 'Reliance Digital', price: 138900, color: '#0078D4', available: true, deliveryTime: '2 days', rating: 4.1 },
    ],
    bestPrice: 132900,
    savings: 7000,
    trend: 'down',
    trendPercentage: 3.8,
  },
  {
    id: '4',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=300',
    prices: [
      { platform: 'Amazon', price: 129999, originalPrice: 134999, color: '#FF9900', available: true, deliveryTime: '1-2 days', rating: 4.4 },
      { platform: 'Flipkart', price: 127999, color: '#047BD6', available: true, deliveryTime: '2-3 days', rating: 4.3 },
      { platform: 'Samsung Store', price: 134999, color: '#1428A0', available: true, deliveryTime: '1 day', rating: 4.6 },
      { platform: 'Croma', price: 132999, color: '#7B68EE', available: true, deliveryTime: '1 day', rating: 4.5 },
      { platform: 'Vijay Sales', price: 130999, color: '#E74C3C', available: true, deliveryTime: '2 days', rating: 4.2 },
    ],
    bestPrice: 127999,
    savings: 7000,
    trend: 'down',
    trendPercentage: 4.2,
  },

  // Food - Food Delivery Apps
  {
    id: '5',
    name: 'Margherita Pizza (Large)',
    category: 'Food',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300',
    prices: [
      { platform: 'Zomato', price: 450, originalPrice: 500, color: '#E23744', available: true, deliveryTime: '30-40 min', rating: 4.3 },
      { platform: 'Swiggy', price: 420, color: '#FF5722', available: true, deliveryTime: '25-35 min', rating: 4.4 },
      { platform: 'Uber Eats', price: 480, color: '#000000', available: true, deliveryTime: '35-45 min', rating: 4.2 },
      { platform: 'Dominos', price: 399, color: '#0078AD', available: true, deliveryTime: '20-30 min', rating: 4.1 },
      { platform: 'Pizza Hut', price: 459, color: '#EE3124', available: true, deliveryTime: '25-35 min', rating: 4.0 },
    ],
    bestPrice: 399,
    savings: 101,
    trend: 'down',
    trendPercentage: 8.5,
  },
  {
    id: '6',
    name: 'Chicken Biryani',
    category: 'Food',
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=300',
    prices: [
      { platform: 'Zomato', price: 320, originalPrice: 350, color: '#E23744', available: true, deliveryTime: '30-40 min', rating: 4.3 },
      { platform: 'Swiggy', price: 299, color: '#FF5722', available: true, deliveryTime: '25-35 min', rating: 4.4 },
      { platform: 'Uber Eats', price: 340, color: '#000000', available: true, deliveryTime: '35-45 min', rating: 4.2 },
      { platform: 'Foodpanda', price: 315, color: '#E91E63', available: false, deliveryTime: '40-50 min', rating: 4.0 },
      { platform: 'EatSure', price: 310, color: '#FF6B35', available: true, deliveryTime: '30-40 min', rating: 4.1 },
    ],
    bestPrice: 299,
    savings: 51,
    trend: 'down',
    trendPercentage: 6.2,
  },

  // Medicine - Pharmacy Apps
  {
    id: '7',
    name: 'Paracetamol 500mg (10 tablets)',
    category: 'Medicine',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
    prices: [
      { platform: '1mg', price: 25, originalPrice: 30, color: '#FF6F61', available: true, deliveryTime: '2-4 hrs', rating: 4.5 },
      { platform: 'NetMeds', price: 22, color: '#00A859', available: true, deliveryTime: '1-3 hrs', rating: 4.4 },
      { platform: 'Apollo Pharmacy', price: 28, color: '#0066CC', available: true, deliveryTime: '2-4 hrs', rating: 4.3 },
      { platform: 'PharmEasy', price: 24, color: '#59C3C3', available: true, deliveryTime: '1-2 hrs', rating: 4.2 },
      { platform: 'MedPlus', price: 26, color: '#E74C3C', available: true, deliveryTime: '3-5 hrs', rating: 4.1 },
    ],
    bestPrice: 22,
    savings: 8,
    trend: 'down',
    trendPercentage: 12.5,
  },
  {
    id: '8',
    name: 'Vitamin D3 Tablets (30 count)',
    category: 'Medicine',
    image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=300',
    prices: [
      { platform: '1mg', price: 180, originalPrice: 200, color: '#FF6F61', available: true, deliveryTime: '2-4 hrs', rating: 4.5 },
      { platform: 'NetMeds', price: 165, color: '#00A859', available: true, deliveryTime: '1-3 hrs', rating: 4.4 },
      { platform: 'Apollo Pharmacy', price: 190, color: '#0066CC', available: true, deliveryTime: '2-4 hrs', rating: 4.3 },
      { platform: 'PharmEasy', price: 175, color: '#59C3C3', available: true, deliveryTime: '1-2 hrs', rating: 4.2 },
      { platform: 'Tata 1mg', price: 170, color: '#FF6F61', available: true, deliveryTime: '2-3 hrs', rating: 4.4 },
    ],
    bestPrice: 165,
    savings: 35,
    trend: 'down',
    trendPercentage: 9.8,
  },

  // Fashion - Fashion E-commerce
  {
    id: '9',
    name: 'Nike Air Max 270',
    category: 'Fashion',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300',
    prices: [
      { platform: 'Amazon Fashion', price: 8995, originalPrice: 12995, color: '#FF9900', available: true, deliveryTime: '2-3 days', rating: 4.4 },
      { platform: 'Flipkart Fashion', price: 8499, color: '#047BD6', available: true, deliveryTime: '3-4 days', rating: 4.3 },
      { platform: 'Myntra', price: 9299, color: '#FF3F6C', available: true, deliveryTime: '2-3 days', rating: 4.5 },
      { platform: 'Ajio', price: 8799, color: '#D4AF37', available: true, deliveryTime: '3-5 days', rating: 4.2 },
      { platform: 'Nike Store', price: 12995, color: '#000000', available: true, deliveryTime: '1-2 days', rating: 4.6 },
    ],
    bestPrice: 8499,
    savings: 4496,
    trend: 'down',
    trendPercentage: 15.2,
  },
  {
    id: '10',
    name: 'Levi\'s 501 Original Jeans',
    category: 'Fashion',
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300',
    prices: [
      { platform: 'Amazon Fashion', price: 3999, originalPrice: 4999, color: '#FF9900', available: true, deliveryTime: '2-3 days', rating: 4.4 },
      { platform: 'Flipkart Fashion', price: 3799, color: '#047BD6', available: true, deliveryTime: '3-4 days', rating: 4.3 },
      { platform: 'Myntra', price: 4199, color: '#FF3F6C', available: true, deliveryTime: '2-3 days', rating: 4.5 },
      { platform: 'Ajio', price: 3899, color: '#D4AF37', available: true, deliveryTime: '3-5 days', rating: 4.2 },
      { platform: 'Levi\'s Store', price: 4999, color: '#003F7F', available: true, deliveryTime: '1-2 days', rating: 4.6 },
    ],
    bestPrice: 3799,
    savings: 1200,
    trend: 'down',
    trendPercentage: 8.7,
  },

  // Home & Garden
  {
    id: '11',
    name: 'Philips LED Bulb 9W',
    category: 'Home & Garden',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=300',
    prices: [
      { platform: 'Amazon', price: 199, originalPrice: 299, color: '#FF9900', available: true, deliveryTime: '1-2 days', rating: 4.4 },
      { platform: 'Flipkart', price: 189, color: '#047BD6', available: true, deliveryTime: '2-3 days', rating: 4.3 },
      { platform: 'BigBasket', price: 210, color: '#4CAF50', available: true, deliveryTime: '2-4 hrs', rating: 4.2 },
      { platform: 'Urban Company', price: 220, color: '#6C5CE7', available: true, deliveryTime: 'Same day', rating: 4.5 },
      { platform: 'Moglix', price: 195, color: '#E17055', available: true, deliveryTime: '3-4 days', rating: 4.1 },
    ],
    bestPrice: 189,
    savings: 110,
    trend: 'down',
    trendPercentage: 18.5,
  },

  // Books
  {
    id: '12',
    name: 'The Psychology of Money',
    category: 'Books',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300',
    prices: [
      { platform: 'Amazon', price: 299, originalPrice: 399, color: '#FF9900', available: true, deliveryTime: '1-2 days', rating: 4.6 },
      { platform: 'Flipkart', price: 279, color: '#047BD6', available: true, deliveryTime: '2-3 days', rating: 4.5 },
      { platform: 'Crossword', price: 359, color: '#8E44AD', available: true, deliveryTime: '3-5 days', rating: 4.3 },
      { platform: 'BookMyShow', price: 320, color: '#E74C3C', available: false, deliveryTime: '2-4 days', rating: 4.2 },
      { platform: 'Kindle', price: 199, color: '#232F3E', available: true, deliveryTime: 'Instant', rating: 4.7 },
    ],
    bestPrice: 199,
    savings: 200,
    trend: 'down',
    trendPercentage: 25.1,
  },
];

// Category-specific platform mappings
export const categoryPlatforms = {
  'Groceries': ['Zepto', 'Blinkit', 'BigBasket', 'Swiggy Instamart', 'Dunzo', 'Flipkart Minutes'],
  'Electronics': ['Amazon', 'Flipkart', 'Myntra', 'Croma', 'Reliance Digital', 'Samsung Store', 'Vijay Sales'],
  'Food': ['Zomato', 'Swiggy', 'Uber Eats', 'Dominos', 'Pizza Hut', 'Foodpanda', 'EatSure'],
  'Medicine': ['1mg', 'NetMeds', 'Apollo Pharmacy', 'PharmEasy', 'MedPlus', 'Tata 1mg'],
  'Fashion': ['Amazon Fashion', 'Flipkart Fashion', 'Myntra', 'Ajio', 'Nike Store', 'Levi\'s Store'],
  'Home & Garden': ['Amazon', 'Flipkart', 'BigBasket', 'Urban Company', 'Moglix'],
  'Books': ['Amazon', 'Flipkart', 'Crossword', 'BookMyShow', 'Kindle'],
  'All': ['Amazon', 'Flipkart', 'Zepto', 'Blinkit', 'Zomato', 'Swiggy', '1mg', 'NetMeds', 'Myntra']
};

export const categoryIcons = {
  'Groceries': '🛒',
  'Electronics': '📱',
  'Food': '🍕',
  'Medicine': '💊',
  'Fashion': '👕',
  'Home & Garden': '🏠',
  'Books': '📚',
  'All': '🔍'
};