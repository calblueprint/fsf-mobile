import { Alert } from 'react-native';

function okAlert (title, message) {
  Alert.alert(title, message,[{text: 'OK', onPress: () => {}}], {cancelable: false} )
}

export { okAlert }
