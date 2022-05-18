import React, { FC } from 'react';

interface IDropDownSearchProps {
  onClickSort: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

// 정렬
// 0: highest price 1: lowest price 2: Latest
const DropDownSearch: FC<IDropDownSearchProps> = ({ onClickSort }) => {
  return (
    <>
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ backgroundColor: 'transparent' }}
      >
        정렬 조건
      </button>
      <ul
        className="dropdown-menu dropdown-menu-dark"
        aria-labelledby="dropdownMenuButton2"
      >
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={onClickSort}
            data-command={0}
          >
            Highest Price
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={onClickSort}
            data-command={1}
          >
            Lowest Price
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={onClickSort}
            data-command={2}
          >
            Latest
          </a>
        </li>
      </ul>
    </>
  );
};

export default DropDownSearch;
