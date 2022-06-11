import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { CheckBox, Text, Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";



function askerPreviewCard(user) {

  const [requestList, setRequestList] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (isFocused) {
      async function getRequests() {
        let request = await fetch(
          `https://swap-newapp.herokuapp.com/get-requests/${user.token}`
        );
        let response = await request.json();

        if (response.matchingRequests) {
          // stocker infos des requêtes dans redux pour exploitation et affichage dans les askerCards
          setRequestList(response.matchingRequests);
          console.log('response.matchingRequests: ', response.matchingRequests)
        } else {
          setMessage(response.message);
        }
      }
      getRequests();
    }
  }, [isFocused]);

  return (
    <View style={styles.card}>
      {/* , style={{marginRight: 3}} onPress={handleUserDetails} */}

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          // borderColor: "red",
          // borderWidth: 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // borderColor: "pink",
            // borderWidth: 3,
          }}
        >
          {/* AVATAR */}
          <Avatar
            rounded
            size="medium"
            source={{ uri: avatar }}
            // position: "absolute", right: 10
            containerStyle={!isAsker ? styles.avatarHelper : styles.avatarAsker}
          />
          {/* CONTENT */}
          <View style={{ marginLeft: 14 }}>
            <Text style={styles.cardTitle}>{firstName}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginTop: 5,
                width: 160,
                //      borderColor: "pink",
                // borderWidth: 3,
              }}
            >
              <Image
                source={{ uri: path }}
                style={{ width: 14, height: 14, marginRight: 8 }}
              ></Image>
              <Text style={{ fontSize: 12 }}>
                {
                  (categoryDot =
                    categoryDot.charAt(0).toUpperCase() +
                    categoryDot.substring(1).toLowerCase())
                }
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(askerPreviewCard);
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

  container2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 170,
    marginBottom: 140,
  },
  containerCheckBox: {
    flex: 1,
    marginTop: 70,
    marginHorizontal: 15,
  },
  input: {
    paddingLeft: 20,
    marginHorizontal: 6,
    textAlign: "left",
    backgroundColor: "white",
    borderRadius: 10,
    color: "black",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
    borderBottomWidth: 0,
  },
  inputTextarea: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 15,
    marginHorizontal: 6,
    textAlign: "left",
    backgroundColor: "white",
    borderRadius: 7,
    color: "black",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
    borderBottomWidth: 0,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  textTitle2: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
  },

  button: {
    color: "black",
    backgroundColor: "#F7CE46",
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 6,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 60,
    padding: 15,
  },
  buttonTitle: {
    color: "black",
    fontSize: 18,
  },
  ImageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 7,
    elevation: 6,
    marginHorizontal: 13,
    marginBottom: 20,
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
  bodyText: {
    color: "#717171",
    fontSize: 15,
    marginLeft: 25,
    paddingHorizontal: 20,
    marginRight: 25,
  },
  bodyText2: {
    color: "#717171",
    fontSize: 14,
    fontWeight: "400",
  },
  icon: {
    marginRight: 10,
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
