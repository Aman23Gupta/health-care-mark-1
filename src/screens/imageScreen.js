import React, { Component } from 'react';
import { View, Image } from 'react-native';

class imageScreen extends Component{
    render() {
        return(
            <View style={{flex: 1}}>
                <Image 
                    style={{flex: 1}}
                    source={{uri: this.props.navigation.getParam('uri')}}
                />
            </View>
        );
    }
}

export default imageScreen;