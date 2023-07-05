import { useRecoilState } from 'recoil';
import { pageState } from '@src/states/pageState';

type ButtonProps = {
  btn: string;
  pageNum: number;
  current: boolean;
};

export default function PaginationButton({ btn, pageNum, current }: ButtonProps) {
  const [, setPage] = useRecoilState(pageState);
  const handleClick = () => {
    setPage(pageNum);
  };

  return (
    <li className={`page-item ng-scope ng-class ${current && `active`}`}>
      <a className="page-link ng-binding" onClick={handleClick} href="#">
        {btn}
      </a>
    </li>
  );
}
