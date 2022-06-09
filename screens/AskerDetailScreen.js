import React from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Button, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { connect } from "react-redux";

/* ---------------------------------------- MAIN FUNCTION -------------------------------------------*/
function AskerDetailScreen({ userDetails, user, getTransactionInfos }) {
  const navigation = useNavigation();
  // CONTENU de USER DETAILS
  // userDetails

  let description = userDetails.description;
  if (description.length > 200) {
    description = description.slice(0, 200) + "...";
  }

  let disponibility = userDetails.disponibility;
  if (disponibility.length > 200) {
    disponibility = disponibility.slice(0, 200) + "...";
  }

  let handleContinue = async () => {
    let rawResponse = await fetch(
      `http://192.168.1.124:3000/continue/${userDetails._id}/${user.token}`,
      {
        method: "PUT",
      }
    );
    let response = await rawResponse.json();
    if (response) {
      console.log("response Route after POURSUIVRE:", response);
    }
    navigation.goBack();
    // getTransactionInfos(response)
  };

  const handleRefuse = async () => {
    let rawResponse = await fetch(
      `http://192.168.1.124:3000/refuse/${userDetails._id}/${user.token}`,
      {
        method: "DELETE",
      }
    );
    let response = await rawResponse.json();

    if (response) {
      console.log("reponse du BACK - REFUSE:", response);
    }
    navigation.goBack();
    // puis updater le reducer en retirant du tableau la request refusée. Nécessaire?
  };

  let path = `https://theoduvivier.com/swap/${userDetails.category
    .replace(/\s/g, "_")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")}.png`;

  return (
    <ImageBackground
      source={require("../assets/bubbles-bleu.png")}
      style={styles.container}
    >
      <View
        style={{
          // borderColor: "green",
          // borderWidth: 2,
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
          marginTop: 30
        }}
      >
        <View
          style={{
            // borderColor: "red",
            // borderWidth: 1,
            alignItems: "flex-end",
            marginRight: 28,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("HelperRequestListScreen");
            }}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            // borderColor: "red",
            // borderWidth: 1,
            marginLeft: 25,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 3, }}>Profil</Text>
        </View>
      </View>

      {/* CONTENT */}
      <View style={{ flex: 4, width: "100%" }}>
        <View style={styles.card}>
          <View>
            {/* Header user */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
               
                }}
              >
                <Avatar
                  rounded
                  size="medium"
                  source={{ uri: userDetails.asker.user_img }}
                  containerStyle={{
                    borderColor: "#F7CE46",
                    borderWidth: 4,
                  }}
                />
                {/* flexDirection: "row"*/}
                <View style={{ marginLeft: 15,  }}>
                  <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                    {userDetails.asker.firstName}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons
                      name="verified"
                      size={14}
                      color={
                        userDetails.asker.verified_profile
                          ? "#F7CE46"
                          : "#8B8B8B"
                      }
                    />
                    <Text
                      style={{ marginLeft: 5, fontSize: 13, color: "#171717" }}
                    >
                      {userDetails.asker.verified_profile
                        ? "Profil vérifié"
                        : "Profil non-vérifié"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* divider */}
            <View style={styles.divider} />

            {/* Content  */}
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", marginTop: 10, marginBottom: 5 }}
              >
                <Image
                  source={{ uri: path }}
                  style={{ width: 21, height: 21, marginRight: 10 }}
                />
                <Text style={styles.cardTitle}>
                  {userDetails.category
                    ? userDetails.category.charAt(0).toUpperCase() +
                      userDetails.category.substring(1)
                    : userDetails.category.category}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  marginTop: 8,
                  marginBottom: 5,
                }}
              >
                <FontAwesome
                  name="map-marker"
                  size={21}
                  color="#F7CE46"
                  style={{ marginRight: 10,  }}
                />
                <Text style={[styles.bodyText]}>
                  {userDetails.address.address_city}{" "}
                  {userDetails.address.address_zipcode}
                </Text>
              </View>

              {/* divider */}
              <View style={styles.divider} />
              <View>
                <Text style={styles.titleStyle}>Description de la demande</Text>
                <Text style={styles.bodyText2}>{description}</Text>
              </View>

              <View>
                <Text style={styles.titleStyle}>Disponibilités</Text>
                <Text style={styles.bodyTextDispo}>{disponibility}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* BUTTON */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "85%",
          // borderColor: "green",
          // borderWidth: 2,
        }}
      >
        <TouchableOpacity
          style={styles.buttonBlack}
          onPress={() => handleRefuse()}
        >
          <Text style={styles.buttonTitleBlack}>Refuser</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleContinue()}
        >
          <Text style={styles.buttonTitle}>Continuer</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

function mapStateToProps(state) {
  return {
    userDetails: state.userDetails,
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(AskerDetailScreen);

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
  pageTitle: {},

  card: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 25,
    marginTop: 15,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 6,
    maxHeight: "96%",
  },
  divider: {
    borderBottomColor: "#8B8B8B",
    opacity: 0.5,
    borderBottomWidth: 0.5,
    width: "98%",
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    alignItems: "center",
    width: Dimensions.get("window").width * 0.38,
    justifyContent: "center",
    color: "black",
    backgroundColor: "#345C6C",
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 4,
    height: 45,
    marginBottom: 25,
  },
  buttonBlack: {
    alignItems: "center",
    width: Dimensions.get("window").width * 0.38,
    justifyContent: "center",
    color: "black",
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 4,
    height: 45,
    marginBottom: 25,
  },
  buttonTitleBlack: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.6,
  },
  buttonTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  titleStyle: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 3,
  },
  bodyText: {
    color: "#717171",
    fontSize: 14,
  },
  bodyText2: {
    color: "#717171",
    fontSize: 14,
    marginBottom: 8,
  },
  bodyTextDispo: {
    color: "#717171",
    fontSize: 14,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
});
