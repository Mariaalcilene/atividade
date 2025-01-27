import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Curiosidades() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Icon name="heartbeat" size={30} color="white" />
        <Text style={styles.text}>
          Estudos mostram que corrida melhora as funções cognitivas, aumentando o fluxo sanguíneo para o cérebro.
        </Text>
      </View>

      <View style={styles.box}>
        <Icon name="medkit" size={30} color="white" />
        <Text style={styles.text}>
          Corredores regulares têm um risco 45% menor de morrer de doenças cardíacas em comparação com não corredores.
        </Text>
      </View>

      <View style={styles.box}>
        <Icon name="smile-o" size={30} color="white" />
        <Text style={styles.text}>
          Uma corrida matinal libera endorfinas, os chamados "hormônios da felicidade", que ajudam a melhorar o estado de espírito e aumentar a disposição.
        </Text>
      </View>

      <View style={styles.box}>
      <Icon name="bed" size={30} color="white" />
        <Text style={styles.text}>
          Correr regularmente melhora a resistência e a qualidade do sono, tornando o dia mais produtivo.
        </Text>
      </View>
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
  box: {
    backgroundColor: '#4682b4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row', // Ícone e texto lado a lado
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10, // Espaço entre o ícone e o texto
    textAlign: 'left',
    flex: 1, // Para evitar que o texto fique apertado
  },
});
