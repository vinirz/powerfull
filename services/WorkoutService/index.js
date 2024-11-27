import axios from 'axios';
import WorkoutRepository from '../../repositories/WorkoutRepository';
import AuthService from '../AuthService';
import Logger from '../LoggerService';
import sanitizeHtml from 'sanitize-html'

const logger = new Logger('WorkoutService');

class WorkoutService {
  async createWorkout(title) {
    try {
      const user = await this.#getUser();

      const createdWorkout = await WorkoutRepository.createWorkout(
        title,
        user.id
      );

      if (createdWorkout.error) {
        logger.error({
          log: 'Erro ao criar o treino',
          description: createdWorkout.error.message,
        });

        return this.#formatResponse(createdWorkout);
      }

      const currentWorkouts = await this.getWorkouts();

      return this.#formatResponse(currentWorkouts);
    } catch (error) {
      logger.error({
        log: 'Erro ao criar o treino',
        description: error.message,
      });
      return this.#formatResponse({
        error: 'Erro inesperado ao criar treino. Tente novamente',
      });
    }
  }

  async getWorkouts() {
    try {
      const user = await this.#getUser();

      const workouts = await WorkoutRepository.getWorkoutsByUserId(user.id);

      if (workouts.error) {
        logger.error({
          log: 'Erro ao buscar os treinos do usuário',
          description: workouts.error.message,
        });

        return this.#formatResponse(workouts);
      }

      return this.#formatResponse(workouts);
    } catch (error) {
      logger.error({
        log: 'Erro ao buscar os treinos do usuário',
        description: error.message,
        isCritical: true,
      });

      return this.#formatResponse({
        error: 'Erro inesperado ao buscar treinos. Tente novamente',
      });
    }
  }

  async createExercise(exercise) {
    try {
      const createdExercise = await WorkoutRepository.createExercise(exercise);

      if (createdExercise.error) {
        logger.error({
          log: 'Erro ao criar o exercício',
          description: createdExercise.error.message,
        });

        return this.#formatResponse(createdExercise);
      }

      const currentExercises = await this.getExercises(exercise.workout_id);

      return this.#formatResponse(currentExercises);
    } catch (error) {
      logger.error({
        log: 'Erro ao criar o exercício',
        description: error.message,
        isCritical: true,
      });

      return this.#formatResponse({
        error: 'Erro inesperado ao criar exercício. Tente novamente',
      });
    }
  }

  async getExercises(workoutId) {
    try {
      const exercises = await WorkoutRepository.getExercisesByWorkoutId(
        workoutId
      );

      if (exercises.error) {
        logger.error({
          log: 'Erro ao buscar os exercícios do treino',
          description: exercises.error.message,
        });

        return this.#formatResponse(exercises);
      }

      return this.#formatResponse(exercises);
    } catch (error) {
      logger.error({
        log: 'Erro inesperado ao buscar os exercícios do treino',
        description: error.message,
        isCritical: true,
      });

      return this.#formatResponse({
        error: 'Erro inesperado ao buscar exercícios. Tente novamente',
      });
    }
  }

  async deleteWorkout(workoutId) {
    try {
      const workoutExercises = await this.getExercises(workoutId);

      workoutExercises.data.forEach(async (exercise) => {
        await this.deleteExercise(exercise.id);
      });

      const deletedWorkout = await WorkoutRepository.deleteWorkoutById(
        workoutId
      );

      if (deletedWorkout.error) {
        logger.error({
          log: 'Erro ao deletar o treino',
          description: deletedWorkout.error.message,
        });

        return this.#formatResponse(deletedWorkout);
      }

      const currentWorkouts = await this.getWorkouts();

      return this.#formatResponse(currentWorkouts);
    } catch (error) {
      logger.error({
        log: 'Erro inesperado ao deletar o treino',
        description: error.message,
        isCritical: true,
      });

      return this.#formatResponse({
        error: 'Erro inesperado ao deletar o treino. Tente novamente',
      });
    }
  }

  async deleteExercise(exerciseId) {
    try {
      const deletedExercise = await WorkoutRepository.deleteExerciseById(
        exerciseId
      );

      if (deletedExercise.error) {
        logger.error({
          log: 'Erro ao deletar o exercício',
          description: deletedExercise.error.message,
        });

        return this.#formatResponse(deletedExercise);
      }

      return this.#formatResponse(deletedExercise);
    } catch (error) {
      logger.error({
        log: 'Erro inesperado ao deletar o exercício',
        description: error.message,
        isCritical: true,
      });

      return this.#formatResponse({
        error: 'Erro inesperado ao deletar o exercício. Tente novamente',
      });
    }
  }

  async editWorkout(workoutId, title) {
    try {
      const editedWorkout = await WorkoutRepository.editWorkoutById(
        workoutId,
        title
      );

      if (editedWorkout.error) {
        logger.error({
          log: 'Erro ao editar o treino',
          description: editedWorkout.error.message,
        });

        return this.#formatResponse(editedWorkout);
      }

      const currentWorkouts = await this.getWorkouts();

      return this.#formatResponse(currentWorkouts);
    } catch (error) {
      logger.error({
        log: 'Erro inesperado ao editar o treino',
        description: error.message,
        isCritical: true,
      });

      return this.#formatResponse({
        error: 'Erro inesperado ao editar o treino. Tente novamente',
      });
    }
  }

  async editExercise(exercise) {
    try {
      const editedExercise = await WorkoutRepository.editExerciseById(
        exercise.id,
        exercise
      );

      if (editedExercise.error) {
        logger.error({
          log: 'Erro ao editar o exercício',
          description: editedExercise.error.message,
        });

        return this.#formatResponse(editedExercise);
      }

      const currentExercises = await this.getExercises(exercise.workout_id);

      return this.#formatResponse(currentExercises);
    } catch (error) {
      logger.error({
        log: 'Erro inesperado ao editar o exercício',
        description: error.message,
        isCritical: true,
      });

      return this.#formatResponse({
        error: 'Erro inesperado ao editar o exercício. Tente novamente',
      });
    }
  }

  async createRandomWorkout(workoutId) {
    try {
      const randomWorkout = await this.#getRandomExercises(10, workoutId)

      const currentWorkoutExercises = await this.getExercises(workoutId);

      currentWorkoutExercises.data.forEach(async (exercise) => {
        await this.deleteExercise(exercise.id);
      });

      const createdExercise = await WorkoutRepository.createManyExercises(randomWorkout);

      if (createdExercise.error) {
        logger.error({
          log: 'Erro ao criar o exercícios',
          description: createdExercise.error.message,
        });

        return this.#formatResponse(createdExercise);
      }

      const currentExercises = await this.getExercises(workoutId);

      return this.#formatResponse(currentExercises);
    } catch (error) {
      logger.error({
        log: 'Erro ao criar o exercícios',
        description: error.message,
        isCritical: true,
      });

      return this.#formatResponse({
        error: 'Erro inesperado ao criar exercício. Tente novamente',
      });
    }
  }

  async #getUser() {
    try {
      const { user } = await AuthService.retrieveSession();

      if (!user) {
        logger.error({
          log: 'Erro ao recuperar sessão do usuário',
        });

        return;
      }

      return user;
    } catch (error) {
      logger.error({
        log: 'Erro ao recuperar sessão do usuário',
        description: error.message,
        isCritical: true,
      });
    }
  }

  #formatResponse(response) {
    const responseObject = {
      data: null,
      error: null,
    };

    if (response.error) {
      responseObject.error = response.error;
    }

    if (response.data) {
      responseObject.data = response.data;
    }

    return responseObject;
  }

  async #getRandomExercises(amount, workoutId) {
    const response = await axios.get('https://wger.de/api/v2/exercise/?language=7&limit=999')
    const exercises = response.data.results
    const workout = []

    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * exercises.length);
      const randomExercise = exercises[randomIndex];
      const exercise = {
        title: randomExercise.name,
        description: sanitizeHtml(randomExercise.description, {
          allowedTags: [],
          allowedAttributes: {}
        }),
        machine: this.#generateNumbers(10, 20),
        load:  this.#generateNumbers(1, 50),
        series: this.#generateNumbers(1, 5),
        reps: this.#generateNumbers(1, 15),
        workout_id: workoutId,
        time: 60,
      }

      workout.push(exercise)
    }

    console.log(workout[1].description)
    console.log(sanitizeHtml(workout[1].description, {
      allowedTags: [],
      allowedAttributes: {}
    }))
    return workout
  }

  #generateNumbers(start, end) {
    const numbers = [];
    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
    return numbers[Math.floor(Math.random() * numbers.length)];
  }
}

export default new WorkoutService();
