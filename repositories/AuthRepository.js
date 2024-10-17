import { supabase } from '../lib/supabase';

class AuthRepository {
  async createAccount(email, password, name) {
    const response = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
        },
      },
    });

    return response;
  }

  async login(email, password) {
    const response = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    return response;
  }

  async logout() {
    await supabase.auth.signOut();
  }
}

export default new AuthRepository();
