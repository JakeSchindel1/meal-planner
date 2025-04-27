import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

export const completeOnboarding = async (req: Request, res: Response) => {
  console.log('📥 Incoming completeOnboarding request:', req.body);

  const { id } = req.body;

  if (!id) {
    console.error('❌ Missing user id');
    return res.status(400).json({ error: 'Missing user id' });
  }

  const { error } = await supabase
    .from('users')
    .update({ onboarding_complete: true })
    .eq('id', id);

  if (error) {
    console.error('❌ Supabase Update Error:', error.message);
    return res.status(400).json({ error: error.message });
  }

  console.log('✅ User onboarding marked complete!');
  return res.status(200).json({ message: 'User onboarding marked complete' });
};
