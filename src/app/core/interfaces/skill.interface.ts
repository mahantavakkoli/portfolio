import { Category } from '../types/category.type';

export interface Skill {
  name: string;
  categories: Array<Category>;
  color: string;
}
