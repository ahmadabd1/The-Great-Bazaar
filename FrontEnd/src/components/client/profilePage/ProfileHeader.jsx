import "../../style/ClientProfile.css";

const ProfileHeader = ({ userInfo }) => (
    <div className="mb-2 rounded-lg bg-opacity-90 p-8">
      <img
        src="../../src/assets/ProfileTest.png"
        alt="avatar"
        className="mx-auto mb-3 w-32 rounded-full border border-white"
      />
      <div className="mb-1 w-40 text-justify font-mono text-lg text-slate-300">
        <p>Welcome {userInfo.firstName}</p>
      </div>
    </div>
  );
  
  export default ProfileHeader;
  