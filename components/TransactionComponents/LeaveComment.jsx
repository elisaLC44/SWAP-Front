import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import { Text, Avatar, Overlay } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import { connect } from "react-redux";

/* ---------------------------------------- MAIN FUNCTION -------------------------------------------*/
function LeaveComment({
  avatar,
  firstName,
  category,
  description,
  requestId,
  isAsker,
  transactionDetails,
  user,
  opponent_id,
}) {
  console.log("opponent ID -comment COMPONENT:", opponent_id);
  const navigation = useNavigation();

  const [creditBDD, setCreditBDD] = useState(0);
  const [declareDateBDD, setDeclareDateBDD] = useState(0);

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

  const [comment, setComment] = useState("");
  const [overlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
    setComment("");
  };

  const handleComment = async () => {
    let rawResponse = await fetch(`http://192.168.1.124:3000/add-comment`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${user.token}&comment=${comment}&opponent_id=${opponent_id}`,
    });
    let response = await rawResponse.json();
    if (response.updatedComments) {
      console.log("REPONSE DU BACK - COMMENT:", response.updatedComments);
      toggleOverlay();
    }
    
  };

  return (
    <View>
      {/* PAGE TOP : titre et close button */}

      <View style={styles.card}>
        <TouchableOpacity
          // onPress={{}}
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

          {isAsker ? (
            <View>
              <View style={styles.divider} />
              <View
                style={{
                  flexDirection: "column",
                  maxWidth: 270,
                  marginLeft: 10,
                }}
              >
                <Text style={{ fontSize: 15, marginBottom: 12 }}>
                  Votre crédit temps a été dédité de{" "}
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {creditBDD}h
                  </Text>{" "}
                  pour la prestation du{" "}
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {declareDateBDD}
                  </Text>
                </Text>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.divider2} />
              <View
                style={{
                  flexDirection: "column",
                  maxWidth: 270,
                  marginLeft: 10,
                }}
              >
                <Text style={{ fontSize: 15, marginBottom: 12 }}>
                  Votre crédit temps a été crédité de{" "}
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {creditBDD}h
                  </Text>{" "}
                  pour la prestation du{" "}
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {declareDateBDD}
                  </Text>
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View>
        <Text
          style={{
            marginLeft: 9,
            fontSize: 15,
            fontWeight: "bold",
            marginBottom: 7,
          }}
        >
          Commentaires
        </Text>
        {/* flexDirection: "row", position : "absolute" , right: 40*/}
        <View style={{ flexDirection: "row" }}>
          <TextInput
            textAlignVertical="top"
            style={styles.card2}
            placeholder="Laissez un commentaire ici"
            placeholderTextColor="grey"
            numberOfLines={3}
            multiline={true}
            onChangeText={(text) => {
              setComment(text.trim());
            }}
            value={{}}
            maxLength={300}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              right: 17,
              bottom: 35,
            }}
            onPress={() => handleComment()}
          >
            <FontAwesome name="send-o" size={28} color="black" />
            {/* #F7CE46 */}
          </TouchableOpacity>

          <Overlay
            isVisible={overlayVisible}
            onBackdropPress={() => toggleOverlay()}
            // fullScreen
            overlayStyle={{
              width: 400,
              height: 300,
              borderRadius: 7,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
            }}
          >
          <ImageBackground
            source={require("../../assets/background-1.png")}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >

            <View
              style={{  flexDirection: "column",  justifyContent: "center",  alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 30 }}>
                Votre commentaire a bien été envoyé.
              </Text>
              
              <Text
                style={{ fontSize: 15, fontWeight: "bold",  }}
              >
                Merci pour votre participation! 🤝
              </Text>
            </View>
            </ImageBackground>
          </Overlay>
        </View>
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

export default connect(mapStateToProps, null)(LeaveComment);

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
    // marginTop: 5,
    marginBottom: 18,
  },
  divider2: {
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
