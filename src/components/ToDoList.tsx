import React, { ChangeEvent } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { toDoListByState, selectedCategoryState, IToDo, customCategories, Categories } from "../atoms"
import CreateToDo from "./CreateToDo";
import CreateCategory from "./CreateCategory";
import ToDo from "./ToDo";

function ToDoList() {
    const selectedList = useRecoilValue(toDoListByState);
    const setSelectedCategory = useSetRecoilState(selectedCategoryState);
    const customCats = useRecoilValue(customCategories);
    const setCustomCats = useSetRecoilState(customCategories);
    
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.currentTarget.value as string);
    }

    return (
        <div>
            <CreateCategory />
            <select onInput={onInput}>
                {customCats.map((cat, index) => <option key={index} value={cat}>{cat}</option>)}
                {/* <option value={Categories.TODO}>TODO</option>
                <option value={Categories.DOING}>DOING</option>
                <option value={Categories.DONE}>DONE</option> */}
                
            </select>
            <CreateToDo />
            <ul>
                {selectedList.map((todo: IToDo) => <ToDo key={todo.id} {...todo} />)}
            </ul>
        </div>
    );
}

// interface IForm {
//     Email: string;
//     FirstName: string;
//     LastName: string;
//     Password: string;
//     RePassword: string;
//     UserName: string;
//     extraError?: string;
// }

// function ToDoList() {
//     const { register, handleSubmit, formState: { errors }, setError } = useForm<IForm>({defaultValues: {
//         Email: "@gmail.com",
//     }});
//     const onValid = (data: IForm) => {
//         if (data.Password !== data.RePassword) {
//             setError("RePassword", {message: "Password and Re-password are not same."}, {shouldFocus: true})
//         }
//         //setError("extraError", {message: "server is offline."})
//     }
    
//     return (
//         <div>
//             <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid)}>
//                 <input {...register("Email", {required: "Email is required.", pattern: {value: /^[A-Za-z0-9._%+-]+@gmail.com$/, message: "Only @gmail.com is allowed."} })} placeholder="Email" />
//                 <span>{errors?.Email?.message}</span>
//                 <input {...register("FirstName", {required: "First name is required.", validate: (value) => value.includes("aa") ? "aa not allowed" : true})} placeholder="First Name" />
//                 <span>{errors?.FirstName?.message}</span>
//                 <input {...register("LastName", {required: "Last name is required."})} placeholder="Last Name" />
//                 <span>{errors?.LastName?.message}</span>
//                 <input {...register("UserName", {required: "User name is required.", minLength: {value: 4, message: "User name should be longer than 4."}})} placeholder="User Name" />
//                 <span>{errors?.UserName?.message}</span>
//                 <input {...register("Password", {required: "Password is required.", minLength: {value: 4, message: "Password should be longer than 4."}})} placeholder="Password" />
//                 <span>{errors?.Password?.message}</span>
//                 <input {...register("RePassword", {required: "Re-password is required.", minLength: {value: 4, message: "Re-password should be longer than 4."}})} placeholder="Re-Password" />
//                 <span>{errors?.RePassword?.message}</span>
//                 <button>Add</button>
//                 <span>{errors?.extraError?.message}</span>
//             </form>
//         </div>
//     );
// }

export default ToDoList;