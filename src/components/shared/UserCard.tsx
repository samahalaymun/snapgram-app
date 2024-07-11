import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import useFollowingUser from "@/hooks/useFollowingUser";
import Loader from "./Loader";

type UserCardProps = {
  user: Models.Document;
  showFollowBtn:boolean;
  homePage:boolean;
};

const UserCard = ({ user, showFollowBtn = true, homePage=true }: UserCardProps) => {
  const { handleFollowUser, isFollow, isFollowing } = useFollowingUser(
    user?.$id
  );

  return (
    <div className="user-card">
      <Link to={`/profile/${user?.$id}`} className="flex-1 flex gap-3">
        <img
          src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="creator"
          className="rounded-full w-14 h-14"
        />

        <div className=" flex-col gap-1 overflow-hidden whitespace-normal text-ellipsis">
          <p className="base-medium text-light-1  line-clamp-1">{user.name}</p>
          <p className="base-regular text-light-3  line-clamp-1 overflow-hidden">
            @{user.username}
          </p>
        </div>
      </Link>
      {showFollowBtn && (
        <Button
          type="button"
          size="sm"
          className={
            homePage
              ? "px-5 text-primary-600 hover:text-light-2"
              : "shad-button_primary"
          }
          onClick={(e) => {
            e.stopPropagation();
            handleFollowUser();
          }}
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
      )}
    </div>
  );
};

export default UserCard;
