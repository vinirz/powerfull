import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #0a090a;
  align-items: center;
  padding: 20% 0;
  justify-content: space-between;
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
  max-height: 38%;
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WorkoutItem = styled.TouchableOpacity`
  margin: 10px;
  padding: 15px 20px;
  border-radius: 15px;
  background-color: #332e33;
`;

export const WorkoutItemText = styled.Text`
  color: #e0e0e0;
  font-size: 30px;
  font-weight: bold;
`;

export const NewButton = styled.TouchableOpacity`
  width: 75%;
  height: 70px;
  border-radius: 15px;
  border: 1px dashed #e0e0e0;
  color: #e0e0e0;
  opacity: 0.75;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export const FormField = styled.TextInput`
  height: 50px;
  width: 100%;
  margin-bottom: 20px;
  background-color: #e0e0e0;
  border-color: #808080;
  border-width: 1px;
  border-radius: 10px;
  padding-left: 10px;
`;

export const SubmitFormButton = styled.TouchableOpacity`
  width: 100%;
  height: 55px;
  border-radius: 10px;
  margin-bottom: 3%;
  background-color: #9e00ff;
  opacity: 0.75;
  overflow: hidden;
  align-items: center;
  justify-content: center;
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

export const ModalContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
`;