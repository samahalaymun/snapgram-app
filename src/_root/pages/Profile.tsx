import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import { LikedPosts } from "@/_root/pages";
import { useUserContext } from "@/context/AuthContext";
import Meta from "@/components/shared/Meta";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { Button } from "@/components/ui/button";
import GridPostList from "@/components/shared/GridPostList";
import useFollowingUser from "@/hooks/useFollowingUser";
import Loader from "@/components/shared/Loader";
import EmptyPosts from "@/components/shared/EmptyPosts";
import Following from "./Following";
import Followers from "./Followers";

interface StabBlockProps {
  value: string | number;
  label: string;
}
const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

function Profile() {
  const { id } = useParams();
  const { user } = useUserContext();
  const { handleFollowUser, isFollow, isFollowing, followers } =
    useFollowingUser(id || "");
  const { pathname } = useLocation();
  const { data: currentUser } = useGetUserById(id || "");

 
  return (
    <>
      {currentUser && <Meta title={currentUser?.username} homePage={false} />}
      {currentUser && (
        <div className="profile-container">
          <div className="profile-inner_container">
            <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-4 xl:gap-7">
              <img
                src={
                  currentUser?.imageUrl ||
                  "/assets/icons/profile-placeholder.svg"
                }
                alt="profile"
                className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
              />
              <div className="flex flex-col flex-1 justify-between md:mt-2">
                <div className="flex flex-col w-full">
                  <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                    {currentUser?.name}
                  </h1>
                  <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                    @{currentUser?.username}
                  </p>
                </div>
                <div className="flex gap-8 mt-5 xl:mt:10 items-center justify-center xl:justify-start flex-wrap z-20">
                  <StatBlock value={currentUser?.posts.length} label="Posts" />
                  <Link to={`/profile/${id}/followers`}>
                    <StatBlock value={followers?.length} label="Followers" />
                  </Link>
                  <Link to={`/profile/${id}/following`}>
                    <StatBlock
                      value={currentUser?.following.length}
                      label="Followings"
                    />
                  </Link>
                </div>
                <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
                  {currentUser?.bio}
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <div className={`${user.id !== currentUser?.$id && "hidden"}`}>
                  <Link
                    to={`/update-profile/${currentUser?.$id}`}
                    className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                      user.id !== currentUser?.$id && "hidden"
                    }`}
                  >
                    <img
                      src={"/assets/icons/edit.svg"}
                      alt="edit"
                      width={20}
                      height={20}
                    />
                    <p className="flex whitespace-nowrap small-medium">
                      Edit Profile
                    </p>
                  </Link>
                </div>
                <div className={`${user.id === id && "hidden"}`}>
                  <Button
                    type="button"
                    className="shad-button_primary px-8"
                    onClick={handleFollowUser}
                  >
                    {isFollowing ? (
                      <div className="flex-center gap-2">
                        <Loader />
                      </div>
                    ) : isFollow ? (
                      "Following"
                    ) : (
                      "Follow"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {currentUser?.$id === user.id && (
            <div className="flex max-w-5xl w-full">
              <Link
                to={`/profile/${id}`}
                className={`profile-tab rounded-l-lg ${
                  pathname === `/profile/${id}` && "!bg-dark-3"
                }`}
              >
                <img
                  src={"/assets/icons/posts.svg"}
                  alt="posts"
                  width={20}
                  height={20}
                />
                Posts
              </Link>
              <Link
                to={`/profile/${id}/liked-posts`}
                className={`profile-tab rounded-r-lg ${
                  pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
                }`}
              >
                <img
                  src={"/assets/icons/like.svg"}
                  alt="like"
                  width={20}
                  height={20}
                />
                Liked Posts
              </Link>
            </div>
          )}
          {currentUser?.posts.length === 0 && pathname === `/profile/${id}` && (
            <EmptyPosts title="No available posts yet." />
          )}
          <Routes>
            <Route
              index
              element={
                <GridPostList posts={currentUser?.posts} showUser={false} />
              }
            />

            {currentUser?.$id === user.id && (
              <Route path="/liked-posts" element={<LikedPosts />} />
            )}
            <Route
              path="/following"
              element={<Following followingList={currentUser?.following} />}
            />
            <Route
              path="/followers"
              element={<Followers followingList={followers} />}
            />
          </Routes>
          <Outlet />
        </div>
      )}
    </>
  );
}

export default Profile;
