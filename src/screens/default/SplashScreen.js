//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';

// create a component
class SplashScreen extends Component {

  constructor(props){
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidAppear(){
    
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>SplashScreens</Text>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default SplashScreen;
