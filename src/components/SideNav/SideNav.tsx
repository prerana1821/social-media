import Home from "../../images/home.svg";
import Bell from "../../images/bell.svg";
import BookMark from "../../images/bookmark.svg";
import Explore from "../../images/explore.png";
import Profile from "../../images/profile.png";
import "./SideNav.css";

export const SideNav = () => {
  return (
    <div className='side-nav'>
      <div className='nav-item'>
        <img
          src='https://prekit.netlify.app/images/preCodes.png'
          className='logo-img'
          alt='Logo'
        />
        <ul>
          <li className='nav-div'>
            <img className='nav-img' src={Home} alt='Home' /> Home
          </li>
          <li className='nav-div'>
            <img className='nav-img' src={Explore} alt='Explore' />
            Explore
          </li>
          <li className='nav-div'>
            <img className='nav-img' src={Bell} alt='Notifications' />
            Notifications
          </li>
          <li className='nav-div'>
            <img className='nav-img' src={BookMark} alt='Bookmark' />
            Bookmarks
          </li>
          <li className='nav-div'>
            <img className='nav-img' src={Profile} alt='Profile' />
            Profile
          </li>
        </ul>
      </div>
      <div className='nav-bottom'>
        <img
          src='https://prekit.netlify.app/images/preCodes.png'
          className='logo-img'
          alt='Logo'
        />
        <div>
          <h5>Prerana Nawar</h5>
          <h6>@precodes18</h6>
        </div>
        <i className='fas fa-ellipsis-h'></i>
      </div>
    </div>
  );
};
