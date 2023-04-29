import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import * as CurrencyFormat from "react-currency-format";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "@/slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
}) {
  const dispatch = useDispatch();
  const addItemsToBasket = () => {
    const newProduct = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };
    dispatch(addToBasket(newProduct));
  };

  const removeItemsFromBasket = () => {
    dispatch(removeFromBasket({id}))
  }

  {
    return (
      <div className="grid grid-cols-5">
        <Image
          src={image}
          height={200}
          width={200}
          alt=""
          style={{ objectFit: "contain" }}
        />
        {/* Middle */}
        <div className="col-span-3 mx-5">
          <p>{title}</p>
          <div className="flex ">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <StarIcon key={i} className="h-5 text-yellow-500" />
              ))}
          </div>
          <p className="text-xs my-2 line-clamp-3">{description}</p>

          <div className="flex mb-5 space-x-3">
            <CurrencyRupeeIcon className="h-5" />
            <CurrencyFormat
              className="bg-gray-50"
              value={price}
              thousandSeparator={true}
              disabled
            />
          </div>
          {hasPrime && (
            <div className="flex items-center space-x-2">
              <img
                className="w-12 h-12"
                loading="lazy"
                src="https://links.papareact.com/fdw"
                alt=""
              />
              <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
            </div>
          )}
        </div>

        {/* Add and remove button */}
        <div className="flex flex-col space-y-2 my-auto justify-self-end">
          <button onClick={addItemsToBasket} className="button">
            Add to Basket
          </button>
          <button onClick={removeItemsFromBasket} className="button">Remove from basket</button>
        </div>
      </div>
    );
  }
}

export default CheckoutProduct;
