import React from 'react'
import { useState } from "react"
import { Modal, Form, Select, DatePicker } from "antd"
import { message } from "antd"
import '../resources/transactions.css'
import Input from 'antd/lib/input/Input'
import Spinner from "../components/Spinner"
import axios from 'axios'

function AddEditTransaction({ addEditTransactionModal, setAddEditTransactionModal, getTransactions, selectedRecordForEdit, setSelectedRecordForEdit }) {
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem("mahermoney-user"))
            setLoading(true)
            if (selectedRecordForEdit) {
                await axios.post("/api/transactions/edit-transaction", {
                    payload: {
                        ...values,
                        userId: user._id,
                    },
                    transactionId: selectedRecordForEdit._id,
                });
                getTransactions();
                message.success("Transaction Updated successfully");
            } else {
                await axios.post("/api/transactions/add-transaction", {
                    ...values,
                    userId: user._id,
                });
                getTransactions();
                message.success("Transaction added successfully");
            }
            setAddEditTransactionModal(false)
            setLoading(false)
            setSelectedRecordForEdit(null)
        }
        catch (error) {
            message.error('something went wrong')
        }
    }
    return (
        <Modal title={(selectedRecordForEdit === null ? "Add Transaction" : "Edit Transaction")} footer={false} open={addEditTransactionModal}
            onCancel={() => {
                setAddEditTransactionModal(false)
                setSelectedRecordForEdit(null)
            }}>

            {loading ? <Spinner /> : null}
            <Form layout='vertical' className='transaction-form' onFinish={onFinish} initialValues={selectedRecordForEdit}>
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter Amount',
                        },
                    ]}
                >
                    <Input type='text' />
                </Form.Item>

                <Form.Item
                    label="Type"
                    name="type"
                    rules={[
                        {
                            required: true,
                            message: 'Please select an item from the list',
                        },
                    ]}
                >
                    <Select placeholder="Select an item">
                        <Select.Option value="income">Income</Select.Option>
                        <Select.Option value="expense">Expense</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: 'Please select an item from the list',
                        },
                    ]}
                >
                    <Select placeholder="Select an item">
                        <Select.Option value="salary">salary</Select.Option>
                        <Select.Option value="freelance">Freelance</Select.Option>
                        <Select.Option value="food">Food</Select.Option>
                        <Select.Option value="entertainment">Entertainment</Select.Option>
                        <Select.Option value="medical">Medical</Select.Option>
                        <Select.Option value="tax">Tax</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Date"
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a date',
                        },
                    ]}
                >
                    <DatePicker style={{ width: '100%' }} format={"DD-MM-YYYY"} />
                    {/* <DatePicker style={{ width: '100%' }} format={"DD-MM-YYYY"} defaultValue={moment("18-11-2023","DD-MM-YYYY")} /> */}
                    {/* <DatePicker style={{ width: '100%' }} format={"DD-MM-YYYY"} defaultValue={moment(transactionDate,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")} /> */}
                </Form.Item>

                <Form.Item
                    label="Reference"
                    name="reference"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter some text',
                        },
                    ]}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input type='text' />
                </Form.Item>
                <div className='d-flex justify-content-end'>
                    <button className='save-transaction primary' type='submit'>
                        Save
                    </button>
                </div>
            </Form>
        </Modal>
    )
}

export default AddEditTransaction