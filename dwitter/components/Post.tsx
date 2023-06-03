import Link from 'next/link';
import Image from 'next/image';
import { calculateTimeDifference } from '@/utils/calculateTimeDifference';

import message from '@/assets/icons/message-square.svg';
import thumbsUp from '@/assets/icons/thumbs-up.svg';
import thumbsDown from '@/assets/icons/thumbs-down.svg';

interface User {
    name: string;
    username: string;
    avatar: string;
    wallet: string;
}

interface Comment {
    name: string;
    username: string;
    avatar: string;
    wallet: string;
    comment: string;
}

interface Post {
    id: number;
    user: User;
    timestamp: string;
    post: string;
    type: string;
    image?: string;
    donation?: { currency: string, value: number, received: number, };
    pollChoices?: { choice: string; checked: boolean }[];
    likes: User[];
    dislikes: User[];
    comments: Comment[];
}


export const Post: React.FC<Post> = ({
    id,
    post,
    user,
    timestamp,
    type,
    image,
    donation,
    pollChoices,
    likes,
    dislikes,
    comments,
}) => {
    return (
        <Link href={"/posts/" + id} className="border-b border-gray-200 flex flex-col py-4">
            <div className="flex justify-between w-full px-4 mb-4">
                <Link href={"/user/" + user.wallet} className="flex">
                    <Image
                        src={user.avatar}
                        loader={() => user.avatar}
                        width={50}
                        height={50}
                        alt="avatar"
                        className="rounded-full"
                    />

                    <div className="ml-4">
                        <p className="font-semibold">
                            {user.name} <span className="text-gray-400">@{user.username}</span>
                        </p>
                        <p className="text-gray-400">
                            {user.wallet.trim().slice(0, 6)}...{user.wallet.trim().slice(-4)}
                        </p>
                    </div>
                </Link>

                <p className="text-gray-400">{calculateTimeDifference(timestamp)} ago</p>
            </div>

            <div className="text-start px-4 mb-4">
                <p className="text-md">{post}</p>
            </div>

            {type === 'image' && (
                <div className="flex justify-center px-4 mb-4 items-center w-full">
                    <Image src={image} width={500} height={200} className='w-full rounded-lg' alt="post image" />
                </div>
            )}

            {type === 'donation' && (
                <div className="flex flex-col mx-4 p-2 border border-gray-200">
                    <p className="text-md">Asking for:</p>
                    <div className="flex items-center">
                        <p className="text-md">donation<span className="ml-2">{donation?.value} {donation?.currency}</span></p>
                    </div>

                    <div className="flex items-center mt-4 border border-gray-200 w-full">
                        <div className={`
                            
                        `}>
                            <p className="text-md">{donation?.received} {donation?.currency}</p>
                        </div>
                    </div>
                </div>
            )}

            {type === 'poll' && (
                <div className="flex ml-4 px-4">
                    {pollChoices?.map((poll, index) => (
                        <div className="flex items-center mr-4" key={index}>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={poll.checked}
                                    onChange={() => { }}
                                />
                                <p>{poll.choice}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className='flex w-full mt-4 px-4'>
                <div className="flex mr-4">
                    <Image src={thumbsUp} width={24} height={24} alt="icon" />
                    <p className='ml-2 text-[#757575]'>{likes.length}</p>
                </div>
                <div className="flex mr-4">
                    <Image src={thumbsDown} width={24} height={24} alt="icon" />
                    <p className='ml-2 text-[#757575]'>{dislikes.length}</p>
                </div>
                <div className="flex">
                    <Image src={message} width={24} height={24} alt="icon" />
                    <p className='ml-2 text-[#757575]'>{comments.length}</p>
                </div>
            </div>
        </Link>
    );
};
