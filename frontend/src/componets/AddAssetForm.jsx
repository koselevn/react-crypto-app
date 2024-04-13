import { Select, Space, Typography, Divider, Flex, Form, InputNumber, Button, DatePicker, Result } from 'antd'
import { useRef, useState } from "react"
import { useCrypto } from './layout/AppContent'
import CoinInfo from './layout/CoinInfo';

const validateMessages = {
    required: "${label} is required!",
    types: {
         number: "${label} is not valid number!"
    },
    number: {
        range: '${lable} must be between ${min} and ${max}'
    }
};

export default function AddAssetForm({onClose}) {
    const [form] = Form.useForm()
    const { crypto, addAsset } = useCrypto()
    const [coin, setCoin] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [select, setSelect] = useState(false);
    const assetRef = useRef()
    
    if (submitted) {
        return (
        <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
        <Button type="primary" key="console" onClick={onClose}>Go Console</Button>,
    ]}/>
        )
    }


    if (!coin) {
        return (
            <Select
                mode="multiple"
                style={{
                    width: '100%',
                }}
                onSelect={(v) => setCoin(crypto.find(c => c.id === v))}
                onClick={() => setSelect((prev) => !prev)}
                placeholder="Select Coin"
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{ width: '40px' }} src={option.data.icon} />
                        <p>{option.data.label}</p>
                    </Space>
                )}
            />
        )
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{span: 4,}}
            wrapperCol={{span: 10,}}
            style={{ maxWidth: 600,}}
            initialValues={{
                price: +(coin.price).toFixed(2),
            }}
            validateMessages={validateMessages}
            onFinish={onFinish}
            autoComplete="off">
            <CoinInfo coin={coin} />
            <Divider />
            
            <Form.Item label="Amount" name="amount"
                rules={[
                    {
                        type: 'number',
                        min: 0,
                    },
                ]}>
                <InputNumber onChange={handleAmountChange} placeholder='Enter coin amount' style={{width: '100%'}} />
            </Form.Item>

            <Form.Item label="Price" name="price">
                <InputNumber onChange={handlePriceChange} style={{width: '100%'}} />
            </Form.Item>

             <Form.Item label="Date & Time" name="date">
                <DatePicker showTime style={{width: '100%'}} />
            </Form.Item>

            <Form.Item label="Total" name="total">
                <InputNumber disabled style={{width: '100%'}} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">Add Asset</Button>
            </Form.Item>
        </Form>
    )

    function onFinish(values) {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.d$ ?? new Date(),
        }
        assetRef.current = newAsset
        setSubmitted(true)
        addAsset(newAsset)
    }

    function handleAmountChange(value) {
        const price = form.getFieldValue('price')
        form.setFieldsValue({ total: +(value * price) })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({ total: +(amount * value) })
    }
}