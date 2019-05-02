import React from 'react';
import { View, Text, Animated, Image, Easing } from 'react-native';

class SplashScreen extends React.Component {
  state = {
    animateValue: new Animated.Value(0)
  };
  timeToWait = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 5000)
    );
  };

  async componentDidMount() {
    this.bounce();
    const result = await this.timeToWait();
    if (result !== null) {
      this.props.navigation.navigate('AuthLoading');
    }
  }

  bounce = () => {
    this.state.animateValue.setValue(0);
    Animated.timing(this.state.animateValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.bounce,
      useNativeDriver: true
    }).start(() => this.bounce());
  };

  render() {
    const x = this.state.animateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    return (
      <View style={styles.container}>
        <Animated.Image
          style={{
            transform: [{ scale: x }]
          }}
          source={require('../assets/fsf_transparent.png')}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292F36'
  },
  text: {
    marginTop: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'normal'
  }
};

export default SplashScreen;
