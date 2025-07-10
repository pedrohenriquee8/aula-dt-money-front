export interface ITransactionResponse {
    data: ITransaction[];
    pagination: ITransactionPagination
    totals: ITotal;
}

export interface ITransaction {
    id?: string;
    title: string;
    price: number;
    category: string;
    data: Date;
    type: "INCOME" | "OUTCOME";
}

export interface ITransactionPagination {
    totalPages: number;
    pageSize: number;
    page: number;
}

export type ITotal = {
    totalIncome: number;
    totalOutcome: number;
    total: number;
}
