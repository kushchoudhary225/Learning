'use client'
import React, { useEffect, useState } from 'react'
import './Sekeleton.css'
import { Skeleton, Stack, Typography } from '@mui/material'
import Image from 'next/image'
const Sekeleton = () => {
    const data = [
        {
            src: 'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
            title: 'Don Diablo @ Tomorrowland Main Stage 2019 | Official…',
            channel: 'Don Diablo',
            views: '396k views',
            createdAt: 'a week ago',
        },
        {
            src: 'https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA',
            title: 'Queen - Greatest Hits',
            channel: 'Queen Official',
            views: '40M views',
            createdAt: '3 years ago',
        },
        {
            src: 'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
            title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
            channel: 'Calvin Harris',
            views: '130M views',
            createdAt: '10 months ago',
        },
    ];

    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=> {
        setTimeout(()=>{
            setIsLoading(false);
        }, 3000)
    }, [])
    return (
        <Stack className=' flex flex-row flex-swrap justify-center gap-x-2 pt-4 '>
            {
                    isLoading ? [1, 2, 3, 4, 5].map((ele, i) => {
                        return  <div key = {i} className='flex gap-x-2 justify-center'>
                        <div className='' style={{ width: '200px', height: '400px' }}>
                        <Skeleton animation="wave" variant="rectangular" width={200} height={100} />
                        <Skeleton className='' width={150} />
                        <Skeleton className='text-sm pt-3' width={80} height={10}/>
                        <Skeleton className='text-sm pt-3' width={100} height={8} />
                        </div> 
                        </div> 
                       
                    }) :                  
                    data.map(ele => {
                        return <div key={ele.createdAt} className='flex gap-x-2 justify-center'>
                        <div key={ele.channel} className='' style={{ width: '200px', height: '400px' }}>
                        <Image src='/hqdefault.webp' alt="image" width={200} height={100} />
                        <Typography className=''>{ele.title}</Typography>
                        <Typography className='text-sm pt-3'>{ele.channel}</Typography>
                    <Typography className='text-sm pt-3'>{ele.views}</Typography>
                </div> 
                </div> 
                    })
                }
        
    </Stack >
  )
}

export default Sekeleton
{/* <Skeleton variant="rectangular" width={200} height={100} /> */}