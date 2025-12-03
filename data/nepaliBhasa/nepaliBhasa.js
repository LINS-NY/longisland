// data/nepaliBhasa/nepaliBhasa.js

export const years = ['All', '2025','2024' ];

/** Teachers list (ensure images exist in public/images/2025/NepaliBhasaClass/Teachers/) */
export const teachers = [
  { name: 'Sabitra Sikawoti', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Sabitra Siwakoti.JPG', role: 'Coordinator' },
  { name: 'Indira Simkhada', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Indira Simkhada.JPG',},
  { name:'Ambika Phuyal', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Ambika Phuyal.JPG',},
  { name: 'Sunita Khanal Poudel', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Sunita Khanal.JPG',},
  { name: 'Susmita Bhandari', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Susmita Bhandari.JPG',},
  { name: 'Jharana Sharma', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Jharna Sharma.JPG',},
  { name: 'Samjhana Khadka', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Samjhana Khadka Neupane.JPG',},
  { name: 'Medani P Sangroula', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Medani Sangroula.JPG',},
  { name: 'Rupa Bhandari', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Rupa Bhandari.JPG',},
];

export const volunteers = [
  { name: 'Shobha P Shrestha', img: '/images/2025/NepaliBhasaClass/Teachers/Volunteer - Shobha Pokharel Shrestha.JPG',},
  { name: 'Deepak Adhikari', img: '/images/2025/NepaliBhasaClass/Teachers/Volunteer - Deepak Adhikari.JPG',},
  { name:'Bimala Dangi', img: '/images/2025/NepaliBhasaClass/Teachers/Volunteer - Bimala Dangi.JPG',},
  { name:'Kristina Dahal', img: '/images/2025/NepaliBhasaClass/Teachers/Volunteer - Kristina Dahal.JPG',},
  { name:'Tanka Phuyal-Katel', img: '/images/2025/NepaliBhasaClass/Teachers/Volunteer -Tanka-Anu Phuyal.JPG',},
  { name:'Kedar Katel', img: '/images/2025/NepaliBhasaClass/Teachers/Volunteer - Kedar Katel.JPG',},
  { name:'Ram Rai', img: '/images/2025/NepaliBhasaClass/Teachers/Volunteer - Ram K Rai.JPG',},
];


/** Zoom schedules (keeps existing links) */
export const zoomSchedules = [
  { id: 'mid-sun-9', level: 'Mid-Level Class', day: 'Sunday', time: '9:00 AM', zoom: 'https://us02web.zoom.us/j/85799401494?pwd=tEt94H9k0lUyyuXcA4ZJKp9EwEpp4S.1' },
  { id: 'beg-sun-1015', level: 'Beginning Class (Sunday)', day: 'Sunday', time: '10:15 AM', zoom: 'https://us02web.zoom.us/j/89516727221?pwd=Uq1F4wu0oxnb48QYag5xgqfkLQoj3a.1' },
  { id: 'beg-sat-1015', level: 'Beginning Class (Saturday)', day: 'Saturday', time: '10:15 AM', zoom: 'https://us02web.zoom.us/j/89516727221?pwd=Uq1F4wu0oxnb48QYag5xgqfkLQoj3a.1' },
  { id: 'advance-a-9', level: 'Advance Class - Section A', day: 'Saturday', time: '9:00 AM', zoom: 'https://us02web.zoom.us/j/89516727221?pwd=Uq1F4wu0oxnb48QYag5xgqfkLQoj3a.1' },
];

/** Landing cards (one card per class instance) */
export const classCards = [
  { id: 'mid-sun-9', title: 'Mid-Level Class', year: '2025', teachers: ['Sunita Khanal Poudel','Rupa Bhandari'], img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Sunita Khanal.JPG', tag: '⭐ Mid' },
  { id: 'beg-sun-1015', title: 'Beginning Class (Sunday)', year: '2025', teachers: ['Indira Simkhada','Susmita Bhandari'], img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Indira Simkhada.JPG', tag: '🌈 Beginner' },
  { id: 'beg-sat-1015', title: 'Beginning Class (Saturday)', year: '2025', teachers: ['Jharana Sharma','Samjhana Khadka'], img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Jharna Sharma.JPG', tag: '🌈 Beginner' },
  { id: 'advance-a-9', title: 'Advance Class - Section A', year: '2025', teachers: ['Medani P Sangroula','Sabitra Sikawoti'], img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Medani Sangroula.JPG', tag: '🚀 Advance' },
];

/** Detail pages keyed by id (students are placeholders) */
export const classDetails = {
  'mid-sun-9': {
    title: 'Mid-Level Class',
    teachers: [
      { name: 'Sunita Khanal Poudel', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Sunita Khanal.JPG', zoom: 'https://us02web.zoom.us/j/85799401494?pwd=tEt94H9k0lUyyuXcA4ZJKp9EwEpp4S.1' },
      { name: 'Rupa Bhandari', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Rupa Bhandari.JPG', zoom: 'https://us02web.zoom.us/j/85799401494?pwd=tEt94H9k0lUyyuXcA4ZJKp9EwEpp4S.1' },
    ],
    students: ['Aarav Poudel',
                'Adhira Siwakoti',
                'Ashraya Chapagain',
                'Bibani Lamsal ',
                'Diya Chhetri',
                'Ishanvi Shree Thapa',
                'Naavya Shree Thapa',
                'Reva Neupane',
                'Riyan Chhetri',
                'Safal Deuba',
                'Samiksha Kunwar',
                'Sayan Jha',
                'Seanjay Manadhar',
                'Sofia Deuba',
                'Sugarika Karki'],
    year: '2025',
  },
  'beg-sun-1015': {
    title: 'Beginning Class (Sunday)',
    teachers: [
      { name: 'Indira Simkhada', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Indira Simkhada.JPG', zoom: 'https://us02web.zoom.us/j/89516727221?pwd=Uq1F4wu0oxnb48QYag5xgqfkLQoj3a.1' },
      { name: 'Susmita Bhandari', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Susmita Bhandari.JPG', zoom: 'https://us02web.zoom.us/j/89516727221?pwd=Uq1F4wu0oxnb48QYag5xgqfkLQoj3a.1' }
    ],
    students: ['Annanya Bhatta',
                'Biban Lamsal',
                'Dev Sangraula',
                'Divyesh Pandey',
                'Ishaani Jha',
                'Jayden Maharjan',
                'Prasika Maharjan',
                'Prinsha Parajuli',
                'Saaya Nair',
                'Sajan Nair',
                'Samragyee Maharjan',
                'Sashriti Maharjan',
                'Shalv Adhikari',
                'Shanav Dangol',
                'Shania Dangol',
                'Sunaira Pokharel',
                'Yampak Rai',
                'Yuvan Adhikari',
                'Yuvan Bikram Chand',
                'Zenaya Trivedi'],
    year: '2025',
  },
  'beg-sat-1015': {
    title: 'Beginning Class (Saturday)',
    teachers: [
      { name: 'Jharana Sharma', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Jharna Sharma.JPG', zoom: 'https://us02web.zoom.us/j/89516727221?pwd=Uq1F4wu0oxnb48QYag5xgqfkLQoj3a.1' },
      { name: 'Samjhana Khadka', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Samjhana Khadka Neupane.JPG', zoom: 'https://us02web.zoom.us/j/89516727221?pwd=Uq1F4wu0oxnb48QYag5xgqfkLQoj3a.1' },
    ],
    students: ['Aiden Shrestha',
                'Anannya Bhatta',
                'Amod Dhakal',
                'Anannya Bhatta',
                'Autumn Shrestha',
                'Niraj Maharjan',
                'Swornira Maharjan',
                'Dipson Ghimire',
                'Erica Khadka',
                'Janet Poudel',
                'Neepa Jan Kafle',
                'Prince Giri',
                'Prisha Dhakal',
                'Puja Nova Kafle',
                'Raj Dhakal',
                'Ryan Poudel',
                'Shyam Birbikram Sangraula',
                'Sora Gautam',
                'Sora Gautam'],
    year: '2025',
  },
  'advance-a-9': {
    title: 'Advance Class - Section A',
    teachers: [
      { name: 'Medani P Sangroula', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Medani Sangroula.JPG', zoom: 'https://us02web.zoom.us/j/89516727221?pwd=Uq1F4wu0oxnb48QYag5xgqfkLQoj3a.1' },
      { name: 'Sabitra Sikawoti', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Sabitra Siwakoti.JPG', zoom: 'https://us02web.zoom.us/j/89516727221?pwd=Uq1F4wu0oxnb48QYag5xgqfkLQoj3a.1' },
    ],
    students: ['Aarogya Sharma', 
                'Agrima Kafle',
                'Ashwin Kafle',
                'Ayan Sangroula',
                'Diksha Sangraula',
                'Ramchandra Sangraula',
                'Sachin Katel',
                'Samriddi Baruwal',
                'Sulav Sangraula',
                'Sushanta Subedi',
                'Taapas Poudel'],
    year: '2025',
  },
};
;
