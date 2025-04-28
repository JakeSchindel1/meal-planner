import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Create Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

export const updateSession = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing user id' });
  }

  // Step 1: Get current total_sessions
  const { data, error: fetchError } = await supabase
    .from('users')
    .select('total_sessions')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('❌ Failed to fetch sessions:', fetchError.message);
    return res.status(400).json({ error: fetchError.message });
  }

  const currentSessions = data?.total_sessions ?? 0;

  // Step 2: Update sessions + last login
  const { error: updateError } = await supabase
    .from('users')
    .update({
      total_sessions: currentSessions + 1,  
      last_login: new Date(),               
    })
    .eq('id', id);

  if (updateError) {
    console.error('❌ Failed to update session info:', updateError.message);
    return res.status(400).json({ error: updateError.message });
  }

  console.log('✅ Session info updated successfully!');
  return res.status(200).json({ message: 'Session updated successfully' });
};
