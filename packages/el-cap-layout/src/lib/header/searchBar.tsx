import { useEffect, useState } from 'react';
import { WarpFactory } from 'warp-contracts';
import {
  CapitionIcon,
  MenuIcon,
  CloseIcon,
  PortfolioIcon,
  WatchlistIcon,
  WalletIcon,
} from '../icons';
import SearchInput from './searchInput';
import DropDownMenu from '../components/dropDownMenu';
const contractId = 'MH-w8Sq6uw3Jwc_stPqyJT8fEcIhx4VrrE10NFgv-KY';
const warp = WarpFactory.forMainnet();
const contract = warp.contract(contractId);

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

export interface SearchBarProps {
  goToFeed: () => void;
}

const SearchBar = (props: SearchBarProps) => {
  const [menuStatus, setMenuStatus] = useState<boolean>(true);
  console.log('searchbar props', props);
  const { goToFeed } = props;
  const groupedOptionsCommunity = [
    {
      groupLabel: '',
      options: [
        {
          label: 'Feeds',
          destination: '/Feeds',
          image: '/feed.svg',
          available: false,
        },
        {
          label: 'Articles',
          destination: '/articles',
          image: '/articles.svg',
          available: false,
        },
      ],
    },
  ];

  const groupedOptionsCryptocurrencies = [
    {
      groupLabel: 'CRYPTOCURRENCIES',
      options: [
        {
          label: 'Ranking',
          destination: '/ranking',
          image: '/ranking.svg',
          available: true,
        },
        {
          label: 'Recently Added',
          destination: '/recently-added',
          image: '/recently_added.svg',
          available: false,
        },
        {
          label: 'Categories',
          destination: '/categories',
          image: '/categories.svg',
          available: false,
        },
        {
          label: 'Spotlight',
          destination: '/spotlight',
          image: '/spotlight.svg',
          available: false,
        },
        {
          label: 'Gainer & Losers',
          destination: 'gainers',
          image: '/gainers_losers.svg',
          available: true,
        },
        {
          label: 'Global Charts',
          destination: '/global-charts',
          image: '/global_charts.svg',
          available: false,
        },
        {
          label: 'Historical Snapshots',
          destination: '/historical-snapshots',
          image: '/historical_snapshots.svg',
          available: false,
        },
      ],
    },
    {
      groupLabel: '',
      options: [
        {
          label: 'Price Estimates',
          destination: '/price-estimates',
          image: '/price_estimates.svg',
          available: false,
        },
        {
          label: 'Polkadot Parachains',
          destination: '/polkadot-parachains',
          image: '/polkadot_parachains.svg',
          available: false,
        },
        {
          label: 'Legal Tender Currencies',
          destination: '/legal-tender-currencies',
          image: '/legal_tender_currencies.svg',
          available: false,
        },
        {
          label: 'Fiats / Companies Rankings',
          destination: '/fiats-companies-rankings',
          image: '/fiats_company_rankings.svg',
          available: false,
        },
      ],
    },
    {
      groupLabel: 'NFT',
      options: [
        {
          label: 'Overall NFT Status',
          destination: '/overall-nft',
          image: '/overall_status.svg',
          available: false,
        },
        {
          label: 'Top Collections',
          destination: '/top-collections',
          image: '/overall_collections.svg',
          available: false,
        },
        {
          label: 'Upcoming Sales',
          destination: '/trending',
          image: '/upcoming_sales.svg',
          available: false,
        },
      ],
    },
    {
      groupLabel: 'On Chain Data',
      options: [
        {
          label: 'Dex Pairs',
          destination: '/dex-pairs',
          image: '/dex_pairs.svg',
          available: false,
        },
        {
          label: 'Chain Ranking',
          destination: '/chain-ranking',
          image: '/chain_ranking.svg',
          available: false,
        },
      ],
    },
  ];

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
      const state = await contract.readState();
      const searchResults = state.cachedValue.state.coins;
      console.log('state running here', state);

      const regex = new RegExp(query, 'i');
      const filteredItems = searchResults.filter((item) =>
        item.name.match(regex)
      );

      setSearchResults(filteredItems);
    } catch (err) {
      setError('Failed to fetch search results');
    }
  };

  useEffect(() => {
    setInterval(() => {
      document.querySelectorAll('[data-testid]').forEach((el) => {
        el.classList.remove('z-10');
      });
    }, 200);
  }, []);

  return (
    <div className="flex items-center justify-between py-2 px-10 border-b-2 h-16 flex-row-reverse md:flex-row">
      <div className="hidden md:block">
        <div className="flex text-2xl items-center">
          <div
            onClick={() => goToFeed()}
            className="flex text-2xl items-center"
          >
            <CapitionIcon className="mr-2 w-10 h-10" />
            <span className="font-bold mr-10 hover:text-blue-500 hover:cursor-pointer">
              El Capitan
            </span>
          </div>

          <DropDownMenu
            label="Cryptocurrencies"
            groupedOptions={groupedOptionsCryptocurrencies}
            goToFeed={goToFeed}
          />
          <DropDownMenu
            label="Community"
            groupedOptions={groupedOptionsCommunity}
            goToFeed={goToFeed}
          />
          <span className="font-bold mr-10 hover:text-blue-500 hover:cursor-pointer">
            FAQ
          </span>
        </div>
      </div>
      <div>
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
