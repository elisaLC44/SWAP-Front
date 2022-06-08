import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ConvCard from "../components/ConvCard";

import { connect } from "react-redux";

/* ---------------------------------------- MAIN FUNCTION -------------------------------------------*/
function ConversationScreen({ user, onAddMatches, allMatches, navigation }) {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      async function getAllMatches() {
        let rawResponse = await fetch(
          `http://192.168.1.124:3000/get-allmatches/${user.token}`
        );

        let response = await rawResponse.json();
        if (response) {
          // console.log('LA ROUTE FONCTIONNE! :', response)
          onAddMatches(response.requests);
        } else {
          setMessage(response.message);
        }
      }
      getAllMatches();
    }
  }, [isFocused]);
  
  // console.log("allMatches au chargement ConvScreen:", allMatches);
 
 // ne garder que les requests avec des willing_helpers et helpers existants
  let confirmedMatches = allMatches.filter(
    (match) => match.willing_helpers != "" || match.helper != null
  );
  // console.log("FILTER confirmedMatches", confirmedMatches);

  let matchList = confirmedMatches.map((match, i) => {
    // si je suis helper:
    if (user.token != match.asker.token) {
      return (
        <ConvCard
          key={i}
          isAsker={false}
          avatar={match.asker.user_img}
          firstName={match.asker.firstName}
          category={match.category}
          matchDetails={match}
          askerStatus={match.asker_status}
          helperStatus={match.helper_status}
        />
      );
    } else {
      // si je suis asker:
      for (let i = 0; i < match.willing_helpers.length; i++) {
        return (
          <ConvCard
            key={i}
            isAsker={true}
            avatar={match.willing_helpers[i].user_img}
            firstName={match.willing_helpers[i].firstName}
            category={match.category}
            matchDetails={match}
            askerStatus={match.asker_status}
            helperStatus={match.helper_status}
          />
        );
      }
    }
  });

  return (
    <ImageBackground
      // source={require("../assets/background-1.png")}
      style={styles.container}
    >
      {/* "100%" */}
      <View
        style={{
          // borderColor: "green",
          // borderWidth: 2,
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          marginTop: 10,
        }}
      >
        <View
          style={{
            // borderColor: "red",
            // borderWidth: 1,
            alignItems: "flex-end",
            marginRight: 28,
            marginTop: 45,
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
            marginLeft: 30,
          }}
        >
          <View style={{}}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderBottomColor: "#F7CE46",
                  borderBottomWidth: 6,
                  width: 40,
                }}
              ></View>
              <Text
                style={{ fontSize: 14, fontWeight: "bold", marginLeft: 10 }}
              >
                Bénéficiant
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderBottomColor: "#345C6C",
                  borderBottomWidth: 6,
                  width: 40,
                }}
              ></View>
              <Text
                style={{ fontSize: 14, fontWeight: "bold", marginLeft: 10 }}
              >
                Aidant
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 4,
          flexDirection: "column",
          alignItems: "center",
          width: 380,
          // backgroundColor: "red",
        }}
      >
        <View style={styles.topCard}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Mes échanges
          </Text>
        </View>

        <ScrollView
          style={{
            width: 360,
            // marginTop: 5,
          }}
          contentContainerStyle={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {matchList}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

function mapStateToProps(state) {
  return {
    allMatches: state.allMatches,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddMatches: function (matches) {
      dispatch({ type: "onAddMatches", matches: matches });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationScreen);

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
  topCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: "#FFF", // jaune clair FFDE70
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    elevation: 6,
    width: 340,
    borderWidth: 0.3,
    borderColor: "#DDD",
    marginTop: 8,
  },
});
