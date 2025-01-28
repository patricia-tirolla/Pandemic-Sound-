import "./main.css"
import SpotifyAuth from '../../Api-auth/ApiAuthComponent';

function Main() {
  const clientId = "bab8a1bc1b6348759c3cd4efb8b959e9";
  return (
    <div className="main">
      <SpotifyAuth clientId={clientId} />
    </div>
  );
}
export default Main;