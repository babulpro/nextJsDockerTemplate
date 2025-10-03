import Home from "@/lib/utilityCom/Home";
import Hero from "@/lib/utilityCom/Hero";

 

 

export default function Page(){
   
    
 
    return(
       <div>
            

            <div className=" bg-slate-700 py-10 md:px-5 flex justify-center items-center ">
                <div className=" md:container m-auto shadow-xl md:p-10  p-2">
                  <div>
                        <Hero/>
                  </div>
                  <Home/>
    
                </div>
            </div>
            

       </div>

    )
}