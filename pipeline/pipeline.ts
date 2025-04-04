type Transformation<Input,Output>=(dataInput:Input)=>Output|Promise<Output>;

function  createPipeline<InputType, OutputType>(
transformations:Transformation<any,any>[],
validator: (data: unknown) => data is OutputType 
):(initialData: InputType) => Promise<OutputType | Error>{
return async (initialData:InputType)=>{
    try {
        let resultGenerated:unknown=initialData;

        // calling all the transformation fucntions on the input data
        for(let transform of transformations){
            resultGenerated=await transform(resultGenerated);
        }
        
        if(!validator){
            throw new Error("Validation falied !!Output didn't match the validation");
        }
        return resultGenerated;

    } catch (error) {
        return error instanceof Error?error:new Error("Error Occurred");
    }
}
}
interface RawUser {
    id:number,
    username:string,
    email:string
}
interface ProcessedUser{
    id:number,
    name:string,
    email:string,
    address:string
}

const normalizeUserName:Transformation<RawUser,RawUser>=(user)=>{
return {...user,username:user.username.trim().toLowerCase()};
}

const validateEmailFormat:Transformation<RawUser,RawUser>=(user)=>{
    let flag=false;
    for(let data of user.email){
    if(data==="@"){
        flag=true;
    }
    }
    if(!flag){
    throw new Error(`Invalid Email Format for user ${user.email}`);
    }
    return user;
}

const fetchUserAddress:Transformation<RawUser,ProcessedUser>=async(user)=>{
//CREATING RANDOM ADDRESS
 const demoAddress=async(id:number)=>`14${id}-colony/${id}-Delhi`;
 const address= await demoAddress(user.id);
 return {...user,name:user.username,address};
}

// Check for validation with Processeduser
const isProcessed=(data:unknown):data is ProcessedUser=>
typeof data ==="object" && data !=null && 
"id" in data && "name" in data && 
"email" in data && "address" in data

// Creating PipeLine
const userPipeLine=createPipeline<RawUser,ProcessedUser>([normalizeUserName,validateEmailFormat,fetchUserAddress],isProcessed);

// Adding User Data

const user1:RawUser={id:1,username:"Naksh",email:"naksh@gmail.com"};
const user2:RawUser={id:2,username:"Yash",email:"yashgmail.com"};

userPipeLine(user1)
.then((data)=>{
  console.log(data instanceof Error?`Error Occurred :${data.message}`:"User data : ",data);
})

userPipeLine(user2)
.then((data)=>{
  console.log(data instanceof Error?`Error Occurred :${data.message}`:"User data : ",data);
})
