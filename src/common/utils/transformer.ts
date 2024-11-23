export const parseNumber = {
    to: (value?: number): string | undefined => value?.toString(),
    from: (value: string): number => +value,
};
