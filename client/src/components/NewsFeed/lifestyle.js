import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
class Lifestyle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <Text style={{color: 'white', fontSize: 20}}> Lifestyle Feed </Text>
      </View>
    );
  }
}

export default Lifestyle;
