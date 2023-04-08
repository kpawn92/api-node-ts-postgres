import 'dotenv/config';

export const getEnvironment = (k: string): string | undefined => process.env[k];

export const getNumberEnv = (k: string): number => Number(getEnvironment(k));
