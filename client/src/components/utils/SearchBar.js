import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import IconsSearch from '../Icons/IconSearch';
import Svg, {Path, Stop, Defs, LinearGradient} from 'react-native-svg';
import IconsPlus from '../Icons/plus';

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'rgba(142,142,147,0.12)',
            borderRadius: 50,
            overflow: 'hidden',
          }}>
          <IconsSearch
            style={{top: 10, paddingLeft: 10, color: 'white'}}></IconsSearch>
          <TextInput
            placeholder="Search"
            placeholderTextColor="grey"
            style={{
              fontSize: 20,
              top: 2,
              width: 270,
              color: 'grey',
              marginRight: 10,
              marginLeft: 29,
            }}
          />
        </View>
        <TouchableOpacity>
          <IconsPlus
            style={{
              backgroundColor: '#c95b5b',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 7,
              marginLeft: 10,
              paddingRight: 18,
              paddingLeft: 10,
            }}></IconsPlus>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // width: 415,
    // height: 70,
    // paddingRight: 15,
    // paddingLeft: 15,
    // paddingBottom: 10,
    // paddingTop: 10,
    // top: 8,
  },
  iconsSearch: {
    top: 4,
    left: 275,
    backgroundColor: 'transparent',
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
  group4: {
    top: 0,
    left: 0,
    width: 346,
    height: 36,
    position: 'absolute',
    flexDirection: 'row',
  },
  oval: {
    top: 0,
    left: 0,
    width: 36,
    height: 36,
    backgroundColor: 'transparent',
    position: 'absolute',
    borderColor: 'transparent',
  },
  iconsPlus: {
    top: 6,
    left: 6,
    width: 24,
    height: 24,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  ovalStack: {
    width: 36,
    height: 36,
    marginLeft: 310,
  },
  searchField: {
    height: 36,
    backgroundColor: 'rgba(142,142,147,0.12)',
    borderRadius: 18,
    flexDirection: 'row',
    flex: 1,
    marginRight: 51,
    marginLeft: -346,
  },
  iconsSearch1: {
    width: 24,
    height: 24,
    backgroundColor: 'transparent',
  },
  search: {
    backgroundColor: 'transparent',
    color: 'rgba(78,88,110,1)',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    marginLeft: 7,
    marginTop: 2,
  },
  iconsSearch1Row: {
    height: 24,
    flexDirection: 'row',
    flex: 1,
    marginRight: 206,
    marginLeft: 15,
    marginTop: 6,
  },
  iconsSearchStack: {
    width: 346,
    height: 36,
    marginTop: 48,
    marginLeft: 14,
  },
});

export default SearchBar;
