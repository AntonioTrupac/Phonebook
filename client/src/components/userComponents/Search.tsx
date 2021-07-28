import { Dispatch, FC, SetStateAction } from 'react';

type SearchProps = {
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

export const Search: FC<SearchProps> = (props) => {
  const handleSearch = (e: any) => {
    props.setSearchTerm(e.target.value);
  };

  return (
    <div>
      <span>
        Search: <input type='text' onChange={(e) => handleSearch(e)} />
      </span>
    </div>
  );
};
