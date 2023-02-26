import {ReactNode} from 'react';
import {SafeAreaView, ViewStyle} from 'react-native';
import {View} from 'react-native';

interface ContainerProps {
  children: ReactNode;
  style?: ViewStyle;
}

export default function Container({children, style}: ContainerProps) {
  return (
    <SafeAreaView>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
}
