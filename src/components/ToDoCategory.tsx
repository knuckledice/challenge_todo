import { useRecoilValue, useRecoilState } from "recoil";
import { IToDo, toDoListState, Categories, customCategories } from "../atoms";

function ToDoCategory({ id }: IToDo) {
    const [toDoList, setToDoList] = useRecoilState(toDoListState);
    const category = (() => {
        for (const toDo of toDoList) {
            if (toDo.id === id) {
                return toDo.category;
            }
        }
    })();
    
    const changeCategory = (newCategory: IToDo["category"]) => {
        setToDoList((prev) => {
            const targetIndex = prev.findIndex((prev) => prev.id === id);
            return [...prev.slice(0, targetIndex), {id: prev[targetIndex].id, text: prev[targetIndex].text, category: newCategory}, ...prev.slice(targetIndex+1)]
        });
    }

    const customCats = useRecoilValue(customCategories);
    
    return (
        <>
        {customCats.map((cat, index) => category !== cat ? <button key={index} onClick={() => changeCategory(cat)}>{cat}</button> : null)}
        {/* {category !== Categories.TODO ? <button onClick={() => changeCategory(Categories.TODO)}>{Categories.TODO}</button> : null}
        {category !== Categories.DOING ? <button onClick={() => changeCategory(Categories.DOING)}>{Categories.DOING}</button> : null}
        {category !== Categories.DONE ? <button onClick={() => changeCategory(Categories.DONE)}>{Categories.DONE}</button> : null} */}
        </>
    );
}

export default ToDoCategory;