import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";

const ProtectedRoute = ({children, userRole, accessibleFor}:{children:ReactElement; userRole:string|undefined; accessibleFor?:string|undefined;}) => {
    console.log("??????????????");
    console.log(userRole);
    console.log("??????????????");
    if (userRole) {
        if (!accessibleFor) return children;
        if (userRole === accessibleFor) return children;
        if (userRole !== accessibleFor) return <PageNotFound />;
    }
    else{
        return <Navigate to="/user/login" />;
    }
};

export default ProtectedRoute;