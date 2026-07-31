import { Category, SkillCategory } from '../types/category.type';
import { Language } from '../types/lang.type';

export interface ProfileData {
  name: string;
  hero: {
    greeting: string;
    tagline: string;
    title: string;
    description: string;
    subDescription: string;
  };
  info: {
    job: string;
    location: string;
    experience: string;
  };
  personal: {
    age: string;
    ageSuffix: string;
    education: string;
  };
  skills: Array<{
    name: string;
    categories: Array<Category>;
    color: string;
  }>;
  categories: Array<{ key: Category; label: string }>;
  projects: Array<{
    key: string;
    name: string;
    description: string;
    tag: string;
    icon: string;
    accent: string;
  }>;
  contactLinks: Array<{
    key: string;
    href: string;
    handle: string;
    label: string;
    icon: string;
  }>;
  spokenLanguages: Array<{
    key: string;
    name: string;
    level: string;
    flag: string;
  }>;
}

export const PROFILE_DATA: Record<Language, ProfileData> = {
  en: {
    name: 'Mahan Tavakkoli',
    hero: {
      greeting: "Hello, I'm",
      tagline:
        'I craft fast, modern web experiences with Angular — clean code, smooth interactions, and pixel-perfect detail.',
      title: 'Angular Developer',
      description:
        'I’m a front-end developer with a strong passion for building modern, user-friendly applications. I’ve worked on a variety of projects, especially in fintech, crypto, and mini-apps, and I always aim to deliver a clean, optimized implementation alongside a smooth user experience.',
      subDescription:
        'I care a lot about continuous learning and staying up to date with new technologies, and I’m always looking for ways to improve the quality of my work. I enjoy working in teams, solving problems, and coming up with creative solutions, and I try to make a positive impact on every project I’m part of.',
    },
    info: {
      job: 'Developer',
      location: 'Iran',
      experience: '5 years',
    },
    personal: {
      age: '33',
      ageSuffix: 'years old',
      education: 'Computer Engineering',
    },
    skills: [
      {
        name: 'Kotlin',
        categories: [SkillCategory.language, SkillCategory.android],
        color: 'bg-violet-500',
      },
      {
        name: 'Java',
        categories: [SkillCategory.language, SkillCategory.android],
        color: 'bg-orange-500',
      },
      { name: 'TailwindCSS', categories: [SkillCategory.frontEnd], color: 'bg-sky-500' },
      { name: 'HTML', categories: [SkillCategory.frontEnd], color: 'bg-red-500' },
      {
        name: 'Compose',
        categories: [SkillCategory.framework, SkillCategory.android],
        color: 'bg-emerald-500',
      },
      {
        name: 'React JS',
        categories: [SkillCategory.framework, SkillCategory.frontEnd],
        color: 'bg-cyan-500',
      },
      {
        name: 'PHP',
        categories: [SkillCategory.language, SkillCategory.backEnd],
        color: 'bg-indigo-500',
      },
      {
        name: 'TypeScript',
        categories: [SkillCategory.language, SkillCategory.frontEnd],
        color: 'bg-blue-500',
      },
      {
        name: 'JavaScript',
        categories: [SkillCategory.language, SkillCategory.frontEnd],
        color: 'bg-yellow-500',
      },
      {
        name: 'Docker',
        categories: [SkillCategory.tools, SkillCategory.backEnd],
        color: 'bg-blue-500',
      },
      { name: 'CSS', categories: [SkillCategory.frontEnd], color: 'bg-purple-500' },
      { name: 'Git', categories: [SkillCategory.tools], color: 'bg-orange-500' },
      { name: 'SCSS', categories: [SkillCategory.frontEnd], color: 'bg-pink-500' },
      {
        name: 'Laravel',
        categories: [SkillCategory.framework, SkillCategory.backEnd],
        color: 'bg-red-500',
      },
      { name: 'SQL', categories: [SkillCategory.backEnd], color: 'bg-teal-500' },
    ],
    categories: [
      { key: SkillCategory.all, label: 'All' },
      { key: SkillCategory.tools, label: 'Tools' },
      { key: SkillCategory.frontEnd, label: 'Front-end' },
      { key: SkillCategory.framework, label: 'Framework' },
      { key: SkillCategory.language, label: 'Language' },
      { key: SkillCategory.android, label: 'Android' },
      { key: SkillCategory.backEnd, label: 'Back-end' },
    ],
    projects: [
      {
        key: 'SA',
        name: 'Sample Application',
        description: 'A sample android application',
        tag: 'Application',
        icon: 'download',
        accent: 'from-sky-500 to-indigo-500',
      },
      {
        key: 'GS',
        name: 'Giftcard Store',
        description: 'Digital Giftcard Store',
        tag: 'Website',
        icon: 'gift',
        accent: 'from-rose-500 to-orange-500',
      },
      {
        key: 'CR',
        name: 'Code Review',
        description: 'Easy Code Review Tool',
        tag: 'Library',
        icon: 'bug',
        accent: 'from-emerald-500 to-teal-500',
      },
      // {
      //   key: 'DEBUGBOARD_IDEA',
      //   name: 'Debug Board Idea',
      //   description: 'DebugBoard plugin for IntelliJ IDEA',
      //   tag: 'Plugin',
      //   icon: 'puzzle',
      //   accent: 'from-violet-500 to-fuchsia-500',
      // },
      // {
      //   key: 'KOTLIN_VALIDATOR',
      //   name: 'Kotlin Validator',
      //   description: 'Easily validate your forms and inputs',
      //   tag: 'Library',
      //   icon: 'check',
      //   accent: 'from-amber-500 to-red-500',
      // },
    ],
    contactLinks: [
      {
        key: 'TELEGRAM',
        href: 'https://t.me/MahanTavakkoli',
        handle: '@MahanTavakkoli',
        label: 'Telegram',
        icon: 'telegram',
      },
      {
        key: 'GITHUB',
        href: 'https://github.com/mahantavakkoli',
        handle: 'mahantavakkoli',
        label: 'GitHub',
        icon: 'github',
      },
      // {
      //   key: 'INSTAGRAM',
      //   href: 'https://www.instagram.com/MahanTavakkoli',
      //   handle: '@MahanTavakkoli',
      //   label: 'Instagram',
      //   icon: 'instagram',
      // },
      {
        key: 'PHONE',
        href: 'tel:+989351703737',
        handle: '+98 935 170 3737',
        label: 'Phone',
        icon: 'phone',
      },
      {
        key: 'EMAIL',
        href: 'mailto:mahantavakkoli72@gmail.com',
        handle: 'mahantavakkoli72@gmail.com',
        label: 'Email',
        icon: 'mail',
      },
    ],
    spokenLanguages: [
      { key: 'fa', name: 'Persian', level: 'Native', flag: '🇮🇷' },
      { key: 'en', name: 'English', level: 'Advanced', flag: '🇬🇧' },
    ],
  },
  fa: {
    name: 'ماهان توکلی',
    hero: {
      greeting: 'من',
      tagline:
        'با انگیولار تجربه‌های وب مدرن و سریع می‌سازم — کد تمیز، تعاملات روان و جزئیات بی‌نقص.',
      title: 'توسعه‌دهنده انگیولار',
      description:
        'من یک توسعه‌دهنده فرانت‌اند هستم که به ساخت اپلیکیشن‌های مدرن و کاربرپسند علاقه زیادی دارم. تجربه کار روی پروژه‌های مختلف، به‌ویژه در حوزه فین‌تک و بلاکچین و مینی‌اپ‌ها رو داشتم و سعی می‌کنم همیشه بهترین تجربه کاربری رو در کنار یک پیاده‌سازی تمیز و بهینه ارائه بدم.',
      subDescription:
        'یادگیری مداوم و به‌روز بودن با تکنولوژی‌های جدید برام خیلی مهمه و همیشه دنبال اینم که کیفیت کارم رو بهتر کنم. در کنار کار تیمی، به حل مسئله و پیدا کردن راه‌حل‌های خلاقانه علاقه دارم و سعی می‌کنم در هر پروژه‌ای تأثیر مثبتی داشته باشم.',
    },
    info: {
      job: 'برنامه‌نویس',
      location: 'ایران',
      experience: '5 سال',
    },
    personal: {
      age: '33',
      ageSuffix: 'سال',
      education: 'مهندسی کامپیوتر',
    },
    skills: [
      {
        name: 'Kotlin',
        categories: [SkillCategory.language, SkillCategory.android],
        color: 'bg-violet-500',
      },
      {
        name: 'Java',
        categories: [SkillCategory.language, SkillCategory.android],
        color: 'bg-orange-500',
      },
      { name: 'TailwindCSS', categories: [SkillCategory.frontEnd], color: 'bg-sky-500' },
      { name: 'HTML', categories: [SkillCategory.frontEnd], color: 'bg-red-500' },
      {
        name: 'Compose',
        categories: [SkillCategory.framework, SkillCategory.android],
        color: 'bg-emerald-500',
      },
      {
        name: 'React JS',
        categories: [SkillCategory.framework, SkillCategory.frontEnd],
        color: 'bg-cyan-500',
      },
      {
        name: 'PHP',
        categories: [SkillCategory.language, SkillCategory.backEnd],
        color: 'bg-indigo-500',
      },
      {
        name: 'TypeScript',
        categories: [SkillCategory.language, SkillCategory.frontEnd],
        color: 'bg-blue-500',
      },
      {
        name: 'JavaScript',
        categories: [SkillCategory.language, SkillCategory.frontEnd],
        color: 'bg-yellow-500',
      },
      {
        name: 'Docker',
        categories: [SkillCategory.tools, SkillCategory.backEnd],
        color: 'bg-blue-500',
      },
      { name: 'CSS', categories: [SkillCategory.frontEnd], color: 'bg-purple-500' },
      { name: 'Git', categories: [SkillCategory.tools], color: 'bg-orange-500' },
      { name: 'SCSS', categories: [SkillCategory.frontEnd], color: 'bg-pink-500' },
      {
        name: 'Laravel',
        categories: [SkillCategory.framework, SkillCategory.backEnd],
        color: 'bg-red-500',
      },
      { name: 'SQL', categories: [SkillCategory.backEnd], color: 'bg-teal-500' },
    ],
    categories: [
      { key: SkillCategory.all, label: 'همه' },
      { key: SkillCategory.tools, label: 'ابزارها' },
      { key: SkillCategory.frontEnd, label: 'فرانت‌اند' },
      { key: SkillCategory.framework, label: 'فریم‌ورک' },
      { key: SkillCategory.language, label: 'زبان' },
      { key: SkillCategory.android, label: 'اندروید' },
      { key: SkillCategory.backEnd, label: 'بک‌اند' },
    ],
    projects: [
      {
        key: 'SA',
        name: 'نرم افزار نمونه',
        description: 'یک نمونه نرم‌افزار اندرویدی',
        tag: 'اپلیکیشن',
        icon: 'download',
        accent: 'from-sky-500 to-indigo-500',
      },
      {
        key: 'GS',
        name: 'فروش گیفت کارت‌',
        description: 'فروشگاه فروش گیفت کارت‌های دیجیتال',
        tag: 'وبسایت',
        icon: 'gift',
        accent: 'from-rose-500 to-orange-500',
      },
      {
        key: 'CR',
        name: 'کدخوان',
        description: 'ابزار خواندن دستورات کد',
        tag: 'لایبرری',
        icon: 'bug',
        accent: 'from-emerald-500 to-teal-500',
      },
      // {
      //   key: 'DEBUGBOARD_IDEA',
      //   name: 'دباگ برد آیدیا',
      //   description: 'پنل دباگ‌برد برای بستر Intellij Idea',
      //   tag: 'پلاگین',
      //   icon: 'puzzle',
      //   accent: 'from-violet-500 to-fuchsia-500',
      // },
      // {
      //   key: 'KOTLIN_VALIDATOR',
      //   name: 'کاتلین ویلیدیتور',
      //   description: 'فرم‌ها و ورودی‌های خود را با آسانی اعتبارسنجی کنید',
      //   tag: 'لایبرری',
      //   icon: 'check',
      //   accent: 'from-amber-500 to-red-500',
      // },
    ],
    contactLinks: [
      {
        key: 'TELEGRAM',
        href: 'https://t.me/MahanTavakkoli',
        handle: '@MahanTavakkoli',
        label: 'تلگرام',
        icon: 'telegram',
      },
      {
        key: 'GITHUB',
        href: 'https://github.com/mahantavakkoli',
        handle: 'mahantavakkoli',
        label: 'گیت‌هاب',
        icon: 'github',
      },
      // {
      //   key: 'INSTAGRAM',
      //   href: 'https://www.instagram.com/MahanTavakkoli',
      //   handle: '@MahanTavakkoli',
      //   label: 'اینستاگرام',
      //   icon: 'instagram',
      // },
      {
        key: 'PHONE',
        href: 'tel:+989351703737',
        handle: '+98 935 170 3737',
        label: 'تلفن',
        icon: 'phone',
      },
      {
        key: 'EMAIL',
        href: 'mailto:mahantavakkoli72@gmail.com',
        handle: 'mahantavakkoli72@gmail.com',
        label: 'ایمیل',
        icon: 'mail',
      },
    ],
    spokenLanguages: [
      { key: 'fa', name: 'فارسی', level: 'مادری', flag: '🇮🇷' },
      { key: 'en', name: 'انگلیسی', level: 'پیشرفته', flag: '🇬🇧' },
    ],
  },
};
