import styled from 'styled-components/native';

export const CardContainer = styled.View`
  display: flex;
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 0 10px;
  height: 180px;
  width: 100%;
  justify-content: space-evenly;
  margin-bottom: 30px;
  border: 1px solid #9b51e0;
`;

export const CardRow = styled.View`
  display: flex;
  flex-direction: row;
  max-height: 50%;
  align-items: center;
  overflow: hidden;
  gap: 15px;
`;

export const CardRow2 = styled.View`
  display: flex;
  flex-direction: row;
  max-height: 47%;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`;

export const NumberBox = styled.View`
  height: 85%;
  aspect-ratio: 1/1;
  background-color: #9b51e0;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

export const NumberText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: #fff;
`;

export const ExerciseText = styled.Text`
  font-size: 15px;
  color: #fff;
`;

export const InfoItem = styled.View`
  display: flex;
  aspect-ratio: 1/1;
  background-color: #333;
  padding: 15px;
  border-radius: 10px;
  height: 90%;
  align-items: center;
  justify-content: center;
  max-width: fit-content;
  border: 1px solid #111;
`;

export const InfoItemShrink = styled.View`
  display: flex;
  flex-shrink: 1;
  background-color: #333;
  padding: 15px;
  border-radius: 10px;
  height: 90%;
  align-items: center;
  justify-content: center;
  max-width: fit-content;
  border: 1px solid #111;
`;

export const InfoText = styled.Text`
  font-size: 20px;
  color: #fff;
`;

export const ExerciseName = styled.View`
  padding: 0 10px;
  font-size: 25px;
  color: #fff;
  display: flex;
  align-items: start;
  justify-content: start;
  word-wrap: break-word;
  width: 75%;
  height: 90%;
  border-radius: 10px;
`;

export const ExerciseNameText = styled.Text`
  font-size: 30px;
  color: #fff;
  word-wrap: break-word;
`;
