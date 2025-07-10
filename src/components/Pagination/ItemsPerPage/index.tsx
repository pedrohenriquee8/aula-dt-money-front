interface PaginationItemsPerPageProps {
  pageSize: number | undefined;
  handlePageSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function PaginationItemsPerPage({ pageSize, handlePageSizeChange }: PaginationItemsPerPageProps) {
  return (
    <div className="flex justify-start items-center mt-12 mb-1">
      <label
        htmlFor="handle-page-size-transactions-pagination"
        className="mr-2 text-sm font-medium"
      >
        Itens por página:
      </label>
      <select
        id="handle-page-size-transactions-pagination"
        value={pageSize}
        onChange={handlePageSizeChange}
        className="bg-white px-2 py-1 border border-gray-300 rounded cursor-pointer"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
      </select>
    </div>
  );
}
