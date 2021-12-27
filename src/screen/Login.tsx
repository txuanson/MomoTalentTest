import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../hook/useAuth';
import { IAuth, userLogin } from '../redux/reducer/auth.slice';
import Common from '../theme/Common';
import Layout from '../theme/Layout';
import validateEmail from '../util/validateEmail';
import Toast from 'react-native-toast-message';
import Loading from '../components/Loading';

export default function Login({ navigation }: { navigation: any }) {
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordInput = useRef();

  const isLoading = useSelector(
    (state: { auth: IAuth }) => state.auth.isLoading,
  );

  const dispatch = useDispatch();

  const loginHandler = () => {
    if (validateEmail(email)) {
      setIsInvalidEmail(true);
      return Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Invalid email'
      })
    }

    if (!password) {
      setIsInvalidPassword(true);
      return Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Password is required'
      })
    }

    dispatch(userLogin({ email, password }));
  };

  const isLoggedIn = useAuth();

  useEffect(() => {
    if (isLoggedIn === true) {
      navigation.replace('PhotoList');
    }
  }, [isLoggedIn])

  if (isLoading === true) {
    return <Loading />;
  }

  return (
    <View style={[Layout.fullSize, Common.bodyWrapper, style.body]}>
      <View style={[style.headerWrapper]}>
        <Text style={[style.header]}>Welcome back,</Text>
        <Text style={[style.subHeader]}>Please login</Text>
      </View>
      <View>
        <KeyboardAvoidingView>
          <View
            style={[
              Common.inputWrapper,
              isInvalidEmail ? style.invalidInput : null,
            ]}>
            <Icon name='envelope' size={18} color='#000' />
            <TextInput
              value={email}
              style={[Common.input, Layout.fullSize]}
              placeholder='Email'
              placeholderTextColor='grey'
              keyboardType='email-address'
              onChangeText={value => setEmail(value)}
              onFocus={() => setIsInvalidEmail(false)}
              onSubmitEditing={() => passwordInput.current.focus()}
              blurOnSubmit={false}
            />
          </View>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView>
          <View style={[
            Common.inputWrapper,
            isInvalidPassword ? style.invalidInput : null,
          ]}>
            <Icon name='key' size={16} color='#000' />
            <TextInput
              secureTextEntry
              value={password}
              style={[Common.input, Layout.fullSize]}
              placeholder='Password'
              placeholderTextColor='grey'
              onChangeText={value => setPassword(value)}
              onFocus={() => setIsInvalidPassword(false)}
              ref={passwordInput}
              onSubmitEditing={loginHandler}
            />
          </View>
        </KeyboardAvoidingView>
        <View>
          <TouchableOpacity
            style={[Common.button, Layout.fullWidth, style.button]}
            onPressOut={loginHandler}
            activeOpacity={.7}
          >
            <Text style={[Common.buttonText]}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 1,
  },
  subHeader: {
    fontSize: 20,
  },
  button: {
    marginTop: 30,
  },
  invalidInput: {
    borderColor: 'red',
  },
})
