import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Onboarding from "../components/DemoComponents/Onboarding";

import { connect } from "react-redux";


/* ----------------------------- MAIN FUNCTION ---------------------------------*/
function DemoScreen(props) {

  const [visible, setVisible] = useState(true);

  const toggleOverlay = () => {
    setVisible(!visible);
  };


  useEffect(() => {
    // get async storage : token
    AsyncStorage.getItem("token", async function (error, data) {
      console.log("LOCAL STORAGE TOKEN - DEMO:", data);
        // 192.168.1.124
        if (data) {
          let response = await fetch( `http://192.168.1.124:3000/users/get-user/${data}`);
          response = await response.json();
          console.log("REPONSE DU BACK DEMO-PAGE:", response);
          
          props.saveUserInfo(response.userInfo);
      
          return props.navigation.navigate("BottomNavigator", { screen: 'HomeScreen' })
        }
    })
  },[]);



  return (
     
    <View style={styles.container}>
        <Text
          style={styles.skip}
          onPress={() => {
            props.navigation.navigate("SignUpScreen");
          }}
        >
          Passer
        </Text>

        {/* Slides */}
        <Onboarding />
        <StatusBar style="auto" />
      </View>
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
) (DemoScreen);


//
// ─────────────────────────────────────────────────── ──────────
//   :::::: S T Y L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  skip: {
    position: "absolute",
    top: 30,
    right: 30,
    fontSize: 16,
    color: "lightgrey",
    paddingVertical: 20,
    zIndex: 10,
  },
  overlay: {
    backgroundColor: "#F7CE46",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  overlayText: {
    fontSize: 50,
  },
  image: {
    width: "100%"
  }
});