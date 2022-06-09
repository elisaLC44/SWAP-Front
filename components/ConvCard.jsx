import React, {useState, useEffect} from "react";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import { connect } from "react-redux";

/* ---------------------------------------- MAIN FUNCTION -------------------------------------------*/
function ConvCard({
  isAsker,
  avatar,
  firstName,
  category,
  matchDetails,
  onGetTransactionDetails,
  helperStatus,
  askerStatus,
}) {
  const navigation = useNavigation();
console.log('>>>>> convcard helper et asker status":', helperStatus, askerStatus) 

  let allprops = { isAsker, matchDetails };
  

  const handleRequestDetails = () => {
    onGetTransactionDetails(allprops);
    navigation.navigate("TransactionScreen");
  };

  let path = `https://theoduvivier.com/swap/${category
    .replace(/\s/g, "_")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")}.png`;

  // const isFocused = useIsFocused();
  
  // const [askerStatus, setAskerStatus] = useState(0)
  // const [helperStatus, setHelperStatus] = useState(0)
  //  console.log("£££££ UPDATED STATUS",askerStatus, helperStatus )

  // useEffect pour récupérer helper et asker status, les stocker dans états, et passer reqStatus dans [reqStatus]
  // useEffect(() => {
  //   if (isFocused) {
  //   async function getStatus(){
  //     let rawResponse = await fetch(
  //       `http://192.168.1.124:3000/get-status/${matchDetails._id}`
  //     );
  //     let response = await rawResponse.json();
  //     console.log('reponse du Back CONVCARD - get-status', response.asker_status, response.helper_status, )
  //     setAskerStatus(response.asker_status)
  //     setHelperStatus(response.helper_status)
  //   }
  //   getStatus()
  // }
  // }, [askerStatus,helperStatus])


  var reqStatus; 
  if(helperStatus == 0) {
    reqStatus = 0 
  } else if (helperStatus == 1) {
    reqStatus = 1
  } else if (helperStatus == 2 && askerStatus == 1) {
    reqStatus = 2
  } else if (helperStatus == 2 && askerStatus == 2) {
    reqStatus = 3
  }

   let vert = "#399F09";
   let jaune = "#F7CE46";
   let gris = "#DDDDDD";
   var transactionStatus;
   var color1;
   var color2;
   var color3;
   if (reqStatus === 0) {
     color1 = jaune;
     color2 = gris;
     color3 = gris;
     transactionStatus = "En attente";
   } else if (reqStatus === 1) {
     color1 = vert;
     color2 = gris;
     color3 = gris;
     transactionStatus = "Accepté";
   } else if (reqStatus === 2) {
     color1 = vert;
     color2 = vert;
     color3 = gris;
     transactionStatus = "Déclaré";
   } else if (reqStatus === 3) {
    color1 = vert;
    color2 = vert;
    color3 = vert;
    transactionStatus = "Terminé";
  } 

  let categoryDot = category
  if (categoryDot.length > 23){
    categoryDot = categoryDot.slice(0,23)+"..."
  }
  // console.log(categoryDot)

  return (
    <View style={styles.card}>
      {/* , style={{marginRight: 3}} onPress={handleUserDetails} */}
      <TouchableWithoutFeedback onPress={() => handleRequestDetails()}>
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
              containerStyle={
                !isAsker ? styles.avatarHelper : styles.avatarAsker
              }
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
          
          {/* PASTILLE STATUS  borderColor: "blue", borderWidth: 3,  */}
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-end",
              marginRight: 5,
              marginTop: 5,
              // borderColor: "pink",
              // borderWidth: 3,
            }}
          >
            <View style={{ flexDirection: "row", marginBottom: 3}}>
              <AntDesign
                name="checkcircle"
                size={9}
                color={color1}
                style={{}}
              />
              <AntDesign
                name="checkcircle"
                size={9}
                color={color2}
                style={{marginLeft: 5}}
              />
              <AntDesign
                name="checkcircle"
                size={9}
                color={color3}
                style={{marginLeft: 5}}
              />
            </View>
            <Text style={{ fontSize: 10 }}>{transactionStatus}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/* </View> */}
    </View>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    onGetTransactionDetails: function (transactionData) {
      dispatch({
        type: "onGetTransactionDetails",
        transactionData: transactionData,
      });
    },
  };
}

export default connect(null, mapDispatchToProps)(ConvCard);

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
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
    width: 340,
    borderWidth: 0.3,
    borderColor: "#DDD",
    height: 75,
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
  },
});
