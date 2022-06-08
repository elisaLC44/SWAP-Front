import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import { Overlay, Input } from "react-native-elements";
import { Dropdown } from "react-native-element-dropdown";
import DropDownCategRequest from "../components/userInfoComponents/DropDownCategRequest";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { connect } from "react-redux";

// props.navigation.goBack();

/* ---------------------------------------- MAIN FUNCTION -------------------------------------------*/
function ComposeRequestScreen(props) {
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [description, setDescription] = useState("");
  const [disponibility, setDisponibility] = useState("");
  const [visible, setVisible] = useState(false);

  let testEtats = { selectedAddress, selectedCat, description, disponibility };
  console.log("ALL COMPOSE REQUEST STATES : ", testEtats);

  /*----------------------- 1 - ADRESSE ---------------------------*/

  // la position actuelle et une adresse par défaut
  const data = [
    // { label: selectedAddress ? selectedAddress : "ma position actuelle",  value: "geolocation" },
    { label: "Ma position actuelle", value: "geolocation" },
    {
      label: props.user.address_street
        ? `${props.user.address_street}, ${props.user.address_city}`
        : "Ajoutez une addresse depuis votre profil",
      value: "address",
    },
  ];

  // l'état "selected" >>> comprend une des "data" défini au dessus et qui passe dans le dropdown de ADRESSE.
  const [selected, setSelected] = useState("");

  // selection de l'adresse et stockage dans la variable "addressObj" et l'état "selectedAddress"
  let addressObj;
  const handleLocation = async (location) => {
    if (location.value === "geolocation") {
      // A. récupère l'adresse actuelle
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        let geocode = await Location.getCurrentPositionAsync();
        // convert location described as coordinates into human readable location:
        let addressNames = await Location.reverseGeocodeAsync({
          latitude: geocode.coords.latitude,
          longitude: geocode.coords.longitude,
        });

        console.log("ADRESSENAMES", addressNames);
        addressObj = {
          address_street: addressNames[0].street,
          address_city: addressNames[0].city,
          address_zipcode: addressNames[0].postalCode,
          // number: addressNames[0].name,
        };
        setSelectedAddress(addressObj);
        console.log(">>>  check addressObj", addressObj);
        setVisible(true);
      }
    } else if (location.value == "address") {
      if (props.user.address_street) {
        addressObj = {
          address_street: props.user.address_street,
          address_city: props.user.address_city,
          address_zipcode: props.user.address_zipcode,
        };
        setSelectedAddress(addressObj);
      } else {
        setErrorMessage("Pas d'adresse enregistrée");
      }
    }
  };

  // console.log(">>>  check SELECTEDADRRESSE", selectedAddress);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  /*---------------- 2 - HANDLESUBMIT DES 4 INFOS A SAUVEGARDER DANS REDUX POUR "RESULT SCREEN" -----------*/

  const handleSubmit = () => {
    selectedCat.length > 1
      ? setErrorMessage("Vous ne pouvez choisir qu'une seul categorie")
      : null;

    if (
      selectedAddress == "" ||
      description == "" ||
      disponibility == "" ||
      selectedCat == ""
    ) {
      setErrorMessage("Merci de remplir tous les champs");
    } else {
      let requestData = {
        address_street: selectedAddress.address_street,
        address_city: selectedAddress.address_city,
        address_zipcode: selectedAddress.address_zipcode,
        category: selectedCat[0],
        description: description,
        disponibility: disponibility,
      };
      props.composeRequest(requestData);
      setSelectedCat("");
      // setDescription("");
      // setDisponibility("");
      props.navigation.navigate("SearchResultScreen");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background-1.png")}
      style={styles.container}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 60,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 20,
          }}
        >
          Composez votre demande ici:
        </Text>
        <View
          style={{
            marginRight: 12,
            paddingBottom: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("HomeScreen");
            }}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.error}>{errorMessage}</Text>
      {/* <ScrollView> */}
      <KeyboardAwareScrollView showsVerticalScrollIndicator={true}>
        {/* ==== LOCATION ====  */}
        <View style={{ flexDirection: "row", marginTop: 15,  }}>
          <Text style={styles.textTitle}>Lieu</Text>
          <Ionicons
            name="location-sharp"
            size={19}
            color="#F7CE46"
            style={{ marginLeft: 5 }}
          />
        </View>
        <Dropdown
          style={[styles.card]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          dropdownPosition="auto"
          search={false}
          data={data}
          labelField="label"
          valueField="value"
          onChange={(item) => {
            setSelected(item);
            handleLocation(item);
          }}
          placeholder={
            selected.label
              ? selected.label.charAt(0).toUpperCase() +
                selected.label.substring(1)
              : "choisissez un lieu d'intervention"
          }
          containerStyle={[styles.dropContainer, { height: 100 }]}
        />

        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: 120,
            width: 280,
            borderRadius: 7,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 12 }}>
            Position actuelle :{" "}
          </Text>
          <View
            style={{
              width: 80,
              borderBottomWidth: 1,
              borderBottomColor: "#000",
              marginBottom: 12,
            }}
          ></View>
          <Text style={{ fontSize: 15 }}>
            {selectedAddress.address_street}, {selectedAddress.address_city}{" "}
            {selectedAddress.address_zipcode}
          </Text>
        </Overlay>

        {/* ==== CATEGORIES ==== */}
        <Text style={[styles.textTitle, { marginBottom: 5, marginTop: 23 }]}>
          Catégorie
        </Text>

        <DropDownCategRequest
          placeHolder={selectedCat ? selectedCat : "Choisissez une catégorie"}
          dropdownPosition="bottom"
          containerStyle={{
            height: 400,
            marginBottom: 200,
            width: Dimensions.get("window").width * 0.85,
            shadowRadius: 7,
            borderRadius: 7,
            paddingHorizontal: 0,
            paddingVertical: 10,
          }}
          style={{
            width: Dimensions.get("window").width * 0.85,
            padding: 10,
            backgroundColor: "white",
            shadowColor: "#171717",
            shadowOpacity: 0.2,
            borderRadius: 7,
            elevation: 6,
            paddingHorizontal: 20,
            marginHorizontal: 15,
          }}
          value={selectedCat}
          onChange={(item) => {
            setSelectedCat(item);
          }}
        />

        {/* ==== DESCRIPTION ====  */}

        <Text style={[styles.textTitle, { marginBottom: 5, marginTop: 23 }]}>
          Description
        </Text>

        <TextInput
          textAlignVertical={"top"}
          style={styles.inputTextarea}
          placeholder="Descrivez votre demande en quelques mots afin d'indiquer vos besoins aux swapeurs."
          placeholderTextColor="grey"
          numberOfLines={6}
          multiline={true}
          onChangeText={(text) => {
            setDescription(text.trim());
          }}
          value={{}}
          maxLength={200}
        />

        {/* <Input
          placeholder="Comment"
          containerStyle={styles.inputTextarea}
          onChangeText={(text) => {
            setDescription(text.trim());
            
          }}
          value={{description}}
        /> */}

        {/* ==== DISPONIBILITES ====  */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginTop: 23,
          }}
        >
          <Text style={styles.textTitle}>Mes disponibilités</Text>
          <AntDesign
            name="calendar"
            size={18}
            color="#F7CE46"
            style={{ marginLeft: 5 }}
          />
        </View>
        <TextInput
          style={[styles.inputTextarea, { paddingTop: 25 }]}
          textAlignVertical={"top"}
          placeholder="Précisez vos disponibilités ici."
          placeholderTextColor="grey"
          numberOfLines={2}
          multiline={true}
          onChangeText={(text) => setDisponibility(text.trim())}
          value={{}}
          maxLength={200}
        />

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={styles.text}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {/* </ScrollView> */}
    </ImageBackground>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return {
    composeRequest: function (newRequest) {
      dispatch({ type: "composeRequest", newRequest });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposeRequestScreen);

//
// ─────────────────────────────────────────────────── ──────────
//   :::::: S T Y L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    // borderWidth: 2,
    // borderColor: "red",
  },
  textTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 4,
  },
  inputTextarea: {
    paddingTop: 25,
    padding: 20,
    marginHorizontal: 15,
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
    width: Dimensions.get("window").width * 0.85,
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 7,
    elevation: 6,
    marginHorizontal: 15,
    width: Dimensions.get("window").width * 0.85,
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#F7CE46",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.85,
    height: 45,
    borderRadius: 7,
    marginBottom: 40,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 4,
  },
  text: {
    color: "#000000",
    fontSize: 16,
    letterSpacing: 0.6,
    fontWeight: "bold",
  },
  dropContainer: {
    height: 20,
    width: Dimensions.get("window").width * 0.85,
    fontSize: 13,
    borderRadius: 7,
    borderColor: "#E7E7E7",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    backgroundColor: "white",
    elevation: 3,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "grey",
  },
  placeholderStyle: {
    color: "grey",
    fontSize: 14,
  },
  error: {
    fontSize: 12,
    marginLeft: 15,
    // marginTop: 10,
    paddingLeft: 15,
    color: "red",
  },
});
