import BeatLoader from 'react-spinners/BeatLoader';

export function Loader() {
  return (
    <BeatLoader
      loading
      color="#36d7b7"
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
