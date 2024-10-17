import styled from 'styled-components/native';

export const LoginContainer = styled.View`
  flex: 1;
  background-color: #0a090a;
  align-items: center;
  justify-content: space-around;
`;

export const WellcomeContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const PowerfullContainer = styled.Text`
  color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

export const PowerfullText = styled.Text`
  font-size: 50px;
  font-weight: bold;
`;

export const SubtitleText = styled.Text`
  color: #808080;
  font-size: 20px;
  width: 100%;
  text-align: center;
  font-family: monospace;
`;

export const FormContainer = styled.View`
  width: 70%;
`;

export const FormSection = styled.View`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormField = styled.TextInput`
  height: 45px;
  width: 100%;
  margin: 20% 0 8% 0;
  background-color: #e0e0e0;
  border-color: #808080;
  border-width: 1px;
  border-radius: 5px;
  padding-left: 10px;
`;

export const EnterButton = styled.TouchableOpacity`
  height: 45px;
  width: 100%;
  color: #e0e0e0;
  background-color: #9e00ff;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const SmallText = styled.Text`
  color: #e0e0e0;
  font-size: 15px;
`;

export const Text = styled.Text`
  color: #e0e0e0;
  font-size: 20px;
`;
