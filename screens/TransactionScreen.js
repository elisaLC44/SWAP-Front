import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Overlay, Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import HelperAccept from "../components/TransactionComponents/HelperAccept";
import Declare from "../components/TransactionComponents/Declare";
import Confirmation from "../components/TransactionComponents/Confirmation";
import LeaveComment from "../components/TransactionComponents/LeaveComment";

import socketIOClient from "socket.io-client";
var socket = socketIOClient("http://192.168.1.124:3000");

import { useNavigation } from "@react-navigation/native";

import { connect } from "react-redux";

/* ---------------------------------------- MAIN FUNCTION -------------------------------------------*/
function TransactionScreen({ user, transactionDetails }) {
  const navigation = useNavigation();

  const [askerStatus, setAskerStatus] = useState(2);
  const [helperStatus, setHelperStatus] = useState(2);
  console.log("status requete:", helperStatus, askerStatus);

  // useEffect pour récupérer helper et asker status, les stocker dans états, et passer reqStatus dans [reqStatus]
  useEffect(() => {
    async function getStatus() {
      let rawResponse = await fetch(
        `http://192.168.1.124:3000/get-status/${transactionDetails.matchDetails._id}`
      );
      let response = await rawResponse.json();
      console.log(
        "reponse du Back - get-status",
        response.asker_status,
        response.helper_status
      );
      setAskerStatus(response.asker_status);
      setHelperStatus(response.helper_status);
    }
    getStatus();
  }, [helperStatus, askerStatus]);

  /*------------ UPDATE DES STATUS POUR PASTILLES ET CHANGEMENT DE COMPOSANTS  -----*/
  const updateStatus = async () => {
    let rawResponse = await fetch(
      `http://192.168.1.124:3000/get-status/${transactionDetails.matchDetails._id}`
    );
    let response = await rawResponse.json();
    setAskerStatus(response.asker_status);
    setHelperStatus(response.helper_status);
  };

  var reqStatus;
  if (helperStatus == 0) {
    reqStatus = 0;
  } else if (helperStatus == 1) {
    reqStatus = 1;
  } else if (helperStatus == 2 && askerStatus == 1) {
    reqStatus = 2;
  } else if (helperStatus == 2 && askerStatus == 2) {
    reqStatus = 3;
  }

  let vert = "#399F09";
  let jaune = "#F7CE46";
  let gris = "#DDDDDD";
  var transactionStatus;
  var color1;
  var color2;
  var color3;
  if (reqStatus === 0) {
    color1 = jaune;
    color2 = gris;
    color3 = gris;
    transactionStatus = "Demande en attente";
  } else if (reqStatus === 1) {
    color1 = vert;
    color2 = gris;
    color3 = gris;
    transactionStatus = "Demande accepté, à vous de jouer!";
  } else if (reqStatus === 2) {
    color1 = vert;
    color2 = vert;
    color3 = gris;
    transactionStatus = "L'aidant a déclaré le service effectué";
  } else if (reqStatus === 3) {
    color1 = vert;
    color2 = vert;
    color3 = vert;
    transactionStatus =
      "Félicitation, le bénéficiant a validé votre déclaration!";
  }

  // affichage des composants selon le statut de la transaction et qui est Asker et Helper
  let transactionComponent;

  if (reqStatus == 0) {
    if (transactionDetails.isAsker) {
      transactionComponent = (
        //  mettre infos du helper
        <HelperAccept
          isAsker={transactionDetails.isAsker}
          avatar={transactionDetails.matchDetails.willing_helpers[0].user_img}
          firstName={
            transactionDetails.matchDetails.willing_helpers[0].firstName
          }
          category={transactionDetails.matchDetails.category}
          requestId={transactionDetails.matchDetails._id}
        />
      );
    } else {
      transactionComponent = (
        //  mettre infos du asker
        <HelperAccept
          isAsker={transactionDetails.isAsker}
          avatar={transactionDetails.matchDetails.asker.user_img}
          firstName={transactionDetails.matchDetails.asker.firstName}
          category={transactionDetails.matchDetails.category}
          description={transactionDetails.matchDetails.description}
          disponibility={transactionDetails.matchDetails.disponibility}
          requestId={transactionDetails.matchDetails._id}
          updateStatus={updateStatus}
        />
      );
    }
  } else if (reqStatus == 1) {
    if (transactionDetails.isAsker) {
      transactionComponent = (
        // mettre infos du helper
        <Declare
          isAsker={transactionDetails.isAsker}
          avatar={transactionDetails.matchDetails.willing_helpers[0].user_img}
          firstName={
            transactionDetails.matchDetails.willing_helpers[0].firstName
          }
          category={transactionDetails.matchDetails.category}
          requestId={transactionDetails.matchDetails._id}
        />
      );
    } else {
      transactionComponent = (
        //  mettre infos du asker
        <Declare
          isAsker={transactionDetails.isAsker}
          avatar={transactionDetails.matchDetails.asker.user_img}
          firstName={transactionDetails.matchDetails.asker.firstName}
          category={transactionDetails.matchDetails.category}
          description={transactionDetails.matchDetails.description}
          requestId={transactionDetails.matchDetails._id}
        />
      );
    }
  } else if (reqStatus == 2) {
    if (transactionDetails.isAsker) {
      transactionComponent = (
        //  je suis Asker, mettre infos du helper
        <Confirmation
          isAsker={transactionDetails.isAsker}
          avatar={transactionDetails.matchDetails.willing_helpers[0].user_img}
          firstName={
            transactionDetails.matchDetails.willing_helpers[0].firstName
          }
          category={transactionDetails.matchDetails.category}
          requestId={transactionDetails.matchDetails._id}
        />
      );
    } else {
      transactionComponent = (
        // je suis Helper,  mettre infos du asker
        <Confirmation
          isAsker={transactionDetails.isAsker}
          avatar={transactionDetails.matchDetails.asker.user_img}
          firstName={transactionDetails.matchDetails.asker.firstName}
          category={transactionDetails.matchDetails.category}
          description={transactionDetails.matchDetails.description}
          requestId={transactionDetails.matchDetails._id}
        />
      );
    }
  } else if (reqStatus == 3) {
    if (transactionDetails.isAsker) {
      transactionComponent = (
        //  je suis Asker, mettre infos du helper
        <LeaveComment
          isAsker={transactionDetails.isAsker}
          avatar={transactionDetails.matchDetails.willing_helpers[0].user_img}
          firstName={
            transactionDetails.matchDetails.willing_helpers[0].firstName
          }
          opponent_id={transactionDetails.matchDetails.willing_helpers[0]._id}
          category={transactionDetails.matchDetails.category}
          requestId={transactionDetails.matchDetails._id}
        />
      );
    } else {
      transactionComponent = (
        // je suis Helper,  mettre infos du asker
        <LeaveComment
          isAsker={transactionDetails.isAsker}
          avatar={transactionDetails.matchDetails.asker.user_img}
          firstName={transactionDetails.matchDetails.asker.firstName}
          opponent_id={transactionDetails.matchDetails.asker._id}
          category={transactionDetails.matchDetails.category}
          description={transactionDetails.matchDetails.description}
          requestId={transactionDetails.matchDetails._id}
        />
      );
    }
  }

  /* ----------------------- CHAT ---------------------------*/
  const [currentMessage, setCurrentMessage] = useState("");
  const [listMessages, setListMessages] = useState([]);

  useEffect(() => {
    socket.on("sendMessageFromBack", (newMessageData) => {
      // console.log('test useEffect:', newMessageData);
      setListMessages([...listMessages, newMessageData]);
    });
  }, [listMessages]);

  console.log("listMessages test :", listMessages);

  let conversation = listMessages.map((message, i) => {
    return (
      <View
        key={i}
        style={{
          backgroundColor: "#F7CE46",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingVertical: 6,
          paddingHorizontal: 10,
          marginBottom: 10,
          borderRadius: 50,
          marginRight: 40,
          maxWidth: 250,
        }}
      >
      
        <Text style={{}}>{message.message}</Text>
      </View>
    );
  });

  let bottom = Platform.OS === "ios" ? 70 : 50;

  return (
    <ImageBackground
      source={require("../assets/background-1.png")}
      style={styles.container}
    >
      {/* PAGE TITLE */}
      <View
        style={{
          // borderColor: "green",
          // borderWidth: 2,
          flexDirection: "column",
          width: "100%",
        }}
      >
        <View
          style={{
            // borderColor: "blue",
            // borderWidth: 1,
            alignItems: "flex-end",
            marginRight: 25,
            marginTop: 60,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ConversationScreen");
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
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>
            Status de la demande
          </Text>
          <Text style={{ color: "black", fontSize: 14, marginTop: 5 }}>
            {transactionStatus}
          </Text>
        </View>
      </View>

      {/* ------- PASTILLES DE STATUS ------- */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          marginBottom: 20,
          justifyContent: "space-between",
          width: "70%",
          // borderWidth: 1,
          // borderColor: "red",
        }}
      >
        {/* position: "absolute", top: 20, */}
        {/* CHECK 1 */}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <AntDesign name="checkcircle" size={30} color={color1} />
          <Text
            style={{
              color: "black",
              fontSize: 10,
              marginTop: 10,
            }}
          >
            Acceptée
          </Text>
        </View>

        {/* CHECK 2 */}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <AntDesign name="checkcircle" size={30} color={color2} />
          <Text
            style={{
              color: "black",
              fontSize: 10,
              marginTop: 10,
            }}
          >
            Déclarée par l'aidant
          </Text>
        </View>

        {/* CHECK 3 */}

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <AntDesign name="checkcircle" size={30} color={color3} />
          <Text
            style={{
              color: "black",
              fontSize: 10,
              marginTop: 10,
            }}
          >
            Confirmé
          </Text>
        </View>

        <View style={{ position: "absolute", top: 53 }}>
          <View style={[styles.traits, { left: 52 }]}></View>
          <View style={[styles.traits, { left: 165 }]}></View>
        </View>
      </View>

      {/* composants height: "100%",  */}
      {transactionComponent}

      <View style={styles.chat}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            position: "absolute",
            bottom: 178,
          }}
        >
          <Text
            style={{
              marginLeft: 25,
              marginTop: 12,
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Mes messages
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            width: "100%",
            height: 100,
            position: "absolute",
            bottom: 73,
            //    borderColor: "green",
            // borderWidth: 2,
          }}
        >
          <ScrollView content={styles.scrollZone}>
          {conversation}
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            bottom: 28,
            // borderColor: "green",
            // borderWidth: 2,
            width: "90%",
          }}
        >
          <TextInput
            style={{
              fontSize: 14,
              paddingHorizontal: 15,
              paddingVertical: 12,
              width: "82%",
              backgroundColor: "white",
              borderRadius: 50,
              maxHeight: 45,
              elevation: 6,
            }}
            placeholder="message"
            placeholderTextColor="grey"
            numberOfLines={2}
            multiline={true}
            onChangeText={(msg) => setCurrentMessage(msg)}
            value={currentMessage}
            maxLength={200}
          />
          <TouchableOpacity
            onPress={() => {
              socket.emit("sendMessage", {
                message: currentMessage,
                pseudo: user.firstName,
              });
              setCurrentMessage("");
            }}
          >
            <View
              style={{
                backgroundColor: "#F7CE46",
                width: 40,
                height: 40,
                borderRadius: 50,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                elevation: 5,
              }}
            >
              <FontAwesome name="send-o" size={26} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    transactionDetails: state.transactionDetails,
  };
}

export default connect(mapStateToProps, null)(TransactionScreen);

//
// ─────────────────────────────────────────────────── ──────────
//   :::::: S T Y L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  traits: {
    backgroundColor: "#000000",
    width: 55,
    height: 1,
    alignSelf: "center",
    position: "absolute",
    bottom: 37,
  },
  chat: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: 210,
    width: "95%",
    elevation: 18,
    position: "absolute",
    bottom: 0,
  },
  scrollZone: {
    flex: 1,
    width: "100%",
    minHeight: "100%",
    marginTop: 0,
    // borderWidth: 2,
    // borderColor: "red",
  },
});
