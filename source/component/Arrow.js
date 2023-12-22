import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const Arrow = props => {
  return (
    <View
      style={{
        height: heightPercentageToDP(4),
        width: widthPercentageToDP(4),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#666',
      }}>
      <Image style={styles.img} source={props.image}></Image>
    </View>
  );
};

export default Arrow;

const styles = StyleSheet.create({
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
