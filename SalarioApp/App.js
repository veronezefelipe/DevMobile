import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  const [salario, setSalario] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularDivisao = () => {
    const valor = parseFloat(salario);
    if (isNaN(valor) || valor <= 0) {
      alert('Digite um salário válido.');
      return;
    }

    const necessidades = valor * 0.5;
    const desejos = valor * 0.3;
    const poupanca = valor * 0.2;

    setResultado({ necessidades, desejos, poupanca });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Text style={styles.titulo}>Divisor de Salário 50/30/20</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu salário"
        keyboardType="numeric"
        value={salario}
        onChangeText={setSalario}
      />

      <Button title="Calcular" onPress={calcularDivisao} />

      {resultado && (
        <View style={styles.resultado}>
          <Text style={styles.item}>🧾 Necessidades (50%): R$ {resultado.necessidades.toFixed(2)}</Text>
          <Text style={styles.item}>🎉 Desejos (30%): R$ {resultado.desejos.toFixed(2)}</Text>
          <Text style={styles.item}>💰 Poupança (20%): R$ {resultado.poupanca.toFixed(2)}</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 24,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 18,
  },
  resultado: {
    marginTop: 24,
    backgroundColor: '#eef',
    padding: 16,
    borderRadius: 8,
  },
  item: {
    fontSize: 18,
    marginBottom: 8,
  },
});
