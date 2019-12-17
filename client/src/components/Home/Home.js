import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import NewsFeed from '../NewsFeed/Newsfeed';
import Profile from '../Profile/Profile';
import Posts from '../posts/Posts';
// svg
import Logo from '../NewsFeed/news.svg';
import {createBottomTabNavigator} from 'react-navigation-tabs';

class News extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          padding: 3,
          marginTop: -51,
        }}>
        <Image source={require('./news.png')} style={{height: 50, width: 50}} />
      </View>
    );
  }
}

// profile
class Profiles extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          padding: 3,
          marginTop: -51,
        }}>
        <Image source={require('./pro.png')} style={{height: 50, width: 50}} />
      </View>
    );
  }
}

// Posts
class Post extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(36,42,55,1)',
          padding: 3,
          marginTop: -51,
        }}>
        <Image
          source={require('./posts.png')}
          style={{height: 50, width: 50}}
        />
      </View>
    );
  }
}

const MainNavigator = createBottomTabNavigator(
  {
    NewsFeed: {
      screen: NewsFeed,
      navigationOptions: {
        tabBarLabel: 'News',
      },
    },
    Profile: {
      screen: Profile,

      navigationOptions: {
        tabBarLabel: 'Profile',
      },
    },
    Posts: {
      screen: Posts,
      navigationOptions: {
        tabBarLabel: 'Posts',
      },
    },
  },
  {
    initialRouteName: 'NewsFeed',

    tabBarOptions: {
      activeTintColor: 'white',
      adaptive: true,
      labelStyle: {
        fontSize: 15,
        marginBottom: 10,
        backgroundColor: 'rgba(36,42,55,1)',
        padding: 14.5,
        marginBottom: -1,
      },
    },
  },
);

class Main extends Component {
  static router = MainNavigator.router;
  render() {
    return <MainNavigator navigation={this.props.navigation} />;
  }
}

// export default createStackNavigator({MainNavigator}, {headerMode: 'none'});
export default Main;
