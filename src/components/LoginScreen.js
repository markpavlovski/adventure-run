import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, Image, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../actions'


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'dandog@gmail.com',
      password: 'dandog',
      showButtons: true
    };
  }

  render() {
    return (

      <KeyboardAvoidingView
        behavior="padding" enabled
        style={{flex: 1, padding: 30, justifyContent: 'space-around', backgroundColor: 'rgba(55,130,135,.9)'}}
        >
        {this.state.showButtons ? <Image
          style={styles.logo}
          // source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
          // source={require('../assets/adventure_run.png')}
          source={require('../assets/simple_logo.png')}
        /> : null }
        {this.state.showButtons ? <Text style={styles.title}>ADVENTURE RUN</Text>: null }
        <View style={{}}>
        <TextInput
          style={{height: 40, borderColor: 'white', borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5, color: 'white'}}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          placeholder='email'
          placeholderTextColor='white'
          onFocus={this.focus}
          onBlur={this.blur}

        />
        <TextInput
          style={{height: 40, borderColor: 'white', borderWidth: 1, padding: 10, color: 'white', borderRadius: 5}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          placeholder='password'
          placeholderTextColor='white'
          secureTextEntry={true}
          onFocus={this.focus}
          onBlur={this.blur}
        />
      </View>
      {this.state.showButtons ? <View
        style={styles.loginButton}
      >
        <Text style={styles.loginText}
        onPress={()=>{
          console.log('hi')
          const {email, password} = this.state
          this.props.login(email, password)
        }}
        >
          LOGIN
        </Text>
      </View> : null}
    </KeyboardAvoidingView>
    )
  }

  focus = () => {
    this.setState({showButtons: false})
  }
  blur = () => {
    this.setState({showButtons: true})
  }
}


const styles = StyleSheet.create({
  header: {
    flex: 6,
    backgroundColor: '#378287',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 20,
    color: 'white',
    letterSpacing: 2,
    marginBottom: 10,
  },
  loginText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#378287'
  },
  loginButton: {
    zIndex: 99,
    borderRadius: 20,
    justifyContent: 'center',
    margin: 20,
    padding: 10,
    backgroundColor: 'white'
  },
  logo: {
    width: 115,
    height: 84,
    alignSelf: 'center',
    marginTop: 70,
    marginBottom: 70
  }
})


const mapDispatchToProps = dispatch => bindActionCreators({login}, dispatch)
export default connect(null, mapDispatchToProps)(LoginScreen)
