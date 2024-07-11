import FollowCard from '@/components/shared/FollowCard';
import React from 'react'

const Followers = ({ followingList }: { followingList: string[] }) => {
  return (
    <div className="follow-container">
      <FollowCard label="Followers" followList={followingList} />
    </div>
  );
};

export default Followers