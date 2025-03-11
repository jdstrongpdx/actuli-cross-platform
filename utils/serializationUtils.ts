export const serialize = <T>(data: T): string => JSON.stringify(data);
export const deserialize = <T>(data: string): T => JSON.parse(data);