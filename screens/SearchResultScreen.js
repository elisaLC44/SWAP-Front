import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Button, Overlay } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import Card from "../components/Card";

import { connect } from "react-redux";

/* ---------------------------------------- MAIN FUNCTION -------------------------------------------*/

function SearchResultScreen({
  user,
  newRequest,
  selectedUserList,
  onResetSelectedUsers,
}) {
  const navigation = useNavigation();

  const [foundUsers, setFoundUsers] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [message, setMessage] = useState("");

  const isFocused = useIsFocused();

  console.log("COMPOSE REQUEST mapState", newRequest);

  //! 1. TROUVER LES USERS PROPOSANT DES SERVICES DE LA CATEGORIE INDIQUE DANS LE STORE VIA PAGE PRECEDENTE
  useEffect(() => {
    if (isFocused) {
      async function getUsers() {
        let request = await fetch(
          `http://192.168.1.124:3000/users-by-category/${newRequest.category}`
        );
        let response = await request.json();
        if (response.status) {
          setFoundUsers(response.foundUsers);
        } else {
          setMessage(response.message);
        }
        console.log("REPONSE BACK USER BY CATEG", response.status);
        console.log("REPONSE BACK USER BY CATEG", response.foundUsers);
      }
      getUsers();
    }
  }, [isFocused]);

  let userList = foundUsers.map((helper, i) => {
    return (
      <Card
        key={i}
        firstName={helper.firstName}
        category={newRequest.category}
        avatar={helper.user_img}
        selectedUser={helper}
      />
    );
  });

  //! 2. ENREGISTRER LA NOUVELLE REQUETE - AVEC SELECTION DES USERS (faite dans CARD) - EN BDD

  // quand la demande d'aide est envoyée (fonction appelée dans le fetch ci-dessous)
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const handleSubmit = async () => {
    let request = await fetch("http://192.168.1.124:3000/add-request", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${user.token}&address_street=${
        newRequest.address_street
      }&address_zipcode=${newRequest.address_zipcode}&address_city=${
        newRequest.address_city
      }&category=${newRequest.category}&description=${
        newRequest.description
      }&disponibility=${
        newRequest.disponibility
      }&selectedUserList=${JSON.stringify(selectedUserList)}`,
    });
    let response = await request.json();

    if (response.status) {
      onResetSelectedUsers();
      toggleOverlay();
    }

    if (response.savedRequest) {
    }
  };

  // console.log("props.newRequest", newRequest);
  // console.log("props.selectedUserList", selectedUserList);

  return (
    <ImageBackground
      source={require("../assets/background-1.png")}
      style={styles.container}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "flex-end",
            marginRight: 15,
            paddingTop: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ComposeRequestScreen");
            }}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: 19,
            fontWeight: "bold",
            marginLeft: 20,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Les profils qui correspondent
        </Text>
      </View>

      <View style={{ flex: 4, marginTop: 20 }}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          {userList}
        </KeyboardAwareScrollView>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.buttonValidate}
            onPress={handleSubmit}
          >
            <Text style={styles.text}>Valider</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Overlay
        isVisible={overlayVisible}
        fullScreen
        overlayStyle={{ padding: 0 }}
      >
        <ImageBackground
          style={styles.ImageBackground}
          source={require("../assets/background-2.png")}
          resizeMode="cover"
        >
          <View
            style={{
              flex: 4,
              paddingHorizontal: 9,
              height: Dimensions.get("window").height * 1,
              width: Dimensions.get("window").width * 1,
            }}
          >
            <View
              style={{
                alignItems: "flex-end",
                marginBottom: 20,
                paddingTop: 50,
              }}
            ></View>
            {/* style={{position: 'absolute', top: 20, right: 20}} */}
            <Text style={styles.textTitle2}>Demande envoyée ! </Text>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: "red",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 70,
                marginBottom: 120,
              }}
            >
              <Image
                style={{ resizeMode: "contain", width: 150, height: 120 }}
                source={require("../assets/timeCounter.png")}
              />
              <Entypo
                name="check"
                size={70}
                color="white"
                style={{ position: "absolute", top: 15, right: 150 }}
              />
            </View>

            {/* <View style={styles.container2}>
                    <AntDesign name="checkcircle" size={100} color="#F7CE46" />
                  </View>  */}

            <Text style={styles.bodyText}>
              Les Swapers sélectionnés recevront une notification concernant
              votre demande.
            </Text>
            <Text style={styles.bodyText}> </Text>
            <Text style={styles.bodyText}>
              Votre demande sera consultable par d'autres Swapers qui ont les
              compétences requises. Ils pourront proposer de vous venir en aide.
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ alignItems: "center", marginTop: 15 }}>
              <TouchableOpacity
                style={styles.buttonValidate}
                onPress={() => {
                  toggleOverlay();
                  navigation.navigate("HomeScreen");
                }}
              >
                <Text style={styles.text}>Retour à l'accueil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Overlay>
    </ImageBackground>
  );
}

// cleaner la selection de users
function mapStateToProps(state) {
  return {
    user: state.user,
    newRequest: state.newRequest,
    selectedUserList: state.selectedUserList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onResetSelectedUsers: function () {
      dispatch({ type: "reset::selected" });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultScreen);

//
// ─────────────────────────────────────────────────── ──────────
//   :::::: S T Y L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 9,
    height: Dimensions.get("window").height * 1,
    width: Dimensions.get("window").width * 1,
    backgroundColor: "#FFFFFF",
  },
  buttonValidate: {
    justifyContent: "center",
    backgroundColor: "#F7CE46",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.85,
    height: 45,
    borderRadius: 8,
    marginBottom: 45,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 4,
  },
  text: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.6,
  },
  // textTitle: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   marginLeft: 20,
  //   marginTop: 20,
  //   marginBottom: 10,
  // },
  // Overlay:
  ImageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  textTitle2: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  bodyText: {
    color: "#717171",
    fontSize: 15,
    marginLeft: 25,
    paddingHorizontal: 10,
    marginRight: 20,
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#F7CE46",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.85,
    height: 45,
    borderRadius: 7,
    marginBottom: 45,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    // elevation: 4,
  },
  text: {
    color: "#000000",
    fontSize: 16,
    letterSpacing: 0.6,
    fontWeight: "bold",
  },
});
