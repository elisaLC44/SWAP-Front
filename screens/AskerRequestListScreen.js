import React from "react";
// { useState, useEffect }
import { StyleSheet, ImageBackground, View, Text } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

// import { connect } from 'react-redux';

export default function AskerRequestListScreen() {

  const navigation = useNavigation();
  return (
    <ImageBackground source={require("../assets/background-1.png")} style={styles.container}  >

      <View><Text>Asker Request List Screen (agrandissement de la list sur homepage)</Text></View>

    </ImageBackground>
  );
}

//
// ─────────────────────────────────────────────────── ──────────
//   :::::: S T Y L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});