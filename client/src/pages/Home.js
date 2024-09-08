import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import '../resources/transactions.css'
import AddEditTransaction from '../components/AddEditTransaction'
import axios from 'axios'
import { Select, Table, message, DatePicker } from 'antd'
import { AreaChartOutlined, UnorderedListOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Spinner from '../components/Spinner'
import moment from "moment"
import Analytics from '../components/Analytics'
import '../resources/default-layout.css'

function Home() {
    const { RangePicker } = DatePicker;
    const [selectedRecordForEdit, setSelectedRecordForEdit] = useState(null)
    const [transactionDate, setTransactionDate] = useState("")
    const [addEditTransactionModal, setAddEditTransactionModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [transactionData, setTransactionData] = useState([])
    const [frequency, setFrequency] = useState("7")
    const [type, setType] = useState("all")
    const [viewType, setViewType] = useState("table")
    const [selectedDateRange, setSelectedDateRange] = useState([])


    const getTransactions = async () => {
        try {
            setLoading(true)
            const user = JSON.parse(localStorage.getItem(`mahermoney-user`));
            const response = await axios.post('/api/transactions/get-all-transactions',
                {
                    userId: user._id,
                    frequency,
                    ...(frequency === "custom" && { selectedDateRange }),
                    type
                })
            setTransactionData(response.data)
            setLoading(false)
        }
        catch (error) {
            setLoading(false)
            message.error('Something went wrong')
        }
    }

    const deleteTransaction = async (record) => {
        try {
            setLoading(true)
            await axios.post('/api/transactions/delete-transaction', { transactionId: record._id })
            setLoading(false)
            getTransactions();
            message.success("Transaction Deleted")
        }
        catch (error) {
            setLoading(false)
            message.error('Something went wrong')
        }
    }

    useEffect(() => {
        getTransactions();
    }, [frequency, selectedDateRange, type]);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Reference',
            dataIndex: 'reference',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => {
                return <div>
                    <EditOutlined onClick={() => {
                        const temp = record.date
                        record.date = moment(`${temp}`)
                        setSelectedRecordForEdit(record)
                        setAddEditTransactionModal(true)
                    }} />
                    <DeleteOutlined className='mx-3' onClick={() => {
                        deleteTransaction(record)
                    }} />
                </div>
            }
        }
    ]

    return (
        <DefaultLayout>
            {loading ? <Spinner /> : null}
            <div className='filter d-flex justify-content-between align-items-center'>
                <div className='d-flex'>
                    <div className='d-flex flex-column '>
                        <h6>Select Frequency</h6>
                        <Select value={frequency} onChange={(value) => setFrequency(value)}>
                            <Select.Option value="7">Last Week</Select.Option>
                            <Select.Option value="30" >Last Month</Select.Option>
                            <Select.Option value="365">Last Year</Select.Option>
                            <Select.Option value="custom">Custom</Select.Option>
                        </Select>
                        <div className='mt-2'>
                            {frequency === "custom" ?
                                <RangePicker value={selectedDateRange} onChange={(value) => setSelectedDateRange(value)} /> : null}
                        </div>
                    </div>
                    <div>
                        <div className='d-flex flex-column mx-5' >
                            <h6>Select Type</h6>
                            <Select value={type} onChange={(value) => setType(value)}>
                                <Select.Option value="all">All</Select.Option>
                                <Select.Option value="income" >Income</Select.Option>
                                <Select.Option value="expense">Expense</Select.Option>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='mx-4 view-switch'>
                        <UnorderedListOutlined className={`${viewType === "table" ? 'active-icon' : 'inactive-icon'} mx-2 py-1`} onClick={() => setViewType("table")} />
                        <AreaChartOutlined className={`${viewType === "analytics" ? 'active-icon' : 'inactive-icon'} mx-2`} onClick={() => setViewType("analytics")} />
                    </div>
                    <button className='add-new-transaction' onClick={() => setAddEditTransactionModal(true)}>ADD NEW</button>
                </div>
            </div>
            <div className='table-analytics'>
                {viewType === "table" ? <Table dataSource={transactionData} columns={columns} /> : <Analytics transactions={transactionData} />}
            </div>

            {addEditTransactionModal && (
                <AddEditTransaction
                    setAddEditTransactionModal={setAddEditTransactionModal}
                    addEditTransactionModal={addEditTransactionModal}
                    getTransactions={getTransactions}
                    selectedRecordForEdit={selectedRecordForEdit}
                    setSelectedRecordForEdit={setSelectedRecordForEdit}
                />
            )}
        </DefaultLayout>
    )
}
export default Home