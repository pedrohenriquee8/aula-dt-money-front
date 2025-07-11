import { Input } from "@/components/Form/Input";
import { TransactionSwitcher } from "@/components/TransactionSwitcher";
import { useTransaction } from "@/hooks/transactions";
import { ITransaction, TransactionType } from "@/types/transaction";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { date, number, object, string } from "yup";

interface EditTransactionModalProps {
    transaction: ITransaction;
    handleCloseEditTransactionModal: () => void;
}

type EditTransactionData = {
    title: string;
    type: TransactionType;
    category: string;
    price: number;
    data: Date;
}

const transactionSchema = object({
    title: string()
        .required('O Título é obrigatório')
        .min(5, 'O Título deve ter pelo menos 5 caracteres'),
    type: string()
        .required('O Tipo é obrigatório')
        .oneOf(['INCOME', 'OUTCOME'] as const, 'O Tipo deve ser "income" ou "outcome"'),
    category: string()
        .required('A Categoria é obrigatória'),
    price: number()
        .required('O Preço é obrigatório')
        .positive('O preço deve ser um número positivo')
        .min(0.01, 'O preço deve ser maior que zero'),
    data: date()
        .required('A Data é obrigatória')
        .default(() => new Date())
})

export function EditTransactionModal({ transaction, handleCloseEditTransactionModal }: EditTransactionModalProps) {
    const { mutateAsync: updateTransaction } = useTransaction.Update(transaction.id!);
    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<EditTransactionData>({
        defaultValues: {
            title: transaction.title,
            type: transaction.type,
            category: transaction.category,
            price: transaction.price,
            data: new Date(transaction.data)
        },
        resolver: yupResolver(transactionSchema)
    });

    const watchedValues = watch();

    const handleSetType = (type: 'INCOME' | 'OUTCOME') => {
        setValue('type', type);
    }

    const onSubmit = async (data: ITransaction) => {
        await updateTransaction(data);
        handleCloseEditTransactionModal();
    }

    const isFormChanged = useMemo(() => {
        return (
            watchedValues.title !== transaction.title ||
            Number(watchedValues.price) !== Number(transaction.price) ||
            watchedValues.category !== transaction.category ||
            watchedValues.type !== transaction.type
        );
    }, [watchedValues, transaction]);

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-modal text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <button
                            type="button"
                            className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600"
                            onClick={handleCloseEditTransactionModal}
                            aria-label="Fechar">
                            <span className="text-2xl">&times;</span>
                        </button>
                        <div className="bg-modal px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h1 className="font-semibold leading-9 text-title text-2xl" id="modal-title">Editar Transação</h1>
                                </div>
                            </div>
                        </div>
                        <form className="flex flex-col gap-4 px-12 mt-4 mb-6" onSubmit={handleSubmit(onSubmit)}>
                            <Input type="text" placeholder="Título" {...register("title")} />
                            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
                            <Input type="number" placeholder="Preço" {...register("price")} />
                            {errors.price && <span className="text-red-500">{errors.price.message}</span>}
                            <TransactionSwitcher setType={handleSetType} type={transaction.type as TransactionType} />
                            {errors.type && <span className="text-red-500">{errors.type.message}</span>}
                            <Input type="text" placeholder="Categoria" {...register("category")} />
                            {errors.category && <span className="text-red-500">{errors.category.message}</span>}

                            <div className="bg-modal px-12 py-3 flex sm:flex-row-reverse w-full mb-11">
                                <button type="submit" disabled={!isFormChanged} className="mt-3 w-full justify-center rounded-md bg-income text-white px-3 py-5 text-normal font-semibold shadow-sm hover:opacity-80 sm:mt-0 disabled:opacity-25 disabled:cursor-not-allowed">Confirmar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}