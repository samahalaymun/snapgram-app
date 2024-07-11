import Loader from "@/components/shared/Loader";
import Meta from "@/components/shared/Meta";
import PostCard from "@/components/shared/PostCard";
import SearchedUserCard from "@/components/shared/SearchedUserCard";
import UserCard from "@/components/shared/UserCard";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/AuthContext";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetRecentPosts,
  useGetUsers,
  useSearchUsers,
} from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { ref, inView } = useInView();
  const { user } = useUserContext();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedUsers, isFetching: isSearchFetching } =
    useSearchUsers(debouncedSearch);
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
    fetchNextPage,
    hasNextPage,
  } = useGetRecentPosts();

  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  const shouldShowPosts = posts?.pages.every(
    (item) => item?.documents.length === 0
  );

  const emptyPosts = user.following.length === 0;

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  // if (emptyPosts) {
  //   return (
  //     <p className="text-light-4 mt-10 text-center w-full">
  //       No posts yet follow people to show their posts
  //     </p>
  //   );
  // }
  console.log(posts);
  
  return (
    <>
      <Meta title="" homePage={true} />
      <div className="flex flex-1">
        <div className="home-container">
          <div className="home-posts">
            {/* <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2> */}
            <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4 relative">
              <img
                src="/assets/icons/search.svg"
                width={24}
                height={24}
                alt="search"
              />
              <Input
                type="text"
                placeholder="Search Snapgram"
                className="explore-search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {searchedUsers && (
                <div className="flex flex-col  w-full py-6 border-t border-dark-5 bg-dark-4 rounded-b-lg min-h-20 z-50 absolute top-11  left-0">
                  {isSearchFetching ? (
                    <Loader />
                  ) : (
                    <ul className="flex flex-col gap-4 w-full">
                      {searchedUsers.documents?.map((user) => (
                        <li>
                          <SearchedUserCard user={user} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {emptyPosts ? (
              <p className="text-light-4 mt-10 text-center w-full">
                No posts yet follow people to show their posts
              </p>
            ) : isPostLoading && !posts ? (
              <Loader />
            ) : shouldShowPosts ? (
              <p className="text-light-4 mt-10 text-center w-full">
                Ends of posts
              </p>
            ) : (
              <ul className="flex flex-col gap-9 flex-1 w-full">
                {posts?.pages.map((post) =>
                  post?.documents.map((post) => (
                    <li key={post.$id} className="flex justify-center w-full">
                      <PostCard post={post} />
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
          {hasNextPage && (
            <div ref={ref} className="mt-10">
              <Loader />
            </div>
          )}
        </div>
        <div className="home-creators">
          <UserCard user={user} showFollowBtn={false} />
          <p className="small-medium lg:base-medium text-light-1">
            Suggested for you
          </p>
          {isUserLoading && !creators ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-6">
              {creators?.documents
                .filter((item) => item?.$id !== user.id)
                .map((creator) => (
                  <li key={creator?.$id}>
                    <UserCard user={creator} showFollowBtn />
                  </li>
                ))}
            </ul>
          )}
          <p className="small-medium lg:base-medium py-5 text-light-4">
            © {new Date().getFullYear()} SNAPGRAM
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
