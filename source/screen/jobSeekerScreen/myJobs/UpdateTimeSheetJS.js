import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
// import CheckBox from '@react-native-community/checkbox';
import OGJChildJs from '../../../component/OGJChildJs';
import Font from '../../../theme/Font';
import FSize from '../../../theme/FSize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HeaderNavigation from '../../../component/HeaderNavigation';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateTimeSheetRequest } from '../../../redux/Action/UpdateTimeSheetAction';
import DatePicker from 'react-native-date-picker';
import { TimeSheetRequest } from '../../../redux/Action/TimeSheetAction';
import { ToastDisplay } from '../../../redux/Action/ToastAction';
import { CreateEndJobRequest } from '../../../redux/Action/EndJobAction';
import SuccessModal from '../SuccessModal';

export default function UpdateTimeSheetJS({ navigation, route }) {
  const [show, setShow] = useState(false)
  const jobdata = route.params;
  const dispatch = useDispatch();

  const [currentDate, setCurrentDate] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  console.log('selectedDate==', jobdata);
  // const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [Details, setDetails] = useState('');
  //---------------- Show Time Modal ----------------//

  const [showCheckInTime, setShowCheckInTime] = useState(false);
  const [showCheckOutTime, setShowCheckOutTime] = useState(false);
  const [check, setCheck] = useState(false);

  const [timeSheet, setTimeSheet] = useState([]);

  const TimeSheetResponse = useSelector(state => state.timeSheet);
  // console.log('TimeSheetResponse -----> ', timeSheet);

  useEffect(() => {
    if (TimeSheetResponse.data !== null) {
      setTimeSheet(TimeSheetResponse.data.data);
    }
    // else {
    //   let bodydata = {
    //     timesheet_id: parseFloat(jobdata.id.timesheet_id),
    //   };
    //   dispatch(TimeSheetRequest(bodydata));
    // }
  }, [TimeSheetResponse.data]);

  useEffect(() => {
    let bodydata = {
      timesheet_id: parseFloat(route.params.id.timesheet_id),
    };
    dispatch(TimeSheetRequest(bodydata));
  }, [route.params]);

  useEffect(() => {
    var today = new Date();

    var key = moment(today).format('YYYY-MM-DD');
    var obj = {};
    obj[key] = {
      selected: true,
      selectedColor: '#1E85DA',
    };
    setCurrentDate(obj);
    setSelectedDate(key);
  }, []);

  // //------------------ Set Date -----------------\\
  // const seletTime = day => {
  //   console.log('day.dateString===', day.dateString);
  //   let temp = timeSheet.filter(item => item.date == day.dateString);
  //   // console.log(temp);
  //   if (temp.length == 0) {
  //     // setSelectedDate(moment(day.dateString).format('YYYY-MM-DD'));
  //     setSelectedDate(moment(day.dateString).format('YYYY-MM-DD'));
  //     setCurrentDate({
  //       [day.dateString]: {
  //         selected: true,
  //         selectedColor: '#1E85DA',
  //       },
  //     });
  //   }
  // };

  //---------------- set Time Data ----------------//
  const [selectedCheckIn, setSelectedCheckIn] = useState({
    hours: '',
    minutes: '',
  });
  const [selectedCheckOut, setSelectedCheckOut] = useState({
    hours: '',
    minutes: '',
  });

  console.log('selectedCheckIn::>', selectedCheckIn);

  console.log('selectedCheckOut::>', selectedCheckOut);

  //----------------Check In Time Formate ----------------//
  const parseTime = s => {
    let c = s.split(':');
    return parseInt(c[0]) * 60 + parseInt(c[1]);
  };

  const ChechInFormatData = data => {
    let hours = data.getHours();
    let minutes = ('0' + data.getMinutes()).slice(-2);

    // console.log('newformat', newformat);

    console.log('A hours has been picked:', parseTime(hours + ':' + minutes));
    // console.log('A minutes has been picked:', minutes);

    let todayData = [];
    timeSheet.map((item, index) => {
      console.log('item======', item);
      if (item.date == moment(new Date()).format('YYYY-MM-DD')) {
        todayData.push(item);
      }
    });
    console.log('todayData~~~', todayData);

    let temp = todayData.filter(item => {
      if (
        parseTime(item.check_in_time) <=
        parseTime((hours + ':' + minutes).toString()) &&
        parseTime((hours + ':' + minutes).toString()) <=
        parseTime(item.check_out_time)
      ) {
        return item;
      }
    });
    console.log('temp====>', temp);
    if (temp.length == 0) {
      setSelectedCheckIn({ hours: hours, minutes: minutes });
    } else {
      dispatch(
        ToastDisplay({
          type: 'nagative',
          title: 'Time Already Exists',
        }),
      );
    }

    //
  };
  //----------------Check Out  Time Formate ----------------//
  const ChechOutFormatData = data => {
    // console.log('data', data);

    let hours = data.getHours();
    let minutes = ('0' + data.getMinutes()).slice(-2);

    let todayData = [];
    timeSheet.map((item, index) => {
      console.log('item======', item);
      if (item.date == moment(new Date()).format('YYYY-MM-DD')) {
        todayData.push(item);
      }
    });
    console.log('todayData~~~', todayData);

    let temp = todayData.filter(item => {
      if (
        parseTime(item.check_in_time) <=
        parseTime((hours + ':' + minutes).toString()) &&
        parseTime((hours + ':' + minutes).toString()) <=
        parseTime(item.check_out_time)
      ) {
        return item;
      }
    });
    if (temp.length == 0) {
      setSelectedCheckOut({ hours: hours, minutes: minutes });
    } else {
      dispatch(
        ToastDisplay({
          type: 'nagative',
          title: 'Time Already Exists',
        }),
      );
    }
  };

  const UpdateTimeSheet = () => {
    if (
      selectedDate !== '' &&
      selectedCheckIn.hours !== '' &&
      selectedCheckIn.minutes !== '' &&
      selectedCheckOut.hours !== '' &&
      selectedCheckOut.minutes !== '' &&
      Details !== ''
    ) {
      // let temp = timeSheet.filter(item => item.date == selectedDate);
      // console.log(temp);
      // if (temp.length == 0) {
      // setSelectedDate(moment(day.dateString).format('YYYY-MM-DD'));
      let bodydata = {
        // timesheet_id: jobdata.id.timesheet_id,
        // timesheet: jobdata.id.timesheet_id,
        // date: selectedDate,
        // check_in_time: selectedCheckIn.hours + ':' + selectedCheckIn.minutes,
        // check_out_time: selectedCheckOut.hours + ':' + selectedCheckOut.minutes,
        // task_details: Details,
        // end_Jobs: check,
        // hours_worked: jobdata.no_of_hours
        "timesheet": jobdata.id.timesheet_id,
        "date": selectedDate,
        "check_in_time": selectedCheckIn.hours + ':' + selectedCheckIn.minutes,
        "check_out_time": selectedCheckOut.hours + ':' + selectedCheckOut.minutes,
        "hours_worked": jobdata.item.no_of_hours,
        "task_details": Details,
        "end_Jobs": false
      };
      console.log('bodydata===>', bodydata);
      dispatch(UpdateTimeSheetRequest(bodydata, navigation));
      // navigation.pop();
      // } else {
      //   dispatch(
      //     ToastDisplay({
      //       type: 'nagative',
      //       title: 'Timesheet Already Exists',
      //     }),
      //   );
      // }
    } else {
      Alert.alert('Please Fill The Details');
    }
  };

  // end job------------------------------------------------------------------------------
  const endJob = item => {
    console.log('otem>>>>>>>>>>>', item);
    let bodydata = {
      vacancy_id: item,
    };
    console.log(bodydata);
    dispatch(CreateEndJobRequest(bodydata));
    //  navigation.navigate('UpdateTimeSheetJS');
  };

  return (
    <View style={{ backgroundColor: '#FFFAF6', flex: 1 }}>
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={
          jobdata?.item?.job_title +
          '( Job ' +
          jobdata?.item?.vacancy_det.vacancy_id +
          ' )'
        }
      />
      <ScrollView>
        <OGJChildJs
          show={false}
          onPress={() => navigation.navigate('UpdateTimeSheetJS')}
          onPressTxt={'View Job Details'}
          bgImage={jobdata?.item?.company_image}
          profilePic={jobdata?.item?.recruiter_image}
          name={jobdata?.item?.recruiter_name}
          desc={jobdata?.item?.company_name}
          // progress={70}
          from_date={jobdata?.item?.from_date}
          to_date={jobdata?.item?.to_date}
          match={jobdata?.item?.percent_match}
          // endJob={() => endJob(jobdata?.item.vacancy)}
          endJob={() => setShow(true)}
          urgent_vacancy={jobdata?.item.urgent_vacancy} //urgent
          job={
            jobdata?.item?.job_title +
            '( Job ' +
            jobdata?.item?.vacancy_det.vacancy_id +
            ' )'
          }
          // hireDate={jobdata?.item?.hire_date}
          // duration={jobdata?.item?.from_date + ' - ' + jobdata?.item?.to_date}
          tHours={jobdata?.item?.no_of_hours}
          hireDate={moment(
            jobdata?.item?.hire_date.split('-').reverse().join('-'),
          ).format('DD MMM, YYYY')}
          duration={
            moment(
              jobdata?.item?.hire_date.split('-').reverse().join('-'),
            ).format('DD MMM, YYYY') +
            ' - ' +
            moment(
              jobdata?.item?.hire_date.split('-').reverse().join('-'),
            ).format('DD MMM, YYYY')
          }
        />
        <SuccessModal
          visible={show}
          onRequestClose={() => setShow(false)}
          message={'Are you sure, you want to end this job?'}
          onPress={() => setShow(false)}
          onPressOk={() => {
            endJob(jobdata?.item.vacancy);
            setShow(false);
          }}
        />
        <Text style={styles.headerText}>TimeSheet</Text>
        <View>
          <Calendar
            theme={{
              textSectionTitleColor: '#343C44',
              // textSectionTitleDisabledColor: 'red',
              // selectedDayTextColor: 'red',
              todayTextColor: '#00adf5',

              dayTextColor: '#444444',
              arrowColor: '#0D3068',
              monthTextColor: '#343C44',
              indicatorColor: 'blue',

              textDayFontFamily: Font.PoppinsRegular,
              textMonthFontFamily: Font.PoppinsRegular,
              textDayHeaderFontFamily: Font.PoppinsRegular,

              textDayFontSize: FSize.fs14,
              textMonthFontSize: FSize.fs14,
              textDayHeaderFontSize: FSize.fs13,

              textDayFontWeight: '400',
              textDayHeaderFontWeight: '700',
            }}
            // firstDay={}
            hideExtraDays={true}
            // date={new Date()}
            current={new Date()}
            // minDate={new Date()}
            // maxDate={new Date()}
            monthFormat={'MMM yyyy'}
            disabledByDefault={true}
            // onMonthChange={month => {
            //     console.log('month changed', month);
            // }}

            // renderArrow={direction => <Arrow source={require('../../../assets/Icon/LeftJS.png')} />}

            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            disableAllTouchEventsForDisabledDays={true}
            markingType={'custom'}
            // Replace default month and year title with custom one. the function receive a date as parameter
            markedDates={currentDate}
            enableSwipeMonths={true}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            flexDirection: 'row',
            backgroundColor: '#fff',
            paddingTop: hp(2),
          }}>
          <View>
            <Text style={styles.textCheck}>Check in Time :</Text>
            <TouchableOpacity
              onPress={() => setShowCheckInTime(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp(1),
              }}>
              <Text
                style={[
                  styles.hrs,
                  selectedCheckIn ? { color: '#000' } : { color: '#8D8D8D' },
                ]}>
                {selectedCheckIn.hours !== '' ? selectedCheckIn.hours : 'Hrs'}
              </Text>
              <Text
                style={[
                  styles.hrs,
                  { marginLeft: hp(-0.1) },
                  selectedCheckIn ? { color: '#000' } : { color: '#8D8D8D' },
                ]}>
                {selectedCheckIn.minutes !== ''
                  ? selectedCheckIn.minutes
                  : 'Mins'}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.textCheck, { marginTop: hp(0.5) }]}>
              24 Hours
            </Text>
          </View>

          <View>
            <Text style={styles.textCheck}>Check Out Time :</Text>
            <TouchableOpacity
              onPress={() => setShowCheckOutTime(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp(1),
              }}>
              <Text
                style={[
                  styles.hrs,
                  selectedCheckOut ? { color: '#000' } : { color: '#8D8D8D' },
                ]}>
                {selectedCheckOut.hours !== '' ? selectedCheckOut.hours : 'Hrs'}
              </Text>
              <Text
                style={[
                  styles.hrs,
                  { marginLeft: hp(-0.1) },
                  selectedCheckOut ? { color: '#000' } : { color: '#8D8D8D' },
                ]}>
                {selectedCheckOut.minutes !== ''
                  ? selectedCheckOut.minutes
                  : 'Mins'}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.textCheck, { marginTop: hp(0.5) }]}>
              24 Hours
            </Text>
          </View>
        </View>
        {/* //----------------Check In Time Picker ----------------// */}
        <DatePicker
          modal
          mode="time"
          // minimumDate={}
          date={new Date()}
          is24Hour={true}
          // format="YYYY-MM-DD"
          locale={'en_GB'}
          is24hourSource="locale"
          open={showCheckInTime}
          onConfirm={date => {
            ChechInFormatData(date), setShowCheckInTime(false);
          }}
          onCancel={() => {
            setShowCheckInTime(false);
          }}
        />
        {/* <DateTimePickerModal
          isVisible={showCheckInTime}
          mode="time"
          is24Hour={true}
          onConfirm={date => {
            ChechInFormatData(date), setShowCheckInTime(false);
          }}
          onCancel={() => {
            setShowCheckInTime(false);
          }}
        /> */}
        {/* //----------------Check Out Time Picker ----------------// */}
        <DatePicker
          modal
          mode="time"
          date={new Date()}
          is24Hour={true}
          locale={'en_GB'}
          is24hourSource="locale"
          // format="YYYY-MM-DD"
          open={showCheckOutTime}
          onConfirm={data => {
            ChechOutFormatData(data), setShowCheckOutTime(false);
          }}
          onCancel={() => {
            setShowCheckOutTime(false);
          }}
        />
        {/* <DateTimePickerModal
          isVisible={showCheckOutTime}
          mode="time"
          is24Hour={true}
          onConfirm={data => {
            ChechOutFormatData(data), setShowCheckOutTime(false);
          }}
          onCancel={() => {
            setShowCheckOutTime(false);
          }} */}
        {/* /> */}
        {/* //---------------- task deatails ----------------// */}
        <View style={styles.textInputZone}>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Task details"
              multiline={true}
              placeholderTextColor="#96989A"
              style={styles.txtInput}
              onChangeText={text => setDetails(text)}
            />
          </View>

          {/* <View
            style={{
              flexDirection: 'row',
              marginLeft: wp(4),
              alignItems: 'center',
            }}>
          
            <TouchableOpacity
              onPress={() => {
                setCheck(!check);
              }}
              style={{
                borderWidth: 0.5,
                height: hp(3),
                width: hp(3),
                borderRadius: hp(0.7),
                borderColor: '#5B5D6B',
                marginHorizontal: hp(1),
              }}>
              {check && (
                <Image
                  style={{
                    height: hp(3),
                    width: hp(3),
                  }}
                  source={require('../../../assets/Icon/checkbox.png')}></Image>
              )}
            </TouchableOpacity>
            <Text style={styles.endJob}>End Job</Text>
          </View> */}

          <TouchableOpacity
            style={styles.btnTwo}
            onPress={() => UpdateTimeSheet()}>
            <Text style={styles.btnTextTwo}>Update Time Sheet</Text>
          </TouchableOpacity>
          <View style={{ paddingVertical: hp(5) }}></View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  //---------------------
  headerText: {
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs14,
    fontWeight: '500',
    color: '#686969',
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  textCheck: {
    color: '#686969',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs14,
    fontWeight: '600',
    textAlign: 'center',
  },
  hrs: {
    flex: 1,
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs16,
    fontWeight: '400',
    borderWidth: hp(0.1),
    borderColor: '#D2D2D2',
    // paddingHorizontal: hp(3),
    paddingVertical: hp(1),
    textAlign: 'center',
  },
  textInputZone: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  textInput: {
    marginVertical: hp(3),
    marginHorizontal: wp(4),
    height: hp(15),
    // width: wp(90),
    borderWidth: hp(0.15),
    borderColor: '#D2D2D2',
    borderRadius: hp(1),
  },
  txtInput: {
    padding: hp(1.5),
    color: '#444444',
    fontFamily: Font.PoppinsRegular,
    fontSize: FSize.fs13,
  },

  btnTwo: {
    height: hp(5),
    marginHorizontal: wp(10),
    marginTop: hp(2),
    backgroundColor: '#0D3068',
    paddingVertical: hp(0.4),
    borderRadius: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnTextTwo: {
    top: 1.5,
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: FSize.fs14,
    fontFamily: Font.PoppinsRegular,
  },
  endJob: {
    color: '#96989A',
  },
});
