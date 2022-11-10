import React, { useState, useEffect } from "react";
import AppLayout from "../../components/Layout";
import axios from "axios";
import {
  Table, Space, Tag, Button, Switch, Input, Modal, Form,
  Select, InputNumber, Upload, message
} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const dispatch = useDispatch();
  const { Search } = Input;

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
      dispatch({ type: "SHOW_LOADING" });
      const { data } = await axios.get("/api/products");
      setProducts(data);
      setCategories(filterData(data, "category"));
      setStatuses(filterData(data, "status"));
      dispatch({ type: "HIDE_LOADING" });
    };

    getAllProducts().catch(console.error);
  }, []);

  const handlerSearch = (value) => console.log(value);

  const handlerUpload = (file) => {
    const acceptedFileTypes = [
      'image/png',
      'image/jpeg'
    ]
    const pass = acceptedFileTypes.includes(file.type);
    if (!pass) {
      message.error(`${file.name} is not a png or jpeg file`);
    }
    return pass || Upload.LIST_IGNORE;
  }

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
      dataIndex: "_id",
      render: (id, record) => {
        let text = true;
        if (record.status === "inactive") {
          text = false;
        }
        return (
          <Space size="middle">
            <Button className="primary-btn">View</Button>
            <Button className="secondary-btn">Edit</Button>
            <Switch checked={text} onClick={(text) => !text} />
          </Space >
        );
      },
    },
  ];

  return (
    <AppLayout>
      <h2>Products</h2>

      <Search
        className="search-box"
        placeholder="product name"
        onSearch={() => handlerSearch()} />

      <Button
        className="add-new"
        onClick={() => setPopModal(true)}>
        Add New</Button>

      <Table dataSource={products} columns={columns} rowKey={obj => obj.id} />

      <Modal
        title="Basic Modal"
        open={popModal}
        onCancel={() => setPopModal(false)}
        footer={false}>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal">
          <Form.Item name="name" label="Name">
            <Input placeholder="product name" />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Select defaultValue={"sweets"}>
              <Select.Option value="snacks">Snacks</Select.Option>
              <Select.Option value="sweets">Sweets</Select.Option>
              <Select.Option value="drinks">Drinks</Select.Option>
              <Select.Option value="canned_goods">Canned Goods</Select.Option>
              <Select.Option value="cigars">Cigarettes</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Price">
            <InputNumber min={0.01} step={0.01} defaultValue={1.00} />
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Upload
              action={"http://localhost:3000/upload-image"}
              listType="picture"
              beforeUpload={(file) => handlerUpload(file)} >
              <Button icon={<UploadOutlined />}>
                Upload PNG or JPEG
              </Button>
            </Upload>
          </Form.Item>
          <Button className="primary-btn">Add</Button>
        </Form>
      </Modal>

    </AppLayout>
  );
};

export default Products;
