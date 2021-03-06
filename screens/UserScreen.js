import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Overlay, Avatar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import DropDownGender from "../components/userInfoComponents/DropDownGender";
import DropDownCategories from "../components/userInfoComponents/DropDownCategories";

import { connect } from "react-redux";

/* ----------------------------- MAIN FUNCTION ---------------------------------*/
function UserScreen(props) {
  const navigation = useNavigation();

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (e) {
      console.log(e);
      // clear error
    }
    console.log("Token removed from local storage (userScreen File)");
    navigation.navigate("SignInScreen");
  };

  /* ---------------------------------------- */

  const [randomUserPic, setRandomUserPic] = useState("");
  const [picInBDD, setPicInBDD] = useState(props.user.user_img);
  const [gender, setGender] = useState(props.user.gender);
  const [bio, setBio] = useState(props.user.bio);
  const [street, setStreet] = useState(props.user.address_street);
  const [city, setCity] = useState(props.user.address_city);
  const [zipcode, setZipcode] = useState(props.user.address_zipcode);
  const [selectedCat, setSelectedCat] = useState([]);

  /* -----------------------------AVATAR ---------------*/
  console.log("randomUserPic: ", randomUserPic);
  console.log("picInBDD: ", picInBDD);
  console.log("gender venant de redux :", props.user.gender);

  const [overlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const handleAvatar = async () => {
    // useEffect(() => {
    if (props.user.gender == "Non Binaire" || props.user.gender == "") {
      const findNonBinaryUser = async () => {
        const data = await fetch(`https://randomuser.me/api/?results=5`);
        const body = await data.json();
        // console.log("random User result IF NON-BINARY {}: ", body.results)
        setRandomUserPic(body.results[0].picture.medium);
      };
      findNonBinaryUser();
    } else if (props.user.gender == "Femme") {
      const findFemaleUser = async () => {
        const data = await fetch(`https://randomuser.me/api/?gender=female`);
        const body = await data.json();
        // console.log("random User result IF FEMALE {}: ", body.results)
        setRandomUserPic(body.results[0].picture.medium);
      };
      findFemaleUser();
    } else {
      const findMaleUser = async () => {
        const data = await fetch(`https://randomuser.me/api/?gender=male`);
        const body = await data.json();
        // console.log("random User result IF MALE {}: ", body.results)
        setRandomUserPic(body.results[0].picture.thumbnail);
        // console.log("randomUsers", body.results[0].picture.thumbnail)
      };
      findMaleUser();
    }

    // https://swap-newapp.herokuapp.com/     http://192.168.1.124:3000/
    let rawResponse = await fetch(
      `https://swap-newapp.herokuapp.com/users/update-avatar/${props.user.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `avatar=${randomUserPic}`,
      }
    );
    let response = await rawResponse.json();
    if (response.result) {
      console.log(">>>>>>> avatar du back:", response.updatedUser.user_img);
    }
    props.onUpdateAvatar(response.updatedUser.user_img);

    // },[])
  };

  const handleSubmitGender = async () => {
    // idem cat??gories, les infos de l'??tat gender sont enregistr??e dans le store, via le composant <DropDownGender/>
    setGender(props.user.gender);
    let response = await fetch(
      `https://swap-newapp.herokuapp.com/users/update-gender/${props.user.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `gender=${gender}`,
        // body: JSON.stringify({ address_street_1:adress1,address_zipcode:cp1 })
      }
    );
    await response.json();
    console.log(">>>>>>> gender:", gender);
  };

  const handleSubmitAddress = async () => {
    let response = await fetch(
      `https://swap-newapp.herokuapp.com/users/update-address/${props.user.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `street=${street}&city=${city}&zipcode=${zipcode}`,
      }
    );
    await response.json();
    console.log(">>>>> address:", street);
    console.log(">>>>> city:", city);
  };

  const handleSubmitBio = async () => {
    let response = await fetch(
      `https://swap-newapp.herokuapp.com/users/update-bio/${props.user.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `bio=${bio}`,
      }
    );
    await response.json();
    console.log(">>>>> bio:", response.updatedUser.bio);
  };

  // console.log("props.user.categories", props.user.categories);
  const handleSubmitCateg = async () => {
    // dans le cas des categories, comme la modification de l'??tat se fait dans le composant <DropDownCategories/>
    // on ne peut modifier l'??tat selectedCat de ce fichier qu'en allant chercher la donn??e qui a ??t??
    // enregistr??e dans le reducer/store ?? partir du composant <DropDownCategories/>
    setSelectedCat(props.user.categories);
    let response = await fetch(
      `https://swap-newapp.herokuapp.com/users/update-categories/${props.user.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `categories=${JSON.stringify(selectedCat)}`,
        // body: JSON.stringify({ address_street_1:adress1,address_zipcode:cp1 })
      }
    );
    await response.json();
  };

  let categoriesInBDD = props.user.categories.map((categories, i) => {
    let path = `https://theoduvivier.com/swap/${categories
      .replace(/\s/g, "_")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")}.png`;
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }} key={i}>
        <Image
          source={{ uri: path }}
          style={{ width: 15, height: 15, marginRight: 10 }}
        />
        <Text>{categories}</Text>
      </View>
    );
  });

  return (
    <ImageBackground
      source={require("../assets/background-1.png")}
      style={styles.container}
    >
      <View
        style={{
          flexDirection: "row",
          height: 60,
          marginTop: 70,
          marginBottom: 0,
        }}
      >
        {/* borderColor: "red", borderWidth: 1, */}
        <View
          style={{
            borderRadius: 50,
            position: "relative",
            right: 130,
            bottom: 12,
            // borderColor: "grey",
            // borderWidth: 1,
          }}
        >
          <TouchableOpacity onPress={() => toggleOverlay()}>
            <Avatar
              size={70}
              backgroundColor={"transparent"}
              rounded
              source={
                picInBDD ? { uri: props.user.user_img } : { uri: randomUserPic }
              }
              title={props.user.firstName}
              titleStyle={{ fontSize: 12 }}
              containerStyle={
                {
                  // borderColor: 'grey', // borderWidth: 1,
                }
              }
            >
              <Avatar.Accessory size={23} />
            </Avatar>
            <Text style={{ fontSize: 10, marginTop: 5 }}>Changer d'avatar</Text>
          </TouchableOpacity>
        </View>
        {/* flexDirection: "column" */}
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
            source={require("../assets/background-1.png")}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={toggleOverlay} style={styles.button3}>
                <Text style={styles.text3}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleAvatar()}
                style={styles.button4}
              >
                <Text style={styles.text4}>Changer</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <Avatar
                size={70}
                backgroundColor={"transparent"}
                rounded
                source={
                  picInBDD
                    ? { uri: props.user.user_img }
                    : { uri: randomUserPic }
                }
                title={props.user.firstName}
                titleStyle={{ fontSize: 12 }}
              ></Avatar>
            </View>
          </ImageBackground>
        </Overlay>

        <View>
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 100,
              bottom: 38,
              fontSize: 14,
            }}
            onPress={() => logOut()}
          >
            <MaterialCommunityIcons
              name="logout-variant"
              size={27}
              color="black"
            />
            <Text
              style={{
                position: "absolute",
                bottom: -14,
                left: -34,
                width: 100,
                fontSize: 10,
              }}
            >
              D??connexion
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Credit Temps */}
      <View style={{}}>
        <Image
          style={{
            width: 120,
            height: 100,
            resizeMode: "contain",
            // borderColor: "red", borderWidth: 1,
          }}
          source={require("../assets/timeCounter.png")}
        />

        <View style={{ width: 150, position: "absolute", left: 15, top: 20 }}>
          {/* borderColor: "red", borderWidth: 1, */}
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 30 }}>
            {props.user.user_credit}H
          </Text>
          {/* props.user.user_credit */}
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Cr??dit temps</Text>
        </View>
      </View>

      {/* ENTETE INFOS USER */}
      <View
        style={{
          width: 350,
          backgroundColor: "#FFFFFF",
          borderTopRightRadius: 6,
          borderTopLeftRadius: 6,
          elevation: 3,
          marginTop: 20,
        }}
      >
        {/* INFORMATIONS USER */}
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginTop: 15,
              paddingBottom: 10,
            }}
          >
            {props.user.firstName} {props.user.lastName}
          </Text>
        </View>
      </View>

      <ScrollView
        style={{
          width: 350,
          // height: 700,
          backgroundColor: "#FFFFFF",
          borderBottomRightRadius: 6,
          borderBottomLeftRadius: 6,
          elevation: 3,
        }}
      >
        <View style={{ backgroundColor: "#FFFFFF", marginLeft: 20 }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                handleSubmitGender();
              }}
              style={{ position: "absolute", left: 290, top: 18 }}
            >
              <EvilIcons name="pencil" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ marginTop: 20, fontSize: 14, fontWeight: "bold" }}>
              Genre (optionnel)
            </Text>

            <View
              style={{ flexDirection: "column", justifyContent: "flex-start" }}
            >
              <Text>{props.user.gender}</Text>
              <DropDownGender />
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                handleSubmitAddress();
                // updateStateAddress();
              }}
              style={{ position: "absolute", left: 290, top: 18 }}
            >
              <EvilIcons name="pencil" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{
                marginTop: 22,
                marginBottom: 3,
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Adresse
            </Text>
            <TextInput
              textAlignVertical={"top"}
              style={styles.inputAdresse}
              placeholder="nom de rue"
              placeholderTextColor="grey"
              onChangeText={(text) => setStreet(text)}
              value={street}
            />

            <TextInput
              textAlignVertical={"top"}
              style={styles.inputZip}
              placeholder="code postal"
              placeholderTextColor="grey"
              onChangeText={(text) => setZipcode(text)}
              value={zipcode}
            />

            <TextInput
              textAlignVertical={"top"}
              style={styles.inputCity}
              placeholder="ville"
              placeholderTextColor="grey"
              onChangeText={(text) => setCity(text)}
              value={city}
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                handleSubmitBio();
                // updateStateBio();
              }}
              style={{ position: "absolute", left: 290, top: 18 }}
            >
              <EvilIcons name="pencil" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{
                marginTop: 22,
                marginBottom: 8,
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Pr??sentation
            </Text>
            <TextInput
              textAlignVertical={"top"}
              style={styles.inputBio}
              placeholder="ajoutez une description"
              placeholderTextColor="grey"
              numberOfLines={2}
              multiline={true}
              onChangeText={(text) => setBio(text)}
              value={bio}
              maxLength={200}
            />
          </View>

          {/* handleSubmitAddress  */}

          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  marginTop: 22,
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Cat??gories
              </Text>

              <TouchableOpacity
                onPress={() => {
                  handleSubmitCateg();
                  // updateCategories();
                }}
                style={{ position: "absolute", left: 290, top: 18 }}
              >
                <EvilIcons name="pencil" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <View
              style={{ flexDirection: "column", justifyContent: "flex-start" }}
            >
              {categoriesInBDD}
              {/* {displayCategDropDown} */}
              <DropDownCategories
                dropdownPosition="auto"
                style={{
                  width: Dimensions.get("window").width * 0.65,
                  backgroundColor: "white",
                  shadowColor: "#171717",
                  shadowOffset: { width: 1, height: 5 },
                  shadowOpacity: 0.2,
                  shadowRadius: 7,
                  borderRadius: 7,
                  paddingHorizontal: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: "#DDD",
                  marginTop: 5,
                  marginLeft: 0,
                }}
              />
            </View>

            <Text>{""}</Text>
            <Text>{""}</Text>
            <Text>{""}</Text>
            <Text>{""}</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateAvatar: function (avatar) {
      dispatch({ type: "onUpdateAvatar", avatar: avatar });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    // borderColor: "red",
    // borderWidth: 1,
  },
  infoCards: {
    width: 320,
    elevation: 2,
    marginTop: 5,
    paddingHorizontal: 7,
    backgroundColor: "#FFF",
    borderRadius: 6,
  },
  title2: {
    marginVertical: 4,
    fontSize: 14,
    marginLeft: 30,
    borderColor: "red",
    borderWidth: 1,
  },
  input1: {
    width: 150,
    height: 30,
  },
  input2: {
    width: 300,
    height: 30,
  },
  input3: {
    width: 300,
    height: 30,
  },
  inputBio: {
    width: 300,
    maxHeight: 70,
  },
  inputAdresse: {
    width: 300,
    height: 18,
  },
  inputZip: {
    width: 200,
    height: 20,
  },
  inputCity: {
    width: 200,
    height: 20,
  },
  inputOn: {
    borderBottomWidth: 1,
  },
  inputOff: {
    borderBottomWidth: 0,
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
    // marginBottom: 12,
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
    // marginBottom: 12,
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
