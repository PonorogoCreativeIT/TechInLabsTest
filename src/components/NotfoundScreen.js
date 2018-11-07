// import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements'

// create a component
class NotfoundScreen extends Component {
  render() {
    return (
      <View style={ [ styles.container, this.props.style ] }>
        <Icon name="info" size={ 50 } color="#214498" />
        <Text
          style={ { fontSize: 14 } }
          containerStyle={ { marginTop: 20 } }
        >
          {this.props.text}
        </Text>
        {this.props.onPress != null &&
          <Button
            onPress={ this.props.onPress == null ? null : this.props.onPress }
            large
            title={ this.props.buttonText }
          />
        }
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

// make this component available to the app
export default NotfoundScreen;
