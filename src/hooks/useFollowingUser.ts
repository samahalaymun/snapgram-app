import { useUserContext } from "@/context/AuthContext";
import {
  useFollowUser,
  useGetUserById,
} from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";

const useFollowingUser = (userId: string) => {
  const { user ,setUser} = useUserContext();
  const { data: currentUser } = useGetUserById(userId || "");
  const { mutate: followUser } = useFollowUser();
  const [followingList, setFollowingList] = useState<string[]>(user.following);
  const [followers, setFollowers] = useState<string[]>(currentUser?.followers);
  const [isFollow, setIsFollow] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (currentUser !== undefined) {
      const followedUserRecord = currentUser?.followers.find(
        (userId: string) => userId === user.id
      );

      setFollowers(currentUser?.followers);
      setIsFollow(!!followedUserRecord);
    }
    setFollowingList(user.following);
  }, [currentUser, user]);

  const handleFollowUser = () => {
    setIsFollowing(true);
    try {
      let followersArray = [...followers];
      let followingArray = [...followingList];
      let id: string = user?.id || "";
      if (followersArray.includes(id)) {
        followersArray = followersArray.filter((Id) => Id !== id);
      } else {
        followersArray.push(id);
      }
      setFollowers(followersArray);
      if (followingArray.includes(userId)) {
        followingArray = followingArray.filter((Id) => Id !== userId);
      } else {
        followingArray.push(userId);
      }

      console.log(followingArray);
       setUser((prev)=>({...prev,following: followingArray}));
      followUser({
        followingId: id || "",
        followerId: userId,
        followersArray,
        followingArray,
      });
      setIsFollow((prev) => !prev);
    } catch (error) {
      console.log(error);
      setIsFollowing(false);
    } finally {
      setIsFollowing(false);
    }
  };

  return { isFollow, handleFollowUser, isFollowing, followers };
};

export default useFollowingUser;
