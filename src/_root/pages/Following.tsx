import FollowCard from "@/components/shared/FollowCard";

const Following = ({ followingList }: { followingList: string[] }) => {

  return (
    <div className="follow-container">
      <FollowCard label="Following" followList={followingList} />
    </div>
  );
};

export default Following;
