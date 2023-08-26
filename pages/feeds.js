import React, { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useSession  } from 'next-auth/react';
import { useRouter } from 'next/router';
import WritePost from '@/components/WritePost';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/settings/firebase.setting';
import PostDisplay from '@/components/PostDisplay';

export default function Feeds() {
    const {data:session} = useSession();
    const [posts,setPosts] = useState([])
    const router = useRouter();

    React.useEffect(() => {
    //     if(!session){ //that is, if theres no active session, then redirect it
    //         router.push('/auth/signup')
    //     }
    // },[]
})
      //get posts from firestore
    const getPosts = async () => {
        const res = await getDocs(collection(db,'posts'));

        setPosts(res.docs.map(doc => {
            return {
              id:doc.id,
              data:{
                ...doc.data()
              }
            }
        }))
    }
  getPosts();

  return (
    <>
    <Head>
        <link rel="icon" href="/facepal_icon_logo.png" />
        <meta name="description" content="The Coolest way to connect with friends and hold money" />
        <meta name="keywords" content="facepal" />
        <title>facepal | Connect with friends</title>
      </Head>
      <main className="h-screen flex justify-center bg-gray-200 pt-20 bg-scroll relative flex-col items-center">
        <nav
        className='w-full h-19 flex flex-row justify-between items-center fixed top-0 left-0 right-0 p-2 bg-white shadow-sm'>

            <div
            className='flex items-center w-[50px] h-[50px] rounded-full bg-gray-200'>
                <Image 
                    width={40}
                    height={40} 
                    src="/facepal_logo.png"
                    alt="profile photo" />
            </div>
            <Link href='/account/profile'>
                      <Image 
                      className="rounded-full" 
                      width={58} 
                      height={58} 
                      src={session?.user.image} //this will render if the session is active
                      alt="profile photo" />
                    </Link>
        </nav>
            <div className="w-full sm:w-[600px] h-full bg-white overflow-y-scroll px-4">
                {/* profile holder */}
                <WritePost />

                {/* previous posts holder  */}

                <div className="flex flex-col gap-2">
                        {
                          posts.map(post => (
                            <div id={post.id}>
                              <PostDisplay 
                              timePosted={post.data.postedAt}
                              body={post.data.body}
                              postImage={post.data.imageUrl}
                              />
                            </div>
                          ))
                        }
                     
                    {/* single post  */}
                   
                </div>
            </div>
        </main>

        
    </>
  )
}
