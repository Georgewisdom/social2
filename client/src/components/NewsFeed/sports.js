import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Sport extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <Text style={{color: 'white', fontSize: 20}}> Sport News Feed </Text>
      </View>
    );
  }
}

export default Sport;
