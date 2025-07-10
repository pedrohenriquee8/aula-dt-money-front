import { ITotal } from "@/types/transaction";
import { Card } from "../Card";

export interface ICardContainerProps {
  totals: ITotal | undefined;
}

const defaultTotals: ITotal = { total: 0, totalIncome: 0, totalOutcome: 0 };

export function CardContainer({ totals }: ICardContainerProps){
    const { totalIncome, totalOutcome, total } = totals || defaultTotals;

    return (
        <div className="flex justify-between">          
          <Card title="Entradas" value={totalIncome} type="income" />
          <Card title="Saídas" value={totalOutcome} type="outcome" />
          <Card title="Total" value={total} type="total" />
        </div>
    )
}