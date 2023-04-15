import React from "react";
import Products from "./Products";

function ProductFeed({ products }) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-col-3 xl:grid-col-4 md:-mt-52 mx-auto">
      {/* <p>Products Here</p> */}
      {products
        .slice(0, 4)
        .map(({ category, description, image, price, title, id }) => (
          <Products
            category={category}
            description={description}
            image={image}
            price={price}
            title={title}
            key={id}
          />
        ))}
      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt=""
      />
      <div className="md:col-span-2 ">
        {products
          .slice(4, 5)
          .map(({ category, description, image, price, title, id }) => (
            <Products
              category={category}
              description={description}
              image={image}
              price={price}
              title={title}
              key={id}
            />
          ))}
      </div>
      {products
        .slice(5, products.length)
        .map(({ category, description, image, price, title, id }) => (
          <Products
            category={category}
            description={description}
            image={image}
            price={price}
            title={title}
            key={id}
          />
        ))}
    </div>
  );
}

export default ProductFeed;
