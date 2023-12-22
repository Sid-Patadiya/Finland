import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Font from '../theme/Font';
import FSize from '../theme/FSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Lang } from '../translation/lang';
import { getDurationByDate } from '../helper/Utils';
import { getDurationInDays } from '../helper/DateTimeHelper';

export default function OnGoingJobElementJS(props) {
  const isFocused = useIsFocused();

  const [ln, setLn] = useState('en');
  useEffect(() => {
    const setLang = async () => {
      setLn(await AsyncStorage.getItem('LanguageCode'));
    };
    setLang();
  }, [isFocused]);

  var x = props.JobStatus;
  var y = parseInt(x) / 100;

  // var start = new Date(props.from_date); // new Date(2020, 11, 1);
  // var end = new Date(props.to_date); // new Date(2021, 0, 1);
  // const today = new Date();
  // var total = end - start;
  // var progress = today - start;
  // console.log('progress', progress);
  // console.log('total', total);
  // console.log(Math.round((progress / total) * 10).toFixed(2));

  // To set two dates to two variables
  var date1 = new Date(props.from_date);
  var date2 = new Date(props.to_date);
  var today = new Date();

  var Difference_In_Time = date2.getTime() - date1.getTime(); //time difference between from date and to date
  var itme_passed = today.getTime() - date1.getTime(); //time difference between current date and form date

  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  var timePassedAlready = itme_passed / (1000 * 3600 * 24);
  //To display the final no. of days (result)

  // progress status
  function percentageCalculator() {
    var result = ((timePassedAlready / Difference_In_Days) * 10).toFixed(2);
    // console.log("percentageCalculator", Number(result));
    return Number(result)
  }
  var Xparameter = ["Akash", null, undefined]
  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.profileCircle}>
          <Image style={styles.img}
            resizeMode='contain'
            source={
              props.Pofile == "Akash" || props.Pofile == "" ||props.Pofile == null ? `${require('../assets/Icon/Vector.png')}` : { uri: props.Pofile }
            }

          ></Image>
        </View>
        <View style={{ paddingLeft: wp(3) }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.headingOne, {fontWeight:'600', fontSize:FSize.fs12}]}>
            {props.jobName} ( JOB A{props.id} )
          </Text>
          <Text style={styles.headingTwo}>{props.companyName}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: hp(1.5) }}>
        {
          props.description == "" || props.description == null ? null :
            <Text style={styles.descTxt}>{Lang[ln].OnGoing['Description']}</Text>
        }
        <Text 
        numberOfLines={2}
        ellipsizeMode={'tail'}
        style={styles.descDetailTxt}>{`${props.description}`}</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: hp(1.5),
            display: 'flex',
            flexWrap: 'wrap',
          }}>
          <Text style={styles.descTxt}>
            {
              props.from_date && props.to_date == "" ? null :
                <>
                  {Lang[ln].OnGoing['Duration']}:
                  {props.from_date && props.to_date == "" ? `N.A` :
                    `${props.from_date} ${'-'} ${props.to_date}`
                  }
                </>
            }
          </Text>
          <Text style={styles.descDetailTxt}>{props.duration}</Text>
        </View>
      </View>

      <View style={{ marginTop: hp(1.5) }}>
        <Text style={styles.status}>{Lang[ln].OnGoing['Job Status']}</Text>

        <Progress.Bar
          progress={percentageCalculator()}
          width={wp(45)}
          color={'#0858AF'}
          height={hp(1.5)}
          unfilledColor={'#C4C4C4'}
          borderColor={'#FFF'}
          borderRadius={hp(5)}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: hp(0.5),
        }}>
        <TouchableOpacity style={styles.btnOne} onPress={props.onPress}>
          <Text style={styles.btnTextOne}>
            {Lang[ln].OnGoing['Time Sheet']}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTwo} onPress={props.endJob}>
          <Text style={styles.btnTextTwo}>{Lang[ln].OnGoing['End Job']}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    width: wp(65),
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    marginHorizontal: hp(1),
    borderRadius: hp(0.5),
  },
  profileCircle: {
    height: hp(8),
    width: hp(8),
    backgroundColor: '#FFF',
    borderRadius: hp(8),
    borderWidth: hp(0.15),
    borderColor: '#444444',
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
    // resizeMode: 'contain',
  },
  headingOne: {
    color: '#444444',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs12,
  },
  headingTwo: {
    color: '#444444',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs10,
  },
  descTxt: {
    color: '#444444',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs12,
    fontWeight: '700',
    // transform: [{rotateY: '180deg'}]
  },
  descDetailTxt: {
    color: '#454545',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs12,
    fontWeight: '300',
  },

  status: {
    color: '#444444',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs13,
    fontWeight: '700',
  },
  btnOne: {
    marginTop: hp(1.8),
    backgroundColor: '#FFF',
    borderWidth: hp(0.15),
    borderColor: '#CBCBCB',
    paddingVertical: hp(0.4),
    paddingHorizontal: wp(5),
    borderRadius: hp(5),
  },
  btnTextOne: {
    top: 1,
    color: '#717171',
    marginVertical: hp(0.3),
    fontSize: FSize.fs12,
    fontFamily: Font.PoppinsRegular,
    fontWeight: '400',
  },
  btnTwo: {
    marginTop: hp(1.8),
    backgroundColor: '#0858AF',
    paddingVertical: hp(0.4),
    paddingHorizontal: wp(5),
    borderRadius: hp(5),
  },

  btnTextTwo: {
    top: 1,
    fontWeight: '400',
    marginVertical: hp(0.3),
    color: '#FFFFFF',
    fontSize: FSize.fs12,
    fontFamily: Font.PoppinsRegular,
  },
});
