import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Category from "@/components/Category";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home - MegaMart</title>
      </Head>
      <section className="text-gray-600 body-font ">
        <Image
          src={"/banner3.png"}
          alt="banner"
          width={3000}
          height={2000}
          className="h-[500]"
        />
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Quality and Variety Under One Roof!
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table.
            </p>
          </div>
          <Category />
          <div className="flex flex-wrap -m-4 justify-center">
            <div className="xl:w-80 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out hover:shadow-[0_0_20px_rgba(219,39,119,0.7)]">
                <div className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Fast Free Shipping
                </h2>
                <p className="leading-relaxed text-base">if you are unable</p>
              </div>
            </div>
            <div className="xl:w-80  md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out hover:shadow-[0_0_20px_rgba(219,39,119,0.7)]">
                <div className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Save Flat 50% Off
                </h2>
                <p className="leading-relaxed text-base">Use credit card</p>
              </div>
            </div>
            <div className="xl:w-80  md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out hover:shadow-[0_0_20px_rgba(219,39,119,0.7)]">
                <div className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  24*7 Online Support
                </h2>
                <p className="leading-relaxed text-base">FIf you are unable</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
