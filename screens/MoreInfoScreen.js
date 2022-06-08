import React from "react";
import { StyleSheet, ImageBackground, View, Text } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";


export default function MoreInfoScreen(props) {


  return (
    <ImageBackground source={require("../assets/background-1.png")} style={styles.container} >

    <View style={{fontSize: 30}}>
        <Text>More Info Screen</Text>
    </View>

      <Button
        icon={<Icon name="arrow-right" size={20} color="#eb4d4b" />}
        title="Go to Home Screen"
        type="solid"
        onPress={() => {
          // props.navigation.navigate("BottomNavigator");
        }}
        // { screen: 'HomeScreen' }
      />
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