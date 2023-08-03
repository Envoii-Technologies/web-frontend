import {Link} from 'react-router-dom'

export default function NavBar() {
    return (
    <nav>
    <div className='flex justify-around items-center py-5 bg-[#234] text-white'>
      <ul className='flex'>

        <li>
          <Link to="/login">Tenant Login</Link>
        </li>

        {/* <li className='mx-1'>
          <Link to='/'>Home</Link>
        </li>
        <li className='mx-1'>
          <Link to='/resource'>Login</Link>
        </li>
        <li className='mx-1'>
          <Link to ='/resource'>Resource</Link>
        </li> */}
      </ul>
    </div>
    </nav>
  )
}