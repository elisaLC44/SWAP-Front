import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

import Helper from "../components/HomeComponents/Helper";
import Asker from "../components/HomeComponents/Asker";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

/* ----------------------------- MAIN FUNCTION ---------------------------------*/


function HomeScreen({ user, navigation }) {


  useEffect(() => {
    setHelperOn(true);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("token", function (error, data) {
      console.log("LOCAL STORAGE TOKEN - HOMEPAGE:", data);
    });
  }, []);

  const [helperOn, setHelperOn] = useState(false);
  const [askerOn, setAskerOn] = useState(false);
  // console.log("helperOn", helperOn);
  // console.log("askerOn", askerOn);

  var userConfig;

  const handleHelperOn = () => {
    setHelperOn(true);
    setAskerOn(false);
  };

  if (helperOn == true) {
    userConfig = <Helper />;
  } else {
    userConfig = <Asker />;
  }

  const handleAskerOn = () => {
    setAskerOn(true);
    setHelperOn(false);
  };

  let BGimage = require("../assets/bubbles-bleu.png"); //bubbles-pink
  if (askerOn) {
    BGimage = require("../assets/background-1.png");
  }

  console.log('avatar redux - Home: ', user.user_img)
  return (
    <ImageBackground source={BGimage} style={styles.container}>
      {/* <OVERLAY> expliquant à l'utitilisateur de compléter son profil pour utiliser l'appli */}
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          marginLeft: -180,
          marginTop: 15,
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 60,
            // borderColor: 'green',
            // borderWidth: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UserScreen");
            }}
          >
            {/* ou API génératrice d'icones  picInBDD ? {uri : user.user_img } : {require("../assets/empty-avatar.jpg")}*/}

            <Avatar
            size={70}
            backgroundColor={"transparent"}
            rounded
            source={{uri: user.user_img}}
            titleStyle={{ fontSize: 12 }}
            containerStyle={
              {
                // borderColor: 'grey',
                // borderWidth: 1,
              }
            }
          >
          </Avatar>

          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 17, fontWeight: "bold", marginLeft: 10 }}>
              {user.firstName}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <MaterialIcons
                name="verified"
                size={14}
                color={user.verified_profile ? "#F7CE46" : "#8B8B8B"}
              />

              <Text style={{ fontSize: 12, marginLeft: 5, color: "grey" }}>
                Profil vérifié
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* PARTIE 2 */}
      <View style={{ flex: 4, flexDirection: "column", alignItems: "center" }}>
        <View style={{}}>
          <Image
            style={{
              width: 120,
              height: 100,
              resizeMode: "contain",
              // borderColor: "red", borderWidth: 1,
            }}
            source={require("../assets/timeCounter.png")}
          />

          <View style={{ width: 150, position: "absolute", left: 15, top: 20 }}>
            {/* borderColor: "red", borderWidth: 1, */}
            <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
              {user.user_credit}h
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Crédit temps
            </Text>
          </View>
        </View>

        {/* BOUTON SECTION */}
        <View style={{ flexDirection: "row", marginTop: 35 }}>
          <TouchableOpacity onPress={() => handleHelperOn()}>
            <View style={helperOn === true ? styles.helpON : styles.helpOFF}>
              <Text style={askerOn === true ? styles.textHelpOFF : styles.textHelpON}>Aider</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleAskerOn()}>
            <View
              style={helperOn === true ? styles.benefitOFF : styles.benefitON}
            >
              <Text
                style={
                  helperOn === true ? styles.textBenefOFF : styles.textBenefON
                }
              >
                Bénéficier
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 70 }}>{userConfig}</View>
      </View>
    </ImageBackground>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, null)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  helpOFF: {
    backgroundColor: "#FFFFFF",
    width: 150,
    height: 55,
    borderRadius: 7,
    flexDirection: "column",
    justtifyContent: "center",
    justifyContent: "center",
    elevation: 10,
    position: "absolute",
    bottom: -52,
    right: -14,
    zIndex: 2,
  },
  benefitON: {
    backgroundColor: "#F7CE46", // Aubergine 341858 - bleu canard : 386476 - pink : EC548A  - pink plus clair: EA8DAE
    width: 120,
    height: 45,
    flexDirection: "column",
    justtifyContent: "center",
    justifyContent: "center",
    borderRadius: 7,
    position: "absolute",
    top: 2,
    left: 20,
    zIndex: 1,
    // shadowOffset : {
    //   width: 5,
    //   height: 5},
  },
  helpON: {
    backgroundColor: "#345C6C", //bleu-gris 386476 / foncé 345C6C/
    width: 120,
    height: 45,
    flexDirection: "column",
    justtifyContent: "center",
    justifyContent: "center",
    borderRadius: 7,
    position: "absolute",
    top: 2,
    right: 19,
  },
  benefitOFF: {
    backgroundColor: "#FFFFFF",
    width: 150,
    height: 50,
    borderRadius: 7,
    flexDirection: "column",
    justtifyContent: "center",
    justifyContent: "center",
    elevation: 10,
    position: "absolute",
    bottom: -49,
    left: -13,
  },
  textBenefOFF: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "center",
  },
  textBenefON: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "center",
  },
  textHelpON: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "center",
  },
  textHelpOFF: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "center",
  },
});
