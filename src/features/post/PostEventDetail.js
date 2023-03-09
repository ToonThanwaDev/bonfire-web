import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PinMapIcon from "../../assets/icons/PinMapIcon";
import UserGroupIcon from "../../assets/icons/UserGroupIcon";
import MapMarkedIcon from "../../assets/icons/MapMarkedIcon";
import PlusIcon from "../../assets/icons/PlusIcon";
import Avatar from "../../components/Avatar";
import { getEventsById } from "../../redux/event-slice";
import Map from "../map/Map";
import { timeSince } from "../../utils/date-format";

export default function PostEventDetail({ size, timeAgo }) {
  const eventFromId = useSelector((state) => state.event.eventFromId);
  const { eventId } = useParams();
  const navigate = useNavigate();

  const thisEvent = eventFromId[eventId];

  const dispatch = useDispatch();
  useEffect(() => {
    !thisEvent && dispatch(getEventsById(eventId)); // fetch data by id if refesh (refresh === events === no data)
  }, []);

  const markerByRoomId = {
    lat: +thisEvent?.EventDetail.latitude,
    lng: +thisEvent?.EventDetail.longitude
  };

  const date = thisEvent?.EventDetail.date;
  const time = thisEvent?.EventDetail.time;
  const createdAt = thisEvent?.createdAt;
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };

  const eventDateTime = new Date(date + "T" + time).toLocaleDateString("en-US", options);

  const location = thisEvent?.EventDetail.location;
  const username = thisEvent?.User.username;
  const detail = thisEvent?.EventDetail.detail;
  const numPaticipant = thisEvent?.EventDetail.Rule?.paticipant;
  const numGoing = thisEvent?.EventUsers.reduce((acc, el) => {
    if (el.status === "JOINED") {
      acc += 1;
    }
    return acc;
  }, 0);
  const numAvailable = numPaticipant - numGoing;
  const eventUsers = thisEvent?.EventUsers;

  console.log("whatttttttttt", eventUsers);
  const User = ({ userId, paticipantUsername, paticipantId, hostId, status, profileImage }) => (
    <div
      onClick={() => navigate(`/profile/${userId}`)}
      className="flex flex-col justify-center items-center p-2 w-[20%]"
    >
      <div>
        <Avatar src={profileImage} size="100%" />
      </div>
      <div className="font-bold text-sm text-[#000000] w-[85%]">
        <div className="whitespace-nowrap truncate w-full">{paticipantUsername}</div>
      </div>
      <div className=" text-xs text-[#000000]">
        <div>{paticipantId !== hostId ? status.slice(0, 5) + "..." : "Host"}</div>
      </div>
    </div>
  );
  return (
    <div>
      <div className="flex justify-center items-center ">
        <div className="bg-[#D4D4D4] w-[300px] h-[300px] rounded-xl">
          <img
            src={thisEvent?.EventDetail.image}
            className="w-[300px] h-[300px] rounded-xl"
            alt="Event Image"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="my-2">
          <div className="flex flex-wrap text-sm gap-1">
            <div>{eventDateTime}</div>
          </div>
          <div className="flex gap-4 pt-2">
            <div className="flex items-center w-[5%]">
              <PinMapIcon size="100%" />
            </div>
            <div className="text-[15px]">{location}</div>
          </div>
        </div>
        <div className="text-sm my-2">{timeAgo}</div>
      </div>
      <div className="flex gap-4 my-2">
        <div className="w-[100%]">
          <Map
            height="30vh"
            displayMarkers={[markerByRoomId]}
            lat={markerByRoomId.lat}
            lng={markerByRoomId.lng}
            isLink={false}
          />
        </div>
        <div className="flex flex-col justify-center font-bold"></div>
      </div>
      <div className="border-black border-2 p-4 rounded-lg text-sm">
        <p>{detail}</p>
      </div>
      {/* <div className="flex gap-4 py-2">
        <div className="flex items-center w-[25%]">
          <MapMarkedIcon size="100%" />
        </div>
        <div className="border-black border-2 p-4 rounded-lg text-sm">
          <p>719 อาคารมิ้นท์ ทาวเวอร์ แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330</p>
        </div>
      </div> */}
      <div className="flex gap-4 py-1">
        <div className="flex items-center w-[5%]">
          <UserGroupIcon size="100%" />
        </div>
        <div className="flex flex-wrap gap-1 text-sm">
          {numPaticipant ? (
            <>
              <div>{`${numGoing}/${numPaticipant} going,`}</div>
              <div>{`${numAvailable} seate${numAvailable > 1 && "s"} available`}</div>
            </>
          ) : (
            <div>Unlimit</div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap">
        {/* <button className="flex flex-col items-center pt-2 px-2 w-[20%]">
          <div>
            <PlusIcon size="100%" />
          </div>
          <div className="font-bold text-xs text-[#333333]">
            <div>Invite</div>
          </div>
        </button> */}
        {eventUsers?.map((el) => (
          <User
            key={el.userId}
            userId={el.userId}
            paticipantUsername={el.User.username}
            paticipantId={el.userId}
            hostId={eventFromId[eventId]?.userId}
            status={el.status}
            profileImage={el.User.profileImage}
          />
        ))}
      </div>
    </div>
  );
}
