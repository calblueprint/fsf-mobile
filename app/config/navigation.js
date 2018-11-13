import React from 'react';
import { createAppContainer, createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import NewsScreen from '../screens/news/NewsScreen';
import NewsDetailScreen from '../screens/news/NewsDetailScreen';

import PetitionsScreen from '../screens/petitions/PetitionsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import DonateScreen from '../screens/donate/DonateScreen';
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';
import LoginScreen from '../screens/auth/LoginScreen'
import Icon from 'react-native-ionicons'

// This file defines the screens in our app and their relationships

const NewsNav = createStackNavigator(
  { NewsHome: NewsScreen,
    NewsDetail: NewsDetailScreen
  },
  {initialRouteName: 'NewsHome'}
)

const PetitionsNav = createStackNavigator(
  {PetitionsHome: PetitionsScreen}
)

const DonateNav = createStackNavigator(
  {DonateHome: DonateScreen}
)

const ProfileNav = createStackNavigator(
  {ProfileHome: ProfileScreen}
)

// TODO (Franco): See if MaterialBottomTabNavigator is a better fit for our design
const MainNav = createBottomTabNavigator(
  { // Screens on bottom tab bar
    News: { screen: NewsNav },
    Petitions: { screen: PetitionsNav },
    Donate: { screen: DonateNav },
    Profile: { screen: ProfileNav },
  },
  { // Options
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        // Here's where Franco will eventually insert beautiful icons
        let iconName = 'md-options';
        if (routeName === 'News') {
          iconName = 'md-volume-up';
        } else if (routeName === 'Petitions') {
          iconName = 'md-microphone';
        }
        else if (routeName === 'Donate') {
          iconName = 'md-cash';
        }
        else if (routeName === 'Profile') {
          iconName = 'md-person';
        }

        // You can return any component that you like here! By default, using Ionicons
        return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
  }
);

export const AuthNav = createStackNavigator({
  Login: LoginScreen
});

export const AppNav = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MainNav,
    Auth: AuthNav,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

export const NavContainer = createAppContainer(AppNav);
