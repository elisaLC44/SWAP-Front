import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, View, Text, Image, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { connect } from 'react-redux';


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
    console.log(  "REPONSE DU BACK ==>", response.login,  "AND error",  response.error,  "AND token:",  response.token, "AND USERINFO", response.userInfo );

    props.saveUserInfo(response.userInfo)

    if (response.login === true) {
      AsyncStorage.setItem("token", response.token);
      return props.navigation.navigate("BottomNavigator", { screen: "HomeScreen", });
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
      <ScrollView style={{flex:1, marginTop: 50}}>
      <View style={{ fontSize: 30 }}>
        <Text style={{ fontSize: 25, marginBottom: 35 }}>Sign In - Connexion Screen</Text>
      </View>

      <Input
        leftIcon={<Icon name="account-outline" size={20} />}
        placeholder="Email"
        containerStyle={{ width: 300 }}
        onChangeText={(text) => setEmail(text)}
        value={email}
      ></Input>

      <Input
        leftIcon={<Icon name="account-outline" size={20} />}
        placeholder="Mot de passe"
        containerStyle={{ width: 300, marginBottom: 50 }}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        value={password}
      ></Input>

      <View>
        <Text style={{ fontSize: 15, marginBottom: 15, color: "grey" }}>
          {errorMessage}
        </Text>
      </View>

      <Button
      buttonStyle={{ backgroundColor: "#F7CE46" }}
      title="Connexion"
      type="solid"
      onPress={() => {handleSubmit()}}
      />

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
    </ImageBackground>
  );
}

function mapDispatchToProps(dispatch){
  return {
    saveUserInfo: function(info) {
      dispatch({
        type: 'saveUserInfo',
        userInfo : info 
    })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
) (SignInScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
