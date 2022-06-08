import React from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

export default function RequestSentConfirmation(props) {
  // const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../assets/background-1.png")}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("ComposeRequestScreen");
        }}
      >
        <Entypo name="cross" size={50} color="black" />
      </TouchableOpacity>
      <View>
        <Text style={{ fontSize: 30 }}>Demande Envoyée!</Text>
      </View>

      <Image style={{width:200, height:200}} source={require("../assets/swap-icon.png")} />

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
