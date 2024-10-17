import { useEffect, useRef, useState } from 'react';
import * as S from './style';
import { View, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

export default function DraggableModal({
  isVisible,
  setIsVisible,
  children,
  ...props
}) {
  const [translateY, setTranslateY] = useState(0);

  const onGestureEvent = (event) => {
    const { translationY } = event.nativeEvent;
    setTranslateY(translationY);
  };

  const onHandlerStateChange = (event) => {
    const { translationY, velocityY } = event.nativeEvent;

    if ((translationY > 200 && velocityY > 100) || translationY < -200) {
      setIsVisible(false);
    }

    setTranslateY(0);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <S.ModalContainer
        style={{
          ...props.style,
          transform: [{ translateY }],
        }}
      >
        <View
          style={{
            width: 200,
            height: 3,
            borderRadius: 999,
            backgroundColor: '#332E3350',
            marginBottom: 45,
          }}
        />
        {children}
      </S.ModalContainer>
    </PanGestureHandler>
  );
}
