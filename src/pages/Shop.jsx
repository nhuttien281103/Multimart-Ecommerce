import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { ProductsList } from "../components/UI/ProductsList";
import { Helmet } from "../components/Helmet/Helmet";
import { CommonSection } from "../components/UI/CommonSection";
import data from "../assets/data/products";

export default function Shop() {
  const [productsData, setProductsData] = useState(data);

  const handleFilter = (e) => {
    const filterValue = e.target.value;

    switch (filterValue) {
      case "sofa":
        const filterSofaProducts = data.filter((item) => {
          return item.category === "sofa";
        });
        setProductsData(filterSofaProducts);
        break;
      case "mobile":
        const filterMobileProducts = data.filter((item) => {
          return item.category === "mobile";
        });
        setProductsData(filterMobileProducts);
        break;
      case "watch":
        const filterWatchProducts = data.filter((item) => {
          return item.category === "watch";
        });
        setProductsData(filterWatchProducts);
        break;
      case "chair":
        const filterChairProducts = data.filter((item) => {
          return item.category === "chair";
        });
        setProductsData(filterChairProducts);
        break;
      case "wireless":
        const filterWirelessProducts = data.filter((item) => {
          return item.category === "wireless";
        });
        setProductsData(filterWirelessProducts);
        break;
      default:
        setProductsData(data);
        break;
    }
  };

  const handleFilterPrice = (e) => {
    const filterValue = e.target.value;
    switch (filterValue) {
      case "descending":
        const filterDescending = productsData.sort((a, b) => a.price - b.price);
        const newFilterDescending = [...filterDescending];
        setProductsData(newFilterDescending);
        break;
      case "ascending":
        const filterAscending = productsData.sort((a, b) => b.price - a.price);
        const newFilterAscending = [...filterAscending];
        setProductsData(newFilterAscending);
        break;
      default:
        setProductsData(data);
        break;
    }
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    const filterSearchProducts = data.filter((item) => {
      return item.productName.toLowerCase().includes(searchText.toLowerCase());
    });
    setProductsData(filterSearchProducts);
  };
  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="3">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>Filter by category</option>
                  <option value="sofa">sofa</option>
                  <option value="mobile">mobile</option>
                  <option value="chair">chair</option>
                  <option value="watch">watch</option>
                  <option value="wireless">wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="3">
              <div className="filter__widget">
                <select onChange={handleFilterPrice}>
                  <option>Sort by</option>
                  <option value="ascending">ascending</option>
                  <option value="descending">descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="filter__notfound">No products are found!</h1>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}
