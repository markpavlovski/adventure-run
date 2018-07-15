import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllBadges } from '../actions'
import { StyleSheet, Text, View, FlatList, Dimensions, Image, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { badges } from '../helpers'


class BadgeItem extends Component {

  render(){
    console.log(this.props.data)
    const id = this.props.data.id
    const count = this.props.data.count
    return (
      <View style={styles.container}>
        <View style={styles.feature}>
          <Image style={styles.image}
            source={badges[id]}
          />
        </View>
        <Text style={styles.badgeCount}>{count}</Text>

      </View>
    )
  }



}


const WIDTH = 120

const styles = StyleSheet.create({
  feature: {
    height: WIDTH*.7,
    width: WIDTH*.7,
    alignSelf: 'center',
    zIndex: 999,
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
    overflow: 'hidden'
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
  }
})



const mapDispatchToProps = dispatch => bindActionCreators({getAllBadges}, dispatch)
const mapStateToProps = ({allBadges}) => ({allBadges})
export default connect(mapStateToProps, mapDispatchToProps)(BadgeItem)
