
import Hero from "./Home/Hero";

import Show from "./Home/ShowCase";

import Categories from "./Home/Categories";
// import PopularListings from "./Home/PopularListings";

import Steps from "./Steps/steps";
import Footer from "./Components/Footer";
import FAQ from "./Home/Partnership";
import BlogSection from "./Home/Blog";



export default function Home() {
  return (
  <>
  
    <Hero/>
    
    <BlogSection/>

    <Show/>
  
    <Steps/> 

    <Categories/>
   
  
   
     <FAQ/>
    
    <Footer/> 
     
    
  </>
  );
}
