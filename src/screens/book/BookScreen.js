//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { Card, Button, ButtonGroup } from 'react-native-elements';
import Axios from 'axios';
import Spinner from 'react-native-spinkit';
import { CustomTabs } from 'react-native-custom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import NotfoundScreen from '../../components/NotfoundScreen';
import LoadingScreen from '../../components/LoadingScreen';
import { keyNYTimes } from './../../../app.json';
import Colors from '../../utilities/Colors';

// create a component
class BookScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      selectedTypeIndex: 0,
      isLoading: false,
    };
  }

  componentDidMount(){
    this.isComponentMounted = true;
    this.loadData();
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  async loadData(){
    await this.setStateData({
      data: [],
      isLoading: true,
    });
    try{
      const response = await Axios.get(`https://api.nytimes.com/svc/books/v3/lists.json?api-key=${keyNYTimes}&list=${(this.state.selectedTypeIndex === 0 ? 'e-book-fiction' : 'hardcover-fiction')}`);
      const result = this.state.data.concat(response.data.results);
      this.setStateData({
        isLoading: false,
        data: result,
      });
    }catch(error){
      this.setStateData({
        isLoading: false,
      });
      if(error.response){
        Alert.alert('Whoops!', JSON.stringify(error.response.data.message));
      }else{
        Alert.alert('Whoops!', JSON.stringify(error));
      }
    }
  }

  async detail(url){
    try{
      await CustomTabs.openURL(url, {
        toolbarColor: Colors.PRIMARY_COLOR,
        showPageTitle: true,
        enableDefaultShare: true,
      });
    }catch(error){
      Alert.alert('Whoops!', JSON.stringify(error));
    }
  }

  setListType(data){
    this.setStateData({
      selectedTypeIndex: data,
    });
    this.loadData();
  }

  setStateData(data){
    if(this.isComponentMounted){
      this.setState(data);
    }
  }

  renderRow(data){
    const item = data.item;
    const index = data.index;

    return(
      <Card
        containerStyle={{ marginBottom: index === this.state.data.length - 1 ? 20 : 0 }}
        title={`${item.book_details[0].title}`}>
        <Text style={{marginBottom: 10}}>
          {`${item.book_details[0].description}`}
        </Text>
        <Button
          onPress={() => this.detail(item.amazon_product_url)}
          icon={{name: 'code'}}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Buy Now' />
      </Card>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ButtonGroup
          buttonStyle={{padding: 0}}
          selectedButtonStyle={{backgroundColor: Colors.PRIMARY_COLOR}}
          selectedTextStyle={{color: '#fff', fontWeight: 'bold'}}
          onPress={(data) => this.setListType(data)}
          selectedIndex={this.state.selectedTypeIndex}
          buttons={['E-Book Fiction', 'Hardcover Fiction']}
        />
        {this.state.isLoading === false && this.state.data.length > 0 &&
          <FlatList
            bounces={false}
            data={this.state.data}
            keyExtractor={(item, index) => `${index}`}
            renderItem={(data) => this.renderRow(data)}
          />
        }
        {this.state.isLoading === false && this.state.data.length === 0 &&
          <NotfoundScreen
            text={ 'Book not found' }
          />
        }
        {this.state.isLoading === true &&
          <LoadingScreen />
        }
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default BookScreen;
