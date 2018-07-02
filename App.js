import React, {Component} from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'

import store from './src/store'
import Content from './src/components/Content'
import Navbar from './src/components/Navbar'

const App = () => (
  <Provider store={store}>
    <View style={{flex:1}}>
      <Content/>
      <Navbar/>
    </View>
  </Provider>
)


export default App
