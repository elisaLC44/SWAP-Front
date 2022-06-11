import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';

// import { connect } from 'react-redux';

export default function Asker() {
  const navigation = useNavigation();

  {
    /* au chargement fetch Ask Screen et côté route : findOne(token) et find({asker: currentUser.id}) avec populate pr trouver info users équivalent 
    et stocker le find() dans variable requests et l'envoyer en res.json, en réponse du back*/
  }

  return (

    <View style={{flexDirection: 'column', alignItems: 'center'}}>

      <TouchableOpacity
       onPress={() => {
        navigation.navigate("ComposeRequestScreen");
      }}
      >
        <View style={styles.buttonFindHelp}>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginRight: 15, }}>
            Trouver un service
          </Text>
          <FontAwesome  name="search" size={19} color="#F7CE46" style={{ transform: [{ rotateY: "180deg" }] }} />
        </View>
      </TouchableOpacity>

      <View style={{ marginTop: 50, }}>
        <Text style={{ fontWeight: "bold", fontSize: 15, marginRight: 15, marginLeft: 3, marginBottom: 10, }}>
          Mes demandes envoyées
        </Text>

        <TouchableOpacity
        // onPress={() => {
        //   navigation.navigate("AskerRequestListScreen");
          // AskerRequestListScreen
        // }}
        >
          <View style={styles.upperCard}>
            <Image source={require('../../assets/categories/yoga.png')} style={{height: 22, width: 22, marginLeft: 20}}/>
            <Text style={{ marginLeft: 10, fontSize: 16, alignSelf: 'center', fontWeight: 'bold', }}>
            Cours de yoga
            </Text>
          </View>

          <View style={styles.lowerCard}>
            <Image source={require('../../assets/avatar.png')} style={{borderRadius: 50, height: 60, width: 60, marginLeft: 20}}/>
            <View style={{ marginLeft: 10, flexDirection: 'column',  }}>
              <Text style={{fontSize: 16, fontWeight: 'bold',}}> 
              Atman </Text>
              <Text style={{  fontSize: 14,  }}> Les mardi et jeudi à partir de 18h</Text>
              <View style={{flexDirection: 'row',alignItems: 'center', }}>
                <Entypo name="location-pin" size={14} color="black" />
                <Text style={{  fontSize: 14,  }}> Courbevoie </Text>
              </View>
              
            </View>
          </View>
        </TouchableOpacity>   

      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // width: 400,
  },
  buttonFindHelp: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    width: 240,
    alignItems: "center",
    height: 70,
    borderRadius: 7,
    elevation: 3,
    marginTop: 25,
},
upperCard: { 
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: 'center',
  backgroundColor: "#F7CE46",  // jaune F7CE46 / aubergine 341B4D / aubergine 341858 / bleu-gris clair C5DBE4 / bleu-gris C1D3DB  / rose flashy EC548A / rose EA8DAE / rose ton-1 ED9EBA / rose ton-2 F5BED1
  width: 330,
  height: 38,
  borderTopRightRadius: 7,
  borderTopLeftRadius: 7,
  elevation: 3,
},
lowerCard: {  
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
    width: 330,
    alignItems: "center",
    height: 90,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    elevation: 3,
    marginBottom: 19,
},


});
