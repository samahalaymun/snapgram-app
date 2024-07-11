import { Link } from 'react-router-dom'

const SearchedUserCard = ({user}:any) => {
  return (
    <Link
      to={`/profile/${user.$id}`}
      className="flex flex-row gap-3 w-full items-center py-3 px-3  hover:bg-dark-5"
    >
      <img
        src={user.imageUrl}
        alt="user-img"
        className="h-14 w-14 rounded-full"
      />
      <div className="flex flex-col ">
        <p className="body-bold ">
          {user?.name}
        </p>
        <p className="small-regular text-light-3">
          @{user?.username}
        </p>
      </div>
    </Link>
  );
}

export default SearchedUserCard