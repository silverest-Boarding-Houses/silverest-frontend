// 'use client'

// import React, { useEffect, useState } from 'react';
// import { getProperties } from '../utils/api';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// // Custom arrow components
// const SampleNextArrow = (props: { onClick: any; }) => {
//   const { onClick } = props;
//   return (
//     <div
//       className="slick-arrow slick-next"
//       style={{ 
//         display: "block", 
//         width: "30px", 
//         height: "30px", 
//         borderRadius: "50%", 
//         right: "10px", 
//         zIndex: 10, 
//         position: "absolute", 
//         top: "50%", 
//         transform: "translateY(-50%)", 
//         background: "#000", // Optional: Add background color to the arrow
//         color: "#fff" // Optional: Add text color to the arrow
//       }}
//       onClick={onClick}
//     >
//       {/* Optional: Add arrow icon here */}
//     </div>
//   );
// };

// const SamplePrevArrow = (props) => {
//   const { onClick } = props;
//   return (
//     <div
//       className="slick-arrow slick-prev"
//       style={{ 
//         display: "block", 
//         width: "30px", 
//         height: "30px", 
//         borderRadius: "50%", 
//         left: "10px", 
//         zIndex: 1, 
//         position: "absolute", 
//         top: "50%", 
//         transform: "translateY(-50%)", 
//         background: "#000", // Optional: Add background color to the arrow
//         color: "#fff" // Optional: Add text color to the arrow
//       }}
//       onClick={onClick}
//     >
//       {/* Optional: Add arrow icon here */}
//     </div>
//   );
// };

// const PopularListings = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const data = await getProperties();
//         setProperties(data);
//       } catch (err) {
//         setError('Failed to fetch properties');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 3000, // Adjust the speed as needed (in milliseconds)
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//   };

//   return (
//     <div className="h-[650px] bg-gray-200 relative ">
//       <p className="text-5xl text-center pt-8">Popular Listings</p>
//       <div className="w-full h-full relative">
//         {/* <Slider {...settings}> */}
//           {properties.map((property) => (
//             <div key={property.id} className="p-4">
//               <div className="w-[320px] h-[500px] m-4 p-4 border rounded shadow-lg">
//                 <img src={property.image} alt={`Property ${property.id}`} className="w-full h-[250px] object-cover mb-4" />
//                 <h3 className="text-xl font-bold">{property.location}</h3>
//                 <p className="text-lg">{property.price}</p>
//                 <p>{property.description}</p>
//                 <div className='flex justify-center items-center'>
//                   <a
//                     href="#"
//                     className="mt-4 block w-32 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                   >
//                     View Now
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         {/* </Slider> */}
//       </div>
//     </div>
//   );
// };

// export default PopularListings;
