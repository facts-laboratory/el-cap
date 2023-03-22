import { mapStateToProps } from '@el-cap/store';
import { StandardHeader } from '@facts-kit/ui-kit';
import { connect } from 'react-redux';
// import { useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  // const ref: React.RefObject<HTMLDivElement> = useRef(null);

  return <StandardHeader>Header</StandardHeader>;
}

export default Header;

export const ConnectedHeader = connect(mapStateToProps)(Header);
