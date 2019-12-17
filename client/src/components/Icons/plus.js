import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

function IconsPlus(props) {
  return (
    <View style={[styles.root, props.style]}>
      <Svg viewBox="-0 -0 16 16" style={styles.plus}>
        <Path
          strokeWidth={0}
          fill="black"
          d="M0.32 15.68 C0.75 16.11 1.45 16.11 1.89 15.68 L8.00 9.56 L14.12 15.68 C14.55 16.11 15.25 16.11 15.68 15.68 C16.11 15.25 16.11 14.55 15.68 14.12 L9.56 8.00 L15.68 1.89 C16.11 1.45 16.11 0.75 15.68 0.32 C15.25 -0.11 14.55 -0.11 14.12 0.32 L8.00 6.44 L1.89 0.32 C1.45 -0.11 0.75 -0.11 0.32 0.32 C-0.11 0.75 -0.11 1.45 0.32 1.89 L6.44 8.00 L0.32 14.12 Z"></Path>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  plus: {
    width: 16,
    height: 16,
    backgroundColor: 'transparent',
    transform: [
      {
        rotate: '-315deg',
      },
    ],
    borderColor: 'transparent',
    marginTop: 6,
    marginLeft: 6,
  },
});

export default IconsPlus;
