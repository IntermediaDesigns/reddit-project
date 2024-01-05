import ResponsiveNavbar from '../ResponsiveNavbar.jsx';
import { fetchUser } from '../../lib/fetchUser.js';

export default async function Navbar() {
  
  const user = await fetchUser();

  return (
    <>
      <nav className='navBarContainer'>
        <ResponsiveNavbar />      
      </nav>
    </>
  );
}
