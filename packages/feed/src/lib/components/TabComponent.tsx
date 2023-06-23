import { SortKey } from '@el-cap/interfaces';
import { useEffect, useRef, useState } from 'react';

const tabsData = [
  {
    label: 'Top',
  },
  {
    label: 'Trending',
  },
  {
    label: 'Gainers',
  },
  {
    label: 'Losers',
  },
  {
    label: 'Updated',
  },
];

interface TabComponentProps {
  fetchFeed: (key: string) => void;
}

const TabComponent = (props: TabComponentProps) => {
  const { fetchFeed } = props;
  console.log('props', props);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener('resize', setTabPosition);

    return () => window.removeEventListener('resize', setTabPosition);
  }, [activeTabIndex]);

  const handleTabClick = (tabIndex: number, tabKey: string) => {
    const sortKeyMap: { [key: string]: SortKey } = {
      name: SortKey.NAME,
      image: SortKey.IMAGE,
      coin: SortKey.COIN,
      price: SortKey.PRICE,
      marketcap: SortKey.MARKET_CAP,
      volume: SortKey.VOLUME,
      losers: SortKey.LOSERS,
      circulatingsupply: SortKey.CIRCULATING_SUPPLY,
      trending: SortKey.TWENTY_FOUR_HOURS,
      gainers: SortKey.SEVEN_DAYS,
      '1h': SortKey.ONE_HOUR,
      '24h': SortKey.TWENTY_FOUR_HOURS,
      '7d': SortKey.SEVEN_DAYS,
    };

    const key = sortKeyMap[tabKey.toLowerCase()];
    console.log('tabKey', key, tabKey);
    setActiveTabIndex(tabIndex);
    fetchFeed(key);
  };

  return (
    <div className="relative mr-2 px-4 py-2 bg-white rounded-xl overflow-auto">
      <div className="flex">
        {tabsData.map((tab, idx) => {
          return (
            <button
              key={idx}
              ref={(el) => (tabsRef.current[idx] = el)}
              className="p-2 px-4 mx-2 z-20 font-bold"
              onClick={() => handleTabClick(idx, tab.label)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        className="absolute z-10 block bottom-3 bg-yellow-400 transition-all duration-300 h-8 rounded-xl"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      />
    </div>
  );
};

export default TabComponent;
