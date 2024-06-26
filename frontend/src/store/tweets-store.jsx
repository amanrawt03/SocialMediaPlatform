import { createContext, useReducer } from "react";
export const TweetList = createContext({
  tweetList: [],
  addPost: () => {},
  delPost: () => {},
});

const ReducerList = (currTweetList, action) => {
  let newTweetList = currTweetList;
  switch (action.type) {
    case "ADD_POST":
      newTweetList = [action.payload, ...currTweetList];
      break;
    case "DEL_POST":
      newTweetList = currTweetList.filter(
        (tweet) => tweet.id !== action.payload.tweet_id
      );
      break;
    default:
      break;
  }
  return newTweetList;
};

const DEFAULT_TWEET_LIST = [
  {
    id: 1,
    fullname: "Economic Times",
    username: "EconomicTimes",
    description:
      "#UK PM #RishiSunak's Conservatives set for heavy election defeat, polls forecast",
    created_at: "Mon Aug 25 22:27:38 +0000 2014",
    image_file: null,
    favorite_count: 634,
    favorited: false,
  },

  {
    id: 2,
    fullname: "Elon Musk",
    username: "ElonMusk",
    description:
      "#Tesla, I'm the greatest man Alive. Remember I will change the world one day .",
    created_at: "Tue Jan 25 22:27:38 +0000 2014",
    image_file: null,
    favorite_count: 90,
    favorited: true,
  },
];

const TweetListProvider = ({ children }) => {
  const [tweetList, dispatchList] = useReducer(ReducerList, DEFAULT_TWEET_LIST);
  const addPost = (text, image) => {
    dispatchList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        fullname: "Channel Name",
        username: "username",
        description: text,
        created_at: Date.now(),
        image_file: image || null,
        favorite_count: 90,
        favorited: true,
      },
    });
  };

  const delPost = (tweet_id) => {
    dispatchList({
      type: "DEL_POST",
      payload: { tweet_id },
    })};
    return (
      <TweetList.Provider value={{ tweetList, addPost, delPost }}>
        {children}
      </TweetList.Provider>
    );
};

export default TweetListProvider;
