import { atom, selector } from "recoil";

export enum Categories {
    "TODO" = "TODO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}

export const customCategories = atom<string[]>({
    key: "customCategories",
    default: JSON.parse(localStorage.getItem("savedCategories") || '["TODO", "DOING", "DONE"]')
    // default: [Categories.TODO, Categories.DOING, Categories.DONE]
})

export interface IToDo {
    id: number,
    text: string,
    category: string,
}

export const toDoListState = atom<IToDo[]>({
    key: "toDoListState",
    default: JSON.parse(localStorage.getItem("savedToDo") || '[]')
})

export const selectedCategoryState = atom<string>({
    key: "selectedCategory",
    default: Categories.TODO,
});

export const toDoListByState = selector({
    key: "toDoListSelector",
    get: ({ get } ) => {
        const toDoList = get(toDoListState);
        const selectedCategory = get(selectedCategoryState);
        return toDoList.filter((toDo) => toDo.category === selectedCategory);
    },
});