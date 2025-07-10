"use client";
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { PaginationButtons, PaginationItemsPerPage } from "@/components/Pagination";
import { Table } from "@/components/Table";
import { useTransaction } from "@/hooks/transactions";
import { ITransaction } from "@/types/transaction";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(5);

  const { data: transactions , isLoading } = useTransaction.ListAll(currentPage, currentPageSize);
  const { mutateAsync: addTransaction } = useTransaction.Create();

  const openModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddModal = (newTransaction: ITransaction) => {
    addTransaction(newTransaction);
  }

  const { data, pagination, totals } = transactions || {};
  const { page, pageSize, totalPages } = pagination || {};

  if (isLoading) return <div>Loading...</div>;
  
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (!totalPages) return;
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);

    setCurrentPageSize(newPageSize);
    setCurrentPage(1);
  };

  return (
    <div>
      <ToastContainer />
      <Header openModal={openModal} />
      <BodyContainer>
        <CardContainer totals={totals} />
        <PaginationItemsPerPage pageSize={pageSize} handlePageSizeChange={handlePageSizeChange} />
        <Table transactions={data} />
        <PaginationButtons page={page} totalPages={totalPages} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} />
        {isModalOpen && <FormModal closeModal={handleCloseModal} formTitle="Adicionar Transação" addTransaction={handleAddModal} /> }
      </BodyContainer>
    </div>
  );
}
