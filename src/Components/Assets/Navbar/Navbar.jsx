import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../logo.png';
import cart_icon from '../cart_icon.png';
import search_icon from '../search_icon.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../../../Context/ShopContext';
import { UserContext } from '../../../Context/UserContext';

const Navbar = () => {
  const { getTotalCartItems, getSearchItem, all_product } = useContext(ShopContext);
  const facultyItems = ["Engineering", "Medicine", "Architecture", "Business", "IT"];
  const departmentItems = ["CSE", "ENTC", "Electrical", "Mechanical", "Civil", "TMLE", "Chemical", "Material"];
  const clubItems = ["IEEE", "Leo Club", "Rotaract Club", "Moraspirit", "Gavel", "Chess Club"];
  const eventsItems = ["Exmo", "Orientation"];
  const navigate = useNavigate();
  const { all_user } = useContext(UserContext);

  const [userEmail, setUserEmail] = useState(null);
  const [currentuser, setCurrentUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/getuser', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
        body: '',
      })
        .then((response) => response.json())
        .then((data) => setUserEmail(data));
    }
  }, []);

  useEffect(() => {
    const user = all_user.find((user) => userEmail === user.email);
    setCurrentUser(user);
  }, [all_user, userEmail]);

  const [searchItem, setSearchItem] = useState(null);

  const setSearchRes = (e) => {
    setSearchItem(e.target.value);
  }

  const searchFunc = (e) => {
    e.preventDefault();
    const product = all_product.find((e) => e.name === searchItem);
    if (!product) {
      alert('No result found');
    } else {
      getSearchItem(searchItem);
      navigate('/search');
    }
  }

  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to close the menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Function to toggle the search bar
  const toggleSearchBar = () => {
    setSearchBarOpen(!searchBarOpen);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the location changes
  }, [location]);

  return (
    <div className={`navbar ${navbarVisible ? 'visible' : 'hidden'}`}
      onMouseEnter={() => setNavbarVisible(true)}
      onMouseLeave={() => {
        if (window.scrollY >= 60) {
          setNavbarVisible(false);
        }
      }}>
      <div className="nav-top">
        <div className="nav-logo">
          <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
            <img src={logo} alt="MORAMERCH logo" />
          </Link>
        </div>
        <div className="nav-title">
          <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
            <h1>MORAMERCH</h1>
          </Link>
        </div>
        <div className="nav-title-desktop">
          <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
            <h1>MORAMERCH</h1>
          </Link>
        </div>
        <hr />
        <div className="nav-search">
          <input type="text" placeholder="Search" onChange={setSearchRes} />
          <Link to='/search'><button onClick={searchFunc}>Search</button></Link>
        </div>
        <div className='nav-auth'>
          {localStorage.getItem('auth-token')
            ? <>
              <button className='nav-auth-logout' onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
              <Link className='nav-auth-profile' style={{ textDecoration: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', border: '1px solid black' }} to='/profile'>
                {currentuser && currentuser.profile_pic ? <img style={{ width: '32px', height: '32px', borderRadius: '50%', borderColor: 'black' }} src={currentuser.profile_pic} alt='' /> : <span style={{ fontSize: '2px' }}>&#128100;</span>}
              </Link>
            </>
            : <>
              <Link className='nav-auth-login' style={{ textDecoration: 'none' }} to='/login'><button>Login</button></Link>
              <Link className='nav-auth-signup' style={{ textDecoration: 'none' }} to='/signup'><button>Signup</button></Link>
            </>}
          <Link className='nav-auth-cart' style={{ textDecoration: 'none' }} to='/cart'><img src={cart_icon} alt='' /></Link>
          <div className='nav-cart-count'>{getTotalCartItems()}</div>
        </div>
      </div>
      <ul className='nav-menu'>
        <div>
          <li><Link style={{ textDecoration: 'none', color: "black" }} to='/'>HOME</Link></li>
        </div>
        <div className='dropdown'>
          <li className='dropbtn'><Link className='link-1' style={{ textDecoration: 'none' }} to='/t-shirt'>T-SHIRTS {'>'} </Link></li>
          <div className="dropdown-content">
            <div className="dropdown-column">
              <h5>Faculty Shirts</h5>
              <ul>
                {facultyItems.map(item => (
                  <li key={item}><Link style={{ textDecoration: 'none' }} to={`/t-shirts/faculty/${item.toLowerCase()}`} onClick={closeMenu}>{item}</Link></li>
                ))}
              </ul>
            </div>
            <div className="dropdown-column">
              <h5>Department Shirts</h5>
              <ul>
                {departmentItems.map(item => (
                  <li key={item}><Link style={{ textDecoration: 'none' }} to={`/t-shirts/department/${item.toLowerCase()}`} onClick={closeMenu}>{item}</Link></li>
                ))}
              </ul>
            </div>
            <div className="dropdown-column">
              <h5>Club Shirts</h5>
              <ul>
                {clubItems.map(item => (
                  <li key={item}><Link style={{ textDecoration: 'none' }} to={`/t-shirts/club/${item.toLowerCase()}`} onClick={closeMenu}>{item}</Link></li>
                ))}
              </ul>
            </div>
            <div className="dropdown-column">
              <h5>Event Shirts</h5>
              <ul>
                {eventsItems.map(item => (
                  <li key={item}><Link style={{ textDecoration: 'none' }} to={`/t-shirts/events/${item.toLowerCase()}`} onClick={closeMenu}>{item}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='dropdown'>
          <li className='dropbtn'><Link className='link-1' style={{ textDecoration: 'none' }} to='/wristbands'>WRISTBANDS {'>'} </Link></li>
          <div className="dropdown-content">
            <div className="dropdown-column">
              <ul>
                <li><Link style={{ textDecoration: 'none' }} to='/wristbands/type1' onClick={closeMenu}>Type 1</Link></li>
                <li><Link style={{ textDecoration: 'none' }} to='/wristbands/type2' onClick={closeMenu}>Type 2</Link></li>
              </ul>
            </div>
            <div className="dropdown-column">
              <ul>
                <li><Link style={{ textDecoration: 'none' }} to='/wristbands/type3' onClick={closeMenu}>Type 3</Link></li>
                <li><Link style={{ textDecoration: 'none' }} to='/wristbands/type4' onClick={closeMenu}>Type 4</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className='dropdown'>
          <li className='dropbtn'><Link className='link-1' style={{ textDecoration: 'none' }} to='/caps'>OTHERS {'>'} </Link></li>
          <div className="dropdown-content">
            <div className="dropdown-column">
              <ul>
                <li><Link style={{ textDecoration: 'none' }} to='/caps/type1' onClick={closeMenu}>Type 1</Link></li>
                <li><Link style={{ textDecoration: 'none' }} to='/caps/type2' onClick={closeMenu}>Type 2</Link></li>
              </ul>
            </div>
            <div className="dropdown-column">
              <ul>
                <li><Link style={{ textDecoration: 'none' }} to='/caps/type3' onClick={closeMenu}>Type 3</Link></li>
                <li><Link style={{ textDecoration: 'none' }} to='/caps/type4' onClick={closeMenu}>Type 4</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <li><Link style={{ textDecoration: 'none', color: "black" }} to='/contact'>CONTACT</Link></li>
        </div>
      </ul>
      <div className='nav-icons'>
        <div className="nav-search-icon" onClick={toggleSearchBar}>
          <img src={search_icon} alt="Search" />
        </div>
        <Link className='cart-mobile' style={{ textDecoration: 'none' }} to='/cart'>
          <img src={cart_icon} alt='' />
        </Link>
        <div className='count-mobile'>{getTotalCartItems()}</div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`mobile-menu-container ${menuOpen ? 'open' : ''}`}>
          <ul className='mobile-menu'>
            <li><Link to='/' onClick={closeMenu}>HOME</Link></li>
            <li><Link to='/t-shirt' onClick={closeMenu}>T-SHIRTS</Link></li>
            <li><Link to='/wristbands' onClick={closeMenu}>WRISTBANDS</Link></li>
            <li><Link to='/caps' onClick={closeMenu}>OTHERS</Link></li>
            <li><Link to='/contact' onClick={closeMenu}>CONTACT</Link></li>
            <div></div>
            <hr />
            <div className='nav-auth-mobile'>
              {localStorage.getItem('auth-token')
                ? <>
                  <button className='nav-auth-logout' onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
                  <Link className='nav-auth-profile-mobile' style={{ textDecoration: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', border: '1px solid black' }} to='/profile' onClick={closeMenu}>
                    {currentuser && currentuser.profile_pic ? <img style={{ width: '32px', height: '32px', borderRadius: '50%', borderColor: 'black' }} src={currentuser.profile_pic} alt='' /> : <span style={{ fontSize: '2px' }}>&#128100;</span>}
                  </Link>
                </>
                : <>
                  <Link className='nav-auth-login' style={{ textDecoration: 'none' }} to='/login' onClick={closeMenu}><button>Login</button></Link>
                  <Link className='nav-auth-signup' style={{ textDecoration: 'none' }} to='/signup' onClick={closeMenu}><button>Signup</button></Link>
                </>}
            </div>
          </ul>
        </div>
        {/* {menuOpen && <div className="overlay show" onClick={toggleMenu}></div>} */}
        {/* {searchBarOpen && <div className="overlay show" onClick={toggleSearchBar}></div>} */}
      </div>
      <div className={`sliding-search-bar-container ${searchBarOpen ? 'open' : ''}`}>
        <div className="sliding-search-bar">
          <input type="text" placeholder="Search" onChange={setSearchRes} />
          <Link to="/search"><button onClick={searchFunc}>Search</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

