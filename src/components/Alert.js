import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
class Alert extends Component{
    render() {
        return (
          <View style={styles.container}>
            <Text style={{textAlign: 'center', fontSize: 24, color: 'grey'}}>Take Your Picture</Text>
            <View
              style={{ flexDirection: "row",justifyContent: "center", }}
            >
              <TouchableOpacity style={styles.touchStyle}>
                <Text style={styles.textStyle}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.touchStyle,{borderLeftWidth:1}]}>
                <Text style={styles.textStyle}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#fff",
    width: SCREEN_WIDTH - 80,
    height: SCREEN_HEIGHT - 440,
    marginLeft: 25,
    opacity: 0.9,
    justifyContent: "space-around",
    borderRadius: 10,
    elevation: 5
  },
  textStyle: {
    fontSize: 20,
    color: "#5c79ff",
    textAlign: 'center',
    padding: 10,
  },
  touchStyle: {
    height: 60,
    borderColor: "grey",
    borderTopWidth: 1,
    width: (SCREEN_WIDTH - 80)/2,
    top: 43,
  }
});

export default Alert;