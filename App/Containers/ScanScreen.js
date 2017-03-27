import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import Camera from 'react-native-camera'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import scanActions from '../Redux/ScanRedux'
// import { Metrics } from '../Themes'
// external libs
// import Icon from 'react-native-vector-icons/FontAwesome'
// import Animatable from 'react-native-animatable'
// import { Actions as NavigationActions } from 'react-native-router-flux'
import { graphql, compose } from 'react-apollo'
import { get } from 'lodash'
import Sound from 'react-native-sound'

// Styles
import styles from './Styles/ScanScreenStyle'

import ScannerRec from '../Components/ScannerRec'
import { BLANK_PATIENT_ID } from '../Constants/ScanScreen'
import { signInPatient, signOutPatient } from '../Mutations/ScanScreen'

class ScanScreen extends React.Component {
  constructor (props) {
    super(props)

    // This binding is necessary to make `this` work in the callback
    this.onBarCodeRead = this.onBarCodeRead.bind(this)
    Sound.setCategory('Playback')
    this.beep = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error)
        return
      }
      // loaded successfully
      // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
    })
    this.logoutSound = new Sound('logout.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error)
        return
      }
      // loaded successfully
      // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
    })
  }

  takePicture () {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err))
  }

  playLogin () {
    this.beep.play((success) => {
      if (success) {
        console.log('successfully finished playing')
      } else {
        console.log('playback failed due to audio decoding errors')
      }
    })
  }

  playLogout () {
    this.logoutSound.play((success) => {
      if (success) {
        console.log('successfully finished playing')
      } else {
        console.log('playback failed due to audio decoding errors')
      }
    })
  }

  onBarCodeRead ({type, data}) {
    const parsedData = JSON.parse(data)
    const {id, name} = parsedData
    const previousId = get(this, 'props.patientId')
    const previousName = get(this, 'props.patientName')

    console.log({id, name, previousId, previousName})

    // 没有扫描到有效信息，忽略
    if (!id) {
      return
    }

    // 与上次扫描结果一样, 忽略
    if (previousId === id) {
      return
    }

    // 第一次扫描到占位二维码, beep一声，设置state之后停止
    if (!previousId && id === BLANK_PATIENT_ID) {
      this.playLogin()
      this.props.changeScanResult(id, name)
      return
    }

    // 本没有其他病历二维码
    if (previousId === BLANK_PATIENT_ID) {
      // 现在有了病人二维码
      if (id !== BLANK_PATIENT_ID) {
        this.props.signInPatient(id)
        this.playLogin()
        this.props.changeScanResult(id, name)
      } else {
        return
      }
    } else {
      this.props.signOutPatient(previousId)
      // 没扫描到占位二维码，直接扫描到新的病历本
      if (id !== BLANK_PATIENT_ID) {
        this.props.signInPatient(id)
      }
      this.playLogout()
      this.props.changeScanResult(id, name)
    }
  }

  render () {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          Aspect={'fill'}
          style={styles.preview}
          onBarCodeRead={this.onBarCodeRead}
          keepAwake
        >
          <ScannerRec />
          {/* <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text> */}
          <Text
            style={styles.capture}
            onPress={() => this.onBarCodeRead({
              type: 'simulate',
              data: JSON.stringify({
                id: 'e6e7a56c21fc27ac094a99f0',
                name: 'simulateName'
              })})}>
            [SIMULAT_QR]
          </Text>
          <Text
            style={styles.capture}
            onPress={() => this.onBarCodeRead({
              type: 'simulate',
              data: JSON.stringify({
                id: 'blankPatientId',
                name: 'blankPatientName'
              })})}>
            [SIMULAT_BLANK]
          </Text>
          <Text
            style={styles.capture}
            onPress={() => this.onBarCodeRead({
              type: 'simulate',
              data: JSON.stringify({
                id: 'blankPatientId',
                name: 'blankPatientName'
              })})}>
            [{this.props.patientName || '没有二维码'}]
          </Text>
        </Camera>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    patientId: state.scan.patientId,
    patientName: state.scan.patientName
  }
}

/*
const mapDispatchToProps = (dispatch) => {
  return {
  }
}
*/

export default compose(
  // mutations
  graphql(signInPatient, {
    props: ({ mutate }) => ({
      signInPatient: (patientId) => mutate({ variables: { patientId }
      })
    })
  }),
  graphql(signOutPatient, {
    props: ({ mutate }) => ({
      signOutPatient: (patientId) => mutate({ variables: { patientId }
      })
    })
  }),
  // redux
  connect(mapStateToProps, {
    changeScanResult: scanActions.changeScanResult
  }),
)(ScanScreen)

