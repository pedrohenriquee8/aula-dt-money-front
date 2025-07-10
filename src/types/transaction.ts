export interface ITransactionResponse {
    data: ITransaction[];
    total: number;
    totalPages: number;
    pageSize: number;
    page: number;
}

export interface ITransaction {
    id?: string;
    title: string;
    price: number;
    category: string;
    data: Date;
    type: "INCOME" | "OUTCOME";
}

export type ITotal = {
    totalIncome: number;
    totalOutcome: number;
    total: number;
}
