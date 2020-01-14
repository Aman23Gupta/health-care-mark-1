import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
//import Alert from "../components/Alert";
import uploadFile from '../BACKEND/reg';
import faceCheck from '../BACKEND/facematch.js';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
let id;
class SignupScreen extends Component {
  state = {
    name: "",
    aadhar: "",
    image: ""
  };
  //uploadFile = () => uploadFile("./b.jpeg", this.state.aadhar);
  //faceCheck = () => faceCheck("1/a.jpg","3/c.jpg");

  static navigationOptions = {
    title: "",
    headerStyle: {
      backgroundColor: "#609ae0",
      elevation: 0
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  componentDidMount() {
    this.getPermissionAsync;
    this.getCamPermission;
    console.log("hi");
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  getCamPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      alert("permission failed");
    }
  };
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  uploadFile = () => uploadFile(`${this.state.image}`, this.state.aadhar, 1);

  takeImage = async () => {
    let camResult = await ImagePicker.launchCameraAsync({
      mediaTypes: await ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log(camResult);
    if (!camResult.cancelled) {
      this.setState({ image: camResult.uri });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, backgroundColor: "#609ae0" }}></View>
        <View style={{ flex: 1 }}></View>
        <View style={styles.container2}>
          <View style={{ alignItems: "center", bottom: 80 }}>
            <Text
              style={{
                color: "rgb(236, 113, 70)",
                fontWeight: "bold",
                fontSize: 20
              }}
            >
              SIGN UP
            </Text>
          </View>
          <View style={styles.inputStyle}>
            <FontAwesome
              name="user-md"
              style={{
                flex: 1,
                fontSize: 30,
                marginHorizontal: 10,
                marginTop: 5,
                color: "#609ae0"
              }}
            />
            <TextInput
              style={{ flex: 3 }}
              placeholder="Name"
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
            />
          </View>
          <View style={styles.inputStyle}>
            <Ionicons
              name="ios-finger-print"
              style={{
                flex: 1,
                fontSize: 30,
                marginHorizontal: 10,
                marginTop: 5,
                color: "#609ae0"
              }}
            />
            <TextInput
              style={{ flex: 3 }}
              placeholder="Aadhar Number"
              value={this.state.aadhar}
              onChangeText={aadhar => this.setState({ aadhar })}
            />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={this.takeImage}
            >
              <FontAwesome
                name="camera"
                style={{ fontSize: 35, color: "rgb(236, 113, 70)" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={this.pickImage}
            >
              <Ionicons
                name="md-photos"
                style={{ fontSize: 35, color: "rgb(236, 113, 70)" }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.buttonStyle, { borderRadius: 30, elevation: 5 }]}
            onPress={this.uploadFile}
          >
            <Text style={{ color: "#fff" }}>Sign Up</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 30
            }}
          >
            <Text style={{ fontWeight: "bold", color: "grey" }}>
              Have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={{ color: "#5c79ff", fontWeight: "bold" }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#f4f4f4",
  },
  container2: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: SCREEN_WIDTH - 30,
    marginLeft: 15,
    height: SCREEN_HEIGHT - 130,
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
    top: 10,
  },
  inputStyle: {
    flexDirection: 'row',
    marginBottom: 5,
    textAlign: "center",
    backgroundColor: "#fff",
    height: 44,
    marginHorizontal: 20,
    borderColor: '#609ae0',
    borderWidth: 1,
    borderRadius: 22,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: "#5c79ff",
    marginHorizontal: 20,
    padding: 15,
    marginTop: 30,
  }

})

export default SignupScreen;