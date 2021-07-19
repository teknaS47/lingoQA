import React, { useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../API/BASE_URL";
import axios from "axios";
import {
  CardBody,
  Card,
  Text,
  TextContent,
  TextVariants,
  Grid,
  PageSection,
} from "@patternfly/react-core";

export default function Products() {
  const [products, setProducts] = useState([]);
  React.useEffect(() => {
    const fetchProductsData = async () => {
      const ProductsData = await axios(`${BASE_URL}/products`);
      setProducts(ProductsData.data);
    };
    fetchProductsData();
  }, []);

  return (
    <PageSection>
      <Grid gutter="lg" sm={6} md={3}>
        {products.map((product) => {
          return (
            <Card className="product-card" key={product.id} isHoverable>
              <CardBody>
                <Link to={`/products/${product.id}/screenshots`}>
                  <TextContent>
                    <Text
                      className="product-title"
                      component={TextVariants.h4}>
                      {product.name}
                    </Text>
                  </TextContent>
                </Link>
              </CardBody>
            </Card>
          );
        })}
      </Grid>
    </PageSection>
  );
}
