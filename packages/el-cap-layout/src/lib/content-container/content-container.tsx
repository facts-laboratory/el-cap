import { ReactNode } from 'react';
/* eslint-disable-next-line */
export interface ContentContainerProps {
  children: ReactNode;
}

export function ContentContainer(props: ContentContainerProps) {
  const { children } = props;
  return <div>{children}</div>;
}

export default ContentContainer;
