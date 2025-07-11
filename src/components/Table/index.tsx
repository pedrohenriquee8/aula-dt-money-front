import { ITransaction } from "@/types/transaction";
import { formatCurrency, formatDate } from "@/utils";
import { ConfirmTransactionDeletion } from "../Modal/ConfirmTransactionDeletion";
import { useState } from "react";
import { EditTransactionModal } from "../Modal/EditTransaction";

export interface ITableProps {
  transactions: ITransaction[] | undefined;
}

export function Table({ transactions }: ITableProps) {
  const [transactionToBeDeleted, setTransactionToBeDeleted] =
    useState<ITransaction | null>(null);
  const [transactionToBeEdited, setTransactionToBeEdited] =
    useState<ITransaction | null>(null);

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center text-gray-500">
        Nenhuma transação encontrada.
      </div>
    );
  }

  const handleOpenDeleteTransactionModal = (transaction: ITransaction) => {
    setTransactionToBeDeleted(transaction);
  };

  const handleCloseDeleteTransactionModal = () => {
    setTransactionToBeDeleted(null);
  }

  const handleOpenEditTransactionModal = (transaction: ITransaction) => {
    setTransactionToBeEdited(transaction);
  };

  const handleCloseEditTransactionModal = () => {
    setTransactionToBeEdited(null);
  };

  return (
    <>
      <table className="w-full mt-4 border-0 border-separate border-spacing-y-2 ">
        <thead>
          <tr>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Título
            </th>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Preço
            </th>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Categoria
            </th>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Data
            </th>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="bg-white h-16 rounded-lg">
              <td className="px-4 py-4 whitespace-nowrap text-title">
                {transaction.title}
              </td>
              <td
                className={`px-4 py-4 whitespace-nowrap text-right ${
                  transaction.type === "INCOME" ? "text-income" : "text-outcome"
                }`}
              >
                {formatCurrency(transaction.price)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-table">
                {transaction.category}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-table">
                {transaction.data ? formatDate(new Date(transaction.data)) : ""}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <button onClick={() => handleOpenEditTransactionModal(transaction)} className="text-blue-500 hover:underline cursor-pointer">
                  Editar
                </button>
                <button
                  onClick={() => handleOpenDeleteTransactionModal(transaction)}
                  className="text-red-500 hover:underline ml-4 cursor-pointer"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {transactionToBeDeleted && (
        <ConfirmTransactionDeletion transaction={transactionToBeDeleted} handleCloseDeleteTransactionModal={handleCloseDeleteTransactionModal} />
      )}
      {transactionToBeEdited && (
        <EditTransactionModal
          transaction={transactionToBeEdited}
          handleCloseEditTransactionModal={handleCloseEditTransactionModal}
        />
      )}
    </>
  );
}
