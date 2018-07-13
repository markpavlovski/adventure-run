import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllBadges } from '../actions'
import { StyleSheet, Text, View, FlatList, Dimensions, Image } from 'react-native'
import { Icon } from 'react-native-elements'

import StatsCard from './StatsCard'
//
//
// class Badges extends Component {
//
//   render(){
//     return (
//       <View style={styles.stats}>
//         <FlatList
//           style={styles.content}
//           data={[this.title,...this.props.allBadges]}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({item}) => item.isTitle ? this.renderTitle() : <Text>{item.count} x {item.name}</Text>}
//         />
//       </View>
//     )
//   }
//
//   renderTitle = () => (
//     <View style={styles.header}>
//       <Text style={styles.headerText}>Badges</Text>
//     </View>
//   )
//
//   constructor(){
//     super()
//     this.title = {
//       isTitle: true
//     }
//   }
//
//   componentDidMount(){
//     this.props.getAllBadges()
//   }
//
// }
//
// const styles = StyleSheet.create({
//   stats: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   header: {
//     height: 100,
//     backgroundColor: '#378287',
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgb(55,130,135)',
//     justifyContent: 'flex-end',
//     padding: 20,
//     paddingTop: 0,
//     marginBottom: 40,
//     marginTop: -15,
//     marginLeft: -15,
//     marginRight: -15,
//     shadowColor: 'black',
//     shadowOpacity: .4,
//     shadowRadius: 25,
//     shadowOffset: {height: 15},
//   },
//   headerText: {
//     color: 'white',
//     fontSize: 30,
//     letterSpacing: 2,
//     textAlign: 'center',
//   },
//   content: {
//     flex: 1,
//     padding: 15,
//   }
// })


class Badges extends Component {

  componentDidMount(){
    // this.props.getAllRuns()
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
          <Text style={styles.logout}
          onPress={()=>{
            // console.log('goodbye:',this.props.token)
            // this.props.logout()
          }}
          >
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
    alignItems: 'center',
    borderRadius: 60
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
    fontSize: 18,
    color: '#378287',
    marginBottom: 40
  }

})



const mapDispatchToProps = dispatch => bindActionCreators({getAllBadges}, dispatch)
const mapStateToProps = ({allBadges}) => ({allBadges})
export default connect(mapStateToProps, mapDispatchToProps)(Badges)
