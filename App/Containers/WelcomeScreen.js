import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// import { Metrics } from '../Themes'
// external libs
import { Actions as NavigationActions } from 'react-native-router-flux'
import { compose } from 'react-apollo'

// Styles
import styles from './Styles/WelcomeScreenStyle'

// I18n
// import I18n from 'react-native-i18n'

// Components
import RoundedButton from '../Components/RoundedButton'

class WelcomeScreen extends React.Component {

  render () {
    // console.log(this.props.data.patients)
    return (
      <View style={styles.container}>
        <RoundedButton
          text='登陆'
          onPress={NavigationActions.login}
        />
        <RoundedButton
          text='扫码'
          onPress={NavigationActions.scan}
        />
        {/* <Text>
          {JSON.stringify(this.props.data.patients)}
        </Text> */}
      </View>
    )
  }

}

/* A example of apollo query
const patients = gql`
    query patients {
        patients {
            nickname
        }
    }
`
*/

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

// export default graphql(patients)(WelcomeScreen)
export default compose(
  // graphql(patients),
  connect(mapStateToProps, mapDispatchToProps)
)(WelcomeScreen)
// export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
