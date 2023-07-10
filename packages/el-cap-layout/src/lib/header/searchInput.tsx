import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { Tooltip } from 'flowbite-react';
import SearchBarItem from '../components/searchBarItem';
import RecentSearchItem from '../components/recentSearchItem';

interface SearchInputProps {
  goToCoin: (ticker: string) => void;
  fetchTrending: () => void;
  trending: SearchCoin[];
  fetchSearch: (query: string) => void;
  loadingStatus: LoadingStatus;
  searchResults: SearchCoin[];
  error: string | null;
}

enum LoadingStatus {
  LOADED = 'loaded',
  LOADING = 'loading',
  NOT_LOADED = 'not loaded',
}

interface SearchCoin {
  name: string;
  coin: string;
  ranking: number;
  image: string;
}

export default function SearchInput(props: SearchInputProps) {
  const {
    fetchTrending,
    trending,
    fetchSearch,
    loadingStatus,
    searchResults,
    error,
    goToCoin,
  } = props;

  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const [inSearch, setInSearch] = useState(false);
  const overlaySearch = useRef<HTMLDivElement>(null);
  const backgroundSearch = useRef<HTMLInputElement>(null);
  const overlayInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (loadingStatus === LoadingStatus.NOT_LOADED) {
      fetchTrending();
    }
  }, [fetchTrending, loadingStatus]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);
    if (backgroundSearch.current) {
      backgroundSearch.current.value = query;
    }
    if (query.length > 0) {
      fetchSearch(query);
      setInSearch(true);
    } else {
      setInSearch(false);
    }
  };

  const handleOpenSearch = () => {
    setOpenSearch(!openSearch);
    const handleClick = (event: InputEvent) => {
      if (
        overlaySearch.current &&
        !overlaySearch.current.contains(event.target as Node) &&
        !backgroundSearch.current?.contains(event.target as Node)
      ) {
        setOpenSearch(false);
        document.removeEventListener('click', handleClick);
      }
    };

    document.addEventListener('click', handleClick);

    if (!openSearch) {
      setInSearch(false);
    }
  };

  document.addEventListener('keyup', (e) => {
    const element = e.target;

    // Check if the event originated from an input element
    if (
      element instanceof Element &&
      (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA')
    ) {
      return;
    }
    if (e.key === '/') {
      handleOpenSearch();
    }
  });

  const trendingItems = trending.map((item, index) => {
    if (index > 5) {
      return null; // Skips rendering for remaining iterations
    }

    return (
      <SearchBarItem
        key={item.coin}
        img={item.image}
        name={item.name}
        coin={item.coin}
        position={`#${item.ranking}`}
        goToCoin={() => goToCoin(item.coin)}
      />
    );
  });

  const searchItems = searchResults.map((item) => (
    <SearchBarItem
      key={item.coin}
      img={item.image}
      name={item.name}
      coin={item.coin}
      position={`#${item.ranking}`}
      goToCoin={() => goToCoin(item.coin)}
    />
  ));

  return (
    <div className="relative">
      <div
        className="absolute top-0 pt-0 p-4 bg-white z-50 min-w-[17rem] md:min-w-[27rem] md:-left-[10rem] rounded-lg shadow-lg"
        style={openSearch ? {} : { display: 'none' }}
        ref={overlaySearch}
      >
        <div className="block space-y-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              ref={overlayInput}
              value={inputValue}
              onChange={handleInputChange}
              className="outline-none block w-full p-2 pl-10 text-sm text-gray-900 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search coin, pair, contract address or exchange"
              required
            />
            <div
              className="absolute cursor-pointer inset-y-0 right-0 pr-2 flex items-center"
              onClick={handleOpenSearch}
            >
              <div className="flex items-center rounded-lg bg-gray-300">
                <svg
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  width="1em"
                  className="invert"
                >
                  <path
                    d="M13.4101 12L18.7001 6.71001C19.0901 6.32001 19.0901 5.69001 18.7001 5.30001C18.3101 4.91001 17.6801 4.91001 17.2901 5.30001L12.0001 10.59L6.7101 5.30001C6.3201 4.91001 5.69007 4.91001 5.30007 5.30001C4.91007 5.69001 4.91007 6.32001 5.30007 6.71001L10.5901 12L5.30007 17.29C4.91007 17.68 4.91007 18.31 5.30007 18.7C5.50007 18.9 5.75009 18.99 6.01009 18.99C6.27009 18.99 6.52005 18.89 6.72005 18.7L12.0101 13.41L17.3001 18.7C17.5001 18.9 17.7501 18.99 18.0101 18.99C18.2701 18.99 18.5201 18.89 18.7201 18.7C19.1101 18.31 19.1101 17.68 18.7201 17.29L13.4301 12H13.4101Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <span className="text-xs text-gray-400 my-4">
            {inSearch ? `Search Results` : `Trending 🔥`}
          </span>
          <div className="flex flex-col space-y-3">
            {!inSearch ? trendingItems : searchItems}

            <span className="text-xs text-gray-400 my-4">Recent Searches</span>
            <div className="flex flex-wrap space-x-4">
              <RecentSearchItem img="/pepe.png" name="Pepe" symbol="PEPE" />
              <RecentSearchItem img="/pepe.png" name="Pepe" symbol="PEPE" />
            </div>
          </div>
        </div>
      </div>
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative" onClick={handleOpenSearch}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          onFocus={() => {
            setTimeout(() => {
              overlayInput.current?.focus();
            }, 200);
          }}
          type="search"
          ref={backgroundSearch}
          className="outline-none block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search"
          required
        />
        <div className="absolute cursor-pointer inset-y-0 right-0 pr-2 flex items-center">
          <Tooltip
            content={
              <div className="px-2 text-sm">
                <span>Use to trigger search</span>
              </div>
            }
            placement="bottom-end"
            arrow={false}
            className="transition-none"
          >
            <div className="flex items-center">
              <span className="bg-gray-600 text-white text-sm px-2 py-0.5 rounded">
                /
              </span>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
