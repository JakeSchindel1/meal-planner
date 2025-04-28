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
  console.log('📥 Incoming createProfile request:', req.body);

  const { id, email, name, preferences } = req.body;

  if (!id || !email || !name || !preferences) {
    console.error('❌ Missing required fields');
    return res.status(400).json({ error: 'Missing user id, email, name, or preferences' });
  }

  const { error } = await supabase
    .from('users')
    .insert([
      {
        id,
        email,
        name,
        onboarding_complete: true,
        prep_style: preferences.prepStyle,
        plan_days: preferences.mealDays,   
        preferences: {
          dietaryStyle: preferences.dietaryStyle,
          cookingSkill: preferences.cookingSkill,
          mealGoals: preferences.mealGoals,
          allergies: preferences.allergies,
          mealTimes: preferences.mealTimes,
          kitchenEquipment: preferences.kitchenEquipment,
        },
        created_at: new Date(), 
      },
    ]);

  if (error) {
    console.error('❌ Supabase Insert Error:', error.message);
    return res.status(400).json({ error: error.message });
  }

  console.log('✅ User profile created successfully!');
  return res.status(201).json({ message: 'User profile created successfully' });
};
