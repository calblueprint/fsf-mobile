import { StyleSheet } from 'react-native';
import colors from './colors';
// eventually we probably want a context or something
// for now, any styles used in multiple components i'm putting here
const globalStyles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#000',
    margin: 8,
    borderRadius: 8,
    elevation: 6
  },
  topContainer: {
    flex: 1,
    height: 100,
    backgroundColor: 'transparent'
  },
  bottomContainer: {
    alignSelf: 'flex-end',
    height: 48
  },
  title: {
    paddingTop: 16,
    paddingLeft: 16,
    fontSize: 20
  },
  count: {
    paddingLeft: 16,
    paddingTop: 8
  },
});

export { globalStyles };
