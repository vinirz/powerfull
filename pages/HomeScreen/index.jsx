import { SessionContext } from '../../contexts/SessionContext';
import { useContext, useEffect, useState } from 'react';
import * as S from './style';
import { TouchableOpacity, FlatList, View, Alert } from 'react-native';
import DraggableModal from '../../components/DraggableModal/index';
import WorkoutService from '../../services/WorkoutService';

export default function HomeScreen({ navigation }) {
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newWorkout, setNewWorkout] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const { logout, user } = useContext(SessionContext);

  async function loadWorkouts() {
    const { data, error } = await WorkoutService.getWorkouts();
    setWorkouts(data);
  }

  useEffect(() => {
    loadWorkouts();
  }, []);

  useEffect(() => {
    if (!showModal) {
      setSelectedWorkout(null);
      setNewWorkout(null);
    }
  }, [showModal]);

  async function handleAddWorkout(title) {
    const response = await WorkoutService.createWorkout(title);

    if (response.error) {
      Alert.alert(
        'Erro ao criar o treino',
        'Ocorreu um erro ao criar o treino, tente novamente'
      );
      return;
    }

    setWorkouts(response.data);
    setShowModal(false);
  }

  async function handleDeleteWorkout(id) {
    const response = await WorkoutService.deleteWorkout(id);

    if (response.error) {
      Alert.alert(
        'Erro ao deletar o treino',
        'Ocorreu um erro ao deletar o treino, tente novamente'
      );
      return;
    }

    setWorkouts(response.data);
    setShowModal(false);
  }

  async function handleEditWorkout({ id, title }) {
    const response = await WorkoutService.editWorkout(id, title);

    if (response.error) {
      Alert.alert(
        'Erro ao editar o treino',
        'Ocorreu um erro ao editar o treino, tente novamente'
      );
      return;
    }

    setWorkouts(response.data);
    setShowModal(false);
  }

  return (
    <S.Container>
      <S.WellcomeContainer>
        <S.PowerfullContainer>
          <S.PowerfullText>Olá, </S.PowerfullText>
          <S.PowerfullText
            onPress={() => logout()}
            style={{ color: '#9E00FF' }}
          >
            {user?.name.split(' ')[0]}
          </S.PowerfullText>
        </S.PowerfullContainer>
        <S.SubtitleText>Qual o treino de hoje?</S.SubtitleText>
      </S.WellcomeContainer>

      <S.WorkoutList>
        {workouts.length > 0 ? (
          <FlatList
            onScrollEndDrag={() => loadWorkouts()}
            overScrollMode='never'
            data={workouts}
            snapToStart
            style={{ width: '100%' }}
            renderItem={({ item }) => (
              <S.WorkoutItem
                onLongPress={() => {
                  setSelectedWorkout(item);
                  setShowModal(true);
                }}
                onPress={() => navigation.navigate('Workout', { item })}
              >
                <S.WorkoutItemText>{item.title}</S.WorkoutItemText>
              </S.WorkoutItem>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <S.SubtitleText style={{ opacity: 0.5 }}>
            Toque em "Novo" para adicionar seu primeiro treino!
          </S.SubtitleText>
        )}
      </S.WorkoutList>

      <S.ModalContainer>
        <S.NewButton onPress={() => setShowModal(!showModal)}>
          <S.SubtitleText>Novo</S.SubtitleText>
        </S.NewButton>
        <S.SubtitleText onPress={() => navigation.navigate('Map')}>Iniciar Corrida</S.SubtitleText>
      </S.ModalContainer>

      <DraggableModal isVisible={showModal} setIsVisible={setShowModal}>
        <S.FormField
          placeholder='Título do treino'
          autoFocus
          onChangeText={(text) => {
            if (selectedWorkout) {
              setSelectedWorkout({ ...selectedWorkout, title: text });
              return;
            }
            setNewWorkout(text);
          }}
          defaultValue={selectedWorkout?.title}
        ></S.FormField>
        <S.SubmitFormButton
          onPress={() => {
            if (selectedWorkout) {
              handleEditWorkout(selectedWorkout);
              return;
            }
            handleAddWorkout(newWorkout);
          }}
        >
          <S.SubtitleText style={{ color: '#fff' }}>
            {selectedWorkout ? 'Salvar alterações' : 'Adicionar'}
          </S.SubtitleText>
        </S.SubmitFormButton>
        {selectedWorkout && (
          <S.RemoveFormButton
            onPress={() => handleDeleteWorkout(selectedWorkout?.id)}
          >
            <S.SubtitleText style={{ color: '#fff' }}>Remover</S.SubtitleText>
          </S.RemoveFormButton>
        )}
      </DraggableModal>
    </S.Container>
  );
}
