import { ChangeEvent, useState } from 'react';

export default function useInput(initialState: string = ''): [string, (e: ChangeEvent<HTMLInputElement>) => void] {
  const [input, setInput] = useState<string>(initialState);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return [input, handler];
}
