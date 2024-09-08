import React from 'react'
import "../resources/analytics.css"
import { Progress } from 'antd';

export default function Analytics({ transactions }) {
    const totalTransactions = transactions.length;
    const totalIncomeTransactions = transactions.filter(transactions => transactions.type === "income").length
    const totalExpenseTransactions = transactions.filter(transactions => transactions.type === "expense").length
    const totalIncomeTransactionsPercentage = ((totalIncomeTransactions / totalTransactions) * 100).toFixed(1)
    const totalExpenseTransactionsPercentage = ((totalExpenseTransactions / totalTransactions) * 100).toFixed(1)

    const totalTurnover = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnover = transactions.filter(transactions => transactions.type === "income").reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpenseTurnover = transactions.filter(transactions => transactions.type === "expense").reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnoverPercentage = ((totalIncomeTurnover / totalTurnover) * 100).toFixed(1)
    const totalExpenseTurnoverPercentage = ((totalExpenseTurnover / totalTurnover) * 100).toFixed(1)

    const categories = ['salary', 'freelance', 'food', 'entertainment', 'medical', 'tax']

    return (
        <div className='analytics'>
            <div className='row' >
                <div className='col-md-4 mx-3'>
                    <div className='transactions-count'>
                        <h4>Total Transactions : {totalTransactions}</h4>
                        <hr />
                        <h5>Income: {totalIncomeTransactions}</h5>
                        <h5>Expense: {totalExpenseTransactions}</h5>
                        <div className="d-flex justify-content-around">
                            <Progress strokeColor="green" type='circle' percent={totalIncomeTransactionsPercentage} />
                            <Progress strokeColor="red" type='circle' percent={totalExpenseTransactionsPercentage} />
                        </div>
                    </div>
                </div>
                <div className='col-md-4 mx-3'>
                    <div className='transactions-count'>
                        <h4>Total Turnover : {totalTurnover}</h4>
                        <hr />
                        <h5>Income : {totalIncomeTurnover}</h5>
                        <h5>Expense: {totalExpenseTurnover}</h5>
                        <div className="d-flex justify-content-around">
                            <Progress strokeColor="green" type='circle' percent={totalIncomeTurnoverPercentage} />
                            <Progress strokeColor="red" type='circle' percent={totalExpenseTurnoverPercentage} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='row d-flex' >
                <div className='col-md-6'>
                    <div className='income-expense-category'>
                        <h3>Income Category</h3>
                        {categories.map((cat) => {
                            const amount = transactions.filter(transaction => transaction.type === "income" && transaction.category === cat).reduce((acc, transaction) => acc + transaction.amount, 0)
                            return (amount > 0 && < div >
                                <h5>{cat}</h5>

                                <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(1)} />
                            </div>)
                        })}
                    </div>
                </div>
                <div className='col-md-6'>
                        <div className='income-expense-category'>
                            <h3>Expense Category</h3>
                            {categories.map((cat) => {
                                const amount = transactions.filter(transaction => transaction.type === "expense" && transaction.category === cat).reduce((acc, transaction) => acc + transaction.amount, 0)
                                return (amount > 0 && < div >
                                    <h5>{cat}</h5>
                                    <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(1)} />
                                </div>)
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}
