import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale} from '../Scalling';

export default function MySubscriptionSkeleton(props) {
  return (
    <SkeletonPlaceholder enabled={props.enabled}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: scale(8),
          }}>
          <View
            style={{
              height: scale(8),
              width: scale(160),
              borderRadius: scale(10),
            }}
          />
          <View
            style={{
              height: scale(8),
              width: scale(100),
              borderRadius: scale(10),
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: scale(8),
          }}>
          <View
            style={{
              height: scale(8),
              width: scale(160),
              borderRadius: scale(10),
            }}
          />
          <View
            style={{
              height: scale(8),
              width: scale(100),
              borderRadius: scale(10),
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: scale(8),
          }}>
          <View
            style={{
              height: scale(8),
              width: scale(160),
              borderRadius: scale(10),
            }}
          />
          <View
            style={{
              height: scale(8),
              width: scale(100),
              borderRadius: scale(10),
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: scale(8),
          }}>
          <View
            style={{
              height: scale(8),
              width: scale(160),
              borderRadius: scale(10),
            }}
          />
          <View
            style={{
              height: scale(8),
              width: scale(100),
              borderRadius: scale(10),
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: scale(8),
          }}>
          <View
            style={{
              height: scale(8),
              width: scale(160),
              borderRadius: scale(10),
            }}
          />
          <View
            style={{
              height: scale(8),
              width: scale(100),
              borderRadius: scale(10),
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: scale(8),
          }}>
          <View
            style={{
              height: scale(8),
              width: scale(160),
              borderRadius: scale(10),
            }}
          />
          <View
            style={{
              height: scale(8),
              width: scale(100),
              borderRadius: scale(10),
            }}
          />
        </View>
        <View
          style={{
            height: scale(40),
            width: scale(150),
            borderRadius: scale(30),
            alignSelf: 'center',
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
}
