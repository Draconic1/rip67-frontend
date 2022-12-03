import MovieList from "./movieList";
import FindMovie from "./findMovie";

const Component = () => {
  return (
    <div className="mb-5">
      <FindMovie />
      <hr className="my-5" />
      <MovieList />
    </div>
  );
};

export default Component;
