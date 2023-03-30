import { mapStateToProps } from '@el-cap/store';
import { connect } from 'react-redux';
import StatusBar from './statusBar';
import SearchBar from './searchBar';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  // const ref: React.RefObject<HTMLDivElement> = useRef(null);

  return (
    <div className="bg-white min-w-full">
      <StatusBar />
      <SearchBar />
    </div>
  );
}

export default Header;

export const ConnectedHeader = connect(mapStateToProps)(Header);
