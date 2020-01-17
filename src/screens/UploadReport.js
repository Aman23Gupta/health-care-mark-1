import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import uploadFile from "../BACKEND/reg";

class UploadReport extends Component {
    state = {
        name: '',
        image: null,
    };
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
        this.getCamPermission;
        console.log("hi");
    }
    getCamPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status !== "granted") {
            alert("permission failed");
        }
    };
    
    takeImage = async () => {
        let camResult = await ImagePicker.launchCameraAsync({
            mediaTypes: await ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1
        });
        console.log(camResult);
        if (!camResult.cancelled) {
            this.setState({ image: camResult.uri });
        }
    };

    saveImage = () => {
        console.log(this.state.name);
        uploadFile(`${this.state.image}`, this.props.navigation.getParam('adhaar'), `${this.state.name}`);
    }
    
    render() {
        return(
            <View style={styles.container} >
                <View style={styles.inputStyle}>
                    <Text style={{ fontSize: 16, paddingRight: 10, fontWeight: 'bold', fontFamily: 'monospace' }}>Name:</Text>
                    <TextInput
                        placeholder='Enter report name'
                        style={{fontSize: 16}}
                        value={this.state.name}
                        onChangeText={(name) => {
                            this.setState({name});
                            //console.log(name);
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={{ marginTop: 20, alignItems: 'center' }}
                    onPress={this.takeImage}
                >
                    <FontAwesome
                        name="camera"
                        style={{ fontSize: 35, color: "rgb(236, 113, 70)" }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ paddingVertical: 10, alignItems: 'center', backgroundColor: '#609ae0', marginVertical: 20, marginHorizontal: 100,borderRadius: 20 }}
                    onPress={this.saveImage}
                >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#f4f4f4'}}>Save</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        justifyContent: 'center'
    },
    inputStyle: {
        flexDirection: "row",
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        alignItems: 'center',
        padding: 5,
    }

});
export default UploadReport;