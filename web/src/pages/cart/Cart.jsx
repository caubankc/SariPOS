import React from "react";
import AppLayout from "../../components/Layout";
import { useSelector } from "react-redux";
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.rootReducer);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (image, record) => (
                <img src={image} alt={record.name} height={60} width={60} />
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
                    <PlusCircleOutlined />
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
