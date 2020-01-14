import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import { s3 } from './src/BACKEND/register';

const AuthStack = createStackNavigator({ login: LoginScreen, signin: SignupScreen });

const navigator = createSwitchNavigator(
  {
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth'
  }
);
const AppContainer = createAppContainer(navigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
