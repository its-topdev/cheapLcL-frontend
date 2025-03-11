import "./style.scss";

export default function Profile() {
  return (
    <div className="profile">
      <div className="profile-img">
        <img src={`src/assets/images/profile.jpg`} />
      </div>
      <div className="profile-prop">
        <span className="profile-prop-name">Shams</span>
        <span className="profile-prop-role">Project Manager</span>
      </div>
    </div>
  );
}
