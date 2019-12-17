import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, StatusBar, ToolbarAndroid} from 'react-native';
import TrendScreen from './trends';
import SportScreen from './sports';
import CommedyScreen from './comedy';
import NewsScreen from './news';
import LifeStyle from './lifestyle';
import Business from './business';
import {withNavigation, createSwitchNavigator} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

const Toptab = createMaterialTopTabNavigator(
  {
    Trends: {screen: TrendScreen},
    Sport: {screen: SportScreen},
    Comedy: {screen: CommedyScreen},
    NewsScreen: {screen: NewsScreen},
    LifeStyle: {screen: LifeStyle},
    Business: {screen: Business},
  },
  {
    initialRouteName: 'Trends',
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: 'white',
      allowFontScaling: true,
      scrollEnabled: true,

      style: {
        backgroundColor: 'black',
      },
      labelStyle: {
        fontSize: 18,
        fontFamily: 'sans-serif',
      },
      indicatorStyle: {
        backgroundColor: 'white',
      },
    },
  },
);

// class News extends Component {
//   render() {
//     return (
//       <View>
//         <Text>Hello</Text>
//         <Toptab />
//       </View>
//     );
//   }
// }

const Newfeed = createStackNavigator({Toptab}, {headerMode: 'none'});

class Wrapper extends Component {
  static router = Newfeed.router;

  render() {
    return (
      <Fragment>
        <View style={{backgroundColor: 'black', padding: 20}}>
          <Text style={{fontSize: 20, color: 'grey', textAlign: 'center'}}>
            Story Should Be Here
          </Text>
        </View>
        <Newfeed navigation={this.props.navigation} />
      </Fragment>
    );
  }
}
export default Wrapper;
