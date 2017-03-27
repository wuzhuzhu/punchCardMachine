import {
  gql
} from 'react-apollo'

export const SIGN_IN = gql`
    mutation signInPatient {
        signInPatient(patientId: String) {
            patientId
        }
    }
`

export const SIGN_OUT = gql`
    mutation signOutPatient {
        signOutPatient(patientId: String) {
            patientId
        }
    }
`
export const signInPatient = gql`
    mutation signInPatient($patientId: String!) {
        signInPatient(patientId: $patientId) {
          checkInRes
        }
    }
`

export const signOutPatient = gql`
    mutation signOutPatient($patientId: String!) {
        signOutPatient(patientId: $patientId) {
          isSignedOut
        }
    }
`
