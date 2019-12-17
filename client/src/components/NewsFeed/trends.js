import React, {Component} from 'react';
import VideoPlayer from 'react-native-video-controls';

import {View, Text, StyleSheet, ScrollView} from 'react-native';

export default class Trends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      timer: false,
    };
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: 'grey'}}>
        <View
          style={{
            backgroundColor: 'white',
            width: 500,
            height: 300,
          }}>
          <View>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontFamily: 'Verdana',
                fontWeight: 'bold',
                padding: 6,
              }}>
              Building App With React is Terrifying
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'blue',
              height: 200,
              margin: 'auto',
            }}>
            <VideoPlayer
              source={require('../../assets/video/vid.mp4')}
              navigator={this.props.navigator}
              disableBack
              seekColor="white"
              paused={this.state.paused}
              onLoad={() => {
                this.setState({
                  paused: true,
                });
              }}
              style={{backgroundColor: 'black', width: 420}}
            />
          </View>
          <View style={{width: 415}}>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
              }}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>500 Likes</Text>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                20 Comments
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
                borderTopColor: 'grey',
                borderTopWidth: 2,
              }}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>like-icon</Text>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                comment-icon
              </Text>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>share-icon</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    width: 450,
    height: 200,
  },
});
