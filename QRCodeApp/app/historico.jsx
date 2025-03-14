import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Linking, Button, Share } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage

export default function Historico() {
  const { qrList } = useLocalSearchParams();
  const [qrListArray, setQrListArray] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // Estado para alternar entre temas

  // Função para carregar o histórico do AsyncStorage
  const loadHistory = async () => {
    try {
      const storedQrList = await AsyncStorage.getItem("qrList"); // Recupera a lista do AsyncStorage
      if (storedQrList) {
        setQrListArray(JSON.parse(storedQrList)); // Atualiza o estado com os dados recuperados
      }
    } catch (error) {
      console.error("Erro ao carregar o histórico:", error);
    }
  };

  // Função para salvar o histórico no AsyncStorage
  const saveHistory = async (qrList) => {
    try {
      await AsyncStorage.setItem("qrList", JSON.stringify(qrList)); // Salva no AsyncStorage
    } catch (error) {
      console.error("Erro ao salvar o histórico:", error);
    }
  };

  useEffect(() => {
    loadHistory(); // Carrega o histórico ao montar o componente
  }, []);

  useEffect(() => {
    saveHistory(qrListArray); // Sempre que o qrListArray mudar, salva no AsyncStorage
  }, [qrListArray]);

  const limparHistorico = () => {
    setQrListArray([]); // Limpa o histórico no estado
  };

  const renderItem = ({ item, index }) => {
    const { url, timestamp } = item;
    
    // Verificar se a URL e o timestamp são strings válidas antes de renderizar
    const validUrl = typeof url === "string" ? url : "";
    const validTimestamp = typeof timestamp === "string" ? timestamp : "Data não disponível";

    // Função para compartilhar o conteúdo do QR Code
    const compartilharQRCode = async () => {
      try {
        await Share.share({
          message: `QR Code escaneado: ${validUrl}\nEscaneado em: ${validTimestamp}`,
        });
      } catch (error) {
        console.error("Erro ao compartilhar QR Code:", error);
      }
    };

    return (
      <View
        style={styles.listItem}
        onLongPress={compartilharQRCode} // Ação de pressionar longamente para compartilhar
      >
        <Text
          style={[
            styles.listText,
            { color: darkMode ? "white" : "blue", textDecorationLine: "underline" },
          ]}
          onPress={() => Linking.openURL(validUrl)}
        >
          {validUrl}
        </Text>
        <Text style={[styles.timestampText, { color: darkMode ? "#bbb" : "#666" }]}>
          Escaneado em: {validTimestamp}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.historyContainer,
        darkMode && { backgroundColor: "#000", color: "#fff" },
      ]}
    >
      <Text style={[styles.historyTitle, { color: darkMode ? "white" : "black" }]}>
        Histórico de QR Codes Escaneados
      </Text>
      <FlatList
        data={qrListArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={{ color: darkMode ? "white" : "black" }}>Nenhum QR Code escaneado ainda</Text>}
      />
      <Button
        title={darkMode ? "Tema Claro" : "Tema Escuro"}
        onPress={() => setDarkMode(!darkMode)}
        color={darkMode ? "white" : "black"}
      />
      <Button title="Limpar Histórico" onPress={limparHistorico} color={darkMode ? "red" : "gray"} />
    </View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    flex: 1,
    padding: 20,
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listText: {
    fontSize: 16,
  },
  timestampText: {
    fontSize: 12,
  },
});
