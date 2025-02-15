import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import CartItem from '../../components/CartItem';

const mockCartItems = [
  {
    id: '1',
    name: 'Margherita Pizza',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3',
    quantity: 2,
  },
  {
    id: '2',
    name: 'Caesar Salad',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9',
    quantity: 1,
  },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(mockCartItems);

  const handleIncrement = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrement={() => handleIncrement(item.id)}
            onDecrement={() => handleDecrement(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          cartItems.length > 0 ? (
            <View style={styles.footer}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
              </View>
              <Pressable style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </Pressable>
            </View>
          ) : (
            <Text style={styles.emptyCart}>Your cart is empty</Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    padding: 16,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
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
  checkoutButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 32,
  },
});