import { useEffect, useRef, useState } from 'react';
import StatusInfo from '../components/statusInfo';
import { PortfolioIcon, WatchlistIcon, WalletIcon } from '../icons';
import { Othent, useOthentReturnProps } from 'othent';
import { User } from '@el-cap/interfaces';

interface StatusBarProps {
  fetchUser: () => void;
  user: User;
  unsetUser: () => void;
}

const StatusBar = (props: StatusBarProps) => {
  const { fetchUser, user, unsetUser } = props;
  const [localUser, setLocalUser] = useState<User | undefined>();
  const [othent, setOthent] = useState<useOthentReturnProps | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    console.log('running');
    const initOthent = async () => {
      const instance = await Othent({
        API_ID: '2384f84424a36b36ede2873be3e0c7e9',
      });
      console.log('instance', instance);
      setOthent(instance);
    };

    initOthent();
  }, []);

  useEffect(() => {
    if (user) {
      setLocalUser(user);
    }
  }, [user, localUser]);

  const handleLogin = async () => {
    fetchUser();
  };

  const handleLogout = async () => {
    console.log('localUser', localUser, 'othent', othent);
    unsetUser();
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
  }, []);

  return (
    <div className="flex justify-between items-center py-2 px-10 border-b-2 h-16">
      <div
        ref={marqueeRef}
        className="flex items-center overflow-x-hidden whitespace-nowrap py-2 px-10 border-b-2 h-16"
      >
        <StatusInfo className="mr-4" text="Crypto Listed: " value="3" />
        <StatusInfo
          className="mr-4"
          text="Total Market Cap: "
          value="$1,000,000,000,000"
        />
        <StatusInfo className="mr-4" text="24hr Vol: " value="$1,000,000,000" />
        <StatusInfo
          className="mr-4"
          text="Dominance BTC: "
          value="46% ETH 18.6%"
        />
        <StatusInfo className="mr-4" text="ETH BTC: " value="46% ETH 18.6%" />
      </div>
      <div className="hidden xl:block">
        <div className="flex items-center text-sm">
          <span className="cursor-pointer font-bold mr-4 flex">
            <WatchlistIcon className="mr-1" width={24} height={24} />
            Whachlist
          </span>
          <span className="cursor-pointer font-bold mr-4 flex items-center">
            <PortfolioIcon className="mr-1" width={24} height={24} />
            Portfolio
          </span>
          {!localUser ? (
            <button
              onClick={handleLogin}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 inline-flex items-center rounded-full"
            >
              <WalletIcon className="mr-2" width={24} height={24} />
              <span>Connect Wallet</span>
            </button>
          ) : (
            <div className="cursor-pointer dropdown relative inline-block text-left ">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="cursor-pointer font-bold mr-4 flex items-center"
              >
                <img
                  alt="profile"
                  src={localUser.picture}
                  className="w-8 h-8 rounded-full mr-2"
                />
                {localUser.name}
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
                      onClick={handleLogout}
                    >
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
