import React, {Component} from 'react';
import {View, Text, Button} from 'native-base';
class Profile extends Component {
  static navigationOptions = {header: null};
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: '20',
          backgroundColor: 'green',
        }}>
        <Text>Profile Page</Text>
        <Button title="button" />
      </View>
    );
  }
}

export default Profile;
