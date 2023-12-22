// import React, { useState, useEffect } from 'react'
// import { StyleSheet, Text, View, PermissionsAndroid, TouchableOpacity, ScrollView, Image, Platform } from 'react-native'
// import { c, Colors } from '../../../commonCSS/Style';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import Font from '../../../theme/Font';
// import FSize from '../../../theme/FSize';
// import LinearGradient from 'react-native-linear-gradient';
// import BackNav from '../../../CommonComponents/BackNav';
// import Header from '../../../CommonComponents/Header';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import Pdf from 'react-native-pdf';
// import Share from 'react-native-share';
// import RNFetchBlob from "react-native-blob-util";
// import moment from 'moment';
// import Loader from '../../../components/Loader';

// export default function ShareAndDownloadpdf({ navigation, route }) {
//     const { inputData } = route.params;
//     const [filePath, setFilePath] = useState('');
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         createPDF()
//     }, [])

//     // const sharePdf = async () => {
//     //     let base64Data = await RNFetchBlob.fs.readFile(filePath, 'base64')
//     //     const shareOptions = {
//     //         title: "trainer's profile",
//     //         message: `trainer's profile`,
//     //         url: 'data:application/pdf;base64,' + base64Data
//     //     };
//     //     try {
//     //         const ShareResponse = await Share.open(shareOptions);
//     //         console.log('Result =>', ShareResponse);
//     //     } catch (error) {
//     //         console.log('Error =>', error);
//     //     }
//     // };

//     const downloadPdf = async () => {
//         setLoading(true)
//         const { config, fs } = RNFetchBlob;
//         const downloads = "/storage/emulated/0/download";
//         let downloadTo = downloads + '/' + "CatZapp" + moment().format('DDMMYYhhmmss') + '.pdf';
//         fs.cp(filePath, downloadTo).then((res) => {
//             console.log('file downloaded @', downloadTo)
//             setLoading(false)
//         }).catch((error) => {
//             console.log('*** error ***', error)
//             setLoading(false)
//         })
//     };

//     const isPermitted = async () => {
//         if (Platform.OS === 'android') {
//             try {
//                 const granted = await PermissionsAndroid.request(
//                     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
//                     title: 'External Storage Write Permission',
//                     message: 'App needs access to Storage data',
//                 },
//                 );
//                 return granted === PermissionsAndroid.RESULTS.GRANTED;
//             } catch (err) {
//                 // alert('Write permission err', err);
//                 return false;
//             }
//         } else {
//             return true;
//         }
//     };



//     const createPDF = async () => {
//         console.log("inputData --->", inputData)
//         const html = `
        
// <body style="margin: 0px;padding:0px;">
//     <div style="background-color: white;margin: 0px;padding: 0px;">

//         <div style="background-color: ${Colors.yellow};display:flex;flex-direction: row;">
//             <img style="width:35%" src="${inputData?.profile_photo}" alt="trainer image">
//             <div
//                 style="display: inline-block;justify-content: center;align-items:center;flex-direction: column;margin-left: 20px;margin-top: auto;margin-bottom: auto;">
//                 <h3 style="color: ${Colors.primary};margin: 0px 0px 10px 0px;">${inputData.first_name && inputData.first_name} ${inputData.last_name && inputData.last_name}</h3>
//                 <p style="color: ${Colors.grey};margin: 0px;">Trainer</p>
//             </div>
//         </div>
//         <div style="padding: 30px;">
//             <h3 style="color: ${Colors.primary};margin: 0px;">About Me</h3>
//             <hr color="${Colors.primary};" style="margin: 8px 0px;border-color: ${Colors.primary};">
//             <p style="color: ${Colors.grey};margin: 0px 0px 20px 0px;">${inputData.short_bio || ''}</p>
//             <h3 style="color: ${Colors.primary};margin: 0px;">My Areas of Expertise</h3>
//             <hr color="${Colors.primary};" style="margin: 8px 0px;border-color: ${Colors.primary};">
//             <p style="color: ${Colors.grey};margin: 0px 0px 20px 0px;">${inputData.areas_of_expertise || ''}</p>
//             <h3 style="color: ${Colors.primary};margin: 0px;">I cater to sectors like</h3>
//             <hr color="${Colors.primary};" style="margin: 8px 0px;border-color: ${Colors.primary};">
//             <p style="color: ${Colors.grey};margin: 0px 0px 20px 0px;">${inputData.sectors_of_cater || ''}</p>
//             <h3 style="color: ${Colors.primary};margin: 0px 0px 20px 0px;">I have been providing Traineing for the past <span
//                     style="color: ${Colors.grey};">${inputData.trainer_experience || ''}</span>
//             </h3>
//             <h3 style="color: ${Colors.primary};margin: 0px 0px 20px 0px;">My qualifications are <span
//                     style="color: ${Colors.grey};">${inputData.educational_qualification || ''}</span>
//             </h3>
//             <h3 style="color: ${Colors.primary};margin: 0px;">Here is a demo of my session</h3>
//             <hr color="${Colors.primary};" style="margin: 8px 0px;border-color: ${Colors.primary};">
//             <p style="color: ${Colors.grey};margin: 0px 0px 20px 0px;">
//                 http://youtube.com/demo
//             </p>
//             <h3 style="color: ${Colors.primary};margin: 0px;">My areas of Interest</h3>
//             <hr color="${Colors.primary};" style="margin: 8px 0px;border-color: ${Colors.primary};">
//             <p style="color: ${Colors.grey};margin: 0px 0px 20px 0px;">${inputData.hobbies || ''}</p>

