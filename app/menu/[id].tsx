import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const extras = [
  { id: 1, name: 'Extra Cheese', price: 2.0 },
  { id: 2, name: 'Mushrooms', price: 1.5 },
  { id: 3, name: 'Pepperoni', price: 2.5 },
  { id: 4, name: 'Olives', price: 1.0 },
];

export default function ItemDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<number[]>([]);

  const toggleExtra = (extraId: number) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  const basePrice = 12.99;
  const extrasTotal = selectedExtras.reduce(
    (total, extraId) =>
      total + extras.find((extra) => extra.id === extraId)?.price || 0,
    0
  );
  const total = (basePrice + extrasTotal) * quantity;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3',
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Margherita Pizza</Text>
        <Text style={styles.description}>
          Fresh mozzarella, tomatoes, and basil on a perfectly crispy crust.
          Made with love in our wood-fired oven.
        </Text>
        <Text style={styles.price}>${basePrice.toFixed(2)}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <Pressable
              onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              style={styles.quantityButton}
            >
              <Ionicons name="remove" size={24} color="#FF6B6B" />
            </Pressable>
            <Text style={styles.quantity}>{quantity}</Text>
            <Pressable
              onPress={() => setQuantity(quantity + 1)}
              style={styles.quantityButton}
            >
              <Ionicons name="add" size={24} color="#FF6B6B" />
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extras</Text>
          {extras.map((extra) => (
            <Pressable
              key={extra.id}
              style={[
                styles.extraItem,
                selectedExtras.includes(extra.id) && styles.extraItemSelected,
              ]}
              onPress={() => toggleExtra(extra.id)}
            >
              <View style={styles.extraInfo}>
                <Text
                  style={[
                    styles.extraName,
                    selectedExtras.includes(extra.id) &&
                      styles.extraNameSelected,
                  ]}
                >
                  {extra.name}
                </Text>
                <Text
                  style={[
                    styles.extraPrice,
                    selectedExtras.includes(extra.id) &&
                      styles.extraPriceSelected,
                  ]}
                >
                  +${extra.price.toFixed(2)}
                </Text>
              </View>
              {selectedExtras.includes(extra.id) && (
                <Ionicons name="checkmark-circle" size={24} color="#fff" />
              )}
            </Pressable>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
          </View>
          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    lineHeight: 24,
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 24,
  },
  extraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  extraItemSelected: {
    backgroundColor: '#FF6B6B',
  },
  extraInfo: {
    flex: 1,
  },
  extraName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  extraNameSelected: {
    color: '#fff',
  },
  extraPrice: {
    fontSize: 14,
    color: '#666',
  },
  extraPriceSelected: {
    color: '#fff',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  addButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});