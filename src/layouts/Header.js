import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MagnifyingGlassIcon from "../assets/icons/MagnifyingGlassIcon";
import Avatar from "../components/Avatar";
import axios from "../config/axios";

export default function Header({
  content = "",
  title = "title",
  subTitle = "",
  leftBtn = "",
  rightBtn = ""
  // leftLink = "",
  // rightLink = ""
}) {
  const [tagsData, setTagsData] = useState([]);
  const [tagsFilter, setTagsFilter] = useState("");

  const authenticatedUser = useSelector((state) => state.auth.authenticatedUser);

  useEffect(() => {
    const fetchTags = async () => {
      const res = await axios.get(`/tag?tagName=${tagsFilter}`);
      const getAllTags = res.data.tags;
      setTagsData(getAllTags);
    };
    const idTimeout = setTimeout(() => {
      fetchTags();
    }, 500);
    return () => clearTimeout(idTimeout);
  }, [tagsFilter]);

  const handleChangeInput = (e) => {
    setTagsFilter(e.target.value);
  };
  return (
    <>
      {content === "" && (
        <div className="px-4 pt-[6vh] bg-white h-[13vh] top-0 left-0 fixed w-full shadow-lg z-40">
          <div className="flex relative justify-between items-center gap-4">
            <div className={`px-2 ${leftBtn === "" ? "invisible" : ""}`}>
              {leftBtn === "" ? rightBtn : leftBtn}
            </div>
            <div className="flex-col w-full ">
              <div className="text-center text-xl">{title}</div>
              {subTitle !== "" ? <div className="text-center text-xs">{subTitle}</div> : null}
            </div>
            <div className={`px-2 ${rightBtn === "" ? "invisible" : ""}`}>
              {rightBtn === "" ? leftBtn : rightBtn}
            </div>
          </div>
        </div>
      )}

      {content === "search" && (
        <div className="px-4 pt-[6vh] bg-white h-[13vh] top-0 left-0 fixed w-full z-40">
          <div className=""></div>
          <div className="px-8 pt-[5vh] bg-white h-[13vh] top-0 left-0 fixed w-full flex">
            <div className="w-full flex flex-col">
              <div className="flex items-center gap-4">
                <div className="border-[1px] border-gray-500 bg-white px-3 py-1.5 w-full rounded-full flex justify-between">
                  <div className="flex items-center">
                    <MagnifyingGlassIcon />
                  </div>
                  <input
                    className="w-full outline-none px-2"
                    placeholder="Search"
                    onChange={handleChangeInput}
                  />
                </div>

                <div className="w-[45px]">
                  <Link to="/profile/:userId/">
                    <Avatar src={authenticatedUser.profileImage} size="100%" />
                  </Link>
                </div>
              </div>

              {tagsFilter !== "" && tagsData.length !== 0 && (
                <div className="flex items-center gap-4">
                  <div className="px-4 w-full flex justify-between">
                    <div className="invisible">
                      <MagnifyingGlassIcon />
                    </div>
                    {tagsFilter !== "" && (
                      <div className="w-full">
                        {tagsData.map((tags) => (
                          <div key={tags.id} className="bg-white border border-gray-100 p-1">
                            {tags.titleTag}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="w-[45px] invisible">
                    <Link to="/profile/:userId/">
                      <Avatar src={authenticatedUser.profileImage} size="100%" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
