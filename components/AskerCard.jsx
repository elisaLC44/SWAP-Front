import React from "react";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { Text, Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import { connect } from "react-redux";

/* ---------------------------------------- MAIN FUNCTION -------------------------------------------*/
function AskerCard({
  askerName,
  askerCity,
  askerAvatar,
  requestDetails,
  category,
  categoryImage,
  onGetAskerDetails,
}) {
  const navigation = useNavigation();

  // console.log('>>> requestDetails == userDetails REDUCER:', requestDetails)

  const handleUserDetails = () => {
    // stocker dans reducer pour afficher infos dans AskerDetailsScreen
    onGetAskerDetails(requestDetails);
    navigation.navigate("AskerDetailScreen");
  };

  let path = `https://theoduvivier.com/swap/${category
    .replace(/\s/g, "_")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")}.png`;

  return (
    <View style={styles.card}>
      {/*  borderColor: "green", borderWidth: 3 */}
      <View
        style={{ 
          flexDirection: "row",  
          // borderColor: "blue",
          // borderWidth: 3, 
      }} 
      >
        <View
          style={{
            // borderColor: "red",
            // borderWidth: 3,
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row",  }}>
            <Image
              source={{ uri: path }}
              style={{ width: 21, height: 21, marginRight: 10 }}
            ></Image>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              {
                (category =
                  category.charAt(0).toUpperCase() +
                  category.substring(1).toLowerCase())
              }
            </Text>
          </View>

            {/* divider */}
            <View style={styles.divider} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              maxWidth: 220,
              // borderColor: "#345C6C",
              // borderWidth: 3,
            }}
          >
            <Avatar
              rounded
              size="medium"
              source={{ uri: askerAvatar }}
              containerStyle={{
                borderColor: "#F7CE46",
                borderWidth: 4,
                marginRight: 10,
              }}
            />
            <View style={{}}>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {askerName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  marginTop: 3,
                }}
              >
                <Ionicons
                  name="location-sharp"
                  size={19}
                  color="#F7CE46"
                  style={{ marginRight: 3 }}
                />
                <Text style={styles.bodyText2}>{askerCity}</Text>
              </View>
            </View>
            
          </View>
        </View>

      </View>
      <TouchableWithoutFeedback onPress={handleUserDetails}>
        <View style={styles.button}>
          <Text
            style={{ color: "#FFF", fontWeight: "bold", letterSpacing: 0.6 }}
          >
            Détails
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onGetAskerDetails: function (askerRequest) {
      dispatch({ type: "getAskerDetails", askerRequest: askerRequest });
    },
  };
}

export default connect(null, mapDispatchToProps)(AskerCard);

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
    flexDirection: "column",
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 7,
    elevation: 6,
    marginBottom: 20,
    width: 345,
    marginLeft: 7,
    // borderColor: "pink",
    // borderWidth: 3,
  },
  button: {
    color: "black",
    backgroundColor: "#345C6C",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    width: "100%",
    height: 35,
    alignSelf: "center",
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  divider: {
    borderBottomColor: "#8B8B8B",
    opacity: 0.5,
    borderBottomWidth: 0.5,
    width: "100%",
    marginTop: 8,
    marginBottom: 12,
  },
});
