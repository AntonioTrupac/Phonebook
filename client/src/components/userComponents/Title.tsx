import { FC } from 'react';

type TitleProps = {
  title: string;
};

export const Title: FC<TitleProps> = (props) => {
  return <h1>{props.title}</h1>;
};
