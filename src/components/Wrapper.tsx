import React, { type ReactNode, type JSX } from "react";

 interface WrapperProps {
   children: ReactNode;
 }

 const Wrapper = ({ children }: WrapperProps): JSX.Element => {
   return (
     <div className="app bg-gray-100 py-5">
       {children}
     </div>
   );
 };

 export default Wrapper;