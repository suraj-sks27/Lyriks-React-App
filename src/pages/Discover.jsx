import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';

// our API
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';

const Discover = () => {
  const dispatch = useDispatch();

  // we want to get these two state property from redux state of type player
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);

  // data - (result of the api call)
  // isFetching - shows that if we are currently fetching data(used to show loding state)
  // error - allows us to know if an error has happened
  const { data, isFetching, error } = useGetTopChartsQuery();

  const genreTitle = 'Pop';

  // ? checking if api is fetching (at that time we display a loading message)
  if (isFetching) return <Loader title="loading songs..." />;

  // ? checking if there is a error
  if (error) return <Error />;

  return (
    <div className="flex flex-col ">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>

        {/* creating a select menu for genres  */}
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {/* every genres are used as option using map by traversing the genres array */}
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            //!
            data={data.tracks}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
