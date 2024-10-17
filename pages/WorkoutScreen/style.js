import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #0a090a;
  align-items: center;
  padding: 15% 0;
  position: relative;
`;

export const WellcomeContainer = styled.View`
  display: flex;
  flex-direction: column;
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

export const WorkoutList = styled.View`
  margin-top: 10%;
  width: 90%;
  height: 100%;
`;

export const NewButton = styled.TouchableOpacity`
  width: 18%;
  aspect-ratio: 1/1;
  border-radius: 999px;
  background-color: #9e00ff;
  position: absolute;
  bottom: 30px;
  right: 30px;
  align-items: center;
  justify-content: center;
`;

export const FormField = styled.TextInput`
  height: 50px;
  width: 100%;
  background-color: #e0e0e0;
  border-color: #808080;
  border-width: 1px;
  border-radius: 10px;
  padding-left: 10px;
  margin-bottom: 10px;
`;

export const SubmitFormButton = styled.TouchableOpacity`
  width: 100%;
  height: 55px;
  border-radius: 10px;
  background-color: #9e00ff;
  opacity: 0.75;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  width: 100%;
  height: 90%;
`;

export const ModalRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 50px;
  width: 100%;
`;

export const ModalInput = styled.TextInput`
  height: 50px;
  width: 49%;
  margin-bottom: 20px;
  background-color: #e0e0e0;
  border-color: #808080;
  border-width: 1px;
  border-radius: 10px;
  padding-left: 10px;
`;

export const RemoveFormButton = styled.TouchableOpacity`
  width: 100%;
  height: 55px;
  border-radius: 10px;
  margin-bottom: 3%;
  background-color: #ff003c;
  opacity: 0.75;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;
