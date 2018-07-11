import React, {Component} from 'react'
import { View, AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'


import store from './src/store'
import Main from './src/components/Main'

const App = () => {
  return (
  <Provider store={store}>
    <Main/>
  </Provider>
)}


export default App
