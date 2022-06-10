import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { connect } from "react-redux";

const data = [
  { label: "Femme", value: "Femme" },
  { label: "Homme", value: "Homme" },
  { label: "Non Binaire", value: "Non Binaire" },
];


/* ----------------------------- MAIN FUNCTION ---------------------------------*/
function DropDownGender (props) {
  const [selected, setSelected] = useState([]);
  console.log(selected);

  return (
    <View style={styles.container}>
      <Dropdown
        style={{width: Dimensions.get("window").width * 0.40,
        backgroundColor: "white",
        shadowColor: "#171717",
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 7,
        borderRadius: 7,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
        paddingHorizontal: 20,
        // boderColor: "#DDD",
        // borderWidth: 1,
      }}
        // {styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        dropdownPosition="auto"
        search={false}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={selected.label}
        value={selected}
        onChange={(item) => {
          setSelected(item);
          props.saveGender(item)
        }}
        selectedStyle={styles.selectedStyle}
        containerStyle={{
            height: 100,
            width: Dimensions.get("window").width * 0.80,
            shadowRadius: 7,
            borderRadius: 7,
          }}
        // {styles.dropContainer}
      />
    </View>
  );
};

function mapDispatchToProps(dispatch){
    return {
      saveGender: function(gender) {
        dispatch({
          type: 'saveGender',
          saveGender : gender
      })
      }
    }
  }

export default connect(
null,
mapDispatchToProps
) (DropDownGender);



const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
  },
  dropdown: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: Dimensions.get("window").width * 0.85,
    fontSize: 13,
    paddingLeft: 15,
    borderRadius: 10,
    borderColor: "#E7E7E7",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    backgroundColor: "white",
    // elevation: 3,
    maxHeight: 100,
  },
  dropContainer: {
    height: 40,
    width: "72%",
    fontSize: 13,
    borderRadius: 7,
    borderColor: "#E7E7E7",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    backgroundColor: "white",
    // elevation: 3,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "grey",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "grey",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 10,
  },
  selectedStyle: {
    borderRadius: 12,
    backgroundColor: "white",
  },
});
