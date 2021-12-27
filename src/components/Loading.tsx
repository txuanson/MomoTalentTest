import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Layout from '../theme/Layout';

export default function Loading() {
  return (
    <View style={[Layout.fullSize, Layout.center]}>
      <ActivityIndicator size={50} />
    </View>
  );
}
