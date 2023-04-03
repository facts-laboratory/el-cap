import { useState } from 'react';
import {
  CapitionIcon,
  MenuIcon,
  CloseIcon,
  PortfolioIcon,
  WatchlistIcon,
  WalletIcon,
} from '../icons';

const SearchBar: React.FC = () => {
  const [menuStatus, setMenuStatus] = useState<boolean>(true);

  return (
    <div className="flex items-center justify-between py-2 px-10 border-b-2 h-16">
      <div className="hidden md:block">
        <div className="flex text-2xl items-center">
          <CapitionIcon className="mr-2 w-10 h-10" />
          <span className="font-bold mr-10 hover:text-blue-500 hover:cursor-pointer">
            El Capitan
          </span>
          <span className="font-bold mr-10 hover:text-blue-500 hover:cursor-pointer">
            Cryptocurrencies
          </span>
          <span className="font-bold mr-10 hover:text-blue-500 hover:cursor-pointer">
            FAQ
          </span>
          <span className="font-bold mr-10 hover:text-blue-500 hover:cursor-pointer">
            Community
          </span>
        </div>
      </div>
      <div className="hidden xl:block">
        <div className="flex items-center p-1 px-4 bg-gray-300 placeholder-gray-400 border-none rounded-full">
          <input
            placeholder="Search..."
            required={true}
            className="m-1 text-black focus:outline-none focus:placeholder-transparent focus:ring-0 bg-gray-300"
          />{' '}
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div className="block xl:hidden">
        <button className="p-2" onClick={() => setMenuStatus(!menuStatus)}>
          <MenuIcon className="font-black" width={26} height={26} />
        </button>
      </div>
      {/* responsive sidebar start */}
      <div
        className={`transform w-full z-40 h-full absolute bg-gray-100 top-0 left-0 shadow flex-col transition duration-150 ease-in-out ${
          menuStatus ? '-translate-x-full' : ''
        }`}
      >
        <div className="bg-white">
          <button className="p-2" onClick={() => setMenuStatus(!menuStatus)}>
            <CloseIcon className="font-black" width={26} height={26} />
          </button>
        </div>
        <div className="text-xl px-4 py-2">
          <div className="flex border-b-2 border-gray-600 py-2 px-1">
            <CapitionIcon className="mr-2 w-8 h-8" />
            <span className="font-bold mr-10 hover:text-blue-500 hover:cursor-pointer">
              El Capitan
            </span>
          </div>
          <div className="border-b-2 border-gray-600 py-2 px-1">
            <span className="font-bold mr-10 hover:text-blue-500 hover:cursor-pointer">
              Cryptocurrencies
            </span>
          </div>
          <div className="border-b-2 border-gray-600 py-2 px-1">
            <span className="font-bold mr-10 hover:text-blue-500 hover:cursor-pointer">
              FAQ
            </span>
          </div>
          <div className="border-b-2 border-gray-600 py-2 px-1">
            <span className="font-bold mr-10 hover:text-blue-500 hover:cursor-pointer">
              Community
            </span>
          </div>
          <div className="border-b-2 border-gray-600 py-2 px-1">
            <span className="cursor-pointer font-bold mr-4 flex">
              <WatchlistIcon className="mr-1" width={24} height={24} />
              Whachlist
            </span>
          </div>
          <div className="border-b-2 border-gray-600 py-2 px-1">
            <span className="cursor-pointer font-bold mr-4 flex items-center">
              <PortfolioIcon className="mr-1" width={24} height={24} />
              Portfolio
            </span>
          </div>
          <div className="py-1 px-1 mt-2">
            <button className="bg-gray-300 w-full hover:bg-gray-400 text-black font-bold py-2 px-4 flex justify-center items-center rounded-full">
              <WalletIcon className="mr-2" width={24} height={24} />
              <span>Connect Wallet</span>
            </button>
          </div>
        </div>
      </div>
      {/* responsive sidebar end */}
    </div>
  );
};

export default SearchBar;
