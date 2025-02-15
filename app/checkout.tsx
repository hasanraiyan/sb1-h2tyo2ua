import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const paymentMethods = [
  { id: 'card', label: 'Credit Card', icon: 'card-outline' },
  { id: 'cash', label: 'Cash on Delivery', icon: 'cash-outline' },
];

const deliveryTimes = [
  { id: 'asap', label: 'As Soon As Possible' },
  { id: '30min', label: 'In 30 Minutes' },
  { id: '1hour', label: 'In 1 Hour' },
];

export default function CheckoutScreen() {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [selectedTime, setSelectedTime] = useState('asap');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your delivery address"
          value={address}
          onChangeText={setAddress}
          multiline
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Time</Text>
        <View style={styles.optionsContainer}>
          {deliveryTimes.map((time) => (
            <Pressable
              key={time.id}
              style={[
                styles.timeOption,
                selectedTime === time.id && styles.selectedOption,
              ]}
              onPress={() => setSelectedTime(time.id)}
            >
              <Text
                style={[
                  styles.timeOptionText,
                  selectedTime === time.id && styles.selectedOptionText,
                ]}
              >
                {time.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        {paymentMethods.map((method) => (
          <Pressable
            key={method.id}
            style={[
              styles.paymentOption,
              selectedPayment === method.id && styles.selectedPayment,
            ]}
            onPress={() => setSelectedPayment(method.id)}
          >
            <View style={styles.paymentInfo}>
              <Ionicons
                name={method.icon as any}
                size={24}
                color={selectedPayment === method.id ? '#fff' : '#666'}
              />
              <Text
                style={[
                  styles.paymentLabel,
                  selectedPayment === method.id && styles.selectedPaymentText,
                ]}
              >
                {method.label}
              </Text>
            </View>
            {selectedPayment === method.id && (
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
            )}
          </Pressable>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Note</Text>
        <TextInput
          style={[styles.input, styles.noteInput]}
          placeholder="Add a note for your order"
          value={note}
          onChangeText={setNote}
          multiline
        />
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>$34.97</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>$2.99</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>$37.96</Text>
        </View>
      </View>

      <Pressable style={styles.placeOrderButton}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  noteInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeOption: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#FF6B6B',
  },
  timeOptionText: {
    fontSize: 14,
    color: '#666',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '500',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedPayment: {
    backgroundColor: '#FF6B6B',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentLabel: {
    fontSize: 16,
    color: '#666',
  },
  selectedPaymentText: {
    color: '#fff',
    fontWeight: '500',
  },
  summary: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  placeOrderButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});