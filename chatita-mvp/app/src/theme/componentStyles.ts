// app/src/theme/componentStyles.ts
// Shared component styles matching wireframe specifications

import { colors } from './colors';

export const componentStyles = {
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  button: {
    primary: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
    },
    secondary: {
      backgroundColor: colors.surface,
      borderColor: colors.primary,
      borderWidth: 1,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
    },
  },

  badge: {
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  input: {
    backgroundColor: colors.surface,
    borderColor: colors.text.light,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
};
