import { UniqueId } from 'documentdb';
import { Gender } from './gender';

export interface Employee extends UniqueId {
    firstName: string;
    lastName: string;
    email: string;
    birthday: Date;
    isFounder: boolean;
    gender: Gender;
}
