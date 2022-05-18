import { IToDo } from "../atoms"
import ToDoText from "./ToDoText";
import ToDoCategory from "./ToDoCategory";

function ToDo(toDo: IToDo) {
    const { id } = toDo;
    return (
        <li>
            <ToDoText {...toDo} />
            <ToDoCategory {...toDo} />
        </li>
    );
}

export default ToDo;