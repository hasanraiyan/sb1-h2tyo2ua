import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import MenuItem from '../../components/MenuItem';
import { useRouter } from 'expo-router';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function MenuScreen() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'menuItems'), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as MenuItem[];
      setMenuItems(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    // TODO: Implement cart functionality
    router.push('/cart');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <MenuItem item={item} onAddToCart={() => handleAddToCart(item)} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
});