import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Metas() {
  const [meta, setMeta] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Defina sua Meta</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua meta"
        keyboardType="numeric"
        onChangeText={(text) => setMeta(Number(text))}
      />
      <Button title="Salvar Meta" onPress={() => alert(`Meta definida: ${meta} passos`)} />
      <Text style={styles.stepCount}>Meta Atual: {meta}</Text>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    width: '80%',
    textAlign: 'center',
    paddingLeft: 8,
  },
  stepCount: {
    fontSize: 18,
    marginTop: 16,
  },
});
