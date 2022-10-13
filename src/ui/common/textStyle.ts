export enum TextStyle {
  Lowercase = 1,
  Uppercase,
  Capitalize
};

export const textStylingMap = new Map<TextStyle, string>();

textStylingMap.set(TextStyle.Lowercase, 'text-lowercase');
textStylingMap.set(TextStyle.Uppercase, 'text-uppercase');
textStylingMap.set(TextStyle.Capitalize, 'text-capitalize');