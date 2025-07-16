import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type PaginationProps = {
  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  meta: {
    last_page: number;
  };
};

const Pagination = ({ number, setNumber, meta }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
      <button
        onClick={() => setNumber(1)}
        disabled={number === 1}
        className={`px-2 py-1 border rounded disabled:opacity-50`}
      >
        <ChevronsLeft strokeWidth={3} />
      </button>

      <button
        onClick={() => setNumber((prev: number) => Math.max(1, prev - 1))}
        disabled={number === 1}
        className={`px-2 py-1 border rounded disabled:opacity-50`}
      >
        <ChevronLeft strokeWidth={3} />
      </button>

      {Array.from({ length: 5 }, (_, i) => {
        const startPage = Math.max(1, number - 2);
        const page = startPage + i;

        if (page > meta.last_page) return null;

        return (
          <button
            key={page}
            onClick={() => setNumber(page)}
            className={`px-3 py-1 border rounded ${
              number === page ? "bg-[#ff6600] text-white" : ""
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() =>
          setNumber((prev: number) => Math.min(meta.last_page, prev + 1))
        }
        disabled={number === meta.last_page}
        className={`px-2 py-1 border rounded disabled:opacity-50`}
      >
        <ChevronRight strokeWidth={3} />
      </button>

      <button
        onClick={() => setNumber(meta.last_page)}
        disabled={number === meta.last_page}
        className={`px-2 py-1 border rounded disabled:opacity-50`}
      >
        <ChevronsRight strokeWidth={3} />
      </button>
    </div>
  );
};

export default Pagination;
