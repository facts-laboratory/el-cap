import { Component } from 'react';

interface ItemProps {
  img: string;
  name: string;
  symbol: string;
}

class RecentSearchItem extends Component<ItemProps> {
  render() {
    const { img, name, symbol } = this.props;

    return (
      <div className="flex flex-col items-center text-xs">
        <img src={img} className="w-7 h-6 rounded-full" />
        <span className="font-bold">{name}</span>
        <span className="text-gray-300">{symbol}</span>
      </div>
    );
  }
}

export default RecentSearchItem;
