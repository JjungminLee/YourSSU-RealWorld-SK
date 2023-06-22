
import { ISignUp, PostSignUpReq } from "@src/types/user";
import useInput from "./atom/input";
import postSignUp from "../../apis/user";



export default function UserLogin(){

    const [name,onChangeName]=useInput("");
    const [password,onChangePassword]=useInput("");
    const [email,onChangeEmail]=useInput("");

    const onSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const info:PostSignUpReq ={
            username:name,
            email:email,
            password:password

        }
        const res=postSignUp(info);
        console.log(res)
    
        

    };
    return (<>
    
    <div className="auth-page">
        <div className="container page">
            <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Sign up</h1>
                <p className="text-xs-center">
                <a href="">Have an account?</a>
                </p>

                {/* <ul className="error-messages">
                <li>That email is already taken</li>
                </ul> */}
                <form onSubmit={onSubmit}>
                        <fieldset className="form-group">
                            <input className="form-control form-control-lg" 
                                    type="text" 
                                    placeholder="Your Name"
                                    value= {name}
                                    onChange={onChangeName}
                                />
                        </fieldset>
                        <fieldset className="form-group">
                            <input className="form-control form-control-lg" 
                                    type="text" 
                                    placeholder="Email"
                                    value= {email}
                                    onChange={onChangeEmail}
                                />
                        </fieldset>
                        <fieldset className="form-group">
                            <input className="form-control form-control-lg" 
                                    type="password" 
                                    placeholder="Password"
                                    value= {password}
                                    onChange={onChangePassword}
                                />
                        </fieldset>
                   
                    <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    
    </>);
}
