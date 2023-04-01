import { useEffect, useRef, useState } from "react";

const tabsData = [
  {
    label: "1D",
  },
  {
    label: "7D",
  },
  {
    label: "1M",
  },
  {
    label: "3M",
  },
  {
    label: "1Y",
  },
  {
    label: "All",
  },
];

const BitTabComponent: React.FC = () => {
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
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  return (
    <div className="relative mr-2 px-4 py-2 bg-white rounded-lg overflow-auto">
      <div className="flex">
        {tabsData.map((tab, idx) => {
          return (
            <button
              key={idx}
              ref={(el) => (tabsRef.current[idx] = el)}
              className="px-5 mx-2 z-20 font-bold"
              onClick={() => setActiveTabIndex(idx)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        className="absolute z-10 block bottom-2 bg-yellow-400 transition-all duration-300 h-6 rounded-lg"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      />
    </div>
  );
};

export default BitTabComponent;
