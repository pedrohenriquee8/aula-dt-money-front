interface PaginationButtonsProps {
  page: number | undefined;
  totalPages: number | undefined;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

export function PaginationButtons({ page, totalPages, handlePrevPage, handleNextPage }: PaginationButtonsProps) {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={handlePrevPage}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
      >
        Página Anterior
      </button>

      <span className="text-sm">
        Página {page} de {totalPages}
      </span>

      <button
        onClick={handleNextPage}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
      >
        Próxima Página
      </button>
    </div>
  );
}
