import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { setUser } from "../../redux/auth-slice";
import * as userApi from "../../api/user-api.js";
import Avatar from "../Avatar";

export default function EditProfileForm({ profileImage }) {
  const authenticatedUser = useSelector((state) => state.auth.authenticatedUser);
  const dispatch = useDispatch();
  const initialInput = {
    username: authenticatedUser?.username,
    bio: authenticatedUser?.bio,
    links: authenticatedUser?.links,
    interest: authenticatedUser?.interest,
    birthDate: authenticatedUser?.birthDate,
    education: authenticatedUser?.education,
    company: authenticatedUser?.company
  };
  const [input, setInput] = useState(initialInput);

  const InputEditProfile = (inputName, inputValue) => (
    <input
      className="w-full border-b-2 bg-transparent focus:outline-none border-[#6A6A6A] h-8 pl-2"
      name={inputName}
      value={inputValue}
      onChange={(e) => setInput({ ...input, [inputName]: e.target.value })}
    />
  );
  const handleEditForm = async (e) => {
    e.preventDefault();
    try {
      await userApi.editMyProfile(input);
      dispatch(setUser(input));
    } catch (err) {
      console.log(err);
    }
  };
  const TitleEditProfile = (Title) => (
    <div className="font-bold h-8 flex items-center">{Title}</div>
  );

  return (
    <form onSubmit={handleEditForm}>
      <div className=" flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center">
          <Avatar src={profileImage} size="100" />
          <div className="text-center p-2">
            <div className="font-bold text-[#6A6A6A] text-sm">Edit picture</div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-8">
            {TitleEditProfile("Username")}
            {TitleEditProfile("Bio")}
            {TitleEditProfile("Links")}
            {TitleEditProfile("Interest")}
            {TitleEditProfile("Birth date")}
            {TitleEditProfile("Education")}
            {TitleEditProfile("Company")}
          </div>
          <div className=" w-[75%]">
            <div className="flex flex-col gap-8">
              {InputEditProfile("username", input.username)}
              {InputEditProfile("bio", input.bio)}
              {InputEditProfile("links", input.links)}
              {InputEditProfile("interest", input.interest)}
              {InputEditProfile("birthDate", input.birthDate)}
              {InputEditProfile("education", input.education)}
              {InputEditProfile("company", input.company)}
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full py-4">
          <button
            type="submit"
            className="bg-gradient-to-b from-[#006567] to-[#94C1E8] p-1 rounded-full font-bold text-white w-[50%]"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
