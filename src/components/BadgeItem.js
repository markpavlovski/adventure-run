import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllBadges } from '../actions'
import { StyleSheet, Text, View, FlatList, Dimensions, Image, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { badges } from '../helpers'


class BadgeItem extends Component {

  render(){
    const {id, count, name, description} = this.props.data
    return (
      <View style={styles.container}>
        {this.props.info === id
          ? <View style = {styles.info}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.infoScrollView}
              >
                <Text style={styles.infoTitle}>{name}</Text>
                <Text style={styles.infoText}>{description}</Text>
              </ScrollView>
            </View>

          : null
        }
        <View style={styles.feature}>
          <TouchableWithoutFeedback onPress={()=>{this.props.toggleInfo(id)}}>
            <Image style={styles.image} source={badges[id]} />
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.badgeCount}>{count}</Text>

      </View>
    )
  }

  constructor(){
    super()
  }

}


const WIDTH = 120

const styles = StyleSheet.create({
  feature: {
    height: WIDTH*.7,
    width: WIDTH*.7,
    alignSelf: 'center',
    zIndex: 50,
    borderRadius: WIDTH*.7/2,
    borderColor: '#378287',
    shadowColor: 'black',
    shadowRadius: 6,
    shadowOpacity: .3,
    shadowOffset: {width: 0, height: 6},
    flexDirection: 'row',
  },
  container: {
    width: 100,
    height: 120,
    margin: 0,
    marginBottom: 25,
    alignSelf: 'flex-end',
    borderRadius: 20,
  },
  image: {
    width: WIDTH*.7,
    height: WIDTH*.7,
    borderRadius: WIDTH*.7/2,
  },
  badgeCount: {
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 20,
    paddingTop: 10
  },
  info: {
    marginTop: -110,
    height: 100,
    width: 90,
    backgroundColor: 'white',
    zIndex: 99,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: 'black',
    shadowRadius: 6,
    shadowOpacity: .3,
    shadowOffset: {height: 5},
  },
   infoScrollView: {
     padding: 8
   },
   infoTitle: {
     fontWeight: '700',
     fontSize: 12,
     paddingTop: 5,
     paddingBottom: 5
   },
   infoText: {
     fontSize: 12,
   }
})



const mapDispatchToProps = dispatch => bindActionCreators({getAllBadges}, dispatch)
const mapStateToProps = ({allBadges}) => ({allBadges})
export default connect(mapStateToProps, mapDispatchToProps)(BadgeItem)
