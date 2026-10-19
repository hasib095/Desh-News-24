// import React from 'react';
// import MarqueeText from "react-marquee-text"
// import "react-marquee-text/dist/styles.css"

// interface Headlines{
//   id:number,
//   title:string,
// };

// const Marquee = async () => {
//     const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10");
//     const data = await res.json();
//     const headlines = data.data;

//     return (
//         <div className='bg-red-700 text-white font-bold  mt-2'>
            
//             <div className='flex max-w-7xl mx-auto'>
//                 <div className='bg-red-800 px-4 py-2 font-bold'>সর্বশেষ</div>
//                 <MarqueeText direction="right" duration={13} className='py-2'>

//                   {
//                     headlines.map((h:Headlines) =>
                     
//                     <span key={h.id}>
//                       {/* {console.log(h.title)} */}
//                         <span>{h.title}</span>
//                         <span className='mx-3'>●</span>
//                     </span>            
//                 )
//                   }  
//                 </MarqueeText>
//             </div>      
//         </div>
//     );
// };

// export default Marquee;