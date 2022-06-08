import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { Text, Avatar } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";

import { connect } from "react-redux";

/* ---------------------------------------- MAIN FUNCTION -------------------------------------------*/
function HelperAccept({
  avatar,
  firstName,
  category,
  description,
  requestId,
  isAsker,
  transactionDetails,
  disponibility,
  user,
  onUpdateStatus,
  updateStatus,
}) {
  const navigation = useNavigation();

  let changeStatus = async () => {
    let rawResponse = await fetch(
      `http://192.168.1.124:3000/accept/${requestId}/${user.token}`,
      {
        method: "PUT",
      }
    );
    let response = await rawResponse.json();
    console.log(
      "RESPONSE BACK HELPER STATUS:",
      response.updatedStatus.helper_status
    );
    if (response.updatedStatus) {
      onUpdateStatus(
        response.updatedStatus.helper_status,
        response.updatedStatus.asker_status
      );
    }
    updateStatus()
  };

  const cancelTransaction = async () => {};

  //  BOUTONS ANNULATION/VALIDATION
  let button;
  if (!transactionDetails.isAsker) {
    button = (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          // position: "absolute",
          // bottom: 0,
        }}
      >
        <TouchableOpacity
          style={styles.button1}
          onPress={() => cancelTransaction()}
        >
          <Text style={styles.text1}>Annuler</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={() => changeStatus()}>
          <Text style={styles.text2}>Accepter</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    button = (
      <View style={{ flexDirection: "column", marginLeft:7, height: 40, marginTop: 5 }}>
        <Text style={{ fontSize: 14, maxWidth: 320, fontWeight: "bold" }}>... les grands esprits de se rencontrent!</Text>
        <Text style={{ fontSize: 14, maxWidth: 320, height: 50, marginTop: 5,  paddingVertical: 4}}>Echangez avec {firstName} pour obtenir l'aide dont vous avez besoin 🍀 </Text>
      </View>
    );
  }

  let path = `https://theoduvivier.com/swap/${category
    .replace(/\s/g, "_")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")}.png`;

  let descriptionDot = description;
  if (!isAsker && descriptionDot.length > 100) {
    descriptionDot = descriptionDot.slice(0, 100) + "...";
  }
  console.log(descriptionDot);

  let dispoDot = disponibility;
  if (!isAsker && dispoDot.length > 100) {
    dispoDot = dispoDot.slice(0, 100) + "...";
  }

  return (
    <View>
      {/* PAGE TOP : titre et close button */}

      <View style={styles.card}>
        <TouchableOpacity
          onPress={{}}
          style={{ width: "100%" }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              // borderColor: "yellow",
              // borderWidth: 2,
            }}
          >
            <View
              style={{
                // borderColor: "pink",
                // borderWidth: 2,
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <Avatar
                rounded
                size="medium"
                source={{ uri: avatar }}
                containerStyle={
                  !isAsker ? styles.avatarHelper : styles.avatarAsker
                }
              />
            </View>
            <View
              style={{
                marginLeft: 15,
                flexDirection: "column",
                // borderColor: "red",
                // borderWidth: 1,
              }}
            >
              <Text style={styles.cardTitle}>{firstName}</Text>
              <View
                style={{
                  maxWidth: 220,
                  flexDirection: "column",
                  //   borderColor: "green",
                  //   borderWidth: 1,
                  marginTop: 5,
                }}
              >
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={{ uri: path }}
                      style={{ width: 20, height: 20, marginRight: 8 }}
                    />
                    <Text style={{ fontSize: 14 }}>
                      {
                        (category =
                          category.charAt(0).toUpperCase() +
                          category.substring(1).toLowerCase())
                      }
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* divider */}
          {!isAsker ? <View style={styles.divider} /> : null}
          <View style={{}}>
            {!isAsker ? (
              <View style={{ marginLeft: 5,  }}>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  Description
                </Text>
                <Text style={{ fontSize: 14 }}>{descriptionDot}</Text>
              </View>
            ) : null}

            {!isAsker ? (
              <View style={{ marginTop: 10, marginLeft: 5,  }}>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  Disponibilités
                </Text>
                <Text style={{ fontSize: 14 }}>{dispoDot}</Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      </View>

      {/* BUTTONS */}
      <View>{button}</View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    transactionDetails: state.transactionDetails,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateStatus: function (helper, asker) {
      dispatch({
        type: "onUpdateStatus",
        helper_status: helper,
        asker_status: asker,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HelperAccept);

//
// ─────────────────────────────────────────────────── ──────────
//   :::::: S T Y L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  avatarHelper: {
    borderColor: "#F7CE46",
    borderWidth: 4,
  },
  avatarAsker: {
    borderColor: "#345C6C",
    borderWidth: 4,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 15,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 5,
    elevation: 6,
    marginBottom: 20,
    width: 345,
    maxHeight: 230,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  bodyText2: {
    color: "#717171",
    fontSize: 14,
    fontWeight: "400",
  },
  // buttons
  button1: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 160,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    elevation: 3,
    marginBottom: 12,
  },
  button2: {
    backgroundColor: "#F7CE46",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 160,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    elevation: 3,
    marginBottom: 12,
    marginLeft: 19,
  },
  text1: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 24,
    letterSpacing: 0.6,
    marginTop: 3,
  },
  text2: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 24,
    letterSpacing: 0.6,
    marginTop: 3,
  },
  divider: {
    borderBottomColor: "#8B8B8B",
    opacity: 0.5,
    borderBottomWidth: 0.5,
    width: "100%",
    marginTop: 15,
    marginBottom: 15,
  },
});
