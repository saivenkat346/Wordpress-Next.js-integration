import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'



const Home:NextPage = ({data} :any) => {
    
  return (

    <div className="h-screen bg-gradient-to-tr from-gray-700 via-gray-900 to-black gap-4 pt-36 pb-36 flex flex-col">
       <nav className='m-3 text-center text-white flex gap-80 justify-evenly '>
        <div className='text-2xl' >Basic Blog Post</div>
        <div className='text-xl' >
          <Link
          href={'/'}
          >
          Articles
          </Link>
         
          </div>
       </nav>

      {
         data.map((post:any)=>{
         return <div className='text-center text-white ' key={post.id} >
          <h1>{post.title.rendered}</h1> 
          <a href={`/article/${post.id}`} >Read more</a>
         </div>
        })
      }
    </div>
  )
}

export async function getServerSideProps() {
  const response  = await fetch("http://127.0.0.1:81/wordpress/wp-json/wp/v2/article")
  const data : [] = await response.json()
 
  return {
     props :{
      data,
     }
  }
  
}

export default Home
