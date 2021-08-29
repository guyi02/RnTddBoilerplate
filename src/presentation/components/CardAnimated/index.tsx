import React from 'react';
import {useWindowDimensions} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {clamp} from 'react-native-redash';

import * as S from './styles';

const CardAnimated: React.FC = () => {
  const {width: withDevice, height: heightDevice} = useWindowDimensions();
  let translateX = useSharedValue(0);
  let translateY = useSharedValue(0);

  let limitAreaX = withDevice - 200;
  let limitAreaY = heightDevice - 250;
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetX: number;
      offsetY: number;
    }
  >({
    onStart: (event, ctx) => {
      // salva o valor após se mover em ctx, para usar depois
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = clamp(ctx.offsetX + event.translationX, 0, limitAreaX);
      translateY.value = clamp(ctx.offsetY + event.translationY, 0, limitAreaY);
    },
    onEnd: event => {
      translateX.value = withDecay({
        velocity: event.velocityX,
        clamp: [0, limitAreaX],
      });
      translateY.value = withDecay({
        velocity: event.velocityY,
        clamp: [0, limitAreaY],
      });
    },
  });

  const styleAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });
  return (
    <PanGestureHandler {...{onGestureEvent}}>
      <Animated.View style={styleAnimated}>
        <S.Container />
      </Animated.View>
    </PanGestureHandler>
  );
};

export {CardAnimated};
