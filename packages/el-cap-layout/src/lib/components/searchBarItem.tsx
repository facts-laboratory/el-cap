import { Component } from 'react';

interface ItemProps {
  img: string;
  name: string;
  coin: string;
  position: string | number;
  goToCoin: () => void;
}

class SearchBarItem extends Component<ItemProps> {
  render() {
    const { img, name, coin, position, goToCoin } = this.props;
    return (
      // Luke, bring the router into this file and turn the link into a button with an onclick
      <button
        onClick={() => goToCoin()}
        className="inline-flex items-center justify-between"
      >
        <div className="space-x-2 inline-flex items-center">
          <img src={img} className="w-6 h-6 rounded-full" alt={coin} />

          <span className="font-bold">{name}</span>
          <span className="text-gray-600">{coin}</span>
        </div>
        {position && position != '#undefined' && (
          <span className="text-gray-700">{position}</span>
        )}
      </button>
    );
  }
}

export default SearchBarItem;
