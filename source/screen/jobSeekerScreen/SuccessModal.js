import React from 'react'
import { StyleSheet, Text, View, Image, Modal, TouchableOpacity } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";
import Font from '../../theme/Font';
import FSize from '../../theme/FSize';

const SuccessModal = ({ visible, onRequestClose, onPress, message, onPressOk }) => {
    // const [modalVisible, setModalVisible] = useState(false);
    // const [showModal, setShowModal] = useState(false);
    return (
        <Modal
            visible={visible}
            transparent
            onRequestClose={onRequestClose}
            animationType='fade'
        >
            <TouchableOpacity
                activeOpacity={1}
                style={styles.mainViewx}
                onPress={onRequestClose}
            >
                <View style={styles.requestModalView}>

                    <Text style={styles.requestModalText}>{message} </Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={onPressOk}
                        style={styles.requestButton}
                    >

                        <Text style={styles.btnText}>Ok</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={onPress}
                        style={styles.requestButton}
                    >
                        <Text style={styles.btnText}>Not Now</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default SuccessModal

const styles = StyleSheet.create({
    btnText: {
        color: "#ffff",
        // fontFamily: Font.latoBold,
        fontSize: FSize.fs14,
        lineHeight: 20,
    },
    mainView: {
        flex: 1,
        backgroundColor: "#212025",
    },
    mainViewx: {
        flex: 1,
        borderTopEndRadius: hp(4),
        borderTopStartRadius: hp(4),
        backgroundColor: "#000000aa",
        justifyContent: "center",
        alignItems: "center",
    },

    picBackground: {
        height: hp(7),
        width: hp(16),
        backgroundColor: "#5F488A",
        borderBottomEndRadius: hp(8),
        borderBottomStartRadius: hp(8),
        alignItems: "center",
    },
    imageStyle: {
        height: hp(7),
        width: hp(7),
        borderWidth: hp(0.3),
        borderColor: "#fff",

        marginTop: hp(1.5),
        alignItems: "center",
        justifyContent: "center",
    },
    headPicHeightWidth: {
        height: hp(6.8),
        width: hp(6.8),
        resizeMode: "contain",
    },
    //----
    tableText: {
        // fontSize: wp(5),
        fontSize: FSize.fs16,
        color: "#FFFF",
        marginHorizontal: hp(1),
        marginVertical: hp(1),
        // fontFamily: Font.latoRegular,
    },
    profileImage: {
        // flex: 0.33,
        height: hp(24.4),
        width: wp(33.33),
        justifyContent: "flex-end",
    },
    nameView: {
        flexDirection: "row",
        margin: 10,
        alignItems: "center",
    },
    nameText: {
        color: "#FFFF",
        paddingHorizontal: hp(0.5),
        // fontFamily: Font.latoRegular,
    },
    redCircleImage: {
        height: hp(1.2),
        width: hp(1.2),
        backgroundColor: "#ff0000",
        borderRadius: hp(1),
        alignItems: "center",
    },
    whiteDotsStyle: {
        padding: 10,
        position: "absolute",
        alignSelf: "flex-end",
    },
    whiteDotsImage: {
        height: hp(3.5),
        width: hp(1),
    },
    //---------------------Modal

    modalView: {
        backgroundColor: "#212025",
        // paddingVertical: hp(5),
        height: hp(40),
        opacity: 0.9,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    skipText: {
        color: "white",
        fontWeight: "500",
        fontSize: FSize.fs16,
        paddingHorizontal: hp(5),
        textAlign: "right",
        bottom: hp(-2),
    },
    triangleView: {
        width: 0,
        height: 0,
        borderLeftWidth: 13,
        borderRightWidth: 13,
        borderBottomWidth: 20,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "#E9BE50",
        marginLeft: hp(13),
    },
    textView: {
        backgroundColor: "#E9BE50",
        borderRadius: 20,
        marginHorizontal: hp(4),
    },
    nameTextx: {
        color: "black",
        fontWeight: "600",
        fontSize: FSize.fs18,
        // fontFamily: Font.latoBold,
        paddingHorizontal: hp(3),
        paddingVertical: hp(1),
    },
    containtText: {
        color: "black",
        fontWeight: "400",
        fontSize: FSize.fs14,
        // fontFamily: Font.latoRegular,
        paddingHorizontal: hp(3),
        textAlign: "auto",
        paddingBottom: hp(4),
    },
    okGotit_Text: {
        color: "white",
        fontWeight: "500",
        fontSize: FSize.fs16,
        // fontFamily: Font.latoRegular,
        paddingHorizontal: hp(5),
        textAlign: "right",
        marginTop: hp(2),
    },
    //-----------------------RequestModal

    requestModalView: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: hp(3),
        borderRadius: 20,
        alignItems: "center",
        paddingVertical: hp(1),
        width: wp(70)
    },

    requestModalText: {
        color: "black",
        fontWeight: "400",
        fontSize: FSize.fs14,
        // fontFamily: Font.latoSemiB,
        paddingHorizontal: hp(6),
        textAlign: "center",
        paddingBottom: hp(1),
        marginTop: hp(2),
    },
    requestButton: {
        padding: hp(1),
        borderRadius: 20,
        paddingHorizontal: hp(5),
        marginVertical: hp(1),
        backgroundColor:'#0858AF'
    },
    messageImageView: {
        backgroundColor: "#E9BE50",
        borderWidth: 4,
        borderColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        height: hp(11),
        width: hp(11),
        marginTop: hp(-4.5),
        shadowColor: "#171717",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
});