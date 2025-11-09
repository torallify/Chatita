// app/src/theme/colors.ts
// Chatita color palette - matching wireframe specifications

export const colors = {
  // Primary colors
  primary: '#4A90E2',        // Sky blue (buttons, highlights)
  primaryLight: '#BFD7ED',   // Light blue (backgrounds)
  secondary: '#6ED1C7',      // Turquoise (accents)
  accent: '#FFB6A6',         // Warm coral (highlights)

  // Background colors
  background: '#F2F6FA',     // Off-white blue (app background)
  surface: '#FFFFFF',        // White (cards)

  // Text colors
  text: {
    primary: '#2D3748',      // Dark gray (main text)
    secondary: '#718096',    // Medium gray (labels)
    light: '#A0AEC0',        // Light gray (placeholders)
  },

  // Status colors
  status: {
    success: '#48BB78',      // Green
    warning: '#ED8936',      // Orange
    error: '#F56565',        // Red
    info: '#4299E1',         // Blue
  },

  // Glucose status colors
  glucose: {
    inRange: '#48BB78',      // Green
    high: '#ED8936',         // Orange/yellow
    low: '#F56565',          // Red
  },

  // Special backgrounds
  tipCard: '#E8F4FD',        // Very light blue (daily tip background)
  encouragement: '#F0F8FF',  // Alice blue (encouragement banner)

  // Gradient colors (for buttons and accents)
  gradient: {
    start: '#4A90E2',
    middle: '#6ED1C7',
    end: '#FFB6A6',
  },
};
