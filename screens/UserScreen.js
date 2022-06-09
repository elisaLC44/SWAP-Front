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
import { Input, Avatar } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
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

  const [randomUserPic, setRandomUserPic] = useState("")
  const [picInBDD, setPicInBDD] = useState(props.user.user_img)
  const [gender, setGender] = useState(props.user.gender);
  const [bio, setBio] = useState(props.user.bio);
  const [street, setStreet] = useState(props.user.address_street);
  const [city, setCity] = useState(props.user.address_city);
  const [zipcode, setZipcode] = useState(props.user.address_zipcode);
  const [selectedCat, setSelectedCat] = useState([]);

 
  useEffect(() => {
    if(props.user.gender == "female"){
      const findFemaleUser = async() => {
        const data = await fetch(`https://randomuser.me/api/?gender=female`)
        const body = await data.json()
        console.log("random User result IF FEMALE {}: ", body.results)
        setRandomUserPic(body.results[0].picture.medium)
    }
    findFemaleUser() 
    
   } else {
      const findMaleUser = async() => {
        const data = await fetch(`https://randomuser.me/api/?gender=male`)
        const body = await data.json()
        console.log("random User result IF MALE {}: ", body.results)
        setRandomUserPic(body.results[0].picture.thumbnail) 
      // console.log("randomUsers", body.results[0].picture.thumbnail)
      // setRandomUserPic(body.results[0].picture.thumbnail) 
    }
    findMaleUser()
    }
    // fetch route pour enregistrer l'avatar
       
  },[])

  
 
  const handleSubmitGender = async () => {
    // idem catégories, les infos de l'état gender sont enregistrée dans le store, via le composant <DropDownGender/>
    setGender(props.user.gender);
    let response = await fetch(
      `http://192.168.1.124:3000/users/update-gender/${props.user.token}`,
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
      `http://192.168.1.124:3000/users/update-address/${props.user.token}`,
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
      `http://192.168.1.124:3000/users/update-bio/${props.user.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `bio=${bio}`,
      }
    );
    await response.json();
    console.log(">>>>> bio:", response.updatedUser.bio);
  };

  const handleSubmitCateg = async () => {
    // dans le cas des categories, comme la modification de l'état se fait dans le composant <DropDownCategories/>
    // on ne peut modifier l'état selectedCat de ce fichier qu'en allant chercher la donnée qui a été
    // enregistrée dans le reducer/store à partir du composant <DropDownCategories/>
    setSelectedCat(props.user.categories);
    let response = await fetch(
      `http://192.168.1.124:3000/users/update-categories/${props.user.token}`,
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

  console.log("props.user.categories", props.user.categories);


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
            bottom: 10,
            // borderColor: "grey",
            // borderWidth: 1,
          }}
        >
          {/* props.user.user_img */}
          <Avatar
            size={75}
            backgroundColor={"transparent"}
            rounded
            source={picInBDD ? {uri : props.user.user_img } : {uri : randomUserPic}}
            title={props.user.firstName}
            titleStyle={{ fontSize: 12 }}
            containerStyle={
              {
                // borderColor: 'grey',
                // borderWidth: 1,
              }
            }
          >
            <Avatar.Accessory size={23} />
          </Avatar>
        </View>
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
              Déconnexion
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
            {3}H
          </Text>
          {/* props.user.user_credit */}
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Crédit temps</Text>
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

          {/* <View
            style={{
              width: 320,
              elevation: 2,
              marginTop: 5,
              paddingHorizontal: 7,
              backgroundColor: "#FFF",
              borderRadius: 6,
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => {
                  updateStateBirth();
                }}
                style={{ position: "absolute", left: 270, top: 5 }}
              >
                <EvilIcons name="pencil" size={40} color="yellow" />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>DATE DE NAISSANCE:</Text>
              <Input
                containerStyle={{ maxWidth: 60, height: 40 }}
                inputStyle={{ fontSize: 13 }}
                inputContainerStyle={
                  isEditableBirth === true ? styles.inputOn : styles.inputOff
                }
                onChange={(text) => setBirthDate(text)}
                editable={isEditableBirth}
                value={birthDate}
              />
            </View>
          </View> */}

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
                updateStateAddress();
              }}
              style={{ position: "absolute", left: 290, top: 18 }}
            >
              <EvilIcons name="pencil" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ marginTop: 22, marginBottom: 3, fontSize: 14, fontWeight: "bold" }}>
              Adresse
            </Text>
            <TextInput
              textAlignVertical={"top"}
              style={styles.inputAdresse}
              placeholder="Nom de rue"
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
              placeholder="Ville"
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
            <Text style={{ marginTop: 22, marginBottom: 8, fontSize: 14, fontWeight: "bold" }}>
              Présentation
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
                Catégories
              </Text>

              <TouchableOpacity
                onPress={() => {
                  handleSubmitCateg();
                  updateCategories();
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

export default connect(mapStateToProps, null)(UserScreen);

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
  inputZip:{
    width: 200
    ,
    height: 20,
  },
  inputCity:{
    width: 200,
    height: 20,
  },
  inputOn: {
    borderBottomWidth: 1,
  },
  inputOff: {
    borderBottomWidth: 0,
  },
});
