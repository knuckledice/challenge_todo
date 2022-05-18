import { useForm } from "react-hook-form";
import { IToDo, toDoListState } from "../atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

interface IForm {
    toDoText: string,
}

function ToDoText({ id }: IToDo) {
    const [ toDoList, setToDoList ] = useRecoilState(toDoListState);
    const targetIndex = toDoList.findIndex((toDo) => toDo.id === id);
    const { register, handleSubmit, setValue, formState: { errors }, watch} = useForm<IForm>();
    useEffect(() => {
        setValue("toDoText", toDoList[targetIndex].text);
    }, []);
    
    const handleValid = ({toDoText}: IForm) => {
        setToDoList((prev) => prev.map((toDo) => toDo.id === id ? {id: toDo.id, text: toDoText, category: toDo.category} : toDo));
    }
    const onChange = () => setValue("toDoText", watch("toDoText"));
    
    return (
        <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDoText", {required: "To-Do is required", onChange: onChange})} />
            <span>{errors.toDoText?.message}</span>
        </form>
    );
}

export default ToDoText;