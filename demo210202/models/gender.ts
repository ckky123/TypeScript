import { UniqueId } from 'documentdb';

export interface Gender extends UniqueId {
    name: string;
}
