import { useState } from "react";
import { ChatState } from "../../../Context/ChatProvider";
import { toast } from "react-toastify";
import UserListItem from "../UserAvatar/UserListItem";
import axios from "axios";

const UpdateGroupChatModal = ({ children, fetchAgain, setFetchAgain, fetchMessages }) => {
  const [updateGroupChatModal, setUpdateGroupChatModal] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const { user, selectedChat, setSelectedChat } = ChatState();

  const removeUserFromGroup = async (userToRemove) => {
    if(selectedChat.groupAdmin._id !== user._id && userToRemove._id !== user._id) {
      toast("Only admins can remove someone")
      return;
    }
    try {
      setLoading(true)
      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      }
      const {data} = await axios.put("http://127.0.0.1:3000/api/chat/groupremove",
        {
          chatId:selectedChat._id,
          userId: userToRemove._id
        },
        config
      )
      userToRemove._id === user._id ? setSelectedChat() : setSelectedChat(data) 
      setFetchAgain(!fetchAgain);
      fetchMessages()
      setLoading(false)
      
    } 
    catch (error) {
      toast("Failed to remove the user")
      setLoading(false)
    }
  };

  const addUserToGroup = async (userToAdd) => {
    if(selectedChat.users.find((u) => u._id === userToAdd._id)) {
      toast("User already in the group")
      return;
    }
    if(selectedChat.groupAdmin._id !== user._id) {
      toast("Only admins can add someone")
      return;
    }
    try {
      setLoading(true)
      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      }
      const {data} = await axios.put("http://127.0.0.1:3000/api/chat/groupadd",
        {
          chatId:selectedChat._id,
          userId: userToAdd._id
        },
        config
      )
      setSelectedChat(data)
      setFetchAgain(!setFetchAgain);
      setLoading(false)
      
    } 
    catch (error) {
      toast("Failed to add the user")
      setLoading(false)
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:3000/api/user/login?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast("Error fetching the users");
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "http://127.0.0.1:3000/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast("Faild to update chat");
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  return (
    <div>
      <span
        onClick={() => setUpdateGroupChatModal(true)}
        className="cursor-pointer"
      >
        {children}
      </span>
      {updateGroupChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 flex flex-col items-center">
            <div className="relative pb-3 w-full text-center">
              <h3 className="text-3xl font-semibold">
                {selectedChat.chatName}
              </h3>
              <h3 >
                Admin: {selectedChat.groupAdmin.name}
              </h3>

              <button
                onClick={() => {
                  setUpdateGroupChatModal(false)
                  setSearch("")
                  setSearchResult([])

                }}
                className="absolute cursor-pointer right-0 top-0 p-2 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3">
              {selectedChat.users.map((user) => (
                <span
                  key={user._id}
                  className="bg-yellow-300 mr-1 px-3 py-1 rounded"
                >
                  {user.name}{" "}
                  <button
                    className="cursor-pointer"
                    onClick={() => removeUserFromGroup(user)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <div className="flex w-[50%]">
              <input
                type="text"
                placeholder="Rename Group"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              />
              <button
                onClick={handleRename}
                disabled={renameLoading}
                className={`border px-4 ml-3 h-10 rounded-xl text-white ${
                  renameLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-600"
                }`}
              >
                {renameLoading ? "Updating" : "Update"}
              </button>
            </div>
            <div className="w-[50%]">
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search users"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              />
            </div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="w-[50%] overflow-y-auto rounded px-3 py-2 mb-3">
                {searchResult?.slice(0, 4).map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => addUserToGroup(user)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateGroupChatModal;
