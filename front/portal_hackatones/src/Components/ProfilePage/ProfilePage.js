import "./ProfilePage.css";
import MediaQuery from "react-responsive";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import UserStats from "../UserStats/UserStats";
import HackathonsJoined from "../HackathonsJoined/HackathonsJoined";
import OrganizerStats from "../OrganizerStats/OrganizerStats";
import HackathonsCreated from "../HackathonsCreated/HackathonsCreated";
import HackathonsWide from "../HackathonsWide/HackathonsWide";


function ProfilePage() {
  return (
    <div className="profile-page-container">
      <MediaQuery maxWidth={767}>
        <ProfileInfo />
        <UserStats />
        <HackathonsJoined />
        <OrganizerStats />
        <HackathonsCreated />
      </MediaQuery>
      <MediaQuery minWidth={768}>
        <ProfileInfo />
        <UserStats />
        <OrganizerStats/>
        <HackathonsWide index={1}/>
        <HackathonsWide index={2}/>
      </MediaQuery>
    </div>
  );
}

export default ProfilePage;
