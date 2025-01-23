import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Desafios() {
  const [calorias, setCalorias] = useState(''); // Entrada de calorias
  const [passosCalculados, setPassosCalculados] = useState(null); // Passos calculados

  const progressoSemanal = [2000, 3500, 4000, 5000, 6000, 7000]; // Dados fictícios do gráfico

  // Fórmula de conversão de calorias para passos
  const calcularPassos = () => {
    if (!calorias || isNaN(calorias)) {
      alert('Por favor, insira um valor válido de calorias.');
      return;
    }
    const passos = Math.ceil(calorias * 20); // Exemplo: 1 caloria = 20 passos
    setPassosCalculados(passos);
  };

  return (
    <View style={styles.container}>
      {/* Gráfico de Progresso Semanal */}
      <Text style={styles.subHeader}>Progresso Semanal</Text>
      <LineChart
        data={{
          labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
          datasets: [
            {
              data: progressoSemanal,
            },
          ],
        }}
        width={Dimensions.get('window').width * 0.9} // Largura ajustável
        height={220} // Corrigido o tamanho
        yAxisSuffix=" passos"
        chartConfig={{
          backgroundColor: '#ADD8E6', // Azul claro
          backgroundGradientFrom: '#B0E0E6', // Gradiente azul claro
          backgroundGradientTo: '#4682B4', // Azul médio
          decimalPlaces: 0, // Sem casas decimais
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Linhas em branco
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4', // Tamanho dos pontos
            strokeWidth: '2',
            stroke: '#fff', // Cor do contorno dos pontos
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      {/* Cálculo de Calorias para Passos */}
      <Text style={styles.subHeader}>Calcule a quantidade de calorias que deseja gastar</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite as calorias desejadas"
        keyboardType="numeric"
        value={calorias}
        onChangeText={(text) => setCalorias(text)}
        placeholderTextColor="#888" // Placeholder com cor cinza
      />
      <TouchableOpacity style={styles.button} onPress={calcularPassos}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
      {passosCalculados && (
        <Text style={styles.resultText}>
          Para gastar {calorias} calorias, você precisa dar cerca de {passosCalculados} passos.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#555',
  },
  input: {
    height: 50,
    width: Dimensions.get('window').width * 0.9, // Mesmo tamanho do gráfico
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff', // Fundo branco
  },
  button: {
    backgroundColor: '#4682B4', // Azul médio para combinar com o gráfico
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
    width: Dimensions.get('window').width * 0.9, // Mesmo tamanho do gráfico
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 8,
    textAlign: 'center',
  },
});
