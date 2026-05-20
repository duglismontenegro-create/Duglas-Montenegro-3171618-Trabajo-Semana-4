import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { HomeStackParamList } from '../navigation/types';
import { MOVING_SERVICES } from '../data/mockData';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type DetailScreenRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const { id } = route.params;

  const savedItems = useSavedStore((state) => state.savedItems);
  const addItem = useSavedStore((state) => state.addItem);
  const removeItem = useSavedStore((state) => state.removeItem);

  const service = useMemo(() => {
    return MOVING_SERVICES.find(s => s.id === id);
  }, [id]);

  const isSaved = useMemo(() => {
    return savedItems.some((item) => item.id === id);
  }, [savedItems, id]);

  if (!service) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Servicio no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.title}>{service.title}</Text>
        <Text style={styles.categoryTag}>{service.category}</Text>
        
        <View style={styles.row}>
          <Text style={styles.label}>Precio estimado:</Text>
          <Text style={styles.value}>{service.price}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Capacidad de carga:</Text>
          <Text style={styles.value}>{service.capacity}</Text>
        </View>

        <Text style={styles.subTitle}>Descripción del Servicio</Text>
        <Text style={styles.description}>{service.description}</Text>

        <TouchableOpacity 
          style={[styles.actionButton, isSaved ? styles.removeBtn : styles.addBtn]}
          onPress={() => isSaved ? removeItem(service.id) : addItem(service)}
        >
          <Ionicons 
            name={isSaved ? 'trash-outline' : 'bookmark-outline'} 
            size={20} 
            color={COLORS.white} 
            style={{ marginRight: 8 }}
          />
          <Text style={styles.btnText}>
            {isSaved ? 'Quitar de Cotizaciones' : 'Guardar Cotización'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: SPACING.m },
  infoBox: { backgroundColor: COLORS.white, padding: SPACING.l, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border },
  title: { ...TYPOGRAPHY.header, color: COLORS.text, marginBottom: 8 },
  categoryTag: { alignSelf: 'flex-start', backgroundColor: COLORS.secondary, color: COLORS.white, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, fontSize: 12, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  label: { ...TYPOGRAPHY.body, color: COLORS.textSecondary },
  value: { ...TYPOGRAPHY.detail, fontWeight: 'bold', color: COLORS.primary },
  subTitle: { ...TYPOGRAPHY.header, fontSize: 16, color: COLORS.text, marginTop: 20, marginBottom: 8 },
  description: { ...TYPOGRAPHY.body, color: COLORS.text, lineHeight: 20, marginBottom: 24 },
  actionButton: { flexDirection: 'row', height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  addBtn: { backgroundColor: COLORS.primary },
  removeBtn: { backgroundColor: '#EF4444' },
  btnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { ...TYPOGRAPHY.body, color: 'red' }
});

export default DetailScreen;