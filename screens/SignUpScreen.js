import React, { useState } from "react";
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
import { Input } from "react-native-elements";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

/* ----------------------------- MAIN FUNCTION ---------------------------------*/
function SignUpScreen(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log(">>> Firstname: ", firstName);
  // console.log(">>> Lastname: ", lastName);
  // console.log(">>> Email: ", email);
  // console.log(">>> Password: ", password);

  const [errorMessage, setErrorMessage] = useState([]);
  console.log(">>> Error Message SIGN UP: ", errorMessage);

  const handleSubmit = async () => {
    let response = await fetch("https://swap-newapp.herokuapp.com/users/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `firstName=${firstName}&lastName=${lastName}&email=${email}&password=${password}`,
    });
    response = await response.json();
    console.log(
      "REPONSE DU BACK ==>",
      response.result,
      "AND",
      response.userSaved,
      "AND error",
      response.error,
      "AND token:",
      response.token
    );

    if (response.result === true) {
      AsyncStorage.setItem("token", response.token);
      props.saveUserInfo(response.userSaved);
      return props.navigation.navigate("BottomNavigator", {
        screen: "HomeScreen",
      });
    } else {
      setErrorMessage(response.error);
    }

    // REDUX: infos USER dans le store pour exploitation à l'arrivée sur page Home

    // if (response.error != []) {
    //   setErrorMessage(response.error);
    // }

    // Si inscription validée, stockage du token en local
    // if (response.token) {
    //   AsyncStorage.setItem("token", response.token);
    // }
  };

  var tabErrorMessages = errorMessage.map((error, i) => {
    return <Text>{error}</Text>;
  });

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
        <Text style={{ fontSize: 25 }}>Inscription</Text>
      </View>

      <View style={{ flex: 5 }}>
        <ScrollView
        contentContainerStyle={{flexDirection: "column", alignItems: "center"}}>
          <Input
            placeholder="Prénom"
            containerStyle={styles.input}
            inputStyle={{ fontSize: 15 }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={(text) => setFirstName(text)}
          ></Input>

          <Input
            placeholder="Nom"
            containerStyle={styles.input}
            inputStyle={{ fontSize: 15 }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={(text) => setLastName(text)}
          ></Input>

          <Input
            placeholder="Email"
            containerStyle={styles.input}
            inputStyle={{ fontSize: 15 }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={(text) => setEmail(text)}
          ></Input>

          <Input
            placeholder="Mot de passe"
            containerStyle={styles.input}
            inputStyle={{ fontSize: 15 }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          ></Input>

          <View>
            <Text style={{ fontSize: 15, marginBottom: 30, color: "grey" }}>
              {/* {errorMessage} */}
              {tabErrorMessages}
            </Text>
          </View>

          {/* TITLE */}
          <View>
            <Text
              style={{
                color: "black",
                alignSelf: "center",
                fontSize: 14,
                marginBottom: 15,
              }}
            >
              OU inscrivez-vous avec
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

          <View style={{ }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text style={styles.text}>Inscription</Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: "grey",
              fontSize: 13,
              marginTop: 35,
              alignSelf: "center",
            }}
            onPress={() => {
              props.navigation.navigate("SignInScreen");
            }}
          >
            Déjà un compte? Connectez-vous ici
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

export default connect(null, mapDispatchToProps)(SignUpScreen);

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
    paddingTop: 3,
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
    // marginTop: 40,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation:3,
    height: 45,
  },
  text: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.6,
  },
});
