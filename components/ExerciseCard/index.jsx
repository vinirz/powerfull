import React from 'react';
import * as S from './style';
import { TouchableHighlight } from 'react-native';

export default function ExerciseCard({
  machine,
  exercise,
  series,
  reps,
  load,
  time,
  ...props
}) {
  function formatNumber(number) {
    return number < 10 ? '0' + number : number;
  }

  return (
    <TouchableHighlight {...props}>
      <S.CardContainer>
        <S.CardRow>
          <S.NumberBox>
            <S.NumberText>{machine}</S.NumberText>
          </S.NumberBox>
          <S.ExerciseName>
            <S.ExerciseNameText>{exercise}</S.ExerciseNameText>
          </S.ExerciseName>
        </S.CardRow>
        <S.CardRow2>
          <S.InfoItem>
            <S.InfoText>{series}</S.InfoText>
          </S.InfoItem>
          <S.InfoItemShrink>
            <S.InfoText>
              {formatNumber(Number(reps) - 1)} /{' '}
              {formatNumber(Number(reps) + 1)}
            </S.InfoText>
          </S.InfoItemShrink>
          <S.InfoItemShrink>
            <S.InfoText>{load}kg</S.InfoText>
          </S.InfoItemShrink>
          <S.InfoItem>
            <S.InfoText>{time}"</S.InfoText>
          </S.InfoItem>
        </S.CardRow2>
      </S.CardContainer>
    </TouchableHighlight>
  );
}
