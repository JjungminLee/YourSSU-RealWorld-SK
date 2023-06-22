import { IGetUser } from '@src/types/user';
import { atom } from 'recoil';

export const userAtom = atom<IGetUser | null>({
  key: 'userAtom',
  default: null,
});
