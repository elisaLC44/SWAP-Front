import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { connect } from "react-redux";

/* ----------------------------- MAIN FUNCTION ---------------------------------*/
function SignInScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(">>> Email: ", email);
  // console.log(">>> Password: ", password);

  const [errorMessage, setErrorMessage] = useState([]);
  console.log(">>> Error Message SIGN IN: ", errorMessage);

  const handleSubmit = async () => {
    let response = await fetch("http://192.168.1.124:3000/users/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${email}&password=${password}`,
    });
    response = await response.json();
    console.log(
      "REPONSE DU BACK ==>",
      response.login,
      "AND error",
      response.error,
      "AND token:",
      response.token,
      "AND USERINFO",
      response.userInfo
    );

    props.saveUserInfo(response.userInfo);

    if (response.login === true) {
      AsyncStorage.setItem("token", response.token);
      return props.navigation.navigate("BottomNavigator", {
        screen: "HomeScreen",
      });
    }

    if (response.error !== []) {
      setErrorMessage(response.error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background-1.png")}
      style={styles.container}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          marginBottom: 40,
        }}
      >
        <Text style={{ fontSize: 25 }}>Connexion</Text>
      </View>

      <View style={{ flex: 4 }}>
      <ScrollView
        contentContainerStyle={{flexDirection: "column", alignItems: "center"}}>
          <Input
            containerStyle={styles.input}
            inputStyle={{ fontSize: 13 }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          ></Input>

          <Input
            placeholder="Mot de passe"
            containerStyle={styles.input}
            inputStyle={{ fontSize: 13 }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            value={password}
          ></Input>

          <View>
            <Text style={{ fontSize: 15, marginBottom: 15, color: "grey" }}>
              {errorMessage}
            </Text>
          </View>

          <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                handleSubmit();
              }}
            >
              <Text style={styles.text}>Connexion</Text>
            </TouchableOpacity>


          {/* TITLE */}
          <View>
            <Text
              style={{
                color: "black",
                alignSelf: "center",
                fontSize: 14,
                marginTop: 50,
                marginBottom: 15,
              }}
            >
              OU connectez-vous avec
            </Text>
          </View>

          {/* MINI LOGO RESEAU */}
          <View
            style={{
              flexDirection: "row",
              marginBottom: 30,
              width: 200,
              justifyContent: "space-between",
            }}
          >
            <Image
              source={require("../assets/GroupIcons/Group40.png")}
              style={{ width: 40, height: 40 }}
            />
            <Image
              source={require("../assets/GroupIcons/Group41.png")}
              style={{ width: 40, height: 40 }}
            />
            <Image
              source={require("../assets/GroupIcons/Group42.png")}
              style={{ width: 40, height: 40 }}
            />
          </View>

          <Text
            style={{
              color: "grey",
              fontSize: 13,
              marginTop: 40,
              alignSelf: "center",
            }}
            onPress={() => {
              props.navigation.navigate("SignUpScreen");
            }}
          >
            Pas encore de compte Swap? C'est par ici
          </Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    saveUserInfo: function (info) {
      dispatch({
        type: "saveUserInfo",
        userInfo: info,
      });
    },
  };
}

export default connect(null, mapDispatchToProps)(SignInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 45,
    width: Dimensions.get("window").width * 0.85,
    fontSize: 13,
    margin: 15,
    borderWidth: 0.5,
    paddingLeft: 15,
    borderRadius: 10,
    borderColor: "#E7E7E7",
    backgroundColor: "#FFFFFF",
    elevation: 3,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  button: {
    backgroundColor: "#F7CE46",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.85,
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 3,
    height: 45,
  },
  text: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.6,
  },
});
