import React from 'react';
import { CommonActions } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import useActivePhoto from '../hook/useActivePhoto';
import useAuth from '../hook/useAuth';
import { clearActive, getPhotoDetail } from '../redux/reducer/photo.slice';
import Common from '../theme/Common';
import Layout from '../theme/Layout';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../components/Loading';

export default function DetailPhoto({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [isLoading, setLoading] = useState(false);
  const isLoggedIn = useAuth();
  const activePhoto = useActivePhoto();
  const dispatch = useDispatch();

  const getData = (photoId: number) => {
    setLoading(true);
    dispatch(getPhotoDetail({ photoId }));
    setLoading(false);
  };

  const goBack = () => {
    dispatch(clearActive());
    navigation.dispatch(CommonActions.goBack());
  };

  useEffect(() => {
    getData(route.params.id);
  }, [route]);

  useEffect(() => {
    if (isLoggedIn === false) {
      navigation.replace('Login');
    }
  }, [isLoggedIn]);

  if (isLoading === true) {
    return <Loading />;
  }

  return (
    <View style={[Layout.fullSize, style.wrapper]}>
      <View style={[Common.header, style.headerWrapper]}>
        <TouchableOpacity
          style={[style.backButton]}
          activeOpacity={.7}
          onPressOut={goBack}>
          <Icon name="chevron-left" size={20} />
        </TouchableOpacity>
        <Text>{activePhoto?.title}</Text>
      </View>
      <View style={[Layout.fullSize, Layout.center, style.bodyWrapper]}>
        <Image
          source={{ uri: activePhoto?.url }}
          style={[style.image]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  wrapper: {
    position: 'relative',
    backgroundColor: 'white',
  },
  bodyWrapper: {
    display: 'flex',
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 10,
    marginRight: 5,
  },
  image: {
    flex: 1,
    width: '100%',
    // height: '100%'
  },
})
