import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import ReportScreen from './src/screens/ReportScreen';
import UploadReport from './src/screens/UploadReport';
import imageScreen from './src/screens/imageScreen';

const AuthStack = createStackNavigator({ login: LoginScreen, signin: SignupScreen });
const ReportStack = createStackNavigator({ Report: ReportScreen, Upload: UploadReport, Image: imageScreen });
const navigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    Detail: ReportStack,
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
