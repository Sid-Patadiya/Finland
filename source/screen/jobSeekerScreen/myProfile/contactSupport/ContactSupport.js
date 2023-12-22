import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../../../component/CustomButton';
import HeaderNavigation from '../../../../component/HeaderNavigation';
import Loader from '../../../../component/loader';
import {ContactSupportRequest} from '../../../../redux/Action/ContactSupportAction';
import {loaderAction} from '../../../../redux/Action/LoaderAction';
import {ToastDisplay} from '../../../../redux/Action/ToastAction';
import Font from '../../../../theme/Font';
import FSize from '../../../../theme/FSize';
import {Lang} from '../../../../translation/lang';

export default function ContactSupport({route, navigation}) {
  console.log('route~~~', route.params.profileData.first_name);
  const dispatch = useDispatch();
  const IsFocused = useIsFocused();

  //------------- Language -------------\\

  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [IsFocused]);
  const loaderResponse = useSelector(state => state.loader);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  //------------- Api Call -------------\\

  const Handle_Submit = () => {
    if (title === '') {
      dispatch(
        ToastDisplay({
          type: 'nagative',
          title: 'Please Enter Title',
        }),
      );
    } else if (description === '') {
      dispatch(
        ToastDisplay({
          type: 'nagative',
          title: 'Please Enter Description',
        }),
      );
    } else {
      let bodyData = {
        first_name: route.params.profileData.first_name,
        ticket_type: 'Related_to_Coins',
        subject: title,
        description: description,
      };
      console.log('BodyData ===>', bodyData);
      dispatch(ContactSupportRequest(bodyData, navigation));
      dispatch(loaderAction(true)); 
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={Lang[ln].Profile['Contact Support']}
      />
      <TextInput
        // placeholder={Lang[ln].Profile['Enter Your Title']}
        placeholder={'Subject'}
        placeholderTextColor={'#96989A'}
        onChangeText={text => setTitle(text)}
        style={styles.textboxinnerOne}
      />
      <TextInput
        placeholder={Lang[ln].Profile['Enter Your Description']}
        placeholderTextColor={'#96989A'}
        onChangeText={text => setDescription(text)}
        style={[styles.textboxinnerOne, {height: hp(12)}]}
      />
      <TouchableOpacity
        style={{marginHorizontal: wp(5), paddingTop: hp(2)}}
        onPress={() => Handle_Submit()}>
        <CustomButton btnTxt={Lang[ln].Profile['Submit']} />
      </TouchableOpacity>
      <Loader val={loaderResponse.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  textboxinnerOne: {
    borderWidth: hp(0.1),
    borderColor: '#D2D2D2',
    marginHorizontal: wp(5),
    fontSize: FSize.fs17,
    fontFamily: Font.PoppinsRegular,
    marginTop: hp(3),
    borderRadius: hp(0.5),
    paddingHorizontal: hp(2),
    textAlignVertical: 'top',
  },
});