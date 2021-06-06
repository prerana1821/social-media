import { useState } from "react";
import "./Profile.css";
import "./EditProfile.css";
import { useDispatch } from "react-redux";
import { updateProfile } from "./userDetailSlice";

export type EditProfileState = {
  bio: string;
  location: string;
  url: string;
  backgroundImage: File | null;
  profileImage: File | null;
  previewBackgroundImage: string | ArrayBuffer | null;
  previewProfileImage: string | ArrayBuffer | null;
};

export const EditProfile = ({ setEdit }: any) => {
  const dispatch = useDispatch();
  const [editProfile, setEditProfile] = useState<EditProfileState>({
    bio: "",
    location: "",
    url: "",
    backgroundImage: null,
    profileImage: null,
    previewBackgroundImage: "",
    previewProfileImage: "",
  });

  const previewFile = (file: any, img: string) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      img === "backgroundImage"
        ? setEditProfile((state) => ({
            ...state,
            previewBackgroundImage: reader.result,
          }))
        : setEditProfile((state) => ({
            ...state,
            previewProfileImage: reader.result,
          }));
    };
  };

  const handleEditForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        bio: editProfile.bio,
        location: editProfile.location,
        url: editProfile.url,
        backgroundImage: editProfile.backgroundImage!,
        profileImage: editProfile.profileImage!,
      })
    );
    setEdit(false);
  };

  //   console.log({ editProfile });

  return (
    <div className='modal profile-edit'>
      <button onClick={() => setEdit(false)}>X</button>
      <form
        onSubmit={handleEditForm}
        className='edit-form'
        encType='multipart/form-data'
      >
        <input
          type='file'
          accept='.jpg,.jpeg,.png,.svg'
          name='backgroundImage'
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            if (file) {
              previewFile(file, "backgroundImage");
              setEditProfile({
                ...editProfile,
                backgroundImage: file,
              });
            }
          }}
        />
        {editProfile.previewBackgroundImage &&
          typeof editProfile.previewBackgroundImage === "string" && (
            <img
              width='100px'
              src={editProfile.previewBackgroundImage}
              alt={editProfile.previewBackgroundImage}
            />
          )}
        <input
          type='file'
          accept='.jpg,.jpeg,.png,.svg'
          name='profileImage'
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            if (file) {
              previewFile(file, "profileImage");
              setEditProfile({
                ...editProfile,
                profileImage: file,
              });
            }
          }}
        />
        {editProfile.previewProfileImage &&
          typeof editProfile.previewProfileImage === "string" && (
            <img
              width='100px'
              src={editProfile.previewProfileImage}
              alt={editProfile.previewProfileImage}
            />
          )}
        <div className='input'>
          <textarea
            className='input-txtarea tri-pink'
            required
            value={editProfile.bio}
            onChange={(e) =>
              setEditProfile({ ...editProfile, bio: e.target.value })
            }
          ></textarea>
          <span className='flt-label flt-label-form sec-pink'>Bio</span>
        </div>
        <div className='input'>
          <input
            type='text'
            className='input-txt-error'
            required
            value={editProfile.location}
            onChange={(e) =>
              setEditProfile({ ...editProfile, location: e.target.value })
            }
          />
          <span className='flt-label flt-label-form sec-pink'>
            <i className='fas fa-exclamation-circle'></i> Location
          </span>
        </div>
        <div className='input'>
          <input
            type='text'
            className='input-txt-error'
            required
            value={editProfile.url}
            onChange={(e) =>
              setEditProfile({ ...editProfile, url: e.target.value })
            }
          />
          <span className='flt-label flt-label-form sec-pink'>
            <i className='fas fa-exclamation-circle'></i> Url
          </span>
        </div>
        <button type='reset'>Clear</button>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};
