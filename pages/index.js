import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home({}) {
  const [products, setProducts] = useState([])
  useEffect(() => {
    async function fetchData(){
      const res = await axios.get("https://fakestoreapi.com/products")
      setProducts(res.data)
    }

    fetchData()

  })
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header/>
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* Product Feed */}
        {/* <ProductFeed /> */} 
        <ProductFeed products={products} />
      </main>
    </div>
  );
}


// export async function getServerSideProps(context){
//   const products = await fetch("https://fakestoreapi.com/products").then(
//     (res) => res.json()
//   )

//   return { props : {
//     products,
//   },
// }
// }