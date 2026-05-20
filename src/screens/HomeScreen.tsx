import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { MOVING_SERVICES } from '../data/mockData';
import { HomeStackParamList } from '../navigation/types';
import { MovingService } from '../types';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeList'>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');
  
  const savedItems = useSavedStore((state) => state.savedItems);
  const addItem = useSavedStore((state) => state.addItem);
  const removeItem = useSavedStore((state) => state.removeItem);

  const filteredServices = useMemo(() => {
    return MOVING_SERVICES.filter(s => 
      s.title.toLowerCase().includes(search.toLowerCase()) || 
      s.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const toggleSave = useCallback((item: MovingService, isSaved: boolean) => {
    if (isSaved) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  }, [addItem, removeItem]);

  const renderItem = useCallback(({ item }: { item: MovingService }) => {
    const isSaved = savedItems.some((i) => i.id === item.id);

    return (
      <View style={styles.card}>
        <TouchableOpacity 
          style={styles.cardContent}
          onPress={() => navigation.navigate('HomeDetail', { id: item.id, title: item.title })}
        >
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardCategory}>{item.category}</Text>
          <Text style={styles.cardPrice}>{item.price}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={() => toggleSave(item, isSaved)}
        >
          <Ionicons 
            name={isSaved ? 'bookmark' : 'bookmark-outline'} 
            size={24} 
            color={COLORS.primary} 
          />
        </TouchableOpacity>
      </View>
    );
  }, [navigation, savedItems, toggleSave]);

  const renderEmpty = useCallback(() => (
    <Text style={styles.empty}>No se encontraron servicios de mudanza.</Text>
  ), []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar servicio o categoría..."
          placeholderTextColor={COLORS.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  searchContainer: { padding: SPACING.m, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  searchBar: { height: 45, backgroundColor: COLORS.background, borderRadius: 10, paddingHorizontal: 15, borderWidth: 1, borderColor: COLORS.border, color: COLORS.text, ...TYPOGRAPHY.body },
  list: { padding: SPACING.m },
  card: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'space-between' },
  cardContent: { flex: 1, padding: SPACING.m },
  cardTitle: { ...TYPOGRAPHY.header, fontSize: 16, color: COLORS.text, marginBottom: 4 },
  cardCategory: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginBottom: 8 },
  cardPrice: { ...TYPOGRAPHY.body, fontWeight: 'bold', color: COLORS.primary },
  saveButton: { padding: SPACING.m, justifyContent: 'center', alignItems: 'center' },
  empty: { textAlign: 'center', marginTop: 50, ...TYPOGRAPHY.body, color: COLORS.textSecondary }
});

export default HomeScreen;