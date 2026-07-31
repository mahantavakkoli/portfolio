export enum SkillCategory {
  all = 'all',
  tools = 'tools',
  frontEnd = 'front-end',
  framework = 'framework',
  language = 'language',
  android = 'android',
  backEnd = 'back-end',
}

export type Category =
  | SkillCategory.all
  | SkillCategory.tools
  | SkillCategory.frontEnd
  | SkillCategory.framework
  | SkillCategory.language
  | SkillCategory.android
  | SkillCategory.backEnd;
