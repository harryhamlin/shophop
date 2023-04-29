import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { QUERY_ALL_PRODUCTS, QUERY_CATEGORIES } from "../utils/queries";
// import ProductItem from '../components/ProductItem';
import { Col, Row, Space, Input } from "antd";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { UPDATE_PRODUCT } from "../utils/mutations";
// import ProductItem from '../components/ProductItem';
// import Cart from "../components/Cart";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  const [search, setSearch] = useState("");
  const { Search } = Input;
  const styles = {
    search: {
      position: 'relative',
      bottom: '6vh'
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={styles.search}>
        <Search
          placeholder="Search By Cateogry"
          name="search"
          onSearch={setSearch}
          style={{
            width: 200,
          }}
        />
      </div>
      <Row gutter={[16, 32]} justify={"center"}>
        {data?.products
          ?.filter((d) => {
            const nameMatch = d.name.toLowerCase().includes(search.toLowerCase());
            const categoryMatch = d.categories.some((category) =>
              category.name.toLowerCase().includes(search.toLowerCase())
            );
            return search.toLocaleLowerCase() === ""
              ? d
              : nameMatch || categoryMatch;
          })
          .map((d) => (
            // <Link to={`/products/${d._id}`} key={d._id}>
            <Col span={6} >
              <ProductCard
                name={d.name}
                price={d.price}
                image={
                  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                }
                _id={d._id}
              />
            </Col>
          ))}
      </Row>
    </>
  );

  // return (
  //   <Row gutter={[16, 32]} justify={"center"}>
  //     <Col span={6}>
  //       <ProductCard
  //         name="hi"
  //         price={22}
  //         image={
  //           "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  //         }
  //         _id={1}
  //       />
  //     </Col>
  //     <Col span={6}>
  //       <ProductCard
  //         name="hi"
  //         price={22}
  //         image={
  //           "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  //         }
  //         _id={1}
  //       />
  //     </Col>
  //     <Col span={6}>
  //       <ProductCard
  //         name="hi"
  //         price={22}
  //         image={
  //           "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  //         }
  //         _id={1}
  //       />
  //     </Col>
  //     <Col span={6}>
  //       <ProductCard
  //         name="hi"
  //         price={22}
  //         image={
  //           "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  //         }
  //         _id={1}
  //       />
  //     </Col>
  //     <Col span={6}>
  //       <ProductCard
  //         name="hi"
  //         price={22}
  //         image={
  //           "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  //         }
  //         _id={1}
  //       />
  //     </Col>
  //     <Col span={6}>
  //       <ProductCard
  //         name="hi"
  //         price={22}
  //         image={
  //           "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  //         }
  //         _id={1}
  //       />
  //     </Col>
  //     <Col span={6}>
  //       <ProductCard
  //         name="hi"
  //         price={22}
  //         image={
  //           "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  //         }
  //         _id={1}
  //       />
  //     </Col>
  //   </Row>
  // );
};
export default Home;
