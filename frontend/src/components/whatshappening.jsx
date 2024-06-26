import footballImg from "../assets/football.jpeg";
const WhatsHappening = () => {
  return (
    <div className="side-container">
      <h1 className="side-h1">What's happening</h1>
      <div className="d-flex">
        <img src={footballImg} className="side-img" />
        <div className="d-flex flex-column mt-6 ml-14">
          <h3 className="side-h2 ">Germany vs Hungary</h3>
          <p className="side-p2">UEFA EURO 2024 </p>
        </div>
      </div>

      <div className="trending">
        <p className="side-p2 mb-1">Trending in India</p>
        <h2 className="side-h2">#AyeshaSingh</h2>
        <p className="side-p2">27.4k posts</p>
      </div>

      <div className="trending">
        <p className="side-p2 mb-1">Trending in India </p>
        <h2 className="side-h2">#sensex</h2>
        <p className="side-p2">1894 posts</p>
      </div>

      <div className="trending">
        <p className="side-p2 mb-1">Trending in Japan</p>
        <h2 className="side-h2">#earthWakeCall</h2>
        <p className="side-p2">2.4k posts</p>
      </div>

      <a href="#" className="link">Show more</a>
    </div>
  );
};

export default WhatsHappening;
