import manImg from "../assets/manImg.png";
const WhoToFollow = () => {
  return (
    <div className="side-container">
      <div className="d-flex">
        <img src={manImg} className="user-img" />
        <div className="d-flex flex-column ml-14">
        <h3 className="side-h2">Rakshit Gondwal</h3>
        <p className="side-p1">@RakshitGondwal</p>
        </div>
        
        <button className="follow-btn ml-14">Follow</button>
      </div>
      <div className="d-flex">
        <img src={manImg} className="user-img" />
        <div className="d-flex flex-column ml-14">
        <h3 className="side-h2">Manik Manha</h3>
        <p className="side-p1">@ManikManiac</p>
        </div>
        
        <button className="follow-btn ml-33">Follow</button>
      </div>
      <div className="d-flex">
        <img src={manImg} className="user-img" />
        <div className="d-flex flex-column ml-14">
        <h3 className="side-h2">Isha Butola</h3>
        <p className="side-p1">@IshwarKiKripa</p>
        </div>
        
        <button className="follow-btn ml-33">Follow</button>
      </div>


      <a href="#" className="link">
        Show more
      </a>
    </div>
  );
};

export default WhoToFollow;
