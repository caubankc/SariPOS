import React from "react";
import AppLayout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
    DeleteOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined
} from '@ant-design/icons';
import { Table } from 'antd';

const Cart = () => {

    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.rootReducer);

    const handlerIncrement = (record) => {
        dispatch({
            type: "UPDATE_CART",
            payload: { ...record, quantity: record.quantity + 1 }
        })
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
                <img src={"images" + image} alt={record.name} height={60} width={60} />
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
                    <PlusCircleOutlined className='cart-plus' />
                    <strong className='cart-quantity'>
                        {record.quantity}
                    </strong>
                    <MinusCircleOutlined className='cart-minus' />
                </div>
            )
        },
        {
            title: "Action",
            dataIndex: "_id",
            render: (id, record) => (
                <DeleteOutlined />
            )
        }
    ];

    return (
        <AppLayout>
            <h2>Cart</h2>
            <Table dataSource={cartItems} columns={columns} rowKey={obj => obj.id} />
        </AppLayout>
    )

};

export default Cart;
