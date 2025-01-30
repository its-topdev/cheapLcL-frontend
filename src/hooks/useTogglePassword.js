import { useState } from "react";
// import { EyeIcon, LockIcon } from "../constants/icons";

const useTogglePassword = () => {
    const [passwordType, setPasswordType] = useState('password');
   //  const [passwordIcon, setPasswordIcon] = useState(EyeIcon);
    const handleTogglePassword = () => {
        if (passwordType==='password'){
         //   setPasswordIcon(EyeIcon);
           setPasswordType('text')
        } else {
         //   setPasswordIcon(LockIcon)
           setPasswordType('password')
        }
     }

    return [passwordType, handleTogglePassword];
}

export default useTogglePassword;