import { supabase } from '../lib/supabase';

class WorkoutRepository {
  async getWorkoutsByUserId(userId) {
    const response = await supabase
      .from('workouts')
      .select('title, id')
      .eq('user_id', userId);

    return response;
  }

  async getExercisesByWorkoutId(workoutId) {
    const response = await supabase
      .from('exercises')
      .select('*')
      .eq('workout_id', workoutId);

    return response;
  }

  async createWorkout(title, userId) {
    const response = await supabase.from('workouts').insert({
      title: title,
      user_id: userId,
    });

    return response;
  }

  async createExercise(exercise) {
    const response = await supabase.from('exercises').insert(exercise);

    return response;
  }

  async deleteWorkoutById(workoutId) {
    const response = await supabase
      .from('workouts')
      .delete()
      .eq('id', workoutId);

    return response;
  }

  async deleteExerciseById(exerciseId) {
    const response = await supabase
      .from('exercises')
      .delete()
      .eq('id', exerciseId);

    return response;
  }

  async editWorkoutById(workoutId, title) {
    const response = await supabase
      .from('workouts')
      .update({ title: title })
      .eq('id', workoutId);

    return response;
  }

  async editExerciseById(exerciseId, exercise) {
    const response = await supabase
      .from('exercises')
      .update(exercise)
      .eq('id', exerciseId);

    return response;
  }

  async createManyExercises(exercises) {
    const response = await supabase.from('exercises').insert(exercises);
    return response;
  }
}

export default new WorkoutRepository();
