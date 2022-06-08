import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function Helper() {
  const navigation = useNavigation();

  return (
    <View>
      {/* aubergine 26123A / foncé 21132F */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("HelperRequestListScreen");
        }}
      >
        <View
          style={{
            width: 290,
            height: 250,
            backgroundColor: "#FFF",
            marginBottom: 50,
            elevation: 3,
            borderRadius: 8,
            marginTop: 30,
          }}
        >
          <Text style={{alignSelf: "center",  marginTop: 20,}}>Répondez à ces demandes</Text>
          <Image></Image>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
