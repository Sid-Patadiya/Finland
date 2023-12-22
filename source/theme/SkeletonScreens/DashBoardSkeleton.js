import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale} from '../Scalling';

export default function DashBoardSkeleton(props) {
  return (
    <SkeletonPlaceholder
      enabled={props.enabled}
      highlightColor="#E1E9EE"
      backgroundColor="#F2F8FC">
      <View style={{}}>
        <View
          style={{
            height: scale(10),
            width: scale(300),
            borderRadius: scale(10),
            marginTop: scale(20),
            alignSelf: 'center',
          }}></View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: scale(20),
          }}>
          <View
            style={{
              height: scale(220),
              width: scale(220),
              borderRadius: scale(10),
              marginHorizontal: scale(20),
            }}
          />
          <View
            style={{
              height: scale(220),
              width: scale(220),
              borderRadius: scale(10),
            }}
          />
        </View>
        <View
          style={{
            height: scale(180),
            width: scale(310),
            borderRadius: scale(10),
            marginTop: scale(20),
            marginHorizontal: scale(20),
          }}
        />
        <View
          style={{
            height: scale(10),
            width: scale(300),
            borderRadius: scale(10),
            marginTop: scale(20),
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            height: scale(120),
            width: scale(310),
            borderRadius: scale(10),
            marginTop: scale(20),
            marginHorizontal: scale(20),
          }}
        />
        <View
          style={{
            height: scale(120),
            width: scale(310),
            borderRadius: scale(10),
            marginTop: scale(20),
            marginHorizontal: scale(20),
          }}
        />
        <View
          style={{
            height: scale(140),
            width: scale(310),
            borderRadius: scale(10),
            marginTop: scale(20),
            marginHorizontal: scale(20),
          }}
        />
        <View
          style={{
            height: scale(10),
            width: scale(300),
            borderRadius: scale(10),
            marginTop: scale(20),
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: scale(20),
          }}>
          <View
            style={{
              height: scale(400),
              width: scale(220),
              borderRadius: scale(10),
              marginHorizontal: scale(20),
            }}
          />
          <View
            style={{
              height: scale(400),
              width: scale(220),
              borderRadius: scale(10),
            }}
          />
        </View>
        <View
          style={{
            height: scale(10),
            width: scale(300),
            borderRadius: scale(10),
            marginTop: scale(20),
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: scale(20),
          }}>
          <View
            style={{
              height: scale(70),
              width: scale(220),
              borderRadius: scale(10),
              marginHorizontal: scale(20),
            }}
          />
          <View
            style={{
              height: scale(70),
              width: scale(220),
              borderRadius: scale(10),
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: scale(20),
          }}>
          <View
            style={{
              height: scale(70),
              width: scale(220),
              borderRadius: scale(10),
              marginHorizontal: scale(20),
            }}
          />
          <View
            style={{
              height: scale(70),
              width: scale(220),
              borderRadius: scale(10),
            }}
          />
        </View>
        <View
          style={{
            height: scale(10),
            width: scale(300),
            borderRadius: scale(10),
            marginTop: scale(20),
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            height: scale(120),
            width: scale(310),
            borderRadius: scale(10),
            marginTop: scale(20),
            marginHorizontal: scale(20),
          }}
        />
        <View
          style={{
            height: scale(120),
            width: scale(310),
            borderRadius: scale(10),
            marginTop: scale(20),
            marginHorizontal: scale(20),
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
}
