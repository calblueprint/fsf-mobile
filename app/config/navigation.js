import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { Platform } from 'react-native';


import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';
import DonateScreen from '../screens/donate/DonateScreen';
import DonateSuccessScreen from '../screens/donate/DonateSuccessScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterWebScreen from '../screens/auth/RegisterWebScreen';
import NewsDetailScreen from '../screens/news/NewsDetailScreen';
import NewsScreen from '../screens/news/NewsScreen';
import ActionScreen from '../screens/action/ActionScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

import PrivacyPolicyScreen from '../screens/about/PrivacyPolicyScreen';
import VersionScreen from '../screens/about/VersionScreen';

// replace expo Ionicons
import Icon from 'react-native-ionicons'

// This file defines the screens in our app and their relationships

const NewsNav = createStackNavigator(
  { NewsHome: NewsScreen,
    NewsDetail: {
      screen: NewsDetailScreen,
      path: 'news/:id', // Allows for deep linking
    },
  },
  {initialRouteName: 'NewsHome'}
)

const ActionNav = createStackNavigator(
  {ActionHome: ActionScreen}
)

const DonateNav = createStackNavigator({
  DonateHome: {
    screen: DonateScreen,
    path: 'donate', // Deep link
  },
  DonateSuccess: DonateSuccessScreen
});

const ProfileNav = createStackNavigator({
  ProfileHome: ProfileScreen,
  Register: RegisterWebScreen,
  Privacy: PrivacyPolicyScreen,
  Version: VersionScreen
})

// TODO (Franco): See if MaterialBottomTabNavigator is a better fit for our design
const MainNav = createBottomTabNavigator(
  { // Screens on bottom tab bar
    News: { screen: NewsNav },
    Action: { screen: ActionNav },
    Donate: { screen: DonateNav },
    Profile: { screen: ProfileNav },
  },
  { // Options
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        // Here's where Franco will eventually insert beautiful icons
        let iconName = "md-options";
        if (routeName === "News") {
          iconName = "md-volume-up";
        } else if (routeName === "Action") {
          iconName = "md-microphone";
        } else if (routeName === "Donate") {
          iconName = "md-cash";
        } else if (routeName === "Profile") {
          iconName = "md-person";
        }

        // You can return any component that you like here! By default, using Ionicons
        return (
          <Icon
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
      header: null,
    }
  },
  Register: RegisterWebScreen
});

export const AppNav = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: {
      screen: MainNav,
      path: '',
    },
    Auth: AuthNav,
    Profile: ProfileNav,
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export const prefix = Platform.OS === 'android' ? 'fsf://fsf/' : 'fsf://';
export const NavContainer = createAppContainer(AppNav);
