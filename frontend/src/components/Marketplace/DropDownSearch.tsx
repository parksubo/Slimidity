import React, { FC } from 'react';

const DropDownSearch: FC = (props) => {
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
          <a className="dropdown-item" href="#">
            Highest Price
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Lowest Price
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Latest
          </a>
        </li>
      </ul>
    </>
  );
};

export default DropDownSearch;
