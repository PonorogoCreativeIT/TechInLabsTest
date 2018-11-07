// import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Navigation } from 'react-native-navigation';
import Colors from '../../utilities/Colors';
import ArticleScreen from '../article/ArticleScreen';
import BookScreen from '../book/BookScreen';

// create a component
class HomeScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Article',
          color: '#fff',
        },
        background: {
          color: Colors.PRIMARY_COLOR,
        }
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'article',
      tabs: [
        {
          key: 'article',
          label: 'Article',
          barColor: Colors.PRIMARY_COLOR,
          icon: 'list',
          information: 'Article',
        },
        {
          key: 'book',
          label: 'Books',
          barColor: Colors.PRIMARY_COLOR,
          icon: 'book',
          information: 'Books',
        },
      ],
    };
  }

  renderIcon = icon => () => (
    <Icon size={ 24 } color="white" name={ icon } />
  )

  renderTab = ({ tab, isActive }) => {
    if (isActive) {
      Navigation.mergeOptions(this.props.componentId, {
        topBar: {
          title: {
            text: tab.label
          },
        }
      });
    }
    return (
      <FullTab
        isActive={ isActive }
        key={ tab.key }
        label={ tab.label }
        renderIcon={ this.renderIcon(tab.icon) }
      />
    );
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ { flex: 1, justifyContent: 'flex-end' } }>
          { this.state.activeTab === 'article' && <ArticleScreen /> }
          { this.state.activeTab === 'book' && <BookScreen /> }
        </View>
        <BottomNavigation
          onTabPress={ newTab => this.setState({ activeTab: newTab.key }) }
          renderTab={ (tab, isActive) => this.renderTab(tab, isActive) }
          activeTab={ this.state.activeTab }
          tabs={ this.state.tabs }
        />
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

// make this component available to the app
export default HomeScreen;
