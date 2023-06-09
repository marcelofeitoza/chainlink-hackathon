import Image from 'next/image';
import { useForm, useFieldArray, set } from 'react-hook-form';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Post } from '@/components/Post';
import toast, { Toaster } from 'react-hot-toast';
import picture from '@/assets/images/profile-icon.png';
import imageIcon from '@/assets/icons/image.svg';
import send from '@/assets/icons/send.svg';
import poll from '@/assets/icons/poll.svg';
import dollar from '@/assets/icons/dollar-sign.svg';
import postService from '@/services/postService';
import axios from 'axios';
import { get } from 'http';
import { useRouter } from 'next/router';
import userService from '@/services/userService';

interface Post {
    id: number;
    author: User;
    timestamp: string;
    description: string;
    type: string;
    image?: string;
    donation?: { currency: string, value: number, received: number, };
    pollChoices?: { choice: string; checked: boolean }[];
}
interface User {
    name: string;
    username: string;
    avatar: string;
    wallet: string;
}

interface Data {
    post: string | null;
    isPoll: boolean;
    pollChoices?: { choice: string }[];
    day?: string;
    hour?: string;
    minute?: string;
    currency?: string;
    donationValue?: string;
}

export const Feed = () => {
    const { register, handleSubmit, formState: { errors }, control, reset, watch } = useForm();
    const [postsData, setPostsData] = useState<Post[]>([]);
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'pollChoices',
    });
    const [isPoll, setIsPoll] = useState(false);
    const [image, setPostImage] = useState<string | null>(null);
    const [isDonation, setIsDonation] = useState(false);
    const [user, setUser] = useState<any>();

    const router = useRouter();

    const getPosts = async () => {
        try {
            const posts = await postService.getAll();
            console.log(posts);
            setPostsData(posts)
        } catch (err) {
            console.log(err);
        }
        
    };

    const getUser = async () => {
        try {
            const response = await userService.getUser();
            setUser(response.data);
        } catch (err) {
            toast.error('Error getting posts, please log in!');
            setTimeout(() => {
                router.push('/login2')
            }, 1000)
        }
    }

    useEffect(() => {
        getUser();
        getPosts();
    }, []);


    const postPoll = () => {
        setIsPoll(!isPoll);
        append({ choice: "" });
        append({ choice: "" });
        setPostImage(null);
    };

    const postDonation = () => {
        setIsDonation(!isDonation);
        setIsPoll(false);
        setPostImage(null);
    }

    const onSubmit = async (data: Data) => {
        const { post } = data;

        const postData = {
            post,
            type: isPoll ? 'poll' : isDonation ? 'donation' : image ? 'image' : 'post',
            ...(isPoll && { pollChoices: data.pollChoices }),
            ...(image && { image }),
            ...(isDonation && { donation: { currency: data.currency, value: data.donationValue } }),
            timestamp: new Date().toISOString(),
        };

        console.log(postData)

        try {
            const response = await postService.create(postData.post);
            console.log(response);
            toast.success('Post created successfully!');
            getPosts();
        } catch (error) {
            console.log(error);
            toast.error('Error creating post, try again later!');
        }

        setPostImage(null);
        setIsPoll(false);
        setIsDonation(false);
        reset();
    };

    const handleButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPostImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const inputRef = useRef<HTMLInputElement>(null);

    const [mock] = useState([
        {
            id: "4178f4b9-845e-41e4-8818-f2cbdbf9451d",
            address: "0x000000000000000000",
            description: "Post de Teste, somente",
            image: null,
            unlisted: false,
            createdAt: "2023-06-07T04:42:53.216Z",
            updatedAt: "2023-06-07T04:42:53.216Z",
            authorId: "7bfe2b97-93bd-4cd2-99ec-90301082d008",
            author: {
                id: "7bfe2b97-93bd-4cd2-99ec-90301082d008",
                address: "0xdf013448797e4cb858e1ede170115a864a07efaf",
                email: "pepehaggehb@gmail.com",
                name: "Pedro Hagge Baptista",
                password: "$2b$08$d2v8FOR9nGBxmTktH/6tx.FphUS7oV8iqJxE3/buQPYU6Dag/xm/6",
                createdAt: "2023-06-07T04:01:36.674Z",
                updatedAt: "2023-06-07T04:01:36.674Z"
            }
        },
    ])

    return (
        <div className="w-full sm:w-1/2 flex flex-col items-center border-x-[1px] border-[#bfbfbf] h-full mx-auto">
            <Toaster />
            <div className="flex w-full p-4 items-center border-b border-gray-200">
                {user && <img src={user.imgUrl} width={48} height={48} alt="profile" className="rounded-full h-12 mr-2" />}
                <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col items-center mb-2 p-2 border border-gray-200 rounded-lg">
                        <textarea
                            className="w-full rounded-lg text-lg flex-wrap focus:border focus:border-gray-200"
                            placeholder="What do you want to share?"
                            {...register('post', {
                                required: /* make it required if it's a poll or donation */ isPoll || isDonation ? 'Post is required' : false,
                            })}
                            onChange={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                            style={{
                                resize: 'none',
                                overflow: 'hidden',
                                minHeight: '50px',
                                maxHeight: '100px',
                            }}
                        />

                        {isPoll && (
                            <div className="w-full flex flex-col border border-gray-200 p-2 rounded-lg mt-2">
                                {fields.map((field, index) => (
                                    <div className="mb-2" key={field.id}>
                                        <div className="w-full flex items-center justify-between">
                                            <input
                                                type="text"
                                                className="w-full rounded-lg p-2 text-lg flex-wrap border border-gray-200"
                                                placeholder="Choice"
                                                {...register(`pollChoices.${index}.choice`, {
                                                    required: 'Choice is required',
                                                })}
                                            />
                                            {index >= 2 && (
                                                <button
                                                    type="button"
                                                    className="ml-2 flex p-2 rounded-lg hover:bg-gray-100"
                                                    onClick={() => remove(index)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        {errors.pollChoices && errors.pollChoices[index] && errors.pollChoices[index].choice && (
                                            <p className="text-red-600">
                                                Choice is required
                                            </p>
                                        )}
                                    </div>
                                ))}

                                <div className="flex justify-between mb-2">
                                    <p className="text-gray-400">Poll duration</p>

                                    <p className="text-gray-400">1 week</p>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        className="flex text-blue-400 font-semibold p-2 text-center rounded-md items-center justify-center hover:bg-gray-200"
                                        onClick={() => {
                                            if (fields.length < 4) {
                                                append({ choice: '' });
                                            }
                                        }}
                                    >
                                        Add Choice
                                    </button>

                                    <button
                                        className="flex text-red-600 p-2 text-center rounded-md items-center justify-center hover:bg-gray-200"
                                        type="button"
                                        onClick={() => {
                                            setIsPoll(false);
                                            setPostImage(null);
                                            remove(); // Clears all the poll choices
                                        }}
                                    >
                                        Remove Poll
                                    </button>
                                </div>
                            </div>
                        )}

                        {image && (
                            <div className="w-full flex flex-col border border-gray-200 p-2 rounded-lg mt-2">
                                <div className="flex justify-between">
                                    <p className="text-gray-400">Image</p>

                                    <button
                                        className="flex text-red-600 p-2 text-center rounded-md items-center justify-center hover:bg-gray-200"
                                        type="button"
                                        onClick={() => setPostImage(null)}
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className="flex justify-between">
                                    {/* show the image responsively with Image */}
                                    <Image src={image} width={500} height={200} alt="post image" />
                                </div>
                            </div>
                        )}

                        {isDonation && (
                            <div className="w-full flex flex-col border border-gray-200 p-2 rounded-lg mt-2">
                                <div className="flex flex-col">
                                    <p className="text-gray-400">Donation</p>

                                    <div className='flex justify-between'>
                                        <div className='flex items-center'>
                                            <div className='flex items-center border border-gray-200 rounded-lg'>
                                                <select className="rounded-lg p-2 text-lg flex-wrap border border-gray-200" {...register('currency', { required: 'Currency is required' })}>
                                                    <option value="USD">USD</option>
                                                    <option value="ETH">ETH</option>
                                                </select>
                                                <input step={
                                                    watch('currency') === 'ETH' ? '0.001' : '0.1'
                                                } type="number" className="h-full p-2 text-lg flex-wrap" placeholder='100.00' {...register('donationValue', { required: 'Donation is required' })} min={0} max={999999} />
                                            </div>
                                        </div>

                                        <button
                                            className="flex text-red-600 p-2 text-center rounded-md items-center justify-center hover:bg-gray-200"
                                            type="button"
                                            onClick={() => {
                                                setIsDonation(false);
                                                setPostImage(null);
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {errors.donation && <p className="text-red-600">
                                        Donation is required
                                    </p>}
                                </div>
                            </div>
                        )}
                    </div>
                    {errors.post && <p className="text-red-600">Post is required</p>}

                    <div className="flex justify-between">
                        <div className="flex">
                            <button
                                className="mr-2"
                                onClick={handleButtonClick}
                                disabled={isPoll || isDonation}
                            >
                                <Image
                                    src={imageIcon}
                                    width={24}
                                    alt="image"
                                    style={{
                                        filter: isPoll || isDonation ? 'grayscale(100%)' : 'none',
                                    }}
                                />
                            </button>

                            <button
                                className="mr-2"
                                onClick={!isPoll ? postPoll : () => {
                                    setIsPoll(false);
                                    setPostImage(null);
                                    remove(); // Clears all the poll choices
                                }}
                                disabled={isDonation || image != null}
                            >
                                <Image
                                    src={poll}
                                    width={24}
                                    alt="poll"
                                    style={{
                                        filter: isDonation || image != null ? 'grayscale(100%)' : 'none',
                                    }}
                                />
                            </button>

                            <button
                                onClick={() => setIsDonation(!isDonation)}
                                disabled={isPoll || image != null}
                            >
                                <Image
                                    src={dollar}
                                    width={24}
                                    alt="dollar"
                                    style={{
                                        filter: isPoll || image != null ? 'grayscale(100%)' : 'none',
                                    }}
                                />
                            </button>
                        </div>

                        <button
                            className="flex bg-blue-400 text-white px-4 py-2 rounded-full text-lg items-center justify-center"
                            type="submit"
                        >
                            {isPoll ? 'Submit Poll' : isDonation ? 'Submit Donation' : image ? 'Submit Image' : "Submit Post"} <Image src={send} width={24} alt="submit" />
                        </button>
                    </div>
                </form>
                <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>

            <div className="flex flex-col w-full">
                {postsData.sort(
                    (a: any, b: any) => new Date(b.createdAt) - new Date(a.createdAt)
                ).map((post: any) => (
                    <Post key={post.id} reload={getPosts} {...post} />
                ))}
            </div>
        </div>
    );
}

export default Feed;
