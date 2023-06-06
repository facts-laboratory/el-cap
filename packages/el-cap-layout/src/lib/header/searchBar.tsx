import { useState } from 'react';
import {
  CapitionIcon,
  MenuIcon,
  CloseIcon,
  PortfolioIcon,
  WatchlistIcon,
  WalletIcon,
} from '../icons';
import { Tooltip } from 'flowbite-react';
import SearchInput from './searchInput';
import DropDownMenu from '../components/dropDownMenu';

type DropDownOption = {
  value: string;
  label: string;
  destination: string;
  image: string;
};

type SearchCoin = {
  name: string;
  symbol: string;
  ranking: number;
  image: string;
};

enum LoadingStatus {
  LOADED = 'loaded',
  LOADING = 'loading',
  NOT_LOADED = 'not loaded',
}

const SearchBar: React.FC = () => {
  const [menuStatus, setMenuStatus] = useState<boolean>(true);
  const groupedOptions = [
    {
      groupLabel: 'Community',
      options: [
        {
          value: '1',
          label: 'Feeds',
          destination: '/Feeds',
          image: '/feed.svg',
        },
        {
          value: '2',
          label: 'Articles',
          destination: '/articles',
          image: '/articles.svg',
        },
      ],
    },
  ];

  const goToPage = (option: DropDownOption) => {
    window.location.href = option.destination;
  };

  // search
  const [trending, setTrending] = useState<SearchCoin[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(
    LoadingStatus.NOT_LOADED
  );
  const [searchResults, setSearchResults] = useState<SearchCoin[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTrending = async () => {
    setLoadingStatus(LoadingStatus.LOADING);

    // Fetch trending coins from API or other data source
    try {
      // example fetch
      // const response = await fetch('https://api.example.com/trending-coins');
      // const trendingCoins = await response.json();

      const trendingCoins = [
        {
          name: 'USD Coin',
          symbol: 'usdc',
          ranking: 5,
          image:
            'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        },
        {
          name: 'XRP',
          symbol: 'xrp',
          ranking: 6,
          image:
            'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731',
        },
        {
          name: 'Cardano',
          symbol: 'ada',
          ranking: 7,
          image:
            'https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860',
        },
        {
          name: 'Lido Staked Ether',
          symbol: 'steth',
          ranking: 8,
          image:
            'https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1608607546',
        },
        {
          name: 'Dogecoin',
          symbol: 'doge',
          ranking: 9,
          image:
            'https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256',
        },
        {
          name: 'Polygon',
          symbol: 'matic',
          ranking: 10,
          image:
            'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912',
        },
      ];

      setTrending(trendingCoins);
      setLoadingStatus(LoadingStatus.LOADED);
    } catch (err) {
      setError('Failed to fetch trending coins');
      setLoadingStatus(LoadingStatus.NOT_LOADED);
    }
  };

  const fetchSearch = async (query: string) => {
    // Fetch search results from API or other data source
    try {
      //example fetch
      // const response = await fetch(`https://api.example.com/search?query=${query}`);
      // const searchResults = await response.json();

      const searchResults = [
        {
          name: 'USD Coin',
          symbol: 'usdc',
          ranking: 5,
          image:
            'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        },
        {
          name: 'XRP',
          symbol: 'xrp',
          ranking: 6,
          image:
            'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731',
        },
        {
          name: 'Cardano',
          symbol: 'ada',
          ranking: 7,
          image:
            'https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860',
        },
        {
          name: 'Lido Staked Ether',
          symbol: 'steth',
          ranking: 8,
          image:
            'https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1608607546',
        },
        {
          name: 'Dogecoin',
          symbol: 'doge',
          ranking: 9,
          image:
            'https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256',
        },
        {
          name: 'Polygon',
          symbol: 'matic',
          ranking: 10,
          image:
            'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912',
        },
      ];

      const regex = new RegExp(query, "i");
      const filteredItems = searchResults.filter(item => item.name.match(regex));

      setSearchResults(filteredItems);
    } catch (err) {
      setError('Failed to fetch search results');
    }
  };

  return (
    <div className="flex items-center justify-between py-2 px-10 border-b-2 h-16">
      <div className="hidden md:block">
        <div className="flex text-2xl items-center">
          <CapitionIcon className="mr-2 w-10 h-10" />
          <span className="font-bold mr-10 hover:text-blue-500 hover:cursor-pointer">
            El Capitan
          </span>
          <Tooltip
            content={
              <div className="grid grid-cols-2 min-w-[30rem] gap-10 bg-white p-8 rounded-lg shadow-lg">
                <div className="space-y-3">
                  <h3 className="uppercase text-gray-400">Cryptocurrencies</h3>
                  <div className="flex flex-col space-y-3 font-bold text-lg">
                    <span className="inline-flex space-x-3 items-center">
                      <img
                        src="/ranking.svg"
                        className="w-8 object-contain h-8"
                      />
                      <span>Ranking</span>
                    </span>
                    <span className="inline-flex space-x-3 items-center">
                      <img
                        src="/recently_added.svg"
                        className="w-8 object-contain h-8"
                      />
                      <span>Recently Added</span>
                    </span>
                    <span className="inline-flex space-x-3 items-center">
                      <img
                        src="/categories.svg"
                        className="w-8 object-contain h-8"
                      />
                      <span>Categories</span>
                    </span>
                    <span className="inline-flex space-x-3 items-center">
                      <img
                        src="/spotlight.svg"
                        className="w-8 object-contain h-8"
                      />
                      <span>Spotlight</span>
                    </span>
                    <span className="inline-flex space-x-3 items-center">
                      <img
                        src="/gainers_losers.svg"
                        className="w-8 object-contain h-8"
                      />
                      <span>Gainers & Losers</span>
                    </span>
                    <span className="inline-flex space-x-3 items-center">
                      <img
                        src="/global_charts.svg"
                        className="w-8 object-contain h-8"
                      />
                      <span>Global Charts</span>
                    </span>
                    <span className="inline-flex space-x-3 items-center">
                      <img
                        src="/historical_snapshots.svg"
                        className="w-8 object-contain h-8"
                      />
                      <span>Historical Snapshots</span>
                    </span>
                  </div>

                  <div className="h-px w-full bg-gray-200 border-0"></div>

                  <div className="flex flex-col space-y-3 font-bold text-lg">
                    <span className="inline-flex space-x-3 items-center">
                      <img
                        src="/price_estimates.svg"
                        className="w-8 object-contain h-8"
                      />
                      <span>Price Estimates</span>
                    </span>
                    <span className="inline-flex space-x-3 items-center">
                      <img
                        src="/polkadot_parachains.svg"
                        className="w-8 object-contain h-8"
                      />
                      <span>Polkadot Parachains</span>
                    </span>
                    <span className="inline-flex space-x-3 items-center">
                      <img
                        src="/legal_tender_currencies.svg"
                        className="w-8 object-contain h-8"
                      />
                      <span>Legal Tender Currencies</span>
                    </span>
                    <span className="inline-flex space-x-3 items-center">
                      <img
                        src="/fiats_company_rankings.svg"
                        className="w-8 object-contain h-8"
                      />
                      <span>Fiats / Companies Rankings</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="uppercase text-gray-400">NFT</h3>
                  <div className="flex flex-col space-y-3 font-bold text-lg">
                    <span className="inline-flex space-x-3 items-center">
                      <img
                        src="/overall_status.svg"
                        className="w-8 object-contain h-8"
                      />
                      <span>Overall NFT Status</span>
                    </span>
                    <span className="inline-flex space-x-3 items-center">
                      <img
                        src="/overall_collections.svg"
                        className="w-8 object-contain h-8"
                      />
                      <span>Top Collections</span>
                    </span>
                    <span className="inline-flex space-x-3 items-center">
                      <img
                        src="/upcoming_sales.svg"
                        className="w-8 object-contain h-8"
                      />
                      <span>Upcoming Sales</span>
                    </span>
                  </div>

                  <h3 className="text-gray-400">On Chain Data</h3>
                  <div className="flex flex-col space-y-3 font-bold text-lg">
                    <span className="inline-flex space-x-3 items-center">
                      <img
                        src="/dex_pairs.svg"
                        className="w-8 object-contain h-8"
                      />
                      <span>Dex Pairs</span>
                    </span>
                    <span className="inline-flex space-x-3 items-center">
                      <img
                        src="/chain_ranking.svg"
                        className="w-8 object-contain h-8"
                      />
                      <span>Chain Ranking</span>
                    </span>
                  </div>
                </div>
              </div>
            }
            arrow={false}
            /* @ts-ignore */
            style={{ background: 'white' }}
            className="p-0 shadow-none z-50"
          >
            <span className="font-bold mr-10 hover:text-blue-500 hover:cursor-pointer">
              Cryptocurrencies
            </span>
          </Tooltip>

          <DropDownMenu groupedOptions={groupedOptions} goToPage={goToPage} />

          <span className="font-bold mr-10 hover:text-blue-500 hover:cursor-pointer">
            FAQ
          </span>
        </div>
      </div>
      <div className="hidden xl:block">
        <SearchInput
          fetchTrending={fetchTrending}
          trending={trending}
          fetchSearch={fetchSearch}
          loadingStatus={loadingStatus}
          searchResults={searchResults}
          error={error}
        />
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
