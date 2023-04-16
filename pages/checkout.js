import Header from "@/components/Header";
import Image from "next/image";
import React from "react";

function Chekout() {
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div>
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            style={{objectFit:'contain'}}
          />
        </div>

        {/* Right */}
      </main>
    </div>
  );
}

export default Chekout;
