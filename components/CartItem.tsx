import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function CartItem({ item, onIncrement, onDecrement }: CartItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <Pressable onPress={onDecrement} style={styles.quantityButton}>
            <Ionicons name="remove" size={20} color="#FF6B6B" />
          </Pressable>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <Pressable onPress={onIncrement} style={styles.quantityButton}>
            <Ionicons name="add" size={20} color="#FF6B6B" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
  },
});