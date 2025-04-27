import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Create Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

export const createProfile = async (req: Request, res: Response) => {
  console.log('📥 Incoming createProfile request:', req.body); // ✅ Log the incoming request body

  const { id, email } = req.body;

  if (!id || !email) {
    console.error('❌ Missing id or email');
    return res.status(400).json({ error: 'Missing user id or email' });
  }

  const { error } = await supabase.from('users').insert([
    {
      id,
      email,
      name: 'New User',
      onboarding_complete: false,
      created_at: new Date(), // or let Supabase auto-generate it
    },
  ]);

  if (error) {
    console.error('❌ Supabase Insert Error:', error.message); // ✅ Log any insert error
    return res.status(400).json({ error: error.message });
  }

  console.log('✅ User profile created successfully!');
  return res.status(201).json({ message: 'User profile created successfully' });
};
