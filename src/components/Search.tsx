type Props = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

function Search({ searchTerm, setSearchTerm }: Props) {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="Search" />

        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Search;
