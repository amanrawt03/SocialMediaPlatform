import styles from "./homePage.module.css";
import { useContext } from "react";
import PostPage from "./postPage";
import Post from "../components/post";
import { TweetList } from "../store/tweets-store";

const HomePage = () => {
  const { tweetList } = useContext(TweetList);
  return (
    <div className={styles.mainContainer}>
      <div className={`d-flex justify-content-between ${styles.optionTab}`}>
        <div className="p-3 flex-fill">
          <h3 className={styles.h3Style}>For You</h3>
        </div>
        <div className="p-3  flex-fill ml-3">
          <h3 className={styles.h3Style}>Following</h3>
        </div>
      </div>
      <PostPage></PostPage>
      {tweetList.map((tweet) => (
        <Post key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default HomePage;
