import { MdExpandLess } from "react-icons/md";
import { SetURLSearchParams } from "react-router-dom";

interface PaginationProps {
  page: number;
  limit: number;
  setSearchParams: SetURLSearchParams;
  totalPages: number;
  decrementDisabled: boolean;
  incrementDisabled: boolean;
}
export default function Pagination({
  page,
  limit,
  decrementDisabled,
  incrementDisabled,
  setSearchParams,
  totalPages,
}: PaginationProps) {
  return (
    <footer className="inline-flex gap-1 mt-3">
      <button
        disabled={decrementDisabled}
        type="button"
        onClick={() => {
          const pageCount = page - 1;
          setSearchParams({
            page: pageCount.toString(),
            limit: limit.toString(),
          });
        }}
        className={`${
          decrementDisabled ? "cursor-not-allowed" : "cursor-pointer"
        } `}
      >
        <MdExpandLess className="-rotate-90 text-3xl" />
      </button>

      {totalPages > 10 ? (
        ""
      ) : (
        <div className="inline-flex gap-2 items-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                onClick={() => {
                  const pageCount = pageNumber;
                  setSearchParams({
                    page: pageCount.toString(),
                    limit: limit.toString(),
                  });
                }}
                key={pageNumber}
                className="rounded-md bg-gray-300 w-10 p-0.5"
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      )}

      <button
        disabled={incrementDisabled}
        type="button"
        onClick={() => {
          const pageCount = page + 1;
          setSearchParams({
            page: pageCount.toString(),
            limit: limit.toString(),
          });
        }}
        className={`${
          incrementDisabled ? "cursor-not-allowed" : "cursor-pointer"
        } `}
      >
        <MdExpandLess className="rotate-90 text-3xl " />
      </button>
    </footer>
  );
}
