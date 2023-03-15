
import { PriceData } from 'redstone-api/lib/types';

export interface WidgetCoinCardProps {
  goToCoin: () => void;
  entity: PriceData;
}

export function WidgetCoinCard(props: WidgetCoinCardProps) {
  const { goToCoin, entity } = props;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
      <h2 className="text-2xl font-semibold mb-4">{entity?.symbol}</h2>
      <p className="text-lg mb-6">Current Price: {entity?.value} {entity?.currency}</p>
      <button
        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 focus:outline-none"
        onClick={() => goToCoin()}
      >
        Go to {entity.symbol}
      </button>
    </div>
  );
}

export default WidgetCoinCard;
