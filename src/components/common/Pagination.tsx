import React from 'react';
import { useRecoilState } from 'recoil';
import { pageState } from '@src/states/pageState';
import Button from './PaginationButton';

type PaginationProps = {
  limit: number | undefined;
};

export default function Pagination({ limit }: PaginationProps) {
  const [page] = useRecoilState(pageState);
  const PAGE_LIST = 20;

  let arr;
  if (limit! <= PAGE_LIST) {
    arr = Array(limit)
      .fill(1)
      .map((n, idx) => n + idx);
  } else if (page < Math.floor(PAGE_LIST / 2) + 1) {
    arr = Array(PAGE_LIST)
      .fill(1)
      .map((n, idx) => n + idx);
  } else if (page > limit! - Math.floor(PAGE_LIST / 2)) {
    arr = Array(PAGE_LIST)
      .fill(limit! - (PAGE_LIST - 1))
      .map((n, idx) => n + idx);
  } else {
    arr = Array(PAGE_LIST)
      .fill(page + 1)
      .map((n, idx) => n - Math.floor(PAGE_LIST / 2) + idx);
  }

  return (
    <ul className="pagination">
      {arr.map((item) => (
        <Button btn={item} pageNum={item - 1} current={item - 1 === page} key={item} />
      ))}
      <div className=""></div>
    </ul>
  );
}
