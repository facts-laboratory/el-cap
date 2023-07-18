import { useEffect, useRef, useState } from 'react';
import StatusInfo from '../components/statusInfo';
import { PortfolioIcon, WatchlistIcon, WalletIcon } from '../icons';
import { ArAccount } from 'arweave-account';
import { ProcessedMarketData } from '@el-cap/interfaces';
import {
  useActiveAddress,
  useConnection,
  useStrategy,
} from 'arweave-wallet-kit';
import { persistor } from '@el-cap/store';

interface StatusBarProps {
  goToWatchlist: () => void;
  setUser: (input: { address: string; strategy: string | false }) => void;
  user: ArAccount;
  unsetUser: () => void;
  marketData: ProcessedMarketData;
}

const StatusBar = (props: StatusBarProps) => {
  const { setUser, user, unsetUser, goToWatchlist, marketData } = props;
  const [localUser, setLocalUser] = useState<ArAccount | null>();

  const { connected, connect } = useConnection();

  const handleLogin = async () => {
    if (!connected) {
      connect();
    }
  };

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const marqueeElem = marqueeRef.current;

    if (marqueeElem) {
      // Duplicate the contents of the marquee
      marqueeElem.innerHTML += marqueeElem.innerHTML;

      let scrollAmount = 0;

      const scrollInterval = setInterval(() => {
        scrollAmount++;
        marqueeElem.scrollLeft = scrollAmount;

        // Reset scrollAmount when halfway point is reached
        if (scrollAmount >= marqueeElem.scrollWidth / 2) {
          scrollAmount = 0;
        }
      }, 50);

      // Cleanup interval on component unmount
      return () => {
        clearInterval(scrollInterval);
      };
    }
  }, [marketData]);

  return (
    <div className="flex justify-between items-center py-2 sm:px-10 px-4 border-b-2 h-16">
      {marketData && (
        <div
          ref={marqueeRef}
          className="flex items-center overflow-x-hidden whitespace-nowrap py-2 px-10 border-b-2 h-16"
        >
          <StatusInfo className="mr-4" text="Crypto Listed: " value="388" />
          <StatusInfo
            className="mr-4"
            text="Total Market Cap: "
            value={
              marketData
                ? `$${marketData.marketCapInUSD.toLocaleString()}`
                : 'N/A'
            }
          />
          <StatusInfo
            className="mr-4"
            text="24hr Vol: "
            value={
              marketData ? `$${marketData.volumeInUSD.toLocaleString()}` : 'N/A'
            }
          />
          <StatusInfo
            className="mr-4"
            text="Dominance BTC: "
            value={
              marketData
                ? `BTC ${marketData.marketCapBtcPercentage.toFixed(
                    2
                  )}% ETH ${marketData.marketCapEthPercentage.toFixed(2)}%`
                : 'N/A'
            }
          />
          <StatusInfo
            className="mr-4"
            text="ETH BTC: "
            value={
              marketData
                ? `BTC ${marketData.marketCapBtcPercentage.toFixed(
                    2
                  )}% ETH ${marketData.marketCapEthPercentage.toFixed(2)}%`
                : 'N/A'
            }
          />
        </div>
      )}
      <div className="hidden lg:block">
        <div className="flex items-center text-sm">
          <span
            onClick={goToWatchlist}
            className="cursor-pointer font-bold mr-4 flex items-center hover:bg-gray-100 p-2 rounded-lg"
          >
            <WatchlistIcon className="mr-1" width={24} height={24} />
            Watchlist
          </span>
          <span
            onClick={() => alert('Coming Soon!')}
            className="cursor-pointer font-bold mr-4 flex items-center hover:bg-gray-100 p-2 rounded-lg"
          >
            <PortfolioIcon className="mr-1" width={24} height={24} />
            Portfolio
          </span>
          {!connected ? (
            <button
              onClick={() => {
                handleLogin();
              }}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 inline-flex items-center rounded-full whitespace-nowrap"
            >
              <WalletIcon className="mr-2" width={22} height={22} />
              <span>Connect Wallet</span>
            </button>
          ) : (
            <div>
              <ConnectedUser
                setUser={setUser}
                localUser={localUser}
                unsetUser={unsetUser}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;

interface ConnectedUserProps {
  setUser: (input: { address: string; strategy: string | false }) => void;
  localUser?: ArAccount | null;
  unsetUser: () => void;
}

const ConnectedUser = ({
  setUser,
  localUser,
  unsetUser,
}: ConnectedUserProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [shouldSetUser, setShouldSetUser] = useState(true);

  const { disconnect } = useConnection();

  const address = useActiveAddress();
  const strategy = useStrategy();
  const connected = useConnection();

  useEffect(() => {
    if (shouldSetUser && address && !localUser && connected) {
      setUser({ address, strategy });
    }
  }, [address, setUser, localUser, strategy, connected, shouldSetUser]);

  useEffect(() => {
    console.log('address', address);
  }, [address]);

  const disconnectAndPurge = () => {
    setShouldSetUser(false);
    disconnect().then(() => {
      persistor.purge().then(() => {
        setShouldSetUser(true);
      });
    });
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown')) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  if (!localUser) {
    return null;
  }

  return (
    <div className="cursor-pointer dropdown relative inline-block text-left ">
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="cursor-pointer font-bold mr-4 flex items-center"
      >
        <img
          alt="profile"
          src={localUser.profile?.avatarURL}
          className="w-8 h-8 rounded-full mr-2"
        />
        {localUser.profile?.handleName || localUser.addr?.substring(0, 9)}
      </div>
      {dropdownOpen && (
        <div
          className="cursor=pointer origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <div
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              onClick={disconnectAndPurge}
            >
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
