import React from "react";
import AppLayout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
    PlusCircleOutlined,
    MinusCircleOutlined
} from '@ant-design/icons';
import { Table, Button } from 'antd';

const Cart = () => {

    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.rootReducer);

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
                <img src={"/images/" + image} alt={record.name} height={60} width={60} />
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
                    <MinusCircleOutlined
                        className='cart-minus'
                        onClick={() => handlerDecrement(record)}
                    />
                    <strong className='cart-quantity'>
                        {record.quantity}
                    </strong>
                    <PlusCircleOutlined
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
                <Button
                    className="danger-btn"
                    onClick={() => handlerDelete(record)}
                >Remove</Button>
            )
        }
    ];

    return (
        <AppLayout>
            <h2>Cart</h2>
            <Table dataSource={cartItems} columns={columns} rowKey={record => record._id} />
        </AppLayout>
    )

};

export default Cart;
