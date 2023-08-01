import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Library App!</h1>
      <p>This is a temporary home page.</p>
      <p>Please select an option below:</p>
      <ul>
        <li>
          <Link to="/search">Search Books</Link>
        </li>
        <li>
          <Link to="/reserve">Reserve Book</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;