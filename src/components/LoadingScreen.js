
// import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Spinner from 'react-native-spinkit';
import Colors from '../utilities/Colors';

// create a component
class LoadingScreen extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Spinner
          isVisible={true}
          size={75}
          type={'ThreeBounce'}
          color={Colors.PRIMARY_COLOR}
        />
        <Text
          containerStyle={ { marginTop: 20 } }
          style={ { fontSize: 14 } }
        >
          Please Wait ...
        </Text>
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
    backgroundColor: '#fff',
  },
});

// make this component available to the app
export default LoadingScreen;
