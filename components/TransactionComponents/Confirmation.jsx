import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { Text, Avatar } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";

import { connect } from "react-redux";

/* ---------------------------------------- MAIN FUNCTION -------------------------------------------*/
function Confirmation({
  avatar,
  firstName,
  category,
  description,
  requestId,
  isAsker,
  transactionDetails,
  user,
  updateStatus,
}) {
  const navigation = useNavigation();

  const [creditBDD, setCreditBDD] = useState(0);
  const [declareDateBDD, setDeclareDateBDD] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function getDeclaration() {
      let rawResponse = await fetch(
        `http://192.168.1.124:3000/get-declaration/${requestId}`
      );
      let response = await rawResponse.json();
      console.log("REPONSE BACK GET DECLARATION", response.foundRequest.credit);
      if (response.status == true) {
        console.log(
          "REPONSE BACK GET DECLARATION",
          response.foundRequest.declaration_date
        );
        setCreditBDD(response.foundRequest.credit);
        setDeclareDateBDD(response.foundRequest.declaration_date);
      }
    }
    getDeclaration();
  }, []);

  let path = `https://theoduvivier.com/swap/${category
    .replace(/\s/g, "_")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")}.png`;

  /*----------- GET STATUS - affichage "Commentaires" ----------*/
  const [askerStatus, setAskerStatus] = useState(0);
  const [helperStatus, setHelperStatus] = useState(0);

  // useEffect pour récupérer helper et asker status, les stocker dans états, et passer reqStatus dans [reqStatus]
  useEffect(() => {
    async function getStatus() {
      let rawResponse = await fetch(
        `http://192.168.1.124:3000/get-status/${transactionDetails.matchDetails._id}`
      );
      let response = await rawResponse.json();
      // console.log('reponse du Back - get-status', response.asker_status, response.helper_status, )
      setAskerStatus(response.asker_status);
      setHelperStatus(response.helper_status);
    }
    getStatus();
  }, [helperStatus, askerStatus]);

  let messageArea;
  if (!isAsker) {
    messageArea = (
      <View style={{ maxWidth: 345, marginLeft: 2 }}>
        <Text style={{ marginLeft: 1 }}>
          Attendez que {firstName} valide votre déclaration ⏳
        </Text>
      </View>
    );
  } else {
    messageArea = (
      <View style={{ maxWidth: 345, marginLeft: 2 }}>
        <Text style={{ marginLeft: 1 }}>
          Confirmez la déclaration de {firstName} pour conclure la transaction
          ⏳
        </Text>
      </View>
    );
  }

  const handleConfirm = async () => {
    let rawResponse = await fetch(
      `http://192.168.1.124:3000/confirm/${requestId}/${creditBDD}/${user.token}`,
      {
        method: "PUT",
      }
    );
    let response = await rawResponse.json();
    if (response) {
      console.log("response Route after POURSUIVRE:", response);
      updateStatus();
    }
  };

  const handleContest = async () => {};

  return (
    <View style={{}}>
      {/* PAGE TOP : titre et close button */}

      <View style={styles.card}>
        <TouchableOpacity onPress={{}} style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              // borderColor: "yellow",
              // borderWidth: 2,
            }}
          >
            {/* alignSelf: "flex-start" */}
            <View
              style={{
                // borderColor: "pink",
                // borderWidth: 2,
                alignSelf: "flex-start",
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
                <Text style={{ marginTop: 3, fontSize: 14 }}>
                  {description}
                </Text>
              </View>
              {/* flexDirection:'row' */}
            </View>
          </View>

          {/* divider */}
          <View style={styles.divider} />
          {isAsker ? (
            <View
              style={{
                flexDirection: "column",
                // borderColor: "red",
                // borderWidth: 1,
                width: 270,
                marginLeft: 10,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 16, marginBottom: 6 }}
              >
                Déclaration de {firstName} :
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  // borderColor: "blue",
                  // borderWidth: 1,
                  width: 270,
                }}
              >
                <View style={{ marginRight: 100 }}>
                  <Text style={{ fontWeight: "bold" }}>Terminé</Text>
                  <Text style={{}}>{declareDateBDD}</Text>
                </View>
                <View>
                  <Text style={{ fontWeight: "bold" }}>Durée</Text>
                  <Text style={{}}>{creditBDD}h</Text>
                </View>
              </View>
              <View
                style={{
                  // borderColor: "blue",
                  // borderWidth: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 280,
                  marginTop: 15,
                }}
              >
                <TouchableOpacity
                  style={styles.button3}
                  onPress={() => handleContest()}
                >
                  <Text style={styles.text3}>Contester</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button4}
                  onPress={() => handleConfirm()}
                >
                  <Text style={styles.text4}>Confirmer</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{ flexDirection: "column", marginLeft: 5 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, marginBottom: 6 }}
              >
                Votre déclaration :
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  // borderColor: "blue",
                  // borderWidth: 1,
                  width: 270,
                }}
              >
                <View style={{ marginRight: 100 }}>
                  <Text style={{ fontWeight: "bold" }}>Terminé</Text>
                  <Text style={{}}>{declareDateBDD}</Text>
                </View>
                <View>
                  <Text style={{ fontWeight: "bold" }}>Durée</Text>
                  <Text style={{}}>{creditBDD}h</Text>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {messageArea}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 13, color: "grey" }}>
          Un problème? Pressez ici
        </Text>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    transactionDetails: state.transactionDetails,
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(Confirmation);

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
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 5,
    elevation: 6,
    marginBottom: 20,
    width: 345,

    maxHeight: 300,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  avatarHelper: {
    borderColor: "#F7CE46",
    borderWidth: 4,
  },
  avatarAsker: {
    borderColor: "#345C6C",
    borderWidth: 4,
  },
  card2: {
    flexDirection: "row",
    alignItems: "center",
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
    marginLeft: 7,
    maxHeight: 200,
  },
  card3: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#F5F5F5",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 5,
    elevation: 6,
    marginBottom: 20,
    width: 345,
    marginLeft: 7,
    maxHeight: 200,
  },
  divider: {
    borderBottomColor: "#8B8B8B",
    opacity: 0.5,
    borderBottomWidth: 0.5,
    width: "100%",
    marginTop: 15,
    marginBottom: 15,
  },
  button3: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 3,
  },
  button4: {
    backgroundColor: "#F7CE46",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 3,
  },
  text3: {
    color: "#FFF",
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
    letterSpacing: 0.6,
  },
  text4: {
    color: "#000000",
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
    letterSpacing: 0.6,
  },
});
