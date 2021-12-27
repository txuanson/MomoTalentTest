import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  bodyWrapper: {
    position: 'relative',
    backgroundColor: 'white',
    padding: 16,
  },
  inputWrapper: {
    display: 'flex',
    backgroundColor: '#DCDCDC',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: 'row',
    marginVertical: 12,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 14,
    letterSpacing: 0.5,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#DC143C',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1.5,
  },
  header: {
    height: 60,
    borderBottomWidth: .5,
    borderBottomColor: 'grey',
  }
});
