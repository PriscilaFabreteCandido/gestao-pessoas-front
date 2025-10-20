export const SexoEnum = {
  F: "F",
  M: "M",
  O: "O",
} as const;

export type SexoEnum = typeof SexoEnum[keyof typeof SexoEnum];
