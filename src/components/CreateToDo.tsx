import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue  } from "recoil";
import { IToDo, toDoListState, selectedCategoryState } from "../atoms";

interface IForm {
    toDo: string,
}

function CreateToDo() {
    const toDoList = useRecoilValue(toDoListState);
    const setToDoList = useSetRecoilState<IToDo[]>(toDoListState);
    const selectedCat = useRecoilValue(selectedCategoryState);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IForm>();
    const handleValid = ({ toDo }: IForm) => {
        setToDoList((prev) => [{id: Date.now(), text: toDo, category: selectedCat}, ...prev])
        setValue("toDo", "");
    }
    localStorage.setItem("savedToDo", JSON.stringify(toDoList));
    return (
        <form style={{display: "flex", flexDirection: "row"}} onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo", {required: "To-Do is required"})} placeholder="To-Do" />
            <span>{errors.toDo?.message}</span>
            <button>Add</button>
        </form>
    );

}

export default CreateToDo;