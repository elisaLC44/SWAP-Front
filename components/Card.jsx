import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { CheckBox, Text, Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import { connect } from "react-redux";


function Card(props) {
  // >>>  contenu des props:
  // firstName, // props COMPOSANT PARENT "SearchResultsScreen"
  // category, // props COMPOSANT PARENT
  // avatar,// props COMPOSANT PARENT
  // onGetHelperDetails, // création du mapDistpatch dans même fichier / REDUX
  // onSelectUser, // création du mapDistpatch dans même fichier / REDUX
  // onDeselect, // création du mapDistpatch dans même fichier / REDUX
  // selectedUser, // props COMPOSANT PARENT
  // selectedUserList, // récup du mapState / REDUX

  const navigation = useNavigation();

  const [check, setCheck] = useState(false);

  // console.log('>>> HELPER details:', props.selectedUser)
  useEffect(()=> {
    if (props.selectedUserList == []) {
      setCheck(false);
    }
  }, [])

  const handleUserDetails = () => {
    props.onGetHelperDetails(props.selectedUser); // props.selectedUser previent du parent et non Redux
    navigation.navigate("HelperDetailAfterSearch");
  };

  console.log("props.selectedUserList", props.selectedUserList)

  // au check de la box, envoie au reducer l'_id du user selectionné et alimente "selectedUserList"
  const handleCheck = () => {
    setCheck(!check);
    if (!check) {
      props.onSelectUser(props.selectedUser._id); // props.selectedUser previent du parent et non Redux
    } else {
      props.onDeselect(props.selectedUser._id); //  props.selectedUser previent du parent et non Redux
    }
  };

  return (
    <View style={styles.card}>
      <CheckBox
        containerStyle={{ margin: 0, padding: 0, marginLeft: 10 }}
        left
        checkedIcon={
          <Ionicons name="checkbox-outline" size={35} color="#F7CE46" />
        }
        uncheckedIcon={
          <Ionicons name="square-outline" size={35} color="#F7CE46" />
        }
        checked={check}
        onPress={handleCheck}
      />
      {/* , style={{marginRight: 3}} */}
      <TouchableWithoutFeedback onPress={handleUserDetails}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginLeft: 10, marginTop: 4,}}>
            <Text style={styles.cardTitle}>{props.firstName}</Text>
            <View style={{ maxWidth: 220 }}>
              <Text style={styles.bodyText2}>
                {props.category}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 3, }}>
                <Ionicons name="location-sharp" size={19} color="#F7CE46" style={{marginRight: 3}}/>
                <Text style={styles.bodyText2}>{props.selectedUser.address_city}</Text>
              </View>
            </View>
          </View>
          <Avatar
            rounded
            size="medium"
            source={{
              uri: props.avatar,
            }}
            containerStyle={{
              borderColor: "#345C6C",
              borderWidth: 4,
              marginRight: 10,
              position: "absolute", left: 200
            }}
            // position: "absolute", right: 10
          />
        </View>
      </TouchableWithoutFeedback>
      {/* </View> */}
    </View>
  );
}

function mapStateToProps(state) {
  return { selectedUserList: state.selectedUserList };
}

function mapDispatchToProps(dispatch) {
  return {
    // essentielle?? crée une variable contenant les infos des users sélectionné et que la page UserDetails utilisera
    onGetHelperDetails: function (helper) {
      dispatch({ type: "getHelperDetails", helper: helper });
    },
    // "selectedUserList"
    onSelectUser: function (userId) {
      dispatch({ type: "selected::user", userId: userId });
    },
    // "selectedUserList"
    onDeselect: function (userId) {
      dispatch({ type: "deselected::user", userId: userId });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);


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
