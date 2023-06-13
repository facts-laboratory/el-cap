import { Component } from 'react';

interface ItemProps {
  img: string;
  name: string;
  symbol: string;
  position: string | number;
}

class SearchBarItem extends Component<ItemProps> {
  render() {
    const { img, name, symbol, position } = this.props;
    return (
      <a href={`/coin/${symbol}`} className="inline-flex items-center justify-between">
        <div className="space-x-2 inline-flex items-center">
          <img src={img} className="w-6 h-6 rounded-full" />

          <span className="font-bold">{name}</span>
          <span className="text-gray-600">{symbol}</span>
        </div>
        <span className="text-gray-700">{position}</span>
      </a>
    );
  }
}

export default SearchBarItem;
