import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import useAuth from '../hook/useAuth';
import usePhoto from '../hook/usePhoto';
import { IPhoto } from '../model/photo.model';
import { logout } from '../redux/reducer/auth.slice';
import { getPhotoList } from '../redux/reducer/photo.slice';
import Common from '../theme/Common';
import Layout from '../theme/Layout';

export default function PhotoList({ navigation }: { navigation: any }) {
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useAuth();
  const listPhoto = usePhoto();

  const getListPhotos = () => {
    setLoading(true);
    dispatch(getPhotoList());
    setLoading(false);
  };

  const debounced = useDebouncedCallback(query => setQuery(query), 300);

  useEffect(() => {
    getListPhotos();
  }, []);

  useEffect(() => {
    if (isLoggedIn === false) {
      navigation.replace('Login');
    }
  }, [isLoggedIn]);

  const renderItem = ({ item }: { item: IPhoto }) => (
    <TouchableOpacity
      activeOpacity={.5}
      onPressOut={() => navigation.navigate('DetailPhoto', { id: item.id })}>
      <View style={[style.itemWrapper]}>
        <Image source={{ uri: item.thumbnailUrl }} style={[style.itemImage]} />
        <Text style={[style.itemTitle]} ellipsizeMode="tail" numberOfLines={1}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const filterData = query
    ? listPhoto.filter(item =>
        item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      )
    : listPhoto;

  return (
    <View style={[Layout.fullSize, style.wrapper]}>
      <View style={[Common.header, Layout.center]}>
        <Text onPress={() => dispatch(logout())} style={[style.title]}>
          Photo List
        </Text>
      </View>
      <View style={[Layout.fullSize, style.bodyWrapper]}>
        <View style={[Common.inputWrapper]}>
          <TextInput
            // value={query}
            placeholder="Search"
            placeholderTextColor="grey"
            onChangeText={query => debounced(query)}
            style={[Common.input, Layout.fullWidth]}
          />
          <Icon name="search" size={16} color="gray" />
        </View>
        <View>
          <FlatList
            data={filterData}
            keyExtractor={(item: IPhoto) => item.id.toString()}
            onRefresh={getListPhotos}
            refreshing={isLoading}
            renderItem={renderItem}
            scrollEnabled={true}
          />
        </View>
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
    position: 'relative',
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: 'black',
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  itemImage: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  itemTitle: {
    fontSize: 16,
    marginLeft: 10,
  },
})
