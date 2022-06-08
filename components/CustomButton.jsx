import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text} from "react-native";
import { useNavigation } from "@react-navigation/native";


const CustomButton = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={{ justifyContent: "center", alignItems: "center" }}>

        <View
          style={{
            position: "absolute",
            bottom: 10,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6} 
            // onPress={() => navigation.navigate("HomeScreen")}
           >
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 50,
                backgroundColor: "#F7CE46",
                alignItems: "center",
                justifyContent: "center",
                elevation: 3,
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: 18,
                  fontWeight: 'bold',
                  zIndex: 10,
                }}
              >
                SWAP
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CustomButton;
