import { atom, selector } from 'recoil';

export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export const newCategory = atom<string[]>({
  key: 'category',
  default: JSON.parse(localStorage.getItem('categories') as string) ?? [],
});

export const categoryState = atom<Categories>({
  key: 'categoryState',
  default: Categories.TO_DO,
});

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: JSON.parse(localStorage.getItem('todos') as string) ?? [],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const categories = get(newCategory);
    const category = get(categoryState);
    if (
      localStorage.getItem('hasCodeRunBefore') !== null ||
      localStorage.getItem('todos') === null ||
      localStorage.getItem('categories') === null
    ) {
      localStorage.setItem('hasCodeRunBefore', 'ok');
      localStorage.setItem('todos', JSON.stringify(toDos));
      localStorage.setItem('categories', JSON.stringify(categories));
    }
    return toDos.filter((toDo) => toDo.category === category);
  },
});
