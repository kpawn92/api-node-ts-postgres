import { AppDataSource } from './data.source';

export const DbConnection = async () => await AppDataSource.initialize();

export const Manager = AppDataSource.manager;
