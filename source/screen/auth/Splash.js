import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import GlobalInclude from '../../globalInclude/GlobalInclude';

const splash = ({navigation}) => {
  useEffect(() => {
    GlobalInclude.AsyncStorage.getItem(GlobalInclude.Constant.sessId).then((value) => {
      global.sessId = value;
    });
    global.global_loader_reff.show_loader(1);
    // setTimeout(() => {
    //   callInitApp();
    // }, 3000);
  });
  const callInitApp = () => {
    navigation.replace('DrawerNavigator');
    global.global_loader_reff.show_loader(0);
  };
  return (
    <View style={styles.mainView}>
      <GlobalInclude.Statusbar
        backgroundColor={GlobalInclude.Color.ColorBlack}
      />
      <View style={styles.innerView}>
        <GlobalInclude.Text
          text={'Splash screen'}
          textStyle={{fontSize: 17, textAlign: 'center', marginTop: 200}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    backgroundColor: GlobalInclude.Color.Colorwhite,
  },
});

export default splash;
