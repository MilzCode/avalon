import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/about" 
      className='
      bg-blue-500
      hover:bg-blue-700
      text-white
      py-2
      px-4
      rounded
      '>
      Go to About
      </Link>
    </div>
  )
}

export default Index