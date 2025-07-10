import { createTransaction, deleteTransaction, getTransactionById, getTransactions, updateTransaction } from "@/services/transactions"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const QUERY_KEY = 'qkTransaction'

const Create = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    }
  })
}

const ListAll = (page: number, pageSize: number) => {
  return useQuery({ queryKey: [QUERY_KEY], queryFn: () => getTransactions(page, pageSize) })
}

const FetchById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => getTransactionById(id),
  })
}

const Update = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    }
  })
}

const Delete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    }
  })
}

export const useTransaction = {
    Create,
    ListAll,
    FetchById,
    Update,
    Delete,
}

