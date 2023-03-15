import { PriceData } from 'redstone-api/lib/types';

export interface WidgetCoinCardProps {
  goToCoin: () => void;
  entity: PriceData;
}

export function WidgetCoinCard(props: WidgetCoinCardProps) {
  const { goToCoin, entity } = props;

  return (
    <div>
      <h1>Hi there to WidgetCoinCard!</h1>
      <p onClick={() => goToCoin()}>Symbol: {entity?.symbol} -------</p>
      <button
        className="btn normal-case bg-transparent underline"
        onClick={() => goToCoin()}
      >
        Go to {entity.symbol}
      </button>
    </div>
  );
}

export default WidgetCoinCard;
