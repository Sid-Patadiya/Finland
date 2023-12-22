import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Images from '../theme/Images';
import Font from '../theme/Font';
import { scale } from '../theme/Scalling';
import FSize from '../theme/FSize';

export default function MenuHeader(props) {
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => props.onPress()}
          style={{
            height: scale(35),
            justifyContent: 'center',
            width: widthPercentageToDP(12),
          }}>
          <Image
            source={props.backButton}
            resizeMode="contain"
            style={{ height: scale(15), width: scale(18), padding: 10 }}></Image>
        </TouchableOpacity>

        <Text style={styles.headerText}>{props.title}</Text>
      </View>

      <View style={styles.Imagesiew}>
        <TouchableOpacity>
          <Image
            source={props.addMessage}
            style={{ height: scale(20), width: scale(20), padding: 10 }}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <Image
            source={props.Dots}
            resizeMode="contain"
            style={{
              height: scale(20),
              width: scale(5.2),
              padding: 10,
            }}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#0D3068',
    justifyContent: 'space-between',
    height: heightPercentageToDP(7),
  },
  header: {
    left: heightPercentageToDP(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Imagesiew: {
    width: widthPercentageToDP(15),
    justifyContent: 'space-between',
    right: heightPercentageToDP(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: FSize.fs18,
    color: '#FFFFFF',
    fontWeight: '500',
    fontFamily: Font.PoppinsRegular,
  },
});
