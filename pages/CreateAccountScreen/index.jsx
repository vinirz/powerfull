import { TouchableOpacity, ImageBackground } from 'react-native';
import * as S from './style';
import { useState } from 'react';
import AuthService from '../../services/AuthService';
import { Feather } from '@expo/vector-icons';

export default function CreateAccountScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleCreateAccount() {
    const { error } = await AuthService.createAccount({
      name,
      email,
      password,
    });

    if (error) {
      console.log(error);
      setError(error);
      return;
    }

    navigation.navigate('Login');
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
            placeholder='Nome'
            autoComplete='name'
            textContentType='name'
            onChangeText={(value) => setName(value)}
          />
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

        <S.EnterButton
          onPress={() => {
            handleCreateAccount();
          }}
        >
          <S.Text>Criar conta</S.Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <S.SmallText style={{ opacity: 0.5, marginBottom: 20 }}>
            Voltar
          </S.SmallText>
        </TouchableOpacity>
      </S.FormSection>
    </S.LoginContainer>
  );
}
