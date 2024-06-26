import React from 'react';
import styles from "./sidebar.module.css";
import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosCreate } from "react-icons/io";
import { RiLoginBoxLine } from "react-icons/ri";

const Sidebar = ({ toggleModal }) => {

  const handleLogoutModal = () => {
    toggleModal();
  };

  return (
    <>
      <div className={`d-flex flex-column flex-shrink-0 p-3 text-white ${styles.sidebar}`}>
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <FaXTwitter className={styles.logo} />
        </a>

        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <div className="nav-link text-white" aria-current="page">
              <IoMdHome className={styles.icons} />
            </div>
          </li>
          <li>
            <div className="nav-link text-white">
              <IoSearch className={styles.icons} />
            </div>
          </li>
          <li>
            <div className="nav-link text-white">
              <FaRegBell className={styles.icons} />
            </div>
          </li>
          <li>
            <div className="nav-link text-white">
              <MdMessage className={styles.icons} />
            </div>
          </li>
          <li>
            <div className="nav-link text-white">
              <GoGraph className={styles.icons} />
            </div>
          </li>
          <li>
            <div className="nav-link text-white">
              <CgProfile className={styles.icons} />
            </div>
          </li>
          <li>
            <div onClick={handleLogoutModal} className="nav-link text-white">
              <RiLoginBoxLine className={styles.icons} />
            </div>
          </li>
          <li>
            <button className={` ${styles.post}`}>
              <IoIosCreate className={styles.postIcon} />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
