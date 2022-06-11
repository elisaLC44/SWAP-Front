import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Text } from "react-native-elements";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { connect } from "react-redux";

/* ---------------------------------------- MAIN FUNCTION -------------------------------------------*/
function HelperDetailAfterSearch({ helperDetails }) {
  // console.log( "$$$$$ HELPER DETAILS INSERT DATE",helperDetails.comments[0].insert_date);
  const navigation = useNavigation();
  console.log(" helperDetails.categories",  helperDetails.categories)

  return (
    <ImageBackground
      source={require("../assets/background-1.png")}
      style={styles.container}
      // resizeMode="cover"
    >
      {/* title  */}
      <View style={{ marginTop: 5 }}>
        <View>
          <View
            style={{
              alignItems: "flex-end",
              marginRight: 25,
              paddingTop: 60,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SearchResultScreen");
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.pageTitle}>Profil</Text>
        </View>

        {/* card */}
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
                  alignItems: "center",
                }}
              >
                <Avatar
                  rounded
                  size="medium"
                  source={{
                    uri: helperDetails.user_img,
                  }}
                  containerStyle={{
                    borderColor: "#345C6C",
                    borderWidth: 4,
                  }}
                />
                <View style={{ marginLeft: 15, justifyContent: "center" }}>
                  <Text style={{ fontSize: 19 }}>
                    {helperDetails.firstName}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons
                      name="verified"
                      size={14}
                      color={
                        helperDetails.verified_profile ? "#F7CE46" : "#8B8B8B"
                      }
                    />
                    <Text style={{ marginLeft: 5 }}>
                      {helperDetails.verified_profile ? "Profil vérifié" : null}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#8B8B8B",
                opacity: 0.5,
                borderBottomWidth: 0.5,
                width: "100%",
                marginTop: 20,
              }}
            />

            {/* divider */}
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              style={{ height: "80%" }}
              showsVerticalScrollIndicator={false}
            >
              {/* CONTENT */}
              <View
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                {/* alignItems: 'center' */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    marginTop: 20,
                    marginBottom: 5,
                  }}
                >
                  <Ionicons name="location-sharp" size={20} color="#F7CE46" />
                  <Text style={{ fontSize: 14 }}>
                    {" "}
                    {helperDetails.address_city} {helperDetails.address_zipcode}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 13,
                    marginBottom: 5,
                    fontWeight: "bold",
                  }}
                >
                  Compétences
                </Text>

                {helperDetails.categories.map((category, i) => {
                  console.log("category", category);
                  let path = `https://theoduvivier.com/swap/${category
                    .replace(/\s/g, "_")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")}.png`;

                  return (
                    <View
                      key={i}
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                        marginTop: 3,
                        // borderColor : 'red',
                        // borderWidth: 1,
                      }}
                    >
                      {/* position: 'absolute, bottom: 2 */}
                      <Image
                        source={{ uri: path }}
                        style={{ width: 18, height: 18, marginRight: 10 }}
                      />
                      <Text style={{ fontSize: 14 }}>
                        {
                          (category =
                            category.charAt(0).toUpperCase() +
                            category.substring(1))
                        }
                      </Text>
                    </View>
                  );
                })}
              </View>

              <Text
                style={{
                  fontSize: 16,
                  marginTop: 20,
                  marginBottom: 10,
                  fontWeight: "bold",
                }}
              >
                Description
              </Text>
              <View style={{}}>
                {helperDetails.bio ? (
                  <View>
                    <Text style={{ fontSize: 14,}}>
                      {helperDetails.bio}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={{ fontSize: 14, color: "grey" }}>
                      {helperDetails.firstName} n'a pas de descritpion 
                    </Text>
                  </View>
                )}
              </View>

              {/* divider */}
              <View
                style={{
                  borderBottomColor: "#8B8B8B",
                  opacity: 0.5,
                  borderBottomWidth: 0.5,
                  width: "100%",
                  marginTop: 25,
                }}
              />

              {/* COMMENTAIRES */}
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 20,
                  marginBottom: 10,
                  fontWeight: "bold",
                }}
              >
                Commentaires
              </Text>

              {helperDetails.comments.length > 0 ? (
                helperDetails.comments.map((comment, i) => {
                  return (
                    <View key={i} style={{ marginBottom: 12 }}>
                      <Text style={{ fontSize: 12, color: "grey" }}>
                        {comment.author}
                      </Text>
                      <Text style={{ fontSize: 14 }}>{comment.content}</Text>
                    </View>
                  );
                })
              ) : (
                <View>
                  <Text style={{ fontSize: 14, color: "grey" }}>
                    {helperDetails.firstName} n'a pas encore de commentaire
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

function mapStateToProps(state) {
  return {
    helperDetails: state.userDetails,
  };
}
export default connect(mapStateToProps, null)(HelperDetailAfterSearch);

//
// ─────────────────────────────────────────────────── ──────────
//   :::::: S T Y L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    color: "black",
    backgroundColor: "#F7CE46",
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  buttonBlack: {
    color: "white",
    backgroundColor: "#000",
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  buttonTitleBlack: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "700",
  },
  comments: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 3,
  },
  card: {
    height: "77%",
    backgroundColor: "white",
    padding: 20,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 6,
    marginTop: 15,
    marginHorizontal: 30,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 32,
    // marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
  },
  bodyText: {
    color: "#717171",
    fontSize: 14,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});
