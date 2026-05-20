import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useSavedStore } from '../stores/savedStore';
import { MovingService } from '../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

const SavedScreen = () => {
  const savedItems = useSavedStore((state) => state.savedItems);
  const removeItem = useSavedStore((state) => state.removeItem);
  const clearStore = useSavedStore((state) => state.clearStore);

  const renderItem = useCallback(({ item }: { item: MovingService }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => removeItem(item.id)}
      >
        <Ionicons name="trash" size={22} color="#EF4444" />
      </TouchableOpacity>
    </View>
  ), [removeItem]);

  const renderEmpty = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Ionicons name="folder-open-outline" size={60} color={COLORS.textSecondary} />
      <Text style={styles.emptyText}>No tienes servicios de mudanza guardados.</Text>
    </View>
  ), []);

  return (
    <View style={styles.container}>
      {savedItems.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearStore}>
          <Ionicons name="trash-bin-outline" size={18} color={COLORS.white} style={{ marginRight: 6 }} />
          <Text style={styles.clearText}>Limpiar Todo</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={savedItems}
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
  list: { padding: SPACING.m },
  clearButton: { flexDirection: 'row', backgroundColor: '#EF4444', margin: SPACING.m, marginBottom: 0, padding: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  clearText: { color: COLORS.white, fontWeight: 'bold' },
  card: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  cardContent: { flex: 1, padding: SPACING.m },
  cardTitle: { ...TYPOGRAPHY.header, fontSize: 16, color: COLORS.text, marginBottom: 4 },
  cardCategory: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginBottom: 8 },
  cardPrice: { ...TYPOGRAPHY.body, fontWeight: 'bold', color: COLORS.primary },
  deleteButton: { padding: SPACING.m, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100, paddingHorizontal: 40 },
  emptyText: { textAlign: 'center', marginTop: 16, ...TYPOGRAPHY.body, color: COLORS.textSecondary }
});

export default SavedScreen;