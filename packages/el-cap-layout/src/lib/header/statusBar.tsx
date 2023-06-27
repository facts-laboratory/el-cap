import { useEffect, useState } from 'react';
import StatusInfo from '../components/statusInfo';
import { PortfolioIcon, WatchlistIcon, WalletIcon } from '../icons';
import { LogInReturnProps } from 'othent/src/types';
import { Othent } from 'othent';

const StatusBar: React.FC = () => {
  const [user, setUser] = useState<LogInReturnProps | null>(null);
  const [othent, setOthent] = useState(null);

  useEffect(() => {
    console.log('running');
    const initOthent = async () => {
      const instance = await Othent({
        API_ID: '2384f84424a36b36ede2873be3e0c7e9'
      });
      console.log('instance', instance);
      setOthent(instance);
    };

    initOthent();
  }, []);

  const handleLogin = async () => {
    console.log('user', user, 'othent', othent);
    if (othent) {
      const wallet = await othent.logIn();
      setUser(wallet);
      console.log('wallet', wallet);
    } else {
      console.error('Othent is not initialized');
    }
  };

  return (
    <div className="flex justify-between items-center py-2 px-10 border-b-2 h-16 overflow-auto">
      <div className="flex">
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
          {!user ? (
            <button
              onClick={handleLogin}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 inline-flex items-center rounded-full"
            >
              <WalletIcon className="mr-2" width={24} height={24} />
              <span>Connect Wallet</span>
            </button>
          ) : (
            <span className="cursor-pointer font-bold mr-4 flex items-center">
              <img
                alt="profile"
                src={user.picture}
                className="w-8 h-8 rounded-full mr-2"
              />
              {user.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
