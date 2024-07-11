
const EmptyPosts = ({title}:{title:string}) => {
  return (
    <div className="p-10 flex flex-col h-full justify-center items-center gap-5">
      <img src="/assets/icons/posts.svg" className="w-16 h-16" />
      <p className="text-light-4 body-bold">{title}</p>
    </div>
  );
}

export default EmptyPosts