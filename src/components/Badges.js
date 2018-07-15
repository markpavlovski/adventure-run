import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllBadges } from '../actions'
import { StyleSheet, Text, View, FlatList, Dimensions, Image, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'

import BadgeItem from './BadgeItem'
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
    this.props.getAllBadges()
  }

  render(){
    const runData = this.props.allRuns
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.pageTitle}>Achievements</Text>
        </View>

        <View style={styles.feature}>
          <Image style={styles.image}
            source={require('../assets/badge.png')}
          />
        </View>

        <View horizontal style={styles.content}>
          <ScrollView horizontal style={styles.scrollview} showsHorizontalScrollIndicator={false}>
            {this.props.allBadges.map((badge,idx)=><BadgeItem style={styles.scrollItem} key={idx} data={badge}/>)}
          </ScrollView>
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
    flex: 5,
    marginTop: -SCREEN_WIDTH*.25,
    width:SCREEN_WIDTH*1.5,
    alignSelf: 'center',
    backgroundColor: '#378287',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SCREEN_WIDTH*1.25
  },
  feature: {
    height: SCREEN_WIDTH*.7,
    backgroundColor: 'white',
    width: SCREEN_WIDTH*.7,
    alignSelf: 'center',
    marginTop: -SCREEN_WIDTH*.7*.5,
    zIndex: 999,
    borderRadius: SCREEN_WIDTH*.7/2,
    borderColor: '#378287',
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: .3,
    shadowOffset: {width: 0, height: 30},
    flexDirection: 'row',
  },
  content: {
    flex: 5,
    backgroundColor: 'white',
    marginTop: -SCREEN_WIDTH*.7/2,
    justifyContent: 'flex-end',
    alignContent: 'center'
  },
  container: {
    flex: 1,
  },
  image: {
    width: SCREEN_WIDTH*.7,
    height: SCREEN_WIDTH*.7,
    borderRadius: SCREEN_WIDTH*.7/2,
  },
  pageTitle: {
    color: 'white',
    marginTop: -20,
    fontWeight: '300',
    fontSize: 32,
    letterSpacing: 2,
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
  },
  scrollview: {
    // backgroundColor: 'red',
  },
  scrollItem: {
    width: 100,
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.05)',
    margin: 10,
    marginBottom: 25,
    alignSelf: 'flex-end',
    borderRadius: 20
  }

})



const mapDispatchToProps = dispatch => bindActionCreators({getAllBadges}, dispatch)
const mapStateToProps = ({allBadges}) => ({allBadges})
export default connect(mapStateToProps, mapDispatchToProps)(Badges)
