import { useEffect, useState } from 'react';
import * as S from './style';
import { Alert, FlatList } from 'react-native';
import DraggableModal from '../../components/DraggableModal/index';
import WorkoutService from '../../services/WorkoutService';
import ExerciseCard from '../../components/ExerciseCard';
import { Feather } from '@expo/vector-icons';

export default function WorkoutScreen({ navigation, route }) {
  const [exercises, setExercises] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newExercise, setNewExercise] = useState({});
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    async function loadWorkouts() {
      const { data, error } = await WorkoutService.getExercises(
        route.params?.item.id
      );

      setExercises(data);
    }

    loadWorkouts();
  }, []);

  useEffect(() => {
    if (!showModal) {
      setSelectedExercise(null);
      setNewExercise(null);
    }
  }, [showModal]);

  function setExerciseField(field, value) {
    let formatedValue = value;

    if (!isNaN(value)) {
      formatedValue = value < 10 ? '0' + value : value;
    }

    setNewExercise({ ...newExercise, [field]: formatedValue });
  }

  async function handleAddExercise() {
    const response = await WorkoutService.createExercise({
      ...newExercise,
      workout_id: route.params?.item.id,
    });

    if (response.error) {
      Alert.alert(
        'Erro ao criar o exercício',
        'Ocorreu um erro ao criar o exercício, tente novamente'
      );
      return;
    }

    setExercises(response.data);
    setShowModal(false);
  }

  async function handleEditExercise() {
    const response = await WorkoutService.editExercise(selectedExercise);

    if (response.error) {
      Alert.alert(
        'Erro ao editar o exercício',
        'Ocorreu um erro ao editar o exercício, tente novamente'
      );
      return;
    }

    setExercises(response.data);
    setShowModal(false);
  }

  async function handleDeleteExercise() {
    const response = await WorkoutService.deleteExercise(selectedExercise.id);

    if (response.error) {
      Alert.alert(
        'Erro ao deletar o exercício',
        'Ocorreu um erro ao deletar o exercício, tente novamente'
      );
      return;
    }

    setExercises(
      exercises.filter((exercise) => exercise.id !== selectedExercise.id)
    );
    setShowModal(false);
  }

  return (
    <S.Container>
      <S.WellcomeContainer>
        <S.PowerfullContainer>
          <S.PowerfullText>{route.params?.item.title}</S.PowerfullText>
        </S.PowerfullContainer>
        <S.SubtitleText>Tenha um ótimo treino</S.SubtitleText>
      </S.WellcomeContainer>

      <S.WorkoutList>
        <FlatList
          overScrollMode='never'
          data={exercises}
          style={{ width: '100%', height: '100%', marginBottom: 120 }}
          renderItem={({ item }) => {
            return (
              <ExerciseCard
                onLongPress={() => {
                  setSelectedExercise(item);
                  setShowModal(true);
                }}
                exercise={item.title}
                load={item.load}
                machine={item.machine}
                reps={item.reps}
                series={item.series}
                time={'60'}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </S.WorkoutList>

      <S.NewButton onPress={() => setShowModal(!showModal)}>
        <Feather name='plus' size={40} color='white' />
      </S.NewButton>

      <DraggableModal isVisible={showModal} setIsVisible={setShowModal}>
        <S.ModalContainer>
          <S.FormField
            placeholder='Título do exercício'
            autoFocus
            onChangeText={(text) => {
              if (selectedExercise) {
                setSelectedExercise({ ...selectedExercise, title: text });
                return;
              }
              setExerciseField('title', text);
            }}
            defaultValue={selectedExercise?.title}
          ></S.FormField>
          <S.ModalRow>
            <S.ModalInput
              placeholder='Número de séries'
              keyboardType='number-pad'
              onChangeText={(text) => {
                if (selectedExercise) {
                  setSelectedExercise({ ...selectedExercise, series: text });
                  return;
                }
                setExerciseField('series', text);
              }}
              defaultValue={selectedExercise?.series}
            ></S.ModalInput>
            <S.ModalInput
              placeholder='Repetições por série'
              keyboardType='number-pad'
              onChangeText={(text) => {
                if (selectedExercise) {
                  setSelectedExercise({ ...selectedExercise, reps: text });
                  return;
                }
                setExerciseField('reps', text);
              }}
              defaultValue={selectedExercise?.reps}
            ></S.ModalInput>
          </S.ModalRow>
          <S.ModalRow>
            <S.ModalInput
              placeholder='Número do aparelho'
              keyboardType='number-pad'
              onChangeText={(text) => {
                if (selectedExercise) {
                  setSelectedExercise({ ...selectedExercise, machine: text });
                  return;
                }
                setExerciseField('machine', text);
              }}
              defaultValue={selectedExercise?.machine}
            ></S.ModalInput>
            <S.ModalInput
              placeholder='Carga do exercício'
              keyboardType='number-pad'
              onChangeText={(text) => {
                if (selectedExercise) {
                  setSelectedExercise({ ...selectedExercise, load: text });
                  return;
                }
                setExerciseField('load', text);
              }}
              defaultValue={selectedExercise?.load}
            ></S.ModalInput>
          </S.ModalRow>
          <S.SubmitFormButton
            onPress={() => {
              if (selectedExercise) {
                handleEditExercise();
                return;
              }
              handleAddExercise();
            }}
          >
            <S.SubtitleText style={{ color: '#fff' }}>
              {selectedExercise ? 'Salvar alterações' : 'Adicionar'}
            </S.SubtitleText>
          </S.SubmitFormButton>
          {selectedExercise && (
            <S.RemoveFormButton onPress={() => handleDeleteExercise()}>
              <S.SubtitleText style={{ color: '#fff' }}>Remover</S.SubtitleText>
            </S.RemoveFormButton>
          )}
        </S.ModalContainer>
      </DraggableModal>
    </S.Container>
  );
}
