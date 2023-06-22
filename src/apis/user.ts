import {  ISignUp, PostSignUpReq, PostSignUpRes } from "@src/types/user"
import { postAsync } from "./common"

 const postSignUp= async(info:ISignUp)=>{
    
    const response = await postAsync<PostSignUpRes,PostSignUpReq>(
        '/users',
       info
    );

    return response;
}

export default postSignUp;