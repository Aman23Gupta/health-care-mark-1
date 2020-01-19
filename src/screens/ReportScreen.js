import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import getURL from '../BACKEND/image';
import { ID, SECRET } from '../../ignore/awskey';

class ReportScreen extends Component{
    state = {
        ur: '',
        list: []
    }
    geturl=(item)=> {
        this.setState({ ur: getURL(item.Key)})
        console.log(this.state.ur);
        setTimeout(()=>{
                    if (this.state.ur !== '') this.props.navigation.navigate('Image', { uri: this.state.ur });
                    },8500);
    } 

    showurl=()=>{
        console.log(this.state.ur);
    }

    componentDidMount() {
        var AWS = require('aws-sdk');
        var s3 = new AWS.S3({ accessKeyId: ID, secretAccessKey: SECRET, region: 'ap-south-1' });

        var params = { Bucket: 'adhaar', Delimiter: '', Prefix: `${this.props.navigation.getParam('adhaar')}/` };

        s3.listObjectsV2(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {
                console.log(data);
                this.setState({list: data.Contents});
            } // successful response
        }.bind(this));

        this.willFocusListener = this.props.navigation.addListener(
            'willFocus',
            () => {
                s3.listObjectsV2(params, function (err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else {
                        console.log(data);
                        this.setState({ list: data.Contents });
                    } // successful response
                }.bind(this));
            }
        );
    }

    componentWillUnmount() {
        this.willFocusListener.remove();
    }

    renderData = (item) => {
        return(
            <TouchableOpacity 
                style={styles.dataStyle}
                onPress= {()=>this.geturl(item)}
            >
                <Text style={{fontSize: 18}}>{item.Key.split('_')[1].split('.')[0]}</Text>
            </TouchableOpacity>
        );
    }
    static navigationOptions = {
        headerShown: false
    };
    
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.headerStyle}>
                    <TouchableOpacity
                        style={{ marginTop: 30, marginRight: 10, alignItems: 'flex-end' }}
                        onPress={() => this.props.navigation.navigate('Upload', { adhaar: this.props.navigation.getParam('adhaar')})}
                    >
                        <MaterialIcons
                            name="add-to-photos"
                            style={{ fontSize: 35, color: "#fff", }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.reportStyle}>
                    <FlatList 
                        data={this.state.list}
                        keyExtractor={dat => `${dat.LastModified}`}
                        renderItem={({item}) => this.renderData(item)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    headerStyle: {
        flex: 1,
        backgroundColor: '#609ae0',
        marginBottom: 2,

    },
    reportStyle: {
        flex: 9,
        backgroundColor: '#f4f4f4',
        marginHorizontal: 10
    },
    dataStyle: {
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
        elevation: 5,
        borderWidth: 1,
        borderColor: 'gray'
    }
});

export default ReportScreen;