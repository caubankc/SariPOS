import React, { useState } from "react";
import AppLayout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
    CaretLeftFilled,
    CaretRightFilled
} from '@ant-design/icons';
import { Table, Button, Space } from 'antd';

const Cart = () => {

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.rootReducer);
    const [loading, setLoading] = useState(false);

    const handlerIncrement = (record) => {
        dispatch({
            type: "INCREASE_QTY",
            payload: { ...record, quantity: 1 }
        })
    }

    const handlerDecrement = (record) => {
        if (record.quantity !== 1) {
            dispatch({
                type: "DECREASE_QTY",
                payload: { ...record, quantity: 1 }
            })
        }
    }

    const handlerDelete = (record) => {
        dispatch({ type: "DELETE_FROM_CART", payload: record })
    }

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (image, record) => (
                <img src={"/images/products/" + image} alt={record.name} height={60} width={60} />
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Quantity",
            dataIndex: "_id",
            render: (id, record) => (
                <div>
                    <CaretLeftFilled
                        className='cart-minus'
                        onClick={() => handlerDecrement(record)}
                    />
                    <strong className='cart-quantity'>
                        {record.quantity}
                    </strong>
                    <CaretRightFilled
                        className='cart-plus'
                        onClick={() => handlerIncrement(record)}
                    />
                </div>
            )
        },
        {
            title: "Action",
            dataIndex: "_id",
            render: (id, record) => (
                <Space>
                    <Button
                        className="danger-btn"
                        onClick={() => handlerDelete(record)}
                    >Remove</Button>
                </Space>
            )
        }
    ];

    return (
        <AppLayout>
            <h2>Cart</h2>
            <Table
                dataSource={cartItems}
                columns={columns}
                rowKey={record => record._id}
                loading={loading} />
        </AppLayout>
    )

};

export default Cart;
