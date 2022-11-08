import React from 'react'
import { Card } from 'antd';

const Product = ({product}) => {
    const { Meta } = Card;
    return (
        <Card
            hoverable
            style={{ width: 240, marginBottom: 30 }}
            cover={<img alt={product.name} src={product.image} style={{height: 200}}/>}
        >
            <Meta title={product.name} description={product.category} />
        </Card>
    )
}

export default Product