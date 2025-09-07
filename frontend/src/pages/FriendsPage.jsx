import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { MessageSquareIcon, UsersIcon, MapPinIcon } from "lucide-react";
import { getLanguageFlag } from "../components/FriendCard.jsx"; 
import { capitialize } from "../lib/utils";
import { Link, useNavigate } from "react-router";

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });



  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Heading - left aligned */}
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2 mb-8">
        <UsersIcon className="h-6 w-6 text-primary" />
        Your Friends
      </h1>
      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : friends.length === 0 ? (
        <div className="text-center py-12 text-base-content/70">
          <p>You don’t have any friends yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {friends.map((friend) => (
            <div
              key={friend._id}
              className="card bg-base-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="card-body p-5 space-y-4">
                {/* Profile section */}
                <div className="flex items-center gap-3">
                  <div className="avatar size-16 rounded-full">
                    <img src={friend.profilePic} alt={friend.fullName} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">{friend.fullName}</h3>
                    {friend.location && (
                      <div className="flex items-center text-xs opacity-70 mt-1">
                        <MapPinIcon className="size-3 mr-1" />
                        {friend.location}
                      </div>
                    )}
                  </div>
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="badge badge-secondary">
                    {getLanguageFlag(friend.nativeLanguage)}
                    Native: {capitialize(friend.nativeLanguage)}
                  </span>
                  <span className="badge badge-outline">
                    {getLanguageFlag(friend.learningLanguage)}
                    Learning: {capitialize(friend.learningLanguage)}
                  </span>
                </div>

                <Link 
                    to={`/chat/${friend._id}`} 
                    className="btn w-full mt-2 btn-primary"
                    
                        >
                             <MessageSquareIcon className="size-4 mr-2" />
                    Message
                </Link>

                {/* Bio */}
                {friend.bio && <p className="text-sm opacity-70">{friend.bio}</p>}

                {/* Action button */}
                {/* <button className="btn w-full mt-2 btn-primary">
                  <MessageSquareIcon className="size-4 mr-2" />
                  Message
                </button> */}
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
