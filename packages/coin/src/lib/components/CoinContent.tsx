import React, { ReactNode } from 'react';

export interface ICoinContent {
  title: String;
  content: React.ReactNode;
}

const CoinContent: React.FC<ICoinContent> = (props) => {
  return (
    <div className="my-4">
      <p className="text-2xl my-4 font-bold">{props.title}</p>
      <div>{props.content}</div>
    </div>
  );
};

export default CoinContent;
