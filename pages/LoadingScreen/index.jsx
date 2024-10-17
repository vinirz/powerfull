import { ImageBackground } from 'react-native';
import * as S from './style';

export default function LoadingScreen({ navigation }) {
  return (
    <S.LoginContainer>
      <ImageBackground
        source={require('../../assets/gym.jpeg')}
        resizeMode='stretch'
        blurRadius={3}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          zIndex: -1,
          opacity: 0.3,
        }}
      ></ImageBackground>
      <S.WellcomeContainer>
        <S.PowerfullContainer style={{ display: 'flex' }}>
          <S.PowerfullText>Power</S.PowerfullText>
          <S.PowerfullText style={{ color: '#9E00FF' }}>Full.</S.PowerfullText>
        </S.PowerfullContainer>
        <S.SubtitleText>your best gym buddy</S.SubtitleText>
      </S.WellcomeContainer>
    </S.LoginContainer>
  );
}
