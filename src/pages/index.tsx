import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/about" className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white">
        Go to About
      </Link>
    </div>
  );
};

export default Index;
