import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import AskerCard from "../components/AskerCard";

import { connect } from "react-redux";


/* ---------------------------------------- MAIN FUNCTION -------------------------------------------*/
function HelperRequestListScreen({
  onGetRequestDetails,
  requestDetails,
  user,
}) {
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isFocused) {
      async function getRequests() {
        let request = await fetch(
          `https://swap-newapp.herokuapp.com/get-requests/${user.token}`
        );
        let response = await request.json();

        if (response.matchingRequests) {
          // stocker infos des requêtes dans redux pour exploitation et affichage dans les askerCards
          onGetRequestDetails(response.matchingRequests);
        } else {
          setMessage(response.message);
        }
      }
      getRequests();
    }
  }, [isFocused]);

  let requestList = requestDetails.map((request, i) => {
    let path = `https://theoduvivier.com/swap/${request.category
      .replace(/\s/g, "_")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")}.png`;
    return (
      <AskerCard
        key={i}
        askerName={request.asker.firstName}
        askerCity={request.asker.address_city}
        askerAvatar={request.asker.user_img}
        requestDetails={request}
        category={request.category}
        categoryImage={{ uri: path }}
      />
    );
  });

  return (
    <ImageBackground
      source={require("../assets/bubbles-bleu.png")}
      style={styles.container}
    >
      <View
        style={{
          // borderColor: "green",
          // borderWidth: 2,
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <View
          style={{
            // borderColor: "blue",
            // borderWidth: 1,
            alignItems: "flex-end",
            marginRight: 25,
            marginTop: 70, 
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("HomeScreen");
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
            marginTop: 10, 
          }}
        >
          {/* marginLeft: 3 */}
          <Text style={{ fontSize: 19, fontWeight: "bold", marginLeft: 3, }}>
            Mes demandes reçues
          </Text>
          <Text style={{ fontSize: 12, marginLeft: 3, marginTop: 5, }}>
           Accepte des missions pour ajouter du temps à ton compteur
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 6,
          marginTop: 30,
          // borderColor: "red",
          // borderWidth: 1,
          flex: 2
        }}
      >
      <ScrollView style={{width: 360,}}>
        {requestList}
      </ScrollView>
      </View>
    </ImageBackground>
  );
}

function mapStateToProps(state) {
  return {
    requestDetails: state.requestDetails,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetRequestDetails: function (data) {
      dispatch({ type: "getRequestDetails", requestDetails: data });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelperRequestListScreen);



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
    backgroundColor: "#FFFFFF",
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  // bleu-gris clair C5DBE4 / bleu-gris C1D3DB
});
