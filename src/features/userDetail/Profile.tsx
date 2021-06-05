import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SideNav } from "../../components";
import { selectAuth } from "../auth/authSlice";
import { loadUserDetails, selectUserDetails } from "./userDetailSlice";
import "./Profile.css";
import ProfilePlaceholder from "../../images/profile-placeholder.png";

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatJoinedAt = (date: string | undefined) => {
  if (date) {
    const dateType = new Date(date);
    return `${monthNames[dateType.getMonth()]}  ${dateType.getFullYear()}`;
  }
  return "now";
};

export const Profile = () => {
  const { user, token } = useAppSelector(selectAuth);
  const { userDetails } = useAppSelector(selectUserDetails);
  const dispatch = useAppDispatch();

  console.log({ user });
  console.log({ userDetails });

  useEffect(() => {
    if (token) {
      dispatch(loadUserDetails());
    }
  }, []);

  return (
    <div>
      <SideNav />
      <div className='profile'>
        <div className='profile-details'>
          <div className='profile-header'>
            <h4>
              {user?.firstName} {user?.lastName}
            </h4>
            <small>500 Tweets</small>
          </div>
          <div className='background-img'>
            <img src='' alt='' />
          </div>
          <div className='profile-img-div'>
            <img className='profile-img' src={ProfilePlaceholder} alt='' />
            <button className='btn btn-outline'>Edit Profile</button>
          </div>
          <div className='profile-name'>
            <h3>
              {user?.firstName} {user?.lastName}
            </h3>
            <small>{user?.username}</small>
          </div>
          <div>{userDetails?.bio}</div>
          <div>
            <h5>{userDetails?.location}</h5>
            <h5>{userDetails?.url}</h5>
          </div>
          <div className='profile-dates'>
            <h5>{userDetails?.birthdate}</h5>
            <h5>
              <i className='far fa-calendar-alt'></i> Joined{" "}
              {formatJoinedAt(user?.createdAt)}
            </h5>
          </div>
          <div className='profile-follow'>
            <h5>
              <strong>{userDetails?.following.length}</strong> Following
            </h5>
            <h5>
              <strong>{userDetails?.followers.length}</strong> Followers
            </h5>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
