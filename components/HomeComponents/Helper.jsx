import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

// import { connect } from "react-redux";

export default function Helper({ user, onGetRequestDetails, requestDetails }) {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   async function getRequests() {
  //     let request = await fetch(
  //       `https://swap-newapp.herokuapp.com/get-requests/${user.token}`
  //     );
  //     let response = await request.json();

  //     if (response.matchingRequests) {
  //       // stocker infos des requêtes dans redux pour exploitation et affichage dans les askerCards
  //       onGetRequestDetails(response.matchingRequests);
  //       console.log("response.matchingRequests: ", response.matchingRequests);
  //     } else {
  //       setMessage(response.message);
  //     }
  //   }
  //   getRequests();
  // }, []);

  // console.log("requestDetails TEST: ", requestDetails);

  // let avatar1 = requestDetails[0].asker.user_img;
  // console.log("avatar1: ", avatar1);

  return (
    <View>
      {/* aubergine 26123A / foncé 21132F */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("HelperRequestListScreen");
        }}
        style={{
          width: 275,
          height: 200,
          backgroundColor: "#FFF",
          marginBottom: 50,
          elevation: 3,
          borderRadius: 8,
          marginTop: 50,
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 25,
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
            // borderColor: "green",
            // borderWidth: 1,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            Voir mes demandes reçues ici
          </Text>

          <View
            style={{
              // borderColor: "red",
              // borderWidth: 1,
            }}
          >
            <Image
              source={require("../../assets/hola-sola.png")}
              style={{ width: 150, height: 140 }}
            ></Image>
            
          </View>
          {/* <View style={{ 
            width: 150, 
            flexDirection: "row", 
            marginTop: 20,
      
            alignItems: "center",
            paddingHorizontal: 10,
            backgroundColor: "white",
            shadowColor: "#171717",
            shadowOffset: { width: 1, height: 5 },
            shadowOpacity: 0.2,
            shadowRadius: 7,
            elevation: 2,
            width: "100%",
            borderWidth: 0.3,
            borderColor: "#DDD",
            height: 65,
            }}>
          
            <Image
              source={{ uri: requestDetails[0].asker.user_img }}
              style={{
                borderRadius: 50,
                height: 50,
                width: 50,
                borderColor: "#F7CE46",
                borderWidth: 3,
              }}
            />
            <View style={{ flexDirection: "column", marginLeft: 10 }}>
              <Text style={{ fontWeight: "bold" }}>
                {requestDetails[0].asker.firstName}
              </Text>
              <Text style={{ }}>
                  {requestDetails[0].category
                    ? requestDetails[0].category.charAt(0).toUpperCase() +
                    requestDetails[0].category.substring(1)
                    : requestDetails[0].category.category}
              </Text>
            </View>
          </View> */}
        </View>
      </TouchableOpacity>
    </View>
  );
}

// function mapStateToProps(state) {
//   return {
//     requestDetails: state.requestDetails,
//     user: state.user,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     onGetRequestDetails: function (data) {
//       dispatch({ type: "getRequestDetails", requestDetails: data });
//     },
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Helper);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
