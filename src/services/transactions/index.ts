import { ITransaction } from "@/types/transaction";
import { api } from "../api"
import { toast } from "react-toastify";

export async function getTransactions(page: number, pageSize: number) {
    try {
      const response = await api.get(`/transaction?page=${page}&pageSize=${pageSize}`); 
      return response.data; 
    } catch (error) {
        throw new Error("Erro ao buscar transações: " + error);
    }
}

export async function getTransactionById(id: string) {
    try {
        const response = await api.get(`/transaction/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao buscar transação: " + error);
    }
}

export async function createTransaction(transaction: ITransaction) {
    try {
        const response = await api.post('/transaction', transaction);
        toast.success("Transação adicionada com sucesso!")
        return response.data;
    } catch (error) {
        throw new Error("Erro ao criar transação: " + error);
    }
}

export async function updateTransaction(transaction: ITransaction) {
    try {
        const response = await api.patch(`/transaction/${transaction.id}`, transaction);
        toast.success("Transação atualizada com sucesso!")
        return response.data;
    } catch (error) {
        throw new Error("Erro ao atualizar transação: " + error);
    }
}

export async function deleteTransaction(id: string) {
    try {
        const response = await api.delete(`/transaction/${id}`);
        toast.success("Transação removida com sucesso!")
        return response.data;
    } catch (error) {
        throw new Error("Erro ao remover transação: " + error);
    }
}