import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Curiosidades() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Curiosidades</Text>
      <Text style={styles.text}>
        Você sabia que caminhar regularmente melhora sua saúde mental?
      </Text>
      <Text style={styles.text}>
        10 mil passos por dia ajudam a manter uma vida saudável!
      </Text>
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
