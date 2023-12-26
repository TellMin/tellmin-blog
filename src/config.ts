import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://tellmin.net/", // replace this with your deployed domain
  author: "TellMin",
  desc: "TellMin's blog.",
  title: "TellMIn",
  // TODO: add your own ogImage
  // ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOCALE = {
  lang: "ja", // html lang code. Set this empty and default will be "en"
  langTag: ["ja-JP"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/TellMin",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
];
