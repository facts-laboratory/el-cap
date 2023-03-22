import { StandardContentContainer } from '@facts-kit/ui-kit';
import { ReactNode } from 'react';
/* eslint-disable-next-line */
export interface ContentContainerProps {
  children: ReactNode;
}

export function ContentContainer(props: ContentContainerProps) {
  const { children } = props;
  return <StandardContentContainer>{children}</StandardContentContainer>;
}

export default ContentContainer;
