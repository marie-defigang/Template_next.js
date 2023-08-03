

export const arrayFromN = (N: number) => N > 0 ? new Array(N).fill(0).map((_, index) => index) : [];
