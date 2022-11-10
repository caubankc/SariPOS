import React, { useState, useEffect } from "react";
import AppLayout from "../../components/Layout";
import axios from "axios";
import { Table, Space, Tag, Button } from "antd";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const deduplicate = (a) => {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
      var item = a[i];
      if (seen[item] !== 1) {
        seen[item] = 1;
        out[j++] = item;
      }
    }
    return out;
  };

  useEffect(() => {
    const abortController = new AbortController();
    const filterData = (data, key) => {
      const items = data.map((item) => item[key]);
      const filtered = deduplicate(items);
      const object = filtered.map((item) => {
        return {
          text: item,
          value: item,
        };
      });
      return object;
    };

    const getAllProducts = async () => {
      const result = await axios.get("/api/products", { signal: abortController.signal });
      setProducts(result.data);
      setCategories(filterData(result.data, "category"));
      setStatuses(filterData(result.data, "status"));
    };

    getAllProducts().catch(console.error);
    return () => abortController.abort();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filterSearch: true,
      filters: categories,
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (record) => record.price,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        let color = "green";
        if (record.status === "inactive") {
          color = "volcano";
        }
        return (
          <Tag color={color} key={record.status}>
            {record.status.toUpperCase()}
          </Tag>
        );
      },
      filters: statuses.map((item) => {
        return {
          text: item.text.toUpperCase(),
          value: item.value,
        };
      }),
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => {
        let text = "Deactivate";
        if (record.status === "inactive") {
          text = "Activate";
        }
        return (
          <Space size="middle">
            <Button type="primary">View</Button>
            <Button type="default">Edit</Button>
            <Button type="default">{text}</Button>
          </Space>
        );
      },
    },
  ];

  return (
    <AppLayout>
      <h2>Products</h2>
      <Table dataSource={products} columns={columns} rowKey={obj => obj.id} bordered />
    </AppLayout>
  );
};

export default Products;
