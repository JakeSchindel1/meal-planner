# Services

This directory contains service files that connect to external services like Supabase.

## Environment Variables

To use the Supabase client, you need to set up the following environment variables:

### Development:

1. Update the app.config.js file with your Supabase credentials:

```js
extra: {
  SUPABASE_URL: "your-supabase-url",
  SUPABASE_ANON_KEY: "your-supabase-anon-key",
}
```

### Production:

For production environments, you can set the environment variables before building the app:

```bash
SUPABASE_URL=your-supabase-url SUPABASE_ANON_KEY=your-supabase-anon-key npx expo build:ios
```

Or set them in your CI/CD environment.

## Usage

Import the Supabase client in your files:

```js
import { supabase } from '../services';

// Example usage
const fetchData = async () => {
  const { data, error } = await supabase
    .from('your-table')
    .select('*');
  
  if (error) {
    console.error('Error fetching data:', error);
    return;
  }
  
  console.log('Data:', data);
};
``` 