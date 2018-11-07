//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { Card, ListItem, Button, SearchBar, ButtonGroup } from 'react-native-elements';
import Axios from 'axios';
import Spinner from 'react-native-spinkit';
import { CustomTabs } from 'react-native-custom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import NotfoundScreen from '../../components/NotfoundScreen';
import LoadingScreen from '../../components/LoadingScreen';
import { keyNYTimes } from './../../../app.json';
import Colors from '../../utilities/Colors';

// create a component
class ArticleScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      keyword: '',
      selectedSortIndex: 0,
      isLoading: false,
      isLoadingNextPage: false,
      timer: null,
      page: 1,
    };
  }

  componentDidMount(){
    this.loadData(true);
  }

  async loadData(isReset = false){
    if(isReset){
      await this.setState({
        data: [],
        page: 1,
        isLoading: true,
        isLoadingNextPage: true,
      });
    }else{
      await this.setState({
        isLoadingNextPage: true,
        page: parseInt(this.state.page) + 1,
      });
    }
    try{
      const response = await Axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${keyNYTimes}&q=${this.state.keyword}&sort=${(this.state.selectedSortIndex === 0 ? 'newest' : 'oldest')}&page=${this.state.page}`);
      const result = this.state.data.concat(response.data.response.docs);
      this.setState({
        isLoading: false,
        isLoadingNextPage: false,
        data: result,
      });
    }catch(error){
      this.setState({
        isLoading: false,
        isLoadingNextPage: false,
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
      await CustomTabs.openURL(url);
    }catch(error){
      Alert.alert('Whoops!', JSON.stringify(error));
    }
  }

  searchData(keyword, direct = false){
    this.setState({keyword});
    clearTimeout(this.state.timer)
    if(direct){
      this.loadData(true);
    }else{
      this.state.timer = setTimeout(() => {
        this.loadData(true);
      }, 1000);
    }
  }

  sortData(data){
    this.setState({
      selectedSortIndex: data,
    });
    this.loadData(true);
  }

  renderRow(data){
    const item = data.item;
    const index = data.index;
    let imageUrl = null;
    if(item.multimedia.length > 0){
      imageUrl = {uri: `https://static01.nyt.com/${item.multimedia[0].url}`};
    }

    return(
      <Card
        containerStyle={{ marginBottom: index === this.state.data.length - 1 ? 20 : 0 }}
        title={`${item.headline.main}`}
        image={imageUrl}>
        <Text style={{marginBottom: 10}}>
          {`${item.snippet}`}
        </Text>
        <Button
          onPress={() => this.detail(item.web_url)}
          icon={{name: 'code'}}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='View Now' />
      </Card>
    )
  }

  renderFooter() {
    if(this.state.isLoadingNextPage) {
      return (
        <View
          style={
            {
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'center',
            }
          }
        >
          <Spinner
            isVisible={true}
            size={30}
            type={'ThreeBounce'}
            color={Colors.PRIMARY_COLOR}
          />
        </View>
      );
    }else{
      if (this.state.data.length > 9) {
        return (
          <TouchableOpacity onPress={ () => this.loadData() }>
            <View
              style={
                {
                  alignItems: 'center',
                  backgroundColor: Colors.PRIMARY_COLOR,
                  justifyContent: 'center',
                  padding: 15,
                }
              }
            >
              <Text
                style={ { color: '#fff', fontWeight: 'bold' } }
              >
                Next
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          returnKeyType={'search'}
          clearIcon
          onEndEditing={() => this.searchData(this.state.keyword, true)}
          showLoadingIcon={this.state.isLoadingNextPage}
          value={this.state.keyword}
          lightTheme
          onChangeText={(text) => this.searchData(text)}
          onClearText={() => this.searchData('')}
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Type Here...' />
        <ButtonGroup
          buttonStyle={{padding: 0}}
          selectedButtonStyle={{backgroundColor: Colors.PRIMARY_COLOR}}
          selectedTextStyle={{color: '#fff', fontWeight: 'bold'}}
          onPress={(data) => this.sortData(data)}
          selectedIndex={this.state.selectedSortIndex}
          buttons={['Newest', 'Oldest']}
        />
        {this.state.isLoading === false && this.state.data.length > 0 &&
          <FlatList
            bounces={false}
            data={this.state.data}
            keyExtractor={(item, index) => `${index}`}
            renderItem={(data) => this.renderRow(data)}
            ListFooterComponent={() => this.renderFooter()}
          />
        }
        {this.state.isLoading === false && this.state.data.length === 0 &&
          <NotfoundScreen
            text={ 'Article not found' }
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
export default ArticleScreen;
