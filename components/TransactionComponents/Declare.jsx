import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet, Image, ImageBackground } from "react-native";
import { Text, Avatar, Input, Overlay } from "react-native-elements";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";

// import { useNavigation } from "@react-navigation/native";

import { connect } from "react-redux";

/* ---------------------------------------- MAIN FUNCTION -------------------------------------------*/
function Declare({
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
  // const navigation = useNavigation();

  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  console.log("error:", error);

  const handleDate = (inputDate) => {
    if (
      inputDate.length >= 10 &&
      !inputDate.match(
        /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
      )
    ) {
      setError("Date au mauvais format");
    } else {
      setDate(inputDate);
      console.log("Date enregistrée :", date);
    }
  };

  const [selectedValue, setSelectedValue] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  console.log("selectedValue:", selectedValue);

  const data = [
    { label: "0h30", value: 0.5 },
    { label: "1h", value: 1 },
    { label: "1h30", value: 1.5 },
    { label: "2h", value: 2 },
    { label: "2h30", value: 2.5 },
    { label: "3h00", value: 3 },
    { label: "3h30", value: 3.5 },
    { label: "4h00", value: 4 },
    { label: "4h30", value: 4.5 },
    { label: "5h00", value: 5 },
    { label: "6h00", value: 6 },
    { label: "7h00", value: 7 },
    { label: "8h00", value: 8 },
    { label: "9h00", value: 9 },
  ];

  //  BOUTONS ANNULATION/VALIDATION
  let button;
  if (!isAsker) {
    button = (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={styles.button2}
          onPress={() => toggleOverlay()}
        >
          <Text style={styles.text2}>Déclarer</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    button = (
      <View style={{ width: "100%", height: 40, marginTop: 3 }}>
        <Text style={{ fontSize: 14 }}>
          Une fois le service rendu {firstName} déclarera la date et la durée de
          la prestation 📅.
        </Text>
        <View style={[styles.buttonHelper]}></View>
      </View>
    );
  }

  const [overlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  /*------------------ DECLARATION DU HELPER ------------------*/
  const [hideButton, setHideButton] = useState(false);
  const [declarationDone, setDeclarationDone] = useState(false);

  let handleSubmit = async () => {
    let rawResponse = await fetch(`https://swap-newapp.herokuapp.com/declare`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `requestId=${requestId}&token=${user.token}&declared_credit=${selectedValue}&declaration_date=${date}`,
    });
    let response = await rawResponse.json();
    console.log("RESPONSE BACK - DECLARE:", response);
    if (response.newRequestCredit) {
      toggleOverlay();
      setHideButton(true);
    }
    updateStatus();
  };

  /*------------------ une fois déclaré ---------------*/
  console.log("declaration done:", declarationDone);

  useEffect(() => {
    async function getDeclaration() {
      let rawResponse = await fetch(
        `https://swap-newapp.herokuapp.com/get-declaration/${requestId}`
      );
      let response = await rawResponse.json();
      console.log("REPONSE BACK GET DECLARATION", response);
      if (response.status == true) {
        console.log("REPONSE BACK GET DECLARATION", response);
        setDeclarationDone(true);
      }
    }
    getDeclaration();
  }, []);

  let path = `https://theoduvivier.com/swap/${category
    .replace(/\s/g, "_")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")}.png`;

  return (
    <View
      style={{
        width: 340,
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 30,
      }}
    >
      {/* borderWidth: 1, borderColor: 'red', */}

      {/* PAGE TOP : titre et close button */}

      <View style={styles.card}>
        <TouchableOpacity
        // onPress={{}}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Avatar
              rounded
              size="medium"
              source={{ uri: avatar }}
              containerStyle={
                !isAsker ? styles.avatarHelper : styles.avatarAsker
              }
            />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.cardTitle}>{firstName}</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginTop: 7,
                }}
              >
                <Image
                  source={{ uri: path }}
                  style={{ width: 16, height: 16, marginRight: 8 }}
                ></Image>
                <Text style={{ fontSize: 14 }}>
                  {
                    (category =
                      category.charAt(0).toUpperCase() +
                      category.substring(1).toLowerCase())
                  }
                </Text>
              </View>

              <Text style={styles.bodyText2}>{description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* TIME DECLARATION */}
      {!isAsker ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 340,
          }}
        >
          <View style={{}}>
            <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Date</Text>
            <View style={{ flexDirection: "row" }}>
              <Input
                containerStyle={{
                  width: 140,
                  height: 45,
                  borderRadius: 5,
                  backgroundColor: "white",
                  elevation: 3,
                  paddingRight: 15,
                  marginRight: 5,
                }}
                inputStyle={{
                  color: "black",
                  marginLeft: 13,
                  fontSize: 14,
                  paddingTop: 5,
                }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder="jj/mm/aaaa"
                onChangeText={(text) => {
                  handleDate(text);
                }}
              />
              <AntDesign name="calendar" size={30} color="#F7CE46" />
            </View>

            <Text style={{color: 'red', marginTop: 3}}>{error}</Text>
          </View>

          {/*  borderWidth: 1, borderColor: 'red' */}
          <View style={{}}>
            <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Durée</Text>

            <Dropdown
              style={{
                width: 140,
                height: 45,
                borderRadius: 5,
                backgroundColor: "white",
                elevation: 3,
                paddingRight: 15,
              }}
              placeholderStyle={{
                color: "black",
                marginLeft: 17,
                fontSize: 14,
              }}
              selectedTextStyle={{
                color: "black",
                marginLeft: 17,
                fontSize: 14,
              }}
              inputSearchStyle={{}}
              dropdownPosition="auto"
              search={false}
              data={data}
              labelField="label"
              valueField="value"
              onChange={(item) => {
                setSelectedValue(item.value);
                setSelectedLabel(item.label);
              }}
              placeholder={selectedLabel ? selectedLabel : ""}
              containerStyle={{}}
            />
          </View>
        </View>
      ) : null}

      {/* DECLARE BUTTON */}
      {hideButton && declarationDone && isAsker ? (
        <View style={{ width: "100%" }}>
          <View style={{ flexDirection: "row" }}>
            {/* <MaterialCommunityIcons name="handshake-outline" size={20} color="black" style={{marginRight : 5}} /> */}
            <Text style={{ marginBottom: 5 }}>
              {" "}
              🤝 Merci pour votre participation!
            </Text>
          </View>
          <Text style={{}}>
            Attendez que {firstName} confirme votre déclaration pour gagner du
            crédit temps.
          </Text>
        </View>
      ) : (
        <View>{button}</View>
      )}

      <Overlay
        isVisible={overlayVisible}
        // onBackdropPress={() => toggleOverlay()}
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
          <View style={{ flexDirection: "column", width: 300, }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                marginBottom: 15,
              }}
            >
              Vérifiez votre déclaration avant envoi:
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column", marginRight: 60 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                    Date
                  </Text>
                  <AntDesign name="calendar" size={16} color="#F7CE46" />
                </View>
                <Text style={{ marginBottom: 30 }}>{date}</Text>
              </View>

              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                  Durée
                </Text>
                <Text style={{ marginBottom: 30 }}>{selectedLabel}</Text>
              </View>
            </View>
          </View>
          {/* buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              // position: "absolute",
              // bottom: 0,
            }}
          >
            <TouchableOpacity
              style={styles.button3}
              onPress={() => toggleOverlay()}
            >
              <Text style={styles.text3}>Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button4}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.text4}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Overlay>

      <Text style={{ fontSize: 13, color: "grey", marginTop: 35 }}>
        Un problème? Pressez ici
      </Text>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    transactionDetails: state.transactionDetails,
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(Declare);

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
    marginLeft: 7,
  },
  avatarAsker: {
    borderColor: "#345C6C",
    borderWidth: 4,
    marginLeft: 7,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 5,
    elevation: 4,
    marginBottom: 20,
    width: 340,
    maxHeight: 200,
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
    fontSize: 14,
    fontWeight: "400",
    maxWidth: 230,
    marginTop: 5,
    // borderWidth: 5,
    // borderColor: 'red',
  },
  // time declaration
  input1: {
    height: 40,
    width: 110,
    fontSize: 13,
    marginLeft: 15,
    marginBottom: 15,
    borderWidth: 0.5,
    paddingLeft: 15,
    borderRadius: 5,
    borderColor: "#E7E7E7",
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  text1: {
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 24,
    marginTop: 3,
  },
  text2: {
    color: "#000000",
    fontSize: 20,
    lineHeight: 24,
    marginTop: 3,
    fontWeight: "bold",
    letterSpacing: 0.6,
  },
  button2: {
    backgroundColor: "#F7CE46",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  button3: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 140,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    elevation: 3,
    marginBottom: 12,
    marginRight: 25,
  },
  button4: {
    backgroundColor: "#F7CE46",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 140,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    elevation: 3,
    marginBottom: 12,
  },
  text3: {
    color: "#FFF",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 3,
    fontWeight: "bold",
    letterSpacing: 0.6,
  },
  text4: {
    color: "#000000",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 3,
    fontWeight: "bold",
    letterSpacing: 0.6,
  },
});
