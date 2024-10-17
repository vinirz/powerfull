import { TouchableOpacity, ImageBackground } from 'react-native';
import * as S from './style';

export default function RecoveryPasswordScreen({ navigation }) {
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

      <S.FormContainer>
        <S.FormSection>
          <S.SubtitleText>
            Calma! Já vamos lhe ajudar a recuperar sua senha
          </S.SubtitleText>
          <S.FormField
            placeholder='Email'
            autoComplete='email'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoCapitalize='none'
          />
        </S.FormSection>

        <S.EnterButton
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <S.Text>Recuperar senha</S.Text>
        </S.EnterButton>
      </S.FormContainer>

      <S.FormSection>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <S.SmallText style={{ opacity: 0.5, marginBottom: 20 }}>
            Voltar
          </S.SmallText>
        </TouchableOpacity>
      </S.FormSection>
    </S.LoginContainer>
  );
}
