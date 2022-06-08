import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

import React from "react";
// import { StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

/*  --------------------------------- NAVIGATION ------------------------------------- */
// import des screens
import DemoScreen from "./screens/DemoScreen";
import HomeScreen from "./screens/HomeScreen";
import CustomScreen from "./screens/CustomScreen";
import ConversationScreen from "./screens/ConversationScreen";
import TransactionScreen from "./screens/TransactionScreen";
import UserScreen from "./screens/UserScreen";
import AskerRequestListScreen from "./screens/AskerRequestListScreen";
import HelperRequestListScreen from "./screens/HelperRequestListScreen";
import AskerDetailScreen from "./screens/AskerDetailScreen";
import ComposeRequestScreen from "./screens/ComposeRequestScreen";
import SearchResultScreen from "./screens/SearchResultScreen";
import HelperDetailAfterSearch from "./screens/HelperDetailAfterSearch";
import RequestSentConfirmation from "./screens/RequestSentConfirmation";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";

// components
import CustomButton from "./components/CustomButton";

// import des modules/fonctions de Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// variables responsables de la navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/*  --------------------------------- REDUX ------------------------------------- */
// STORE : création
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

// REDUCERS: import des variables d'états provenant des reducers
import user from "./reducers/user.reducer";
import newRequest from "./reducers/composeRequest.reducer";
import selectedUserList from "./reducers/selectedUserList.reducer";
import userDetails from "./reducers/userDetails.reducer";
import requestDetails from "./reducers/requestDetails.reducer";
import allMatches from "./reducers/allMatches.reducer";
import transactionDetails from "./reducers/transactionDetails.reducer";
import updatedStatus from "./reducers/updatedStatus.reducer";


// FUSION REDUCERS
const store = createStore(
  combineReducers({
    user,
    newRequest,
    selectedUserList,
    userDetails,
    requestDetails,
    allMatches,
    transactionDetails,
    updatedStatus,

  })
);

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name == "HomeScreen") {
            iconName = "home-outline";
          } else if (route.name == "ConversationScreen") {
            iconName = "chatbubbles-outline";
          }

          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#F7CE46",
        inactiveTintColor: "#000000",
        style: {
          backgroundColor: "#FFFFFF",
          paddingBottom: 5,
          height: 70,
        },
      }}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen
        options={{
          tabBarButton: (props) => (
            <CustomButton navigation={props.navigation} />
          ),
        }}
        name="Middle Button"
        component={HomeScreen}
      />
      <Tab.Screen name="ConversationScreen" component={ConversationScreen} />

      <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: true }}
        name="UserScreen"
        component={UserScreen}
      />

      <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: true }}
        name="AskerRequestListScreen"
        component={AskerRequestListScreen}
      />

      <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: true }}
        name="HelperRequestListScreen"
        component={HelperRequestListScreen}
      />

      <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: true }}
        name="AskerDetailScreen"
        component={AskerDetailScreen}
      />

      <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: true }}
        name="ComposeRequestScreen"
        component={ComposeRequestScreen}
      />

      <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: true }}
        name="SearchResultScreen"
        component={SearchResultScreen}
      />

      <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: true }}
        name="HelperDetailAfterSearch"
        component={HelperDetailAfterSearch}
      />

      <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: true }}
        name="RequestSentConfirmation"
        component={RequestSentConfirmation}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="DemoScreen" component={DemoScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
          <Stack.Screen
            name="TransactionScreen"
            component={TransactionScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
