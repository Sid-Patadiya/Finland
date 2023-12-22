import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AccordianJS from '../../../component/AccordianJS';
import HeaderNavigation from '../../../component/HeaderNavigation';
import OGJChildJs from '../../../component/OGJChildJs';
import { TimeSheetRequest } from '../../../redux/Action/TimeSheetAction';
import Color from '../../../theme/Color';
import { SearchJosRequest } from '../../../redux/Action/SearchJobsAction';
import { GetTimeSheetRequest } from '../../../redux/Action/GetTimeSheetData';
import moment from 'moment';
import { OngoingJobsRequest } from '../../../redux/Action/OngoingJobsAction';
import { CreateTimeSheetRequest } from '../../../redux/Action/CreateTimeSheetAction';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { CreateEndJobRequest } from '../../../redux/Action/EndJobAction';
import { useIsFocused } from '@react-navigation/native';
import SuccessModal from '../SuccessModal';
import { loaderAction } from '../../../redux/Action/LoaderAction';


export default function TimeSheetDetails({ navigation, route }) {
  const sheetData = route.params;
  console.log('sheetData==', sheetData.id.timesheet_id);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [timeSheet, setTimeSheet] = useState([]);

  const TimeSheetResponse = useSelector(state => state.timeSheet);
  console.log('TimeSheetResponse -----> ', JSON.stringify(timeSheet));

  useEffect(() => {
    let bodydata = {
      timesheet_id: parseFloat(sheetData.id.timesheet_id),
    };
    dispatch(TimeSheetRequest(bodydata));
  }, [isFocused]);
  useEffect(() => {
    if (TimeSheetResponse.data !== null) {
      // setTimeSheet(TimeSheetResponse.data.data);


      let finalObj = {};
      TimeSheetResponse.data.data.forEach(item => {
        if (finalObj[item?.date]) {
          finalObj[item?.date].push(item);
        } else {
          finalObj[item?.date] = [item];
        }
      });
      let tmp = [];
      Object.keys(finalObj).map(v => {
        tmp.push({
          date: v,
          data: [...finalObj[v]],
        });
        console.log('*** date with data ***', JSON.stringify(tmp));
        setTimeSheet([...tmp]);
      });
    }
    // else {
    //   let bodydata = {
    //     timesheet_id: parseFloat(sheetData.id.timesheet_id),
    //   };
    //   dispatch(TimeSheetRequest(bodydata));
    // }
  }, [TimeSheetResponse.data]);

  useEffect(() => {
    let bodydata = {
      timesheet_id: parseFloat(sheetData.id.timesheet_id),
    };
    dispatch(TimeSheetRequest(bodydata));
  }, [isFocused, sheetData]);

  //----------------------------------- OnGoing Jobs Api Call -----------------------------\\
  const [ongoingData, setOngoingData] = useState([]);
  const [allData, setAllData] = useState([]);

  const OngoingJobsResponse = useSelector(state => state.ongoingJobs);
  console.log('OngoingJobsResponse -----> ', OngoingJobsResponse);

  useEffect(() => {
    if (OngoingJobsResponse.data !== null) {
      setOngoingData(OngoingJobsResponse.data);
      setAllData(OngoingJobsResponse.data);
    } else {
      dispatch(OngoingJobsRequest());
      dispatch(loaderAction(true));
    }
  }, [OngoingJobsResponse.data]);
  useEffect(() => {
    dispatch(OngoingJobsRequest());
  }, [isFocused]);

  const UpdateTimeSheet = item => {
    let bodydata = {
      application_id: item.id,
      from_date: item.from_date,
      to_date: item.to_date,
      end_Jobs: false,
    };
    console.log(bodydata);
    dispatch(
      CreateTimeSheetRequest(bodydata, item, navigation, {
        key: 'UpdateTimeSheet',
      }),
    );

    // navigation.navigate('UpdateTimeSheetJS', {item});
  };

  // end job------------------------------------------------------------------------------
  const endJob = item => {
    let bodydata = {
      vacancy_id: item.vacancy,
    };
    console.log(bodydata);
    dispatch(CreateEndJobRequest(bodydata));
    // navigation.navigate('UpdateTimeSheetJS');
  };
  const [show, setShow] = useState(false)

  return (
    <View style={styles.container}>
      <HeaderNavigation
        onPress={() => navigation.goBack()}
        heading={'TimeSheet Details'}
      />

      <OGJChildJs
        // onPressTxt={'Update Time Sheet'}//implement the function
        onPress={() => UpdateTimeSheet(sheetData.item)}
        // endJob={() => endJob(sheetData.item)}
        endJob={() => setShow(true)}
        bgImage={sheetData.item.company_image}
        profilePic={sheetData.item.recruiter_image}
        name={sheetData.item.recruiter_name}
        desc={sheetData.item.company_name} //company name:--company_name
        match={sheetData.item.percent_match}
        urgent_vacancy={sheetData.item.urgent_vacancy} //urgent
        // job={sheetData.item.job_title}
        job={
          sheetData.item.job_title +
          '( Job A' +
          sheetData.item.vacancy +
          ' )'
        }
        hireDate={moment(
          sheetData.item.hire_date.split('-').reverse().join('-'),
        ).format('DD MMM, YYYY')}
        duration={
          moment(
            sheetData.item.hire_date.split('-').reverse().join('-'),
          ).format('DD MMM, YYYY') +
          ' - ' +
          moment(
            sheetData.item.hire_date.split('-').reverse().join('-'),
          ).format('DD MMM, YYYY')
        }
        tHours={sheetData.item.no_of_hours}
        from_date={sheetData.item.from_date}
        to_date={sheetData.item.to_date}
      />
      <SuccessModal
        visible={show}
        onRequestClose={() => setShow(false)}
        message={'Are you sure, you want to end this job?'}
        onPress={() => setShow(false)}
        onPressOk={() => {
          endJob(sheetData.item);
          setShow(false);
        }}
      />
      <ScrollView style={{ marginBottom: heightPercentageToDP(5) }}>
        <Text style={{ paddingHorizontal: 10, padding: 10 }}>Time Sheet</Text>
        <View style={{ marginHorizontal: 15 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            // listKey={props.listKey}
            data={timeSheet}
            // keyExtractor={(item) => { item.id }}
            renderItem={({ item }) => {
              console.log(item)
              return (
                <AccordianJS
                  date={item.date}
                  data={item.data}
                // check_in_time={item.check_in_time}
                // check_out_time={item.check_out_time}
                // hours={item.hours}
                // desc={item.task_details}
                // created_at={item.created_at}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Colorwhite,
  },
});