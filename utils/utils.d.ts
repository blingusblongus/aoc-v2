// utils.d.ts
declare module "@utils/utils.js" {
  export function getAnswer(
    path: import("fs").PathOrFileDescriptor,
    answerKey: string,
  ): string | null;

  export function readInput(
    path: import("fs").PathOrFileDescriptor,
  ): string | null;
}
