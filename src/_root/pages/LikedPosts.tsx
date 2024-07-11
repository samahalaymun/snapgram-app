import EmptyPosts from "@/components/shared/EmptyPosts";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

function LikedPosts() {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  return (
    <>
      {currentUser.liked.length === 0 && <EmptyPosts title="No liked posts." />}

      <GridPostList posts={currentUser?.liked} showStats={false} />
    </>
  );
}

export default LikedPosts;
