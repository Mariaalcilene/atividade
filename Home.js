import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const [steps, setSteps] = useState(0); // Contador de passos
  const [meta, setMeta] = useState(10); // Meta inicial de 10 passos
  const [elapsedTime, setElapsedTime] = useState(0); // Tempo decorrido em segundos
  const [isTracking, setIsTracking] = useState(false); // Controle do rastreamento
  const [timerRunning, setTimerRunning] = useState(false); // Controle do cronômetro
  const incrementPercentage = 0.2; // Aumenta a meta em 20%

  // Inicia ou pausa o cronômetro
  useEffect(() => {
    let timer;
    if (timerRunning) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timerRunning]);

  // Configura o Acelerômetro para detectar passos
  useEffect(() => {
    let subscription;

    if (isTracking) {
      subscription = Accelerometer.addListener((data) => {
        const magnitude = Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);

        // Verifica se a magnitude do movimento ultrapassa o limite
        if (magnitude > 1.5) {
          setSteps((prevSteps) => prevSteps + 1);
        }
      });

      Accelerometer.setUpdateInterval(100); // Atualiza a cada 100ms
    } else {
      if (subscription) subscription.remove(); // Remove o listener quando parar o rastreamento
    }

    return () => {
      if (subscription) subscription.remove();
    };
  }, [isTracking]);

  // Verifica se a meta foi atingida
  useEffect(() => {
    if (steps >= meta) {
      setTimerRunning(false); // Pausa o cronômetro
      Alert.alert(
        'Parabéns!',
        `Você atingiu sua meta de ${meta} passos em ${Math.floor(elapsedTime / 60)}:${(elapsedTime % 60)
          .toString()
          .padStart(2, '0')} minutos!`
      );

      // Calcula a nova meta com base no incremento percentual
      const novaMeta = Math.ceil(meta + meta * incrementPercentage);
      setMeta(novaMeta);

      // Reinicia o contador de passos e o cronômetro
      setSteps(0);
      setElapsedTime(0);
      setTimerRunning(true); // Reinicia o cronômetro para a nova meta
    }
  }, [steps]);

  // Inicia ou reinicia o rastreamento
  const handleStartTracking = () => {
    if (!isTracking) {
      setSteps(0); // Reinicia o contador de passos
      setElapsedTime(0); // Reinicia o cronômetro
      setTimerRunning(true); // Inicia o cronômetro
    } else {
      setTimerRunning(false); // Pausa o cronômetro
    }
    setIsTracking(!isTracking);
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        {/* Ícone no centro */}
        <Ionicons name="walk" size={28} color="#000" style={styles.icon} />
        <Text style={styles.steps}>{steps}</Text>
        <Text style={styles.label}>Passos</Text>
      </View>

      <View style={styles.dataContainer}>
        <View style={[styles.dataBox, styles.border]}>
          <Text style={styles.dataLabel}>Meta</Text>
          <Text style={styles.dataValue}>{meta}</Text>
        </View>
        <View style={[styles.dataBox, styles.border]}>
          <Text style={styles.dataLabel}>Tempo</Text>
          <Text style={styles.dataValue}>
            {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: isTracking ? '#FF4500' : '#4682B4' }]}
        onPress={handleStartTracking}
      >
        <Text style={styles.startButtonText}>{isTracking ? 'Pausar' : 'Iniciar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: '#4682B4', // Azul
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: '20%', // Ajuste da posição do ícone
  },
  steps: {
    fontSize: 38, // Aumentado para destaque
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10, // Subindo o número
  },
  label: {
    fontSize: 18,
    color: '#000',
    marginTop: -5, // Subindo o nome "Passos"
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 24,
  },
  dataBox: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    borderWidth: 2,
    borderColor: '#4682B4', // Azul
  },
  dataLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dataValue: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  startButton: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
