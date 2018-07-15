import React, {Component} from "react"
import { StyleSheet, Text, View, Dimensions, Image } from "react-native"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout, getAllRuns } from '../actions'
import { hhmmssToSeconds, secondsToHhmmss } from '../helpers'


class Me extends Component {

  componentDidMount(){
    this.props.getAllRuns()
  }

  render(){
    const runData = this.props.allRuns
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image style={styles.image}
              source={require('../assets/dandog.jpg')}
            />
          </View>
          <Text style={styles.name}>Dan Dog</Text>
          <Text style={styles.city}>Seattle, WA</Text>
        </View>

        <View style={styles.feature}>
          <View style={styles.featureBlock}>
            <Text style={styles.featureBlockText}>Miles</Text>
            <Text style={styles.featureBlockValue}>120.2</Text>
          </View>
          <View style={styles.featureBlock}>
            <Text style={styles.featureBlockText}>Runs</Text>
            <Text style={styles.featureBlockValue}>23</Text>
          </View>
          <View style={styles.featureBlock}>
            <Text style={styles.featureBlockText}>Hours</Text>
            <Text style={styles.featureBlockValue}> 25.2</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.guild}>
            Member of <Text style={{fontWeight: '700'}}>Lovelace Lemuirs</Text> guild
          </Text>
          <Text style={styles.logout} onPress={this.props.logout} >
            Logout
          </Text>
        </View>

      </View>
    )
  }

  totalDistance = runData => runData.reduce((acc,run)=>acc+parseFloat(run.distance), 0).toFixed(2)

  totalTime = runData => {
    const totalTime = runData
      .map(run => hhmmssToSeconds(run.time))
      .reduce((acc,time)=>acc+time,0)
    return secondsToHhmmss(totalTime)
  }


}


const SCREEN_WIDTH = Dimensions.get("window").width

const styles = StyleSheet.create({
  header: {
    flex: 6,
    backgroundColor: '#378287',
    justifyContent: 'center',
    alignItems: 'center'
  },
  feature: {
    height: 120,
    backgroundColor: 'white',
    width: SCREEN_WIDTH*.9,
    alignSelf: 'center',
    marginTop: -60,
    zIndex: 999,
    borderRadius: 10,
    borderColor: '#378287',
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: .3,
    shadowOffset: {width: 0, height: 30},
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20
  },
  content: {
    flex: 4,
    backgroundColor: 'white',
    marginTop: -60,
    justifyContent: 'flex-end',
    alignContent: 'center'
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderWidth: 3,
    borderRadius: 70,
    borderColor: 'white',
    marginTop: -50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: 'white',
  },
  name: {
    color: 'white',
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 18
  },
  city: {
    color: 'white',
    marginTop: 2,
    fontSize: 18
  },
  featureBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  featureBlockText: {
    marginTop: 30
  },
  featureBlockValue: {
    marginTop: 5,
    fontSize: 24
  },
  logout: {
    textAlign: 'center',
    fontSize: 14,
    color: '#378287',
    marginBottom: 30
  },
  guild: {
    textAlign: 'center',
    fontSize: 16,
    color: '#378287',
    marginBottom: 30
  }

})







const mapStateToProps = ({token, allRuns}) => ({token, allRuns})
const mapDispatchToProps = dispatch => bindActionCreators({ logout, getAllRuns }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Me)
