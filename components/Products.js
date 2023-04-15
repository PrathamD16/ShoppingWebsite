import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import * as CurrencyFormat from 'react-currency-format';


const MAX_RATING = 5;
const MIN_RATING = 1;

function Products({ category, description, image, price, title, id }) {
  const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);

  const [hasPrime] = useState(Math.random() < 0.5)

  return (
    <div className="relative flex flex-col bg-white z-30 p-10">
    {/* <p>Products Here</p> */}
      <p className="absolute top-2 right-2 text-xs italic text-gray-400 ">{category}</p>

      <Image src={image} height={200} width={200} style={{objectFit:'contain'}} alt="IMAGE" />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" key={i} />
          ))}
      </div>
      
      <div className="text-xs my-2 line-clamp-6">{description}</div>

      <div className="flex mb-5 space-x-3">
        <CurrencyDollarIcon className="h-5"/>
        <CurrencyFormat className="bg-gray-50" value={price} thousandSeparator={true} disabled />
      </div>
      
      {
        hasPrime && (
          <div className="items-center space-x-3 flex -mt-5">
            <img className="w-12 h-12" src="https://links.papareact.com/fdw" alt="" />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )
      }

      <button className="mt-auto button">Add to basket</button>

    </div>
  );
}

export default Products;
