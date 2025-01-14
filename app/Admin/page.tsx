
import Sidebar from "./Dashboard/sidebar"
import AdminActions from "./Dashboard/dashboard"

export default function Page(){
    return(
        <div className="flex min-h-screen bg-gray-100">
     
        <div className="w-full md:w-1/4 bg-white shadow-lg">
          <Sidebar />
        </div>
  
     
        <div className="w-full md:w-3/4 p-4">
          <AdminActions />
        </div>
      </div>
    )
}