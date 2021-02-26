import "./ProfilePage.css";
import MediaQuery from "react-responsive";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import UserStats from "../UserStats/UserStats";
import HackathonsJoined from "../HackathonsJoined/HackathonsJoined";
import OrganizerStats from "../OrganizerStats/OrganizerStats";
import HackathonsCreated from "../HackathonsCreated/HackathonsCreated";
import Logout from "../Logout/Logout";
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
        <Logout />
      </MediaQuery>
      <MediaQuery minWidth={768}>
        <ProfileInfo />
        <UserStats />
        <OrganizerStats/>
        <HackathonsWide index={1}/>
        <HackathonsWide index={2}/>
        <Logout/>
      </MediaQuery>
    </div>
  );
}

export default ProfilePage;
