import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { Platform } from 'react-native';


import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';
import DonateHomeScreen from '../screens/donate/DonateHomeScreen';
import DonatePaymentScreen from '../screens/donate/DonatePaymentScreen';
import DonateBillingScreen from '../screens/donate/DonateBillingScreen';
import DonateRepeatableScreen from '../screens/donate/DonateRepeatableScreen';
import DonateSuccessScreen from '../screens/donate/DonateSuccessScreen';
import LoginScreen from '../screens/auth/LoginScreen'
import NewsDetailScreen from '../screens/news/NewsDetailScreen';
import NewsScreen from '../screens/news/NewsScreen';
import PetitionsScreen from '../screens/petitions/PetitionsScreen';
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

const PetitionsNav = createStackNavigator(
  {PetitionsHome: PetitionsScreen}
)

const DonateNav = createStackNavigator({
  DonateHome: {
    screen: DonateHomeScreen,
    path: 'donate', // Deep link
  },
  DonateRepeatable: DonateRepeatableScreen,
  DonateBilling: DonateBillingScreen,
  DonatePayment: DonatePaymentScreen,
  DonateSuccess: DonateSuccessScreen
});

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
        let iconName = "md-options";
        if (routeName === "News") {
          iconName = "md-volume-up";
        } else if (routeName === "Petitions") {
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
  Login: LoginScreen,
});

export const PrivacyNav = createStackNavigator({
  Privacy: PrivacyPolicyScreen
});

export const VersionNav = createStackNavigator({
  Version: VersionScreen
});

export const AppNav = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: {
      screen: MainNav,
      path: '',
    },
    Auth: AuthNav,
    Privacy: PrivacyNav,
    Version: VersionNav,
    Profile: ProfileNav,
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export const prefix = Platform.OS === 'android' ? 'fsf://fsf/' : 'fsf://';
export const NavContainer = createAppContainer(AppNav);
