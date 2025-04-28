import { StyleSheet } from 'react-native';

// Colors you can easily reuse
export const colors = {
  primary: '#4CAF50',
  secondary: '#007AFF',
  background: '#FFFFFF',
  text: '#333333',
  gray: '#CCCCCC',
  error: '#FF3B30',
};

// Standard spacing sizes
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Text variants (titles, subtitles, body text)
export const textVariants = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.text,
  },
  buttonText: {
    fontSize: 16,
    color: colors.background,
    fontWeight: 'bold',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

// Button variants (primary, secondary, danger)
export const buttonVariants = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    backgroundColor: colors.error,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Input styles (for text inputs)
export const inputVariants = StyleSheet.create({
  default: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    marginBottom: spacing.md,
  },
});

// Layout / containers for pages
export const layout = StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.lg,
      backgroundColor: colors.background,
    },
    centered: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    spaced: {
      justifyContent: 'space-between',
    },
  });

  export const linkStyles = StyleSheet.create({
    linkButton: {
      marginTop: spacing.lg,
      alignItems: 'center',
    },
    linkText: {
      color: colors.secondary,
      fontSize: 16,
    },
  });