import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import { connect } from "react-redux";

const data = [
  { label: "🚙 accompagnement trajet", value: "accompagnement trajet" },
  { label: "🧺 aide aux courses", value: "aide aux courses" },
  { label: "🛠 bricolage", value: "bricolage" },
  { label: "🧵 couture", value: "couture" },
  { label: "👨‍🍳 cuisine", value: "cuisine" },
  { label: "💃 danse", value: "danse" },
  { label: "👩‍💻 développement web", value: "développement" },
  { label: "💾 informatique", value: "informatique" },
  { label: "🌿 jardinerie", value: "jardinerie" },
  { label: "🪑 montage de meubles", value: "montage de meubles" },
  { label: "🎼 musique", value: "musique" },
  { label: "🧘‍♀️ méditation", value: "méditation" },
  { label: "🧼 ménage", value: "ménage" },
  { label: "🎨 peinture", value: "peinture" },
  { label: "💧 plomberie", value: "plomberie" },
  { label: "🦮 promenade de chien", value: "promenade de chien" },
  { label: "🚲 réparation de vélo", value: "réparation de vélo" },
  { label: "📚 soutien scolaire", value: "soutien scolaire" },
  { label: "🏅 sport", value: "sport" },
  { label: "🧘‍♂️ yoga", value: "yoga" },
  { label: "⚡️ éléctricité", value: "éléctricité" },
  { label: "🇩🇪 cours d'allemand", value: "allemand" },
  { label: "🇬🇧 cours d'anglais", value: "anglais" },
  { label: "🇦🇪 cours d'arabe", value: "arabe" },
  { label: "🇨🇳 cours de chinois", value: "chinois" },
  { label: "🇰🇷 cours de coréen", value: "coréen" },
  { label: "🇩🇰 cours de dannois", value: "dannois" },
  { label: "🇪🇸 cours d'espagnole", value: "espagnole" },
  { label: "🇫🇮 cours de finlandais", value: "finlandais" },
  { label: "🇫🇷 cours de français", value: "français" },
  { label: "🇮🇳 cours de hindu", value: "hindu" },
  { label: "🇮🇱 cours de hébreu", value: "hébreu" },
  { label: "🇮🇸 cours d'islandais", value: "islandais" },
  { label: "🇮🇹 cours d'italien", value: "italien" },
  { label: "🇯🇵 cours de japonais", value: "japonais" },
  { label: "🇮🇷 cours de persan", value: "persan" },
  { label: "🇵🇱 cours de polonais", value: "polonais" },
  { label: "🇵🇹 cours de portugais", value: "portugais" },
  { label: "🇷🇺 cours de russe", value: "russe" },
  { label: "🇸🇪 cours de suédois", value: "suédois" },
  { label: "🇹🇿 cours de swahili", value: "swahili" },
  { label: "🇹🇭 cours de thaï", value: "thaï" },
  { label: "🇹🇷 cours de turc", value: "turc" },
  { label: "🇻🇳 cours de vietnamien", value: "vietnamien" },
];


/* ----------------------------- MAIN FUNCTION ---------------------------------*/
export default function DropDownCategories(props) {
  const [selected, setSelected] = useState([]);
  // console.log('categories COMPONENT STATE:',selected)

  return (
    <View style={styles.container}>
      <MultiSelect
        style={props.style}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        dropdownPosition={props.dropdownPosition}
        search
        data={data}
        labelField="label"
        valueField="value"
        placeholder="choisissez une catégorie"
        searchPlaceholder="Recherche..."
        value={props.value}
        onChange={props.onChange}
        selectedStyle={styles.selectedStyle}
        containerStyle={props.containerStyle}
      />
    </View>
  );
}

// function mapStateToProps(state) {
//   return { user: state.user };
// }

// function mapDispatchToProps(dispatch){
//     return {
//       saveCategories: function(categories) {
//         dispatch({
//           type: 'saveCategories',
//           categoriesSaved : categories
//       })
//       }
//     }
//   }

// export default connect(
// null,
// mapDispatchToProps
// ) (DropDownCategories);


const styles = StyleSheet.create({
    container: {
      // justifyContent: "center",
      // alignItems: "center",
      width: "100%",
      // paddingHorizontal: 20,
      // borderWidth: 2,
      // borderColor: "blue",
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 14,
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
      marginLeft: 10,
    },
    placeholderStyle: {
      color: "grey",
      fontSize: 14,
    },
  });
