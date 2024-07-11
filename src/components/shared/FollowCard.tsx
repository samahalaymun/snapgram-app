import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useGetFollowingList } from "@/lib/react-query/queriesAndMutations";
import { useInView } from "react-intersection-observer";
import Loader from "./Loader";
import UserCard from "./UserCard";

const FollowCard = ({
  label,
  followList,
}: {
  label: String;
  followList: string[];
}) => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  const {
    data: users,
    isPending: isUsersLoading,
    isError: isErrorPosts,
    fetchNextPage,
    hasNextPage,
  } = useGetFollowingList(followList);
  useEffect(() => {
    if (inView) {
     
      fetchNextPage();
    }
  }, [inView]);
  console.log(hasNextPage);
  const shouldShowPosts = users?.pages.every(
    (item) => item?.documents.length === 0
  );

  const emptyUsers = followList.length === 0;
  return (
    <div className="max-w-[700px] w-full rounded-3xl h-full md:max-h-[80vh] bg-dark-1 md:bg-dark-4">
      <div className="w-full py-6 px-5 border-b border-dark-5 flex flex-between">
        <h1></h1>
        <h3 className="h3-bold">{label}</h3>
        <Button
          className="shad-button_ghost h3-bold"
          onClick={() => navigate(-1)}
        >
          &#10005;
        </Button>
      </div>
      <div className="py-6 px-5 h-full">
        {emptyUsers ? (
          <p className="text-light-4 mt-10 text-center w-full">
            No users found
          </p>
        ) : isUsersLoading && !users ? (
          <Loader />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">Ends of users</p>
        ) : (
          <ul className="flex flex-col gap-10 w-full h-full md:max-h-[60vh] custom-scrollbar overflow-y-auto  overflow-hidden">
            {users?.pages.map((user) =>
              user?.documents.map((user) => (
                <li key={user.$id} className="w-full">
                  <UserCard user={user} showFollowBtn homePage={false} />
                </li>
              ))
            )}

           
          </ul>
        )}

        {hasNextPage && (
          <div ref={ref} className="mt-10">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowCard;
