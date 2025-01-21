import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Desafios() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Desafios</Text>
      <Text style={styles.text}>Complete 1000 passos por dia!</Text>
      <Text style={styles.text}>Caminhe 5km em uma semana!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});
