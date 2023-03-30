import { ReactNode } from 'react';
/* eslint-disable-next-line */
export interface ContentContainerProps {
  children: ReactNode;
}

export function ContentContainer(props: ContentContainerProps) {
  const { children } = props;
  return (
    <div className="bg-gray-100 sm:px-10 px-4 py-4 static">{children}</div>
  );
}

export default ContentContainer;
