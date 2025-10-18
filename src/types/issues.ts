// src/data/issues.ts

export type Issue = {
  id: number;
  issueNumber: string;
  title: string;
  link: string;
  imageUrl: string;
};

export const ISSUE_DATA: Issue[] = [
  {
    id: 1,
    issueNumber: '০১',
    title: 'ডাইনিং-এ ভর্তুকি আদায়',
    link: '/issues/1',
    imageUrl: '/path/to/logo.png',
  },
  {
    id: 2,
    issueNumber: '০২',
    title: 'হলগুলোতে ডাইনিং-ক্যাফেটেরিয়া',
    link: '/issues/2',
    imageUrl: '/path/to/logo.png',
  },
  {
    id: 3,
    issueNumber: '০৩',
    title: 'মেসে গ্যাস ও বিদ্যুৎ বিল',
    link: '/issues/3',
    imageUrl: '/path/to/logo.png',
  },
  {
    id: 4,
    issueNumber: '০৪',
    title: 'রুম সংকট ও ডাবল সিট',
    link: '/issues/4',
    imageUrl: '/path/to/logo.png',
  },
  {
    id: 5,
    issueNumber: '০৫',
    title: 'শিক্ষাখাতে বাজেট',
    link: '/issues/5',
    imageUrl: '/path/to/logo.png',
  },
  {
    id: 6,
    issueNumber: '০৬',
    title: 'শিক্ষার্থীদের রাজনৈতিক অধিকার',
    link: '/issues/6',
    imageUrl: '/path/to/logo.png',
  },
];