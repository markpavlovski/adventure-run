import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'



class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'email',
      password: 'password',
    };
  }

  render() {
    return (
      <View style={{flex: 1, padding: 30}}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 20}}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 10}}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
    </View>
    )
  }
}



export default LoginScreen
