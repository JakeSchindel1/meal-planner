// Onboarding questions and options
export const onboardingContent = [
  {
    id: 'prepStyle',
    question: 'How do you like to prepare your meals?',
    options: [
      { value: 'fresh', label: 'Fresh daily 🥗', description: 'I cook every day' },
      { value: 'mealPrep', label: 'Meal prep 🍱', description: 'I batch cook for the week' },
      { value: 'mixed', label: 'Mix of both 🍲', description: 'Depends on my schedule' }
    ],
    allowSkip: false
  },
  {
    id: 'mealGoals',
    question: 'What are your meal goals?',
    description: 'Select all that apply',
    options: [
      { value: 'healthy', label: 'Healthy eating 🥦', description: 'Nutritious and balanced' },
      { value: 'quick', label: 'Quick & easy ⏱️', description: '30 minutes or less' },
      { value: 'budget', label: 'Budget-friendly 💰', description: 'Affordable ingredients' },
      { value: 'comfort', label: 'Comfort food 🍕', description: 'Satisfying and delicious' },
      { value: 'kidFriendly', label: 'Kid-friendly 👶', description: 'Family-approved meals' },
      { value: 'learnToCook', label: 'Learn to cook 👨‍🍳', description: 'Build cooking skills' }
    ],
    multiSelect: true,
    allowSkip: true
  },
  {
    id: 'dietaryStyle',
    question: 'What dietary style do you follow?',
    description: 'Choose what fits you best',
    options: [
      { value: 'vegan', label: 'Vegan 🌱', description: 'No animal products' },
      { value: 'vegetarian', label: 'Vegetarian 🥕', description: 'No meat' },
      { value: 'highProtein', label: 'High-protein 💪', description: 'Protein-focused meals' },
      { value: 'lowCarb', label: 'Low-carb 🍖', description: 'Fewer carbohydrates' },
      { value: 'pescatarian', label: 'Pescatarian 🐟', description: 'Fish but no meat' },
      { value: 'none', label: 'No restrictions 🍽️', description: 'I eat everything' }
    ],
    allowSkip: false
  },
  {
    id: 'allergies',
    question: 'Any allergies or ingredients to avoid?',
    description: 'Select all that apply',
    options: [
      { value: 'nuts', label: 'Nuts 🥜', description: 'All tree nuts and peanuts' },
      { value: 'dairy', label: 'Dairy 🧀', description: 'Milk, cheese, etc.' },
      { value: 'gluten', label: 'Gluten 🍞', description: 'Wheat and gluten' },
      { value: 'shellfish', label: 'Shellfish 🦐', description: 'Shrimp, crab, etc.' },
      { value: 'eggs', label: 'Eggs 🥚', description: 'All egg products' }
    ],
    multiSelect: true,
    customOption: true,
    allowSkip: true
  },
  {
    id: 'mealTimes',
    question: 'Which meals do you want to plan?',
    description: 'Select all that apply',
    options: [
      { value: 'breakfast', label: 'Breakfast ☕', description: 'Morning meals' },
      { value: 'lunch', label: 'Lunch 🥪', description: 'Midday meals' },
      { value: 'dinner', label: 'Dinner 🍽️', description: 'Evening meals' },
      { value: 'snacks', label: 'Snacks 🍎', description: 'Between meals' }
    ],
    multiSelect: true,
    allowSkip: false
  },
  {
    id: 'cookingSkill',
    question: 'How comfortable are you in the kitchen?',
    options: [
      { value: 'beginner', label: 'Beginner 🥄', description: 'Still learning basics' },
      { value: 'intermediate', label: 'Intermediate 🍳', description: 'Comfortable cooking' },
      { value: 'advanced', label: 'Advanced 👨‍🍳', description: 'Very experienced' }
    ],
    allowSkip: false
  },
  {
    id: 'householdSize',
    question: 'How many people are you cooking for?',
    options: [
      { value: '1', label: 'Just me 🧍', description: 'Solo cooking' },
      { value: '2', label: 'Two people 👫', description: 'Couple or roommate' },
      { value: '3', label: 'Three people 👨‍👩‍👦', description: 'Small family' },
      { value: '4+', label: 'Four or more 👨‍👩‍👧‍👦', description: 'Larger household' }
    ],
    allowSkip: false
  },
  {
    id: 'kitchenEquipment',
    question: 'What kitchen equipment do you have?',
    description: 'Select all that apply',
    options: [
      { value: 'stove', label: 'Stove 🔥', description: 'Stovetop cooking' },
      { value: 'oven', label: 'Oven 🧁', description: 'Baking and roasting' },
      { value: 'microwave', label: 'Microwave 📡', description: 'Quick heating' },
      { value: 'airFryer', label: 'Air Fryer 🍟', description: 'Oil-free frying' },
      { value: 'instantPot', label: 'Instant Pot 🍲', description: 'Pressure cooking' },
      { value: 'blender', label: 'Blender 🥤', description: 'Smoothies and sauces' }
    ],
    multiSelect: true,
    allowSkip: false
  },
  {
    id: 'mealDays',
    question: 'Which days do you want meal plans for?',
    description: 'Select all that apply',
    options: [
      { value: 'monday', label: 'Monday', description: '' },
      { value: 'tuesday', label: 'Tuesday', description: '' },
      { value: 'wednesday', label: 'Wednesday', description: '' },
      { value: 'thursday', label: 'Thursday', description: '' },
      { value: 'friday', label: 'Friday', description: '' },
      { value: 'saturday', label: 'Saturday', description: '' },
      { value: 'sunday', label: 'Sunday', description: '' }
    ],
    multiSelect: true,
    allowSkip: false
  }
];
