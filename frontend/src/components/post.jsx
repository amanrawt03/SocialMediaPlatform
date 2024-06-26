import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import profilePic from "../assets/manImg.png";
import { useEffect, useState , useContext} from "react";
import {TweetList} from "../store/tweets-store"

const Post = ({ tweet }) => {
  const [imageURL, setImageURL] = useState(null);
  const [image, setImage] = useState(null);
  const {delPost} = useContext(TweetList);

  useEffect(() => {
    if (tweet.image_file) {
      const file = tweet.image_file;
      const imgname = tweet.image_file.name;
      const reader = new FileReader();
      
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const aspectRatio = 16 / 9;
          let width = img.width;
          let height = img.height;
        
          // Determine new dimensions maintaining 16:9 aspect ratio
          if (width / height > aspectRatio) {
            height = width / aspectRatio;
          } else {
            width = height * aspectRatio;
          }
        
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
        
          const ctx = canvas.getContext("2d");
          // Center the image within the new dimensions
          const offsetX = (width - img.width) / 2;
          const offsetY = (height - img.height) / 2;
        
          ctx.drawImage(img, offsetX, offsetY, img.width, img.height);
          canvas.toBlob(
            (blob) => {
              const file = new File([blob], imgname, {
                type: "image/png",
                lastModified: Date.now(),
              });
        
              setImage(file);
            },
            "image/jpeg",
            0.8
          );
        };
              
      };
    }
  }, [tweet.image_file]);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImageURL(url);

      // Clean up the URL when the component unmounts or image changes
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [image]);

  return (
    <div className="post-container">
      <header className="d-flex ml-4 mt-15 rel">
        <img src={profilePic} className="user-img" />
        <div className="ml-14">
          <h1 className="side-h2 text-white">{tweet.fullname}</h1>
          <p className="side-p3">@{tweet.username}</p>
        </div>
        <MdDeleteOutline className="icon-style sp-del abs" onClick={()=>{delPost(tweet.id)}}/>
      </header>
      <p className="side-p1 ml-40 pr-11 text-white">{tweet.description}</p>
      {imageURL && (
        <img
          src={imageURL}
          className="post-img"
          onLoad={() => URL.revokeObjectURL(imageURL)}
        />
      )}
      <p className="ml-40 mt-2 text-white">{tweet.created_at}</p>
      <div className="line-color" />
      <div className="d-flex justify-content-around">
        <FaRegComment className="icon-style" />
        <BiRepost className="icon-style" />
        <IoMdHeartEmpty className="icon-style" />
        <IoStatsChartSharp className="icon-style" />
        <FaRegBookmark className="icon-style" />
      </div>
    </div>
  );
};

export default Post;

