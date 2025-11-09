// app/src/theme/typography.ts
// Typography system matching wireframe specifications

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 26,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  // Special sizes for key elements
  glucoseNumber: {
    fontSize: 56,
    fontWeight: '700' as const,
    lineHeight: 64,
    letterSpacing: -1,
  },
  statNumber: {
    fontSize: 40,
    fontWeight: '700' as const,
    lineHeight: 48,
  },
};
