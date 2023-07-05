import { atom } from 'recoil';

export const tagState = atom<string>({ key: 'tagState', default: '' });
