import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const mockOrders = [
  {
    id: '1',
    date: '2024-02-15',
    total: 34.97,
    status: 'Delivered',
    items: [
      { name: 'Margherita Pizza', quantity: 2 },
      { name: 'Caesar Salad', quantity: 1 },
    ],
  },
];

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockOrders}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderDate}>{item.date}</Text>
              <Text style={styles.orderStatus}>{item.status}</Text>
            </View>
            {item.items.map((orderItem, index) => (
              <Text key={index} style={styles.orderItem}>
                {orderItem.quantity}x {orderItem.name}
              </Text>
            ))}
            <Text style={styles.orderTotal}>
              Total: ${item.total.toFixed(2)}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
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
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: '600',
  },
  orderStatus: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  orderItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
    marginTop: 8,
  },
});