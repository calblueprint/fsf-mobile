import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';
import DonateScreen from '../screens/donate/DonateScreen';
import DonateSuccessScreen from '../screens/donate/DonateSuccessScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterWebScreen from '../screens/auth/RegisterWebScreen';
import NewsDetailScreen from '../screens/news/NewsDetailScreen';
import NewsScreen from '../screens/news/NewsScreen';
import GNUsocialScreen from '../screens/news/GNUsocialScreen';
import ActionScreen from '../screens/action/ActionScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

import { Ionicons } from '@expo/vector-icons';
import PrivacyPolicyScreen from '../screens/about/PrivacyPolicyScreen';
import VersionScreen from '../screens/about/VersionScreen';
import GNUsocialDetailScreen from '../screens/news/GNUsocialDetailScreen';
import SplashScreen from '../screens/SplashScreen';

// This file defines the screens in our app and their relationships

const NewsNav = createStackNavigator(
  {
    NewsHome: { screen: NewsScreen, navigationOptions: { header: null } },
    NewsDetail: { screen: NewsDetailScreen }
  },
  { initialRouteName: 'NewsHome' }
);

NewsNav.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};
const GNUsocialNav = createStackNavigator({
  GNUsocialHome: {
    screen: GNUsocialScreen,
    navigationOptions: {
      header: null,
      initialRouteName: 'GNUsocialHome'
    }
  },
  GNUsocialDetail: { screen: GNUsocialDetailScreen }
});
GNUsocialNav.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const NewsTopTabNav = createMaterialTopTabNavigator(
  {
    FSFnews: { screen: NewsNav },
    GNUsocial: { screen: GNUsocialNav }
  },
  {
    order: ['FSFnews', 'GNUsocial'],
    initialRouteName: 'FSFnews',
    tabBarOptions: {
      labelStyle: {
        fontSize: 16,
        paddingTop: 20,
        paddingBottom: 0
      },
      tabStyle: {
        height: 100
      },
      indicatorStyle: {
        backgroundColor: '#F4FAFF'
      },
      style: {
        backgroundColor: '#292F36'
      }
    }
  }
);

const ActionNav = createStackNavigator({ ActionHome: ActionScreen });

const DonateNav = createStackNavigator({
  DonateHome: DonateScreen,
  DonateSuccess: {
    screen: DonateSuccessScreen,
    navigationOptions: {
      header: null
    }
  }
});

const ProfileNav = createStackNavigator({
  ProfileHome: ProfileScreen,
  Register: RegisterWebScreen,
  Privacy: PrivacyPolicyScreen,
  Version: VersionScreen
});

// TODO (Franco): See if MaterialBottomTabNavigator is a better fit for our design
const MainNav = createBottomTabNavigator(
  {
    // Screens on bottom tab bar
    News: { screen: NewsTopTabNav },
    Action: { screen: ActionNav },
    Donate: { screen: DonateNav },
    Profile: { screen: ProfileNav }
  },
  {
    // Options
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        // Here's where Franco will eventually insert beautiful icons
        // Fang took some liberties here to silence the wrong icons being passed in error
        let iconName = 'md-options';
        if (routeName === 'News') {
          iconName = 'md-paper';
        } else if (routeName === 'Action') {
          iconName = 'md-pulse';
        } else if (routeName === 'Donate') {
          iconName = 'md-cash';
        } else if (routeName === 'Profile') {
          iconName = 'md-person';
        }

        // You can return any component that you like here! By default, using Ionicons
        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      }
    })
  }
);

export const AuthNav = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  Register: RegisterWebScreen
});

export const AppNav = createSwitchNavigator(
  {
    Splash: SplashScreen,
    AuthLoading: AuthLoadingScreen,
    App: MainNav,
    Auth: AuthNav,
    Profile: ProfileNav
  },
  { initialRouteName: 'Splash' }
);

export const NavContainer = createAppContainer(AppNav);
