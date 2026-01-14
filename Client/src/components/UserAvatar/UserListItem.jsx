
const UserListItem = ({user, handleFunction }) => {

  return (
    <div
      onClick={handleFunction}
      className="cursor-pointer bg-amber-100 w-full flex items-center text-black px-3 py-2 mb-2 rounded"
    >
      <img
        className="w-10 h-10 mr-2 rounded-full cusror-pointer"
        src={user.profilePicture}
        alt="Rounded avatar"
      />
      <div>
        <p>{user.name}</p>
        <p className="text-sm"><b>Email:</b> {user.email}</p>
      </div>
    </div>
  );
};

export default UserListItem;
