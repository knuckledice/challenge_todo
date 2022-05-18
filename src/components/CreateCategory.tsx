import { useForm } from "react-hook-form";
import { customCategories } from "../atoms"
import { useRecoilValue, useSetRecoilState } from "recoil";

interface IForm {
    category: string,
}

function CreateCategory() {
    const customCats = useRecoilValue(customCategories);
    const setCustomCats = useSetRecoilState(customCategories);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IForm>();
    const handleValid = ({ category }: IForm) => {
        setCustomCats((prev) => [...prev, category]);
        setValue("category", "");
    }
    localStorage.setItem("savedCategories", JSON.stringify(customCats));
    return (
        <form style={{ display: "flex", flexDirection: "row" }} onSubmit={handleSubmit(handleValid)}>
            <input {...register("category", { required: "To-Do is required" })} placeholder="New Category" />
            <span>{errors.category?.message}</span>
            <button>Add</button>
        </form>
    );
}

export default CreateCategory;