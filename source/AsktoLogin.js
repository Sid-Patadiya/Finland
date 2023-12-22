import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import FSize from './theme/FSize'
import Font from './theme/Font'

export default function AsktoLogin({navigation}) {
  return (
    <View style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }}>
      <Text style={{
        marginHorizontal:widthPercentageToDP(15),
        textAlign:'center',
        lineHeight:heightPercentageToDP(4),
        fontSize:FSize.fs23,
        fontFamily:Font.PoppinsSemiBold
      }}>You don't have a login yet, Please do login/Signup to continue.</Text>
      <TouchableOpacity style={{
        marginTop:heightPercentageToDP(4),
        borderWidth:1,
        backgroundColor:'#0D3068',
        
      }}
      onPress={() => navigation.replace('AuthTopTabNavigation')}
      >
        <Text style={{
          padding:10,
          fontSize:FSize.fs18,
          fontFamily:Font.RobotoRegular,
          color:'#FFFFFF'
        }}>Signup/Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})