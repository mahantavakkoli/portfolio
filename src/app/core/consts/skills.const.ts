import { Skill } from '../interfaces/skill.interface';
import { Category, SkillCategory } from '../types/category.type';

export const SKILLS: Array<Skill> = [
  { name: 'Kotlin', categories: [SkillCategory.language, SkillCategory.android], color: 'bg-violet-500' },
  { name: 'Java', categories: [SkillCategory.language, SkillCategory.android], color: 'bg-orange-500' },
  { name: 'TailwindCSS', categories: [SkillCategory.frontEnd], color: 'bg-sky-500' },
  { name: 'HTML', categories: [SkillCategory.frontEnd], color: 'bg-red-500' },
  { name: 'Compose', categories: [SkillCategory.framework, SkillCategory.android], color: 'bg-emerald-500' },
  { name: 'React JS', categories: [SkillCategory.framework, SkillCategory.frontEnd], color: 'bg-cyan-500' },
  { name: 'PHP', categories: [SkillCategory.language, SkillCategory.backEnd], color: 'bg-indigo-500' },
  { name: 'TypeScript', categories: [SkillCategory.language, SkillCategory.frontEnd], color: 'bg-blue-500' },
  { name: 'JavaScript', categories: [SkillCategory.language, SkillCategory.frontEnd], color: 'bg-yellow-500' },
  { name: 'Docker', categories: [SkillCategory.tools, SkillCategory.backEnd], color: 'bg-blue-500' },
  { name: 'CSS', categories: [SkillCategory.frontEnd], color: 'bg-purple-500' },
  { name: 'Git', categories: [SkillCategory.tools], color: 'bg-orange-500' },
  { name: 'SCSS', categories: [SkillCategory.frontEnd], color: 'bg-pink-500' },
  { name: 'Laravel', categories: [SkillCategory.framework, SkillCategory.backEnd], color: 'bg-red-500' },
  { name: 'SQL', categories: [SkillCategory.backEnd], color: 'bg-teal-500' },
];

export const CATEGORIES: Array<{ key: Category; labelKey: string }> = [
  { key: SkillCategory.all, labelKey: 'ALL' },
  { key: SkillCategory.tools, labelKey: 'TOOLS' },
  { key: SkillCategory.frontEnd, labelKey: 'FRONT_END' },
  { key: SkillCategory.framework, labelKey: 'FRAMEWORK' },
  { key: SkillCategory.language, labelKey: 'LANGUAGE' },
  { key: SkillCategory.android, labelKey: 'ANDROID' },
  { key: SkillCategory.backEnd, labelKey: 'BACK_END' },
];
