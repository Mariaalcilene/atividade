import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function Home() {
  const [steps, setSteps] = useState(0); // Contador de passos
  const [meta, setMeta] = useState(50); // Meta inicial de passos
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
      <Text style={styles.header}>Contador de Passos</Text>
      <Text style={styles.text}>Meta Atual: {meta} passos</Text>
      <Text style={styles.text}>Passos: {steps}</Text>
      <Text style={styles.text}>
        Tempo: {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
      </Text>
      <Button
        title={isTracking ? 'Pausar' : 'Iniciar'}
        onPress={handleStartTracking}
      />
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
