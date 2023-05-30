import "./Pagination.css";

/* eslint-disable @typescript-eslint/no-unused-vars */
interface PaginationProps {
  totalPage: number;
  pageNumber: number;
  onNextPage: () => void;
  onBackPage: () => void;
  onPageNumberClickHandler: (page: number) => void;
}

const Pagination = ({
  totalPage,
  pageNumber,
  onBackPage,
  onNextPage,
  onPageNumberClickHandler,
}: PaginationProps) => {
  const numPage = Math.ceil(pageNumber / 5);
  const startNumber = 1 + 5 * (numPage - 1);
  const endNumber = 5 + 5 * (numPage - 1);
  const pageArr = [];

  for (let i = startNumber; i <= endNumber; i++) {
    if (i <= totalPage) pageArr.push(i);
  }

  const clickPageHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageNumberClickHandler(Number(event.currentTarget.name));
  };

  return (
    <nav className="pagination-container">
      <button onClick={onBackPage} disabled={pageNumber === 1}>
        ◀︎
      </button>
      {pageArr.map((el) => (
        <button
          key={el}
          name={String(el)}
          onClick={clickPageHandler}
          className={pageNumber === el ? "button-selected" : ""}
        >
          {el}
        </button>
      ))}
      <button onClick={onNextPage} disabled={pageNumber === totalPage}>
        ►
      </button>
    </nav>
  );
};

export default Pagination;
