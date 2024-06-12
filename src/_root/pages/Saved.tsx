import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import Meta from "@/components/shared/Meta";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";


function Saved() {
  const { data: currentUser } = useGetCurrentUser();
 const savePosts = currentUser?.save
   .map((savePost: Models.Document) => ({
     ...savePost.post,
     creator: {
       imageUrl: currentUser.imageUrl,
     },
   }))
   .reverse();


 
  return (
    <>
      <Meta title="Saved" homePage={false} />
      <div className="saved-container">
        <div className="w-full max-w-5xl flex gap-2">
          <img
            src="/assets/icons/save.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold w-full text-left">Saved Post</h2>
        </div>
        {!currentUser ? (
          <Loader />
        ) : (
          <ul className="w-full flex justify-center max-w-5xl gap-9">
            {savePosts.length === 0 ? (
              <p className="text-light-4">No available posts</p>
            ) : (
              <GridPostList posts={savePosts} showStats={false} />
            )}
          </ul>
        )}
      </div>
    </>
  );
}

export default Saved;
