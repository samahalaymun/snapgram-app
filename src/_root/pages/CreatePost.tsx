import PostForm from "@/components/forms/PostForm";
import Meta from "@/components/shared/Meta";


function CreatePost() {
  return (
    <>
      <Meta title="Create Post" homePage={false} />
      <div className="flex flex-1 ">
        <div className="common-container">
          <div className="max-w-3xl flex-start gap-3 justify-start w-full">
            <img
              src="/assets/icons/add-post.svg"
              width={36}
              height={36}
              alt="add-post"
            />
            <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
          </div>
          <PostForm action="Create" />
        </div>
      </div>
    </>
  );
}

export default CreatePost;
