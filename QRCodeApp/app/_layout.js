import { Stack, Slot } from "expo-router";
import { View, Text } from "react-native";
export default function Layout() {
  // Slot vai renderizar o conteúdo da atual rota. Podemos por exemplocriar um header e um footer fixos
  // e deixar o conteúdo da rota no Slot
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "grey" }}>
        <Text style={{ fontSize: 24, textAlign: "center", margin: 20 }}>
          VeroQRCOde
        </Text>
        <Slot />
      </View>
    </>
  );
}
