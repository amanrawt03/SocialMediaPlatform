import styles from "./rightbar.module.css";
import { IoSearch } from "react-icons/io5";
import Subscribe from "./subscribe";
import WhatsHappening from "./whatshappening";
import WhoToFollow from "./whoToFollow";
const Rightbar = () => {
  return (
    <div className={`d-flex flex-column flex-shrink-0 p-3 ${styles.rightbar}`}>
      {/* <div className="fixed"> */}
        <IoSearch className={styles.icon} />
        <input
          className={`${styles.searchbar}`}
          type="search"
          placeholder="Search"
          aria-label="Search"
        ></input>
      {/* </div> */}

      <Subscribe />
      <WhatsHappening />
      <WhoToFollow />

      <ul className="d-flex flex-wrap mt-4 w-77">
        <li className="list-group-item">
          <a href="" className=" text-white side-p2 footLinks">
            Terms of Service
          </a>
        </li>
        <li className="list-group-item">
          <a href="" className="ml-12 text-white side-p2 footLinks">
            Privacy Policy
          </a>
        </li>
        <li className="list-group-item ">
          <a href="" className="ml-12 text-white side-p2 footLinks">
            Cookie Policy
          </a>
        </li>
        <li className="list-group-item ">
          <a href="" className=" text-white side-p2 footLinks">
            Adds Info
          </a>
        </li>
        <li className="list-group-item ">
          <a href="" className="ml-12 text-white side-p2 footLinks">
            More
          </a>
        </li>
        <li className="list-group-item ">
          <a href="" className="ml-12 text-white side-p2 footLinks">
            © 2024 X Corp.
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Rightbar;
