import React, { useState } from "react";
// { useEffect }
import { StyleSheet, ImageBackground, View, Text, Image, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from 'react-redux';


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
    let response = await fetch("http://192.168.1.124:3000/users/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `firstName=${firstName}&lastName=${lastName}&email=${email}&password=${password}`,
    });
    response = await response.json();
    console.log( "REPONSE DU BACK ==>", response.result,  "AND",  response.userSaved,  "AND error",  response.error,  "AND token:",  response.token);


    if (response.result === true) {
      AsyncStorage.setItem("token", response.token);
      props.saveUserInfo(response.userSaved)
      return props.navigation.navigate("BottomNavigator", { screen: "HomeScreen",});
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


  var tabErrorMessages = errorMessage.map((error,i) => {
    return(<Text>{error}</Text>)
  })
  
  return (
    <ImageBackground
      source={require("../assets/background-1.png")}
      style={styles.container}
    >

      <ScrollView style={{flex:1, marginTop: 50}}>
      <View style={{ marginBottom: 50 }}>
        <Text style={{ fontSize: 25 }}>Sign Up/Inscription</Text>
      </View>

      
        <Input
          leftIcon={<Icon name="account-outline" size={20} />}
          placeholder="Prénom"
          containerStyle={{ width: 300 }}
          // inputStyle={{ fontSize: 13 }}
          // inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={(text) => setFirstName(text)}
        ></Input>

        <Input
          leftIcon={<Icon name="account-outline" size={20} />}
          placeholder="Nom"
          containerStyle={{ width: 300 }}
          onChangeText={(text) => setLastName(text)}
        ></Input>

        <Input
          leftIcon={<Icon name="account-outline" size={20} />}
          placeholder="Email"
          containerStyle={{ width: 300 }}
          onChangeText={(text) => setEmail(text)}
        ></Input>

        <Input
          leftIcon={<Icon name="account-outline" size={20} />}
          placeholder="Mot de passe"
          containerStyle={{ width: 300, marginBottom: 10 }}
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

      <Button
        buttonStyle={{ backgroundColor: "#F7CE46" }}
        title="Inscription"
        type="solid"
        onPress={() => {
          handleSubmit();
        }}
      />

      <Text
        style={{
          color: "grey",
          fontSize: 13,
          marginTop: 40,
          alignSelf: "center",
        }}
        onPress={() => {
          props.navigation.navigate("SignInScreen");
        }}
      >
        Déjà un compte? Connectez-vous ici
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
) (SignUpScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
