import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
    heightPercentageToDP,
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
// import { Lang } from '../../../translation/lang';
import Font from '../../../theme/Font';
import FSize from '../../../theme/FSize';
import SuccessModal from '../SuccessModal';
import { useSelector } from 'react-redux';


export default function NewExploreJobElement(props) {
    const isFocused = useIsFocused();
    const [showModal, setShowModal] = useState(false)

    // * * * * * * * LANGUAGE PART * * * * * * * 
    const [Lang, setLang] = useState({})
    useEffect(() => {
        AsyncStorage.getItem('LANGUAGE').then((lang) => {
            setLang(JSON.parse(lang));
        })
    }, [])
    // * * * * * * * LANGUAGE PART * * * * * * * 

    const [ln, setLn] = useState('en');
    useEffect(() => {
        const setLang = async () => {
            setLn(await AsyncStorage.getItem('LanguageCode'));
        };
        setLang();
    }, [isFocused]);

    return (
        <TouchableOpacity
            // activeOpacity={1}
            onPress={props.onPress}
            style={styles.box}>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 0.8,
                    }}>
                    <View style={styles.imageContainer}>
                        <ImageBackground
                            resizeMode="cover"
                            source={
                                props.category_image == '' || props.category_image == null
                                    ? `${require('../../../assets/Icon/backGround.png')}`
                                    : { uri: props.category_image }
                            }
                            style={{
                                height: '100%',
                                width: '100%',
                            }}>

                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // margin: 5,
                                    // marginTop: hp(1),
                                }}>
                                <LinearGradient
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 0, y: 0 }}
                                    colors={['rgba(0, 0, 0, 0) 100%)', '#020202']}
                                    style={{ width: '100%' }}>
                                    <View style={{flex:1,
                                    margin: 5,
                                    marginTop: hp(1),
                                    flexDirection:'row'
                                    }}>
                                        <View
                                            style={{
                                                height: 30,
                                                width: 30,
                                                borderRadius: 30,
                                                top: heightPercentageToDP(-1),
                                            }}>
                                            <Image
                                                style={{ height: '100%', width: '100%' }}
                                                resizeMode="contain"
                                                source={
                                                    props.image == '' || props.image == null || props.image == "https://staging.jobportalapi.atwpl.com/abc.png"
                                                        ? `${require('../../../assets/Icon/Vector.png')}`
                                                        : { uri: props.image }
                                                }></Image>
                                        </View>

                                        <View
                                            style={{ flex: 1, backgroundColor: ['rgba(2, 2, 2, 0.1)'] }}>
                                            <Text
                                                ellipsizeMode="tail"
                                                numberOfLines={1}
                                                style={{
                                                    fontSize: FSize.fs11,
                                                    paddingLeft: 2,
                                                    // top: heightPercentageToDP(-0.6),
                                                    width: wp(26),
                                                    color:'#FFFFFF'
                                                }}>
                                                {props.contact_person_name}
                                            </Text>
                                            <Text
                                                ellipsizeMode="tail"
                                                numberOfLines={1}
                                                style={[
                                                    styles.Heading,
                                                    {
                                                        fontSize: FSize.fs9,
                                                        paddingLeft: 2,
                                                        top: heightPercentageToDP(-1),
                                                        width: wp(26),
                                                        color:'#FFFFFF'
                                                    },
                                                ]}>
                                                {props.company_name}
                                            </Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </View>
                        </ImageBackground>
                    </View>
                    <TouchableOpacity
                        style={styles.applicationsBox}
                        // ? setShowModal(true)
                        // : handleShowModal();
                        onPress={props.onPressApply}>
                        <Text style={styles.applications}>
                            {Lang && Object.keys(Lang).length > 0 && Lang[ln].Recommended['Apply Now']}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1.2, paddingLeft: wp(2) }}>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flex: 1,
                        }}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                            style={[styles.Heading]}>{props.job}</Text>
                    </View>



                    <View style={{
                        paddingBottom: hp(2),
                        flex: 1,
                    }}>
                        {props.urgent == true ? (
                            <Text
                                numberOfLines={1}
                                ellipsizeMode={'tail'}
                                style={styles.subHeading}>
                                {Lang && Object.keys(Lang).length > 0 && Lang[ln].Recommended['Required']} {props.job}{' '}
                                {Lang && Object.keys(Lang).length > 0 && Lang[ln].Recommended['Immediately']}
                            </Text>
                        ) : null}
                    </View>

                    {props.experience == null ? null : (
                        <View style={[styles.spacebetween]}>
                            <Text style={styles.title}>
                                {Lang && Object.keys(Lang).length > 0 && Lang[ln].Recommended['Total Experience']}
                            </Text>
                            <Text style={styles.titleDetails}>
                                {props.experience} {Lang && Object.keys(Lang).length > 0 && Lang[ln].Recommended['Years']}
                            </Text>
                        </View>
                    )}

                    {props.location == '' ? null : (
                        <View style={styles.spacebetween}>
                            <Text style={styles.title}>
                                {Lang && Object.keys(Lang).length > 0 && Lang[ln].Recommended['Work Location']}
                            </Text>
                            <Text style={styles.titleDetails}>{props.location}</Text>
                        </View>
                    )}

                    {props.package == '' || props.package ==null ? null : (
                        <View style={styles.spacebetween}>
                            <Text style={styles.title}>
                                {Lang && Object.keys(Lang).length > 0 && Lang[ln].Recommended['Package']}
                            </Text>
                            <Text style={styles.titleDetails}>
                                {props.currency} {props.package}/{props.compensation_details}
                            </Text>
                        </View>
                    )}

                    {props.empType == '' || props.empType == null ? null : (
                        <View
                            style={[
                                styles.spacebetween,
                                { display: 'flex', flexWrap: 'wrap' },
                            ]}>
                            <Text style={styles.title}>
                                {Lang && Object.keys(Lang).length > 0 && Lang[ln].Recommended['Employment Type']}
                            </Text>
                            <Text style={styles.titleDetails}>{props.empType}</Text>
                        </View>
                    )}
                    {props.penShow === true ? (
                        <View style={{ position: 'absolute', right: 0, top: -10 }}>
                            <Menu
                                visible={props.visible}
                                anchor={
                                    <TouchableOpacity
                                        onPress={props.onPressPen}
                                        style={{
                                            height: 20,
                                            width: 20,
                                            position: 'absolute',
                                            right: -5,
                                            // top: -10,
                                        }}>
                                        <Image
                                            source={require('../../../assets/Icon/editB.png')}
                                            style={{ height: 20, width: 20 }}
                                        />
                                    </TouchableOpacity>
                                }
                                onRequestClose={props.onRequestClose}>
                                <MenuItem onPress={props.Delete}>Delete</MenuItem>
                            </Menu>
                        </View>
                    ) : null}
                </View>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: hp(2),
                    alignItems: 'center',
                }}>
                {props.kmAway == '' ? null : (
                    <Text style={styles.posted}>
                        {Lang && Object.keys(Lang).length > 0 && Lang[ln].Recommended['Current Location']}: {parseInt((props.kmAway))} KM Away{Lang && Object.keys(Lang).length > 0 && Lang[ln].Recommended[' Away']}
                    </Text>
                )}

                {props.posted == null ? null : (
                    <Text style={styles.posted}>
                        {Lang && Object.keys(Lang).length > 0 && Lang[ln].Recommended['Posted']} {parseInt(Math.ceil(props.posted))}{' '}
                        {Lang && Object.keys(Lang).length > 0 && Lang[ln].Recommended['ago']}
                    </Text>
                )}

                {props.as == null ? null : (
                    <View style={styles.appSent}>
                        <Text style={styles.appSentText}>
                            {Lang && Object.keys(Lang).length > 0 && Lang[ln].Recommended['Application sent']}
                            {` `}
                            {props.as} {` `} {Lang && Object.keys(Lang).length > 0 && Lang[ln].Recommended['ago']}
                        </Text>
                    </View>
                )}
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    img: {
        width: '60%',
        height: '60%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    box: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: wp(3),
        paddingVertical: hp(1.5),
        marginHorizontal: hp(2),
        marginVertical: hp(1),
        borderRadius: hp(0.5),
    },
    imageContainer: {
        backgroundColor: '#F0F6FF',
        // height: '120%',
        // width: hp(17),
        width: '100%',
        height: '100%',
        flex: 1.2,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 10,
    },
    viewedZone: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        bottom: -10,
    },
    applicationsBox: {
        // flex: 1,
        height: hp(3),
        position: 'absolute',
        bottom: hp(-1.5),
        // marginHorizontal: wp(2),
        borderRadius: hp(3),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0858AF',
        alignSelf: 'center',
    },

    Heading: {
        color: '#454545',
        // width: wp(47),
        fontWeight: '500',
        fontSize: FSize.fs15,
        lineHeight: 22,
        fontFamily: Font.PoppinsRegular,
    },
    subHeading: {
        color: '#454545',
        fontWeight: '400',
        fontSize: FSize.fs10,
        fontFamily: Font.PoppinsRegular,
        // lineHeight:22
    },
    spacebetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingTop: hp(1.5)
    },
    title: {
        color: '#444444',
        fontWeight: '300',
        // lineHeight:22,
        fontSize: FSize.fs10,
        fontFamily: Font.PoppinsRegular,
    },
    titleDetails: {
        color: '#444444',
        fontFamily: Font.PoppinsSemiBold,
        fontSize: FSize.fs10,
        fontWeight: '400',
        textAlign: 'right',
    },
    posted: {
        color: '#b3b3b3',
        fontSize: FSize.fs8,
        textAlign: 'right',
        fontFamily: Font.PoppinsSemiBold,
        // fontWeight: '400',
    },
    applications: {
        top: 1,
        color: '#FFFFFF',
        fontSize: FSize.fs10,
        fontWeight: '400',
        fontFamily: Font.PoppinsRegular,
        paddingHorizontal: wp(3),
    },
    percentMatch: {
        color: '#1B2C6B',
        fontSize: FSize.fs8,
        fontWeight: '400',
        fontFamily: Font.PoppinsRegular,
    },
    appSent: {
        backgroundColor: '#D5FDD9',
        paddingHorizontal: wp(4),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(2),
        height: hp(3),
    },
    appSentText: {
        color: '#0D3F12',
        fontFamily: Font.PoppinsRegular,
        fontSize: FSize.fs7,
    },
});
