import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Button,TextField } from '@mui/material';
import { collection,addDoc } from 'firebase/firestore';
import { db, storage } from '@/settings/firebase.setting';
import { cdnImages } from '@/assets/demo_cdn_images';
import { rangeOfRandNums } from '@/assets/range-of-rand-nums';

export default function WritePost() {
    const {data:session} = useSession();
    const [formInput,setFormInput] = useState('');
    const [selectedFile,setSelectedFile] = useState(null);

    const imageToPost = (e) => {
        const reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readEvent) => {
            setSelectedFile(readEvent.target.result);
        }
    }
    console.log(selectedFile);

    // create post to firestore
    const handleCreatePost = async () => {
        const docRes = await addDoc(collection(db,'posts'),{
            body:formInput,
            author:session.user.email,
            postedAt:new Date().getTime(),
            imageUrl:cdnImages[rangeOfRandNums(0,cdnImages.length)] //selecting a random number in the array of images
        })
        // .then(() => {
        //     setFormInput('');
        //     alert('Your post was published');
        // })
        // .catch(error => console.error(error))
        
        const imageRef = ref(storage,`posts/${docRes.id}/image`);

            await uploadString(imageRef,selectedFile,'data_url')
            .then(async () => {
                const imgUrl = await getDownloadURL(imageRef);
                updateDoc(doc(db,'posts',docRes.id),{
                    imageUrl:imgUrl,
                })
                setFormInput('')
                alert('Your post was published')
            })
            .catch((e) => console.error(e))
    }

    return (
        <form className="flex flex-col border border-gray-100 bg-white rounded-md shadow-md p-3 mb-4 gap-4">
            <div className='flex flex-row items-center gap-4'>
                <Image 
                className="rounded-full" 
                width={48} 
                height={48}
                src={session?.user.image} 
                alt="profile photo" />

                <div className='w-full flex flex-col gap-2'>
                    <TextField
                    multiline={true}
                    className='w-full'
                    placeholder="what's on your mind ..."
                    value={formInput}
                    onChange={(text) => setFormInput(text.target.value)}/>

                        {formInput.length > 0 ?
                        <div className='flex flex-col gap-6'>
                            <input 
                            type="file"
                            accept="image/*"
                            onChange={imageToPost}
                            />

                            <Button 
                            variant='outlined'
                            className='block w-[100px]'
                            onClick={handleCreatePost}>Post</Button>
                        </div>  
                        : null}

                </div>
            </div>
            <hr style={{color:'black'}}/>

            <div className='flex flex-row justify-around  gap-4'>
                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                    <VideoCameraFrontIcon sx={{ color: 'red' }} />
                    Live video
                </button>
                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                    <PhotoLibraryIcon sx={{ color: 'green' }} />
                    Photo/video
                </button>
                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                    <SentimentVerySatisfiedIcon sx={{ color: 'yellow' }} />
                    Feeling/activity
                </button>
            </div>
        </form>
    )
}