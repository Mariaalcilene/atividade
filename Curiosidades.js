import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Curiosidades() {
  return (
    <View style={styles.container}>
       <Image 
       source={require('./assets/pessoas-correndo.jpg')}
       
        style={styles.image}
      />
      
      
      <View style={styles.box}>
        <Text style={styles.text}>
       Estudos monstram que corrida melhora a funções congnitivas, aumentando o fluxo sanguíneo para o cérebro
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.text}>
        Corredores regulares têm um risco 45% menor de morrer de doenças cardíacas em comparação com não corredores.
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.text}>
        Uma corrida matinal libera endorfinas, os chamados "hormônios da felicidade", que ajudam a melhorar o estado de espírito e aumentar a disposição.
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: 200, 
    height:180,
    marginBottom: 16,
  },
  box: {
    backgroundColor: '#d3d3d3', 
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },

  text: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
});
