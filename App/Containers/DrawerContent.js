import React, { Component } from 'react'
import {
  ScrollView,
  Image,
  BackAndroid
  // Text
} from 'react-native'
import styles from './Styles/DrawerContentStyles'
import { Images } from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'

import DrawerButton from '../Components/DrawerButton'

class DrawerContent extends Component {

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        <DrawerButton
          onPress={() => {
            NavigationActions.welcome()
            this.context.drawer.toggle()
          }}
          text='首页' />
        <DrawerButton
          onPress={() => {
            NavigationActions.login()
            this.context.drawer.toggle()
          }}
          text='登陆' />
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
