/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component} from 'react';

// Initial Screens
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import ForgotPassword from './src/screens/ForgotPassword';

// Navigator Stuffs
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// redux implimentation
import {store, persistor} from './store';
import {Provider} from 'react-redux';

import {getUser} from './src/actions/auth';
import {PersistGate} from 'redux-persist/integration/react';
import Main from './src/components/Home/Home';

let RootStack = createStackNavigator(
  {
    Login: Login,
    SignUp: SignUp,
    Welcome: Welcome,
    ForgotPassword: ForgotPassword,
    Main: {
      screen: Main,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Welcome',
  },
);

let AppNavigation = createAppContainer(RootStack);

class App extends Component {
  static router = App.router;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    store.dispatch(getUser());
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
