import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';
import Link from 'next/link'


function strip_html_tags(str:any)
{
   if ((str===null) || (str===''))
       return false;
  else
   str = str.toString();
  return str.replace(/<[^>]*>/g, '');
}

function  Singlepost(props :any ) {
  const [content,setcontent]=useState();
  useEffect(()=>{
       setcontent(strip_html_tags(props.content.rendered))
  },[])

  const router =useRouter();


   if(router.isFallback===true){
    return(
      <div className='h-screen bg-gradient-to-tr from-gray-700 via-gray-900 to-black text-center' >
           <p className='text-2xl text-white' >The page is loading...</p>
      </div>
    )
   }
  return (
    <div className='h-screen bg-gradient-to-tr from-gray-700 via-gray-900 to-black gap-4 pt-36  flex flex-col' >
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
      
      <div className='text-center text-white'  >
      <h1>{props.title.rendered}</h1>
     <p>{content}</p>
      </div>
    </div>
  )
}


export async function getStaticPaths(){
  const response = await fetch("http://127.0.0.1:81/wordpress/wp-json/wp/v2/article")
  const data = await response.json()
  const paths =data.map((post :any)=>({
    params :{
      id:post.id.toString()
    },
  }))

  


  return {
    paths,
    fallback:true,
  }

}

export async function getStaticProps({params}:any) {

  
  const response =await fetch(`http://127.0.0.1:81/wordpress/wp-json/wp/v2/article/${params.id}`)
  const props  =await response.json();

  
  return {
    props,
    
  }
  
}


export default Singlepost