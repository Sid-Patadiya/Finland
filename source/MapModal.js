import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    PermissionsAndroid,
    Dimensions,
    TouchableOpacity,
    Text,
    Image,
    FlatList,
    Modal,
    ImageBackground,
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
// import Geocoder from 'react-native-geocoder';
import Color from './theme/Color';
import { scale } from './theme/Scalling';
import Font from './theme/Font';
import FSize from './theme/FSize';
import Images from './theme/Images';
import { useDispatch, useSelector } from 'react-redux';
import { loaderAction } from './redux/Action/LoaderAction';
import { JobsNearMewcRequest } from './redux/Action/JobsNearMewcAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { RecommendedJobRequest } from '../../../redux/Action/RecommendedJobAction';


export default function MapModal({ navigation, visible, onRequestClose, onPress, currentLatitude, currentLongitude, searchJobsDatax, profileData }) {
    // console.log("searchJobsData",searchJobsDatax);
    // console.log("selectFilterItem>>>>>>>>>>>>", onRequestClose)
    const [searchJobsData, setSearchJobsData] = useState([])

    // const [updatedLatitude, setUpdatedLatitude] = useState(currentLatitude);
    // const [updatedLongitude, setUpdatedLongitude] = useState(currentLatitude);

    // useEffect(() => {
    //     if (searchJobsDatax !== null) {
    //         if (profileData.latitude !== null) {
    //             setUpdatedLatitude(parseFloat(profileData.latitude))
    //         }
    //         if (profileData.longitude !== null) {
    //             setUpdatedLongitude(parseFloat(profileData.longitude))
    //         }
    //     }
    // }, [])

    const [loginToken, setLoginToken] = useState('');
    // console.log('loginToken===', loginToken);

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('LoginAccessToken');
            // console.log('tokeprofileDatan--->', token);
            setLoginToken(token);
        })();
    }, [loginToken]);


    const selectFilterItem = (item) => {
        console.log('item----', item);
        let temp = searchJobsDatax;
        // console.log("selectFilterItem>>>>>>>>>>>>", temp)
        temp.map((tempItem, tenpIndex) => {
            // console.log('item ====>', tempItem);
            if (tempItem.id === item.id) {
                if (item.check !== undefined) {
                    if (item.check === true) {
                        item.check = false;
                        // navigation.navigate('MapBlackCardScreen', { item })
                        // onRequestClose
                        navigation.navigate('ExploreJobsBlackCardScreen',
                            { item, latitude: currentLatitude, longitude: currentLongitude })
                        onRequestClose()
                    } else {
                        item.check = true;
                    }
                } else {
                    temp[tenpIndex] = { ...tempItem, check: true };
                }
            } else {
                if (tempItem.check !== undefined) {
                    if (tempItem.check !== false) {
                        tempItem.check = false;
                    }
                }
            }
            setSearchJobsData([...temp]);
        });
    };
    // console.log('searchJobsDatax>>>>', searchJobsDatax)
    // console.log('profileData>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', profileData)


    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            {/* <Modal
                visible={visible}
                animationType='fade'
            > */}
            <TouchableOpacity style={{
                borderWidth: 1,
                backgroundColor: '#0D3068',

            }}
                onPress={onRequestClose}
            >
                <Text style={{
                    padding: 10,
                    fontSize: FSize.fs18,
                    fontFamily: Font.RobotoRegular,
                    color: '#FFFFFF'
                }}>Skip</Text>
            </TouchableOpacity>

            <MapView
                style={{ flex: 1, }}
                showsUserLocation={true}
                zoomControlEnabled
                loadingEnabled
                initialRegion={{
                    latitude: Number(parseFloat(currentLatitude)),
                    longitude: Number(parseFloat(currentLongitude)),
                    latitudeDelta: 5.272,
                    longitudeDelta: 5.222,
                }}
            >
                {searchJobsDatax.map(
                    (item, index) => (
                        (
                            <>
                                <Marker
                                    // onPress={() => [selectFilterItem(item), onRequestClose]}
                                    onPress={() => [selectFilterItem(item), { onRequestClose }]}
                                    key={item.id}
                                    coordinate={{
                                        latitude: parseFloat(item.work_location_lat),
                                        longitude: parseFloat(item.work_location_long),
                                    }}>
                                    <View style={{ flex: 6 }}>
                                        {item.check && (
                                            <View
                                                style={{
                                                    backgroundColor: 'white',
                                                    borderRadius: 5,
                                                    borderWidth: 2,
                                                    borderColor: '#CCD1D9'
                                                }}>

                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}>
                                                    <Text style={{ fontSize: scale(10), paddingLeft: 4, color: '#333333' }}>
                                                        {item.title}
                                                    </Text>
                                                    <View style={{ marginHorizontal: wp(1), }}>
                                                        {item.distance <= 1 ? (
                                                            <Text style={[styles.matchText, { color: '#000000' }]}>Less than a KM Away</Text>
                                                        ) : (
                                                            <Text style={[styles.matchText, { color: '#000000' }]}>{parseInt(item.distance)} KM Away</Text>
                                                        )}
                                                    </View>
                                                </View>
                                                <Text style={{ fontSize: scale(9), paddingLeft: 4, marginBottom: hp(1.5), color: '#444444' }}>
                                                    {item.company_details.company_name}
                                                </Text>

                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        marginHorizontal: wp(1)
                                                    }}>
                                                    {loginToken == null ? <View></View> :
                                                        <View style={styles.matchView}>
                                                            <ImageBackground
                                                                source={Images.rightCircle}
                                                                style={styles.rightCircleIcon}>
                                                                <Image
                                                                    source={Images.right}
                                                                    style={styles.rightIcon}
                                                                />
                                                            </ImageBackground>
                                                            <Text style={styles.matchText}>
                                                                {parseInt(item.percentage_match) == 0 || item.percentage_match == null ? '10 % Match' : parseInt(item.percentage_match) + '% Match'}
                                                            </Text>
                                                        </View>
                                                    }
                                                    <TouchableOpacity>
                                                        <Text
                                                            style={{
                                                                fontSize: FSize.fs10,
                                                                color: '#007AFF',
                                                                paddingRight: 2,
                                                            }}>
                                                            View Job
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )}

                                        <View style={{ alignItems: 'center', }}>
                                            <TouchableOpacity
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    borderColor: 'white',
                                                    borderWidth: 2,
                                                    borderRadius: 5,
                                                    overflow: 'hidden',
                                                    backgroundColor: '#773C0F',
                                                    borderWidth: hp(0.3),
                                                    borderColor: '#FFFFFF'
                                                }}>
                                                <Image
                                                    source={item.category_image == "" || item.category_image == null ? `${require('./assets/ico-carpenter.jpg')}` : { uri: item.category_image }}
                                                    resizeMode='cover'
                                                    style={{ width: 50, height: 50 }}
                                                />
                                            </TouchableOpacity>
                                            {loginToken == null ? null :
                                                <View style={[styles.matchView, { marginTop: -10 }]}>
                                                    <ImageBackground
                                                        source={Images.rightCircle}
                                                        style={styles.rightCircleIcon}>
                                                        <Image
                                                            source={Images.right}
                                                            style={styles.rightIcon}
                                                        />
                                                    </ImageBackground>
                                                    <Text style={styles.matchText}>
                                                        {parseInt(item.percentage_match) == 0 || item.percentage_match == null ? '10 %' : parseInt(item.percentage_match) + '%'}
                                                    </Text>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                </Marker>
                            </>
                        )
                    ),
                )}
            </MapView>


            {/* </Modal> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'#666',
        // height:widthPercentageToDP(100),
        backgroundColor: Color.BackgroundColor,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    matchView: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Color.Colorwhite,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
    },
    rightIcon: {
        height: scale(3.37),
        width: scale(4.47),
    },
    rightCircleIcon: {
        height: scale(8.5),
        width: scale(8.5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    matchText: {
        fontFamily: Font.PoppinsRegular,
        fontSize: 9,
        left: scale(3.49),
        top: scale(1),
        // color: Color.ColorBlack,
        color: 'red',
    },
})