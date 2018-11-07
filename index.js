//import liraries
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { routes } from './src/routes';
routes();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'HomeScreen',
          }
        }],
      }
    }
  });
});
