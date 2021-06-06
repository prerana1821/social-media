import { useAppSelector } from "../../app/hooks";
import { SideNav } from "../../components";
import { selectUserDetails } from "../../features/userDetail/userDetailSlice";
import "./Home.css";
import Emoji from "../../images/emoji.png";
import Gallery from "../../images/gallery.png";

export const Home = () => {
  const { userDetails } = useAppSelector(selectUserDetails);

  return (
    <div>
      <SideNav />
      <div className='right-side'>
        <div className='right-side-details'>
          <div className='home-header'>
            <h3>Home</h3>
          </div>
          <div className='input-tweet'>
            <img src={userDetails?.profileImage} alt='' className='logo-img' />
            <div>
              <textarea
                cols={42}
                rows={5}
                className='input-text'
                placeholder="What's happening?"
              ></textarea>
              <div className='input-footer'>
                <div className='input-actions'>
                  <div className='image-upload'>
                    <label htmlFor='file-input'>
                      <img src={Gallery} alt='' />
                    </label>
                    <input id='file-input' type='file' />
                  </div>
                  <img src={Emoji} alt='Emoji' />
                </div>
                <button className='btn pink'>Tweet</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
