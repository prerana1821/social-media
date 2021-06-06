import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SideNav } from "../../components";
import { selectAuth } from "../auth/authSlice";
import { loadUserDetails, selectUserDetails } from "./userDetailSlice";
import "./Profile.css";
import ProfilePlaceholder from "../../images/profile-placeholder.png";
import { EditProfile } from "./EditProfile";

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

export const formatBirthDate = (date: Date | undefined) => {
  if (date) {
    const dateType = new Date(date);
    return `${
      monthNames[dateType.getMonth()]
    } ${dateType.getDate()}, ${dateType.getFullYear()}`;
  }
  return "Don't know";
};

export const Profile = () => {
  const { user, token } = useAppSelector(selectAuth);
  const { userDetails } = useAppSelector(selectUserDetails);
  const dispatch = useAppDispatch();

  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      dispatch(loadUserDetails());
    }
  }, []);

  return (
    <div>
      <SideNav />
      <div className='right-side'>
        {edit && <EditProfile setEdit={setEdit} />}
        <div className='right-side-details'>
          <div className='profile-header'>
            <h4>
              {user?.firstName} {user?.lastName}
            </h4>
            <small>500 Tweets</small>
          </div>
          <div className='background-img'>
            {userDetails?.backgroundImage && (
              <img
                src={userDetails?.backgroundImage}
                alt='BackgroundImage'
                className='background-img'
              />
            )}
          </div>
          <div className='profile-img-div'>
            <img
              className='profile-img'
              src={
                userDetails?.profileImage
                  ? userDetails?.profileImage
                  : ProfilePlaceholder
              }
              alt=''
            />
            <button className='btn btn-outline' onClick={() => setEdit(!edit)}>
              Edit Profile
            </button>
          </div>
          <div className='profile-name'>
            <h3>
              {user?.firstName} {user?.lastName}
            </h3>
            <small>@{user?.username}</small>
          </div>
          <div className='profile-bio'>{userDetails?.bio}</div>
          <div className='profile-dates'>
            <h5>
              <i className='fas fa-map-marker-alt'></i> {userDetails?.location}
            </h5>
            <h5>
              <i className='fas fa-link'></i> {userDetails?.url}
            </h5>
          </div>
          <div className='profile-dates'>
            <h5>
              <i className='fas fa-birthday-cake'></i> Born{" "}
              {formatBirthDate(userDetails?.birthDate)}
            </h5>
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
