import React, { useContext, useRef, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { BiPoll } from "react-icons/bi";
import { VscSmiley } from "react-icons/vsc";
import { SlCalender } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import { FaGlobeAmericas } from "react-icons/fa";
import { TweetList } from "../store/tweets-store";
import { PiImageFill } from "react-icons/pi";
import axios from 'axios';
const PostPage = () => {
  // send data to backend
  const { addPost } = useContext(TweetList);
  const textInput = useRef(null);
  const imageInput = useRef(null);
  const btnRef = useRef(null);

  const [image, setImage] = useState(null);
  const handleOnImgClick = () => {
    imageInput.current.click();
  };

  const handleImageSelect = (e) => {
    setImage(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const text = textInput.current.value;
    // axios.post('http://localhost:3000/api/users', {text})
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(err => console.log(err));


      if (image) {
        addPost(text, image);
      } else {
        addPost(text);
      }
      textInput.current.value = "";
      setImage(null);
  
      btnRef.current.focus();
  };

  return (
    <form className="border-b" onSubmit={handleOnSubmit}>
      <textarea
        className="post-question"
        placeholder="What is happening?!"
        ref={textInput}
      ></textarea>
      <div className="ml-51">
        <FaGlobeAmericas className="globe" />
        <a href="#" className="side-h2 ml-4 everyoneMesg ">
          Everyone can reply
        </a>
      </div>
      <div className="line-color" />
      <div className="d-flex justify-content-between">
        <div className="icon-row ml-40">
          <span onClick={handleOnImgClick}>
            {image ? (
              <PiImageFill className="icon icon-style" />
            ) : (
              <IoImageOutline className="icon icon-style" />
            )}

            <input
              type="file"
              id="image"
              accept="image/*"
              ref={imageInput}
              onChange={handleImageSelect}
              style={{ display: "none" }}
            />
          </span>

          <MdOutlineGifBox className="icon icon-style" />
          <BiPoll className="icon icon-style" />
          <VscSmiley className="icon icon-style" />
          <SlCalender className="icon icon-style" />
          <IoLocationOutline className="icon icon-style" />
        </div>
        <button ref={btnRef} type="submit" className="post-btn mr-20">
          Post
        </button>
      </div>
    </form>
  );
};

export default PostPage;

