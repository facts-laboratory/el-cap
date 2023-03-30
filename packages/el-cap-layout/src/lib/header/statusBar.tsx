import StatusInfo from '../components/statusInfo';
import { PortfolioIcon, WatchlistIcon, WalletIcon } from '../icons';

const StatusBar: React.FC = () => {
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
          <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 inline-flex items-center rounded-full">
            <WalletIcon className="mr-2" width={24} height={24} />
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
