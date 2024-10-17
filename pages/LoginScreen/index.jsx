import { TouchableOpacity, ImageBackground } from 'react-native';
import * as S from './style';
import { SessionContext } from '../../contexts/SessionContext';
import { useContext, useState } from 'react';
import { Feather } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, error } = useContext(SessionContext);

  async function handleLogin() {
    const { user } = await login(email, password);

    if (user) {
      navigation.navigate('Home');
    }
  }

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
          <S.FormField
            placeholder='Email'
            autoComplete='email'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoCapitalize='none'
            onChangeText={(value) => setEmail(value)}
          />
          <S.PasswordContainer>
            <S.PasswordField
              placeholder='Senha'
              autoComplete='password'
              textContentType='password'
              secureTextEntry={!showPassword}
              onChangeText={(value) => setPassword(value)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Feather name='eye' size={25} color='#9E00FF' />
              ) : (
                <Feather name='eye-off' size={25} color='#9E00FF' />
              )}
            </TouchableOpacity>
          </S.PasswordContainer>
        </S.FormSection>

        <S.EnterButton onPress={() => handleLogin()}>
          <S.Text>Entrar</S.Text>
        </S.EnterButton>
        <S.SmallText
          style={{
            marginTop: 20,
            color: 'red',
            display: error ? 'block' : 'none',
          }}
        >
          {error}
        </S.SmallText>
      </S.FormContainer>

      <S.FormSection>
        <TouchableOpacity
          onPress={() => navigation.navigate('RecoveryPassword')}
        >
          <S.SmallText style={{ opacity: 0.5, marginBottom: 20 }}>
            Esqueci minha senha
          </S.SmallText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
          <S.SmallText style={{ opacity: 0.5 }}>Criar conta</S.SmallText>
        </TouchableOpacity>
      </S.FormSection>
    </S.LoginContainer>
  );
}