//         </div>
//     </div>
// </body>
// `

//         if (await isPermitted()) {
//             let options = {
//                 //Content to print
//                 html: html,
//                 //File Name
//                 fileName: 'test',
//                 //File directory
//                 directory: 'docs',
//             };
//             let file = await RNHTMLtoPDF.convert(options);
//             console.log(file.filePath);
//             setFilePath(file.filePath);
//         }
//     };

//     return (
//         <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
//             <Header navigation={navigation} />
//             <BackNav
//                 heading="Trainee Profile"
//                 onPress={() => navigation.goBack()}
//             // onPress={() => navigation.navigate('MyProfile')}
//             />
//             <View style={{ marginTop: hp(-2), flex: 1, backgroundColor: '#FFFFFF' }}>
//                 <View style={{ ...c.row, paddingHorizontal: wp(5), height: hp(6) }}>
//                     <TouchableOpacity
//                         activeOpacity={0.9}
//                         onPress={() => downloadPdf()}
//                         style={{ height: hp(6), flex: 1 }}
//                     >
//                         <LinearGradient
//                             colors={["#365F70", "#FF6DF8"]}
//                             start={{ x: -0.6, y: 1 }}
//                             end={{ x: 1, y: 1 }}
//                             style={styles.saveBtn}
//                         >
//                             <Text style={styles.btnTitle}>Download</Text>
//                         </LinearGradient>
//                     </TouchableOpacity>
//                     <View style={{ width: wp(4) }} />
//                     <TouchableOpacity
//                         activeOpacity={0.9}
//                         onPress={() => sharePdf()}
//                         style={{ height: hp(6), flex: 1 }}
//                     >
//                         <LinearGradient
//                             colors={["#365F70", "#FF6DF8"]}
//                             start={{ x: -0.6, y: 1 }}
//                             end={{ x: 1, y: 1 }}
//                             style={styles.saveBtn}
//                         >
//                             <Text style={styles.btnTitle}>Share</Text>
//                         </LinearGradient>
//                     </TouchableOpacity>
//                 </View>


//                 <Pdf
//                     source={{ uri: filePath }}
//                     onLoadComplete={(numberOfPages, filePath) => {
//                         console.log(`Number of pages: ${numberOfPages}`);
//                     }}
//                     onPageChanged={(page, numberOfPages) => {
//                         console.log(`Current page: ${page}`);
//                     }}
//                     onError={(error) => {
//                         console.log(error);
//                     }}
//                     onPressLink={(uri) => {
//                         console.log(`Link pressed: ${uri}`);
//                     }}
//                     style={{ flex: 1, backgroundColor: Colors.white }}
//                 />

//             </View>
//             <Loader visible={loading} />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     btnTitle: {
//         fontFamily: Font.latoSemiB,
//         fontSize: FSize.fs14,
//         color: Colors.white
//     },
//     saveBtn: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: wp(4),
//         paddingVertical: hp(2)
//     },
//     title: {
//         fontFamily: Font.latoSemiB,
//         fontSize: FSize.fs14,
//         color: Colors.primary
//     },
//     desc: {
//         fontFamily: Font.latoSemiB,
//         fontSize: FSize.fs14,
//         color: Colors.grey
//     }
// })