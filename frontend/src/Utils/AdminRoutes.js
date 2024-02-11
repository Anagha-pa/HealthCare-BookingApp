import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";





const AdminRoutes = ()=>{

    const adminToken = useSelector((state)=>state.admin.token)

    return adminToken ? <Outlet/> : <Navigate to ="adminlogin"/>;

}
export default AdminRoutes;