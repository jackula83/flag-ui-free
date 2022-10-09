export enum Align {
  Left,
  Center,
  Right
};

export const textAlignmentMap = new Map<Align, string>();

textAlignmentMap.set(Align.Left, 'text-start');
textAlignmentMap.set(Align.Center, 'text-center');
textAlignmentMap.set(Align.Right, 'text-end');