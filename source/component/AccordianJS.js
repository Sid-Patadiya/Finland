import React, { Component, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Font from '../theme/Font';
import FSize from '../theme/FSize';

// export default class AccordianJS extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: props.data,
//       expanded: false,
//     };

//     if (Platform.OS === 'android') {
//       UIManager.setLayoutAnimationEnabledExperimental(true);
//     }
//   }

//    render() {
//     return (
//       <View>
//         <TouchableOpacity
//           ref={this.accordian}
//           style={styles.row}
//           onPress={() => this.toggleExpand()}>
//           <Text style={[styles.text, {fontSize: FSize.fs14}]}>
//             {this.props.date}
//           </Text>

//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             <View>
//               <Text
//                 style={[
//                   styles.text,
//                   {fontSize: FSize.fs11, paddingRight: widthPercentageToDP(2)},
//                 ]}>
//                 {this.props.hours} Hours
//               </Text>
//             </View>

//             <View
//               style={{
//                 width: heightPercentageToDP(2.4),
//                 height: heightPercentageToDP(2.4),
//               }}>
//               <Image
//                 style={styles.img}
//                 source={
//                   this.state.expanded
//                     ? require('../assets/Icon/upArrowLIGHT.png')
//                     : require('../assets/Icon/downArrowLight.png')
//                 }
//               />
//             </View>
//           </View>
//         </TouchableOpacity>

//         <View />
//         {this.state.expanded && (
//           <View style={{paddingVertical: heightPercentageToDP(1)}}>
//             <Text style={styles.desc}>{this.props.desc}</Text>
//           </View>
//         )}
//         <View style={styles.line}></View>
//       </View>
//     );
//   }

//   toggleExpand = () => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     this.setState({expanded: !this.state.expanded});
//   };
// }
export default function AccordianJS(props) {
  const [expanded, setExpanded] = useState(false);
  // const [toggleExpand, setToggleExpand] = useState(false);
  const [accordian, setAccordian] = useState(false);

  const toggleExpanded = () => {
    //Toggling the state of single Collapsible
    setExpanded(!expanded);
  };
  // if (Platform.OS === 'android') {
  //         UIManager.setLayoutAnimationEnabledExperimental(true);
  //       }
  //     }
  // let s1 = props.check_in_time;
  // console.log("cit", cit);

  // let s2 = props.check_out_time;
  // console.log("cot", cot);



  // JavaScript program to find difference between two
  // given times.

  // remove ':' and convert it into an integer
  function removeColon(s) {
    if (s.length == 4)
      s = s.replace(":", "");

    if (s.length == 5)
      s = s.replace(":", "");

    return parseInt(s);
  }

  // Main function which finds difference
  function diff(s1, s2) {

    // change string (eg. 2:21 --> 221, 00:23 --> 23)
    var time1 = removeColon(s1);

    var time2 = removeColon(s2);


    // difference between hours
    var hourDiff = parseInt(time2 / 100 - time1 / 100 - 1);

    // difference between minutes
    var minDiff = parseInt(time2 % 100 + (60 - time1 % 100));

    if (minDiff >= 60) {
      hourDiff++;
      minDiff = minDiff - 60;
    }

    // convert answer again in string with ':'
    var res = (hourDiff).toString() + ':' + (minDiff).toString();
    return res;
  }

  return (
    <View>
      <TouchableOpacity
        // ref={accordian}
        style={styles.row}
        onPress={toggleExpanded}>
        <Text style={[styles.text, { fontSize: FSize.fs14 }]}>
          {props.date}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            {/* <Text
              style={[
                styles.text,
                { fontSize: FSize.fs11, paddingRight: widthPercentageToDP(2) },
              ]}>
              {diff(s1, s2)}0 hours
            </Text> */}
          </View>

          <View
            style={{
              width: heightPercentageToDP(2.4),
              height: heightPercentageToDP(2.4),
            }}>
            <Image
              style={styles.img}
              source={
                expanded == true
                  ? require('../assets/Icon/upArrowLIGHT.png')
                  : require('../assets/Icon/downArrowLight.png')
              }
            />
          </View>
        </View>
      </TouchableOpacity>

      <View />
      {expanded == true ? (
        <>
          {props.data.map((item) => {
            return (
              <View style={{ paddingVertical: heightPercentageToDP(1) }}>
                <Text style={styles.time}>{item.check_in_time} - {item.check_out_time}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                  <Text style={styles.desc}>{item.task_details}</Text>

                  <Text
                    style={[
                      styles.text,
                      { fontSize: FSize.fs11, paddingRight: widthPercentageToDP(2) },
                    ]}>
                    {diff(item.check_in_time, item.check_out_time)}0 hours
                  </Text>
                </View>
              </View>)
          })}
        </>
      ) : null}
      <View style={styles.line}></View>
    </View >
  )
}


const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  row: {
    paddingVertical: heightPercentageToDP(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    // fontSize: 12,
    color: '#444444',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    lineHeight: 22,
  },
  desc: {
    color: '#444444',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    lineHeight: 15,
    fontSize: FSize.fs13,
  },
  line: {
    borderBottomWidth: heightPercentageToDP(0.1),
    borderColor: '#D2D2D2',
    marginTop: heightPercentageToDP(0.5),
  },
  time: {
    color: '#000',
    fontFamily: Font.PoppinsSemiBold,
    fontWeight: '400',
    lineHeight: 15,
    fontSize: FSize.fs15,
  }
});
