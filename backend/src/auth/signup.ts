import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Create Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

export const signup = async (req: Request, res: Response) => {
  const { email, password, name, preferences } = req.body;

  if (!email || !password || !name || !preferences) {
    return res.status(400).json({ error: 'Missing required signup fields' });
  }

  // Step 1: Sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return res.status(400).json({ error: authError.message });
  }

  const userId = authData.user?.id;

  if (!userId) {
    return res.status(400).json({ error: 'Signup failed: no user ID returned' });
  }

  // Step 2: Create the user profile in the database
  const { error: dbError } = await supabase
    .from('users')
    .insert([
      {
        id: userId,
        email: email,
        name: name,
        onboarding_complete: true,
        prep_style: preferences.prepStyle, 
        plan_days: preferences.mealDays,
        last_login: new Date(),
        preferences: {
          dietaryStyle: preferences.dietaryStyle,
          cookingSkill: preferences.cookingSkill,
          mealGoals: preferences.mealGoals,
          allergies: preferences.allergies,
          mealTimes: preferences.mealTimes,
          kitchenEquipment: preferences.kitchenEquipment,
        },
      },
    ]);

  if (dbError) {
    return res.status(400).json({ error: dbError.message });
  }

  return res.status(200).json({ message: 'Signup successful', user: authData.user });
};
