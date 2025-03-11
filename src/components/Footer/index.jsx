import "./style.scss";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="main-container">
        <p>{year}, All Rights Reserved to CheapLCL LLC.</p>
      </div>
    </div>
  );
}
