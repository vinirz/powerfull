import { supabase } from '../lib/supabase';

class LogsRepository {
  async createLog(log) {
    const response = await supabase.from('logs').insert(log);
    return response;
  }
}

export default new LogsRepository();
