// data/nepaliBhasa/nepaliBhasa.js

export const years = ['All', '2025', '2024'];

/** Teachers list (ensure images exist in public/images/2025/NepaliBhasaClass/Teachers/) */
export const teachers = [
  { name: 'Sabitra Siwakoti', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Sabitra Siwakoti.JPG', role: 'Coordinator/Teacher' },
  { name: 'Medani P Sangroula', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Medani Sangroula.JPG' },
  { name: 'Indira Simkhada', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Indira Simkhada.JPG' },
  { name: 'Sunita Khanal Poudel', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Sunita Khanal.JPG' },
  { name: 'Rupa Bhandari', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Rupa Bhandari.JPG' },
  { name: 'Manisha Khatri', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Manisha Khatri.JPG' },
  { name: 'Jharana Sharma', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Jharna Sharma.JPG' },
  { name: 'Samjhana Khadka', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Samjhana Khadka Neupane.JPG' },
];

export const substitutes = [
  { name: 'Kedar Katel', img: '/images/2025/NepaliBhasaClass/Teachers/Volunteer - Kedar Katel.JPG' },
  { name: 'Ambika Phuyal', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Ambika Phuyal.JPG' },
  { name: 'Tanka Phuyal-Katel', img: '/images/2025/NepaliBhasaClass/Teachers/Volunteer -Tanka-Anu Phuyal.JPG' },
  { name: 'Kristina Dahal', img: '/images/2025/NepaliBhasaClass/Teachers/Volunteer - Kristina Dahal.JPG' },
  { name: 'Rajan Gouli', img: '/RajanGouli.jpg' },
  { name: 'Susmita Bhandari', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Susmita Bhandari.JPG' },
  { name: 'Shobha P Shrestha', img: '/images/2025/NepaliBhasaClass/Teachers/Volunteer - Shobha Pokharel Shrestha.JPG' },
  { name: 'Raveena KC', img: '' },
];

export const volunteers = [
  { name: 'Deepak Adhikari', img: '/images/2025/NepaliBhasaClass/Teachers/Volunteer - Deepak Adhikari.JPG' },
  { name: 'Ram Rai', img: '/images/2025/NepaliBhasaClass/Teachers/Volunteer - Ram K Rai.JPG' },
  { name: 'Rabin Sangraula', img: '/images/2025/NepaliBhasaClass/Teachers/Volunteer - Rabin Sangraula.JPG' }
];

/** Zoom schedules (keeps existing links) */
export const zoomSchedules = [
  { id: 'Beginners-Class', level: 'Beginning Class', day: 'Friday', time: '7:00 PM', 
    zoom: 'https://us02web.zoom.us/j/87251619528?pwd=CUIj42ratCCbKs901kXIGDi7xRfeS7.1' },
  { id: 'Advance-Class', level: 'Advance Class', day: 'Saturday', time: '9:00 AM', 
    zoom: 'https://us02web.zoom.us/j/85850067503?pwd=zEsTNKzhqknBRpCIJE0G8l2h74iy6X.1' },
  { id: 'Medium-High-Class', level: 'Medium High Class', day: 'Saturday', time: '9:00 AM', 
    zoom: 'https://us02web.zoom.us/j/81177770716?pwd=iEbWKh1T0P83VZz3bjM0blJTFb9hZV.1' },
  { id: 'Medium-Class', level: 'Medium Class', day: 'Sunday', time: '9:00 AM', 
    zoom: 'https://us02web.zoom.us/j/88390354400?pwd=h5AS7e0Bk6uXTCkZwtEfbknfEZUTcs.1' },
];

/** Landing cards (one card per class instance) */
export const classCards = [
{
  id: 'Beginners-Class',
  title: 'Beginning Class',
  schedule: '(Friday 7:00 - 8:00 PM)',  
  driveLink: 'https://drive.google.com/drive/folders/1pj67btay87y7gwu1gKq3wjLqr_s3gwea',
  attendanceLink: 'https://docs.google.com/spreadsheets/d/1NMtdxR4s_EqDX7H4R6bdVR5t4-0LI2_cMvJxTqhL7S4/edit?gid=186001220#gid=186001220',
  loginEmail: 'lins.teacher2@gmail.com',
  year: '2026',
  teachers: ['Samjhana Khadka', 'Jharana Sharma'],
  substitutes: [
    'Shobha Pokhrel Shrestha',
    'Raveena KC',
    'Anu Phuyal Katel'
  ],
  itSupport: [
    'Deepak Adhikari',
    'Rabin Sangraula'
  ],
  img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Jharna Sharma.JPG',
  tag: '🌈 Beginner'
},

{
  id: 'Advance-Class',
  title: 'Advance Class',
  schedule: '(Saturday 9:00 - 10:00 AM)',
  driveLink: 'https://drive.google.com/drive/folders/1N9mRzl_v92_musURYY_fyCtdFashe-8N',
  attendanceLink: 'https://docs.google.com/spreadsheets/d/1RIqm11cS4593z9y55zoD0fsuckXVF6FFmLE5PJsr4rU/edit?gid=186001220#gid=186001220',
  year: '2026',
  loginEmail: 'lins.teacher2@gmail.com',
  teachers: ['Medani P Sangroula', 'Sabitra Siwakoti'],
  substitutes: [
    'Kedar Katel',
    'Ambika Phuyal'
  ],
  img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Medani Sangroula.JPG',
  tag: '🚀 Advance'
},

{
  id: 'Medium-High-Class',
  title: 'Medium High Class',
  driveLink: 'https://drive.google.com/drive/folders/1NlpYEKY1jx5urd7RuYkMzA_KV_spCg-L',
  attendanceLink: 'https://docs.google.com/spreadsheets/d/1FuBZDi2oPbC8Ap9b2nnVRHt0_PCF8w-DRFSmALiWndg/edit?gid=186001220#gid=186001220',
  schedule: '(Saturday 9:00 - 10:00 AM))',
  year: '2026',
  loginEmail: 'lins.teacher1@gmail.com',
  teachers: ['Indira Simkhada', 'Sunita Khanal Poudel'],
  substitutes: [
    'Rajan Gouli',
    'Anu Phuyal Katel',
    'Kristina Dahal'
  ],
  img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Sunita Khanal.JPG',
  tag: '⭐ Mid High'
},

{
  id: 'Medium-Class',
  title: 'Medium Class',
  schedule: '(Sunday 9:00 - 10:00 AM)',
  driveLink: 'https://drive.google.com/drive/folders/1-pWFptg7_fIz200ckBKa6_ZJIoR7DPC8',
  attendanceLink: 'https://docs.google.com/spreadsheets/d/1-IkbUr6XDzRIJ3ocYcihr2WaV4T57fO8tbzP-m_lxfc/edit?gid=186001220#gid=186001220',
  year: '2026',
  loginEmail: 'lins.teacher2@gmail.com',
  teachers: ['Manisha Khatri', 'Rupa Bhandari'],
  substitutes: [
    'Anu Phuyal Katel',
    'Sushmita Bhandari'
  ],
  img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Rupa Bhandari.JPG',
  tag: '⭐ Mid'
}];

/** Detail pages keyed by id (students are placeholders) */
export const classDetails = {
    'Beginners-Class': {
    title: 'Beginning Class',
    schedule: '(Friday 7:00 - 8:00 PM)',
    driveLink: 'https://drive.google.com/drive/folders/1pj67btay87y7gwu1gKq3wjLqr_s3gwea',
    attendanceLink: 'https://docs.google.com/spreadsheets/d/1NMtdxR4s_EqDX7H4R6bdVR5t4-0LI2_cMvJxTqhL7S4/edit?gid=186001220#gid=186001220',
    loginEmail: 'lins.teacher2@gmail.com',
    teachers: [
      { name: 'Jharana Sharma', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Jharna Sharma.JPG', zoom: 'https://us02web.zoom.us/j/81539732054?pwd=tko5aPgflbaJ6TH39ouFHArs8skPJ3.1' },
      { name: 'Samjhana Khadka', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Samjhana Khadka Neupane.JPG', zoom: 'https://us02web.zoom.us/j/81539732054?pwd=tko5aPgflbaJ6TH39ouFHArs8skPJ3.1' },
    ],substitutes: [
    'Shobha Pokhrel Shrestha',
    'Raveena KC',
    'Anu Phuyal Katel'
  ],
    students: [
      'Aanvi Khanal',
      'Sunaira Pokharel',
      'Shalv Adhikari',
      'Abhishek Phulara',
      'Adhya Phulara',
      'Aarya Shrestha',
      'Sheniza Aryal',
      'Shirdi Bhattarai',
      'Sai Bhattarai',
      'Ishanvi Thapa',
      'Naavya Thapa'
    ],
    year: '2026',
  },
    'Advance-Class': {
    title: 'Advance Class',
    schedule: '(Saturday 9:00 - 10:00 AM)',
    driveLink: 'https://drive.google.com/drive/folders/1N9mRzl_v92_musURYY_fyCtdFashe-8N',
    attendanceLink: 'https://docs.google.com/spreadsheets/d/1RIqm11cS4593z9y55zoD0fsuckXVF6FFmLE5PJsr4rU/edit?gid=186001220#gid=186001220',
    loginEmail: 'lins.teacher2@gmail.com',
    teachers: [
      { name: 'Sabitra Siwakoti', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Sabitra Siwakoti.JPG', zoom: 'https://us02web.zoom.us/j/88274108499?pwd=Yw3u734qMEl34NVvMytCwsbFpyJ6d0.1' },
      { name: 'Medani P Sangroula', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Medani Sangroula.JPG', zoom: 'https://us02web.zoom.us/j/88274108499?pwd=Yw3u734qMEl34NVvMytCwsbFpyJ6d0.1' },
    ],
    substitutes: [
    'Kedar Katel',
    'Ambika Phuyal'
  ],
    students: [
      'Aarogya Sharma',
      'Aarav Khanal',
      'Adhira Siwakoti',
      'Agrima Kafle',
      'Ashwin Kafle',
      'Ayan Sangroula',
      'Diksha Sangraula',
      'Ramchandra Sangraula',
      'Sachin Katel',
      'Samriddi Baruwal',
      'Sulav Sangraula',
      'Sushanta Subedi',
      'Sabin Lamichhane'
    ],
    year: '2026',
  },
  'Medium-High-Class': {
    title: 'Medium High Class',
    schedule: '(Saturday 9:00 - 10:00 AM)',
    driveLink: 'https://drive.google.com/drive/folders/1NlpYEKY1jx5urd7RuYkMzA_KV_spCg-L',
    attendanceLink: 'https://docs.google.com/spreadsheets/d/1FuBZDi2oPbC8Ap9b2nnVRHt0_PCF8w-DRFSmALiWndg/edit?gid=186001220#gid=186001220',
    loginEmail: 'lins.teacher1@gmail.com',
    teachers: [
      { name: 'Sunita Khanal Poudel', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Sunita Khanal.JPG', zoom: 'https://us02web.zoom.us/j/81177770716?pwd=iEbWKh1T0P83VZz3bjM0blJTFb9hZV.1' },
      { name: 'Indira Simkhada', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Indira Simkhada.JPG', zoom: 'https://us02web.zoom.us/j/81177770716?pwd=iEbWKh1T0P83VZz3bjM0blJTFb9hZV.1' },
    ],
    substitutes: [
    'Rajan Gouli',
    'Anu Phuyal Katel',
    'Kristina Dahal'
  ],
    students: [
      'Reva Neupane',
      'Bibani Lamsal',
      'Ashraya Chapagain',
      'Adhira Siwakoti',
      'Riyan Chhetri',
      'Samiksha Kunwar',
      'Suraksha Ghimire',
      'Aarav Khanal',
      'Sugarika Karki'
    ],
    year: '2026',
  },
  'Medium-Class': {
    title: 'Medium Class',
    schedule: '(Sunday 9:00 - 10:00 AM)',
    driveLink: 'https://drive.google.com/drive/folders/1-pWFptg7_fIz200ckBKa6_ZJIoR7DPC8',
    attendanceLink: 'https://docs.google.com/spreadsheets/d/1-IkbUr6XDzRIJ3ocYcihr2WaV4T57fO8tbzP-m_lxfc/edit?gid=186001220#gid=186001220',
    loginEmail: 'lins.teacher2@gmail.com',
    teachers: [
      { name: 'Rupa Bhandari', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Rupa Bhandari.JPG', zoom: 'https://us02web.zoom.us/j/84930483234?pwd=wK8aM3xiFTUCt9CCHywmqR1k4bdNPs.1' },
      { name: 'Manisha Khatri', img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Manisha Khatri.JPG', zoom: 'https://us02web.zoom.us/j/84930483234?pwd=wK8aM3xiFTUCt9CCHywmqR1k4bdNPs.1' },
    ],
    substitutes: [
    'Anu Phuyal Katel',
    'Sushmita Bhandari'
  ],
     students: [
      'Dipson Ghimire',
      'Jayden Maharjan',
      'Sashriti Maharjan',
      'Samragyee Maharjan',
      'Dev Sangraula',
      'Biban Lamsal',
      'Shanav Dangol',
      'Shania Dangol',
      'Yuvan Bikram Chand',
      'Shanvi Yadav',
      'Anannya Bhatta',
      'Raj Dhakal',
      'Prisha Dhakal',
      'Amod Dhakal',
      'Prinsha Parajuli',
      'Shopie Shrestha'
    ],
    year: '2026',
  }  

};

export const galleryByYear = {
  '2023': [
    '/images/2023/NepaliBhasaClass/Graduation (1).jpg',
    '/images/2023/NepaliBhasaClass/Graduation (2).jpg',
    '/images/2023/NepaliBhasaClass/Graduation (3).jpg',
    '/images/2023/NepaliBhasaClass/Graduation 1 (1).jpg',
    '/images/2023/NepaliBhasaClass/Graduation 1 (2).jpg',
    '/images/2023/NepaliBhasaClass/Graduation 1 (3).jpg',
    '/images/2023/NepaliBhasaClass/Graduation 1 (4).jpg',
    '/images/2023/NepaliBhasaClass/Graduation 1 (5).jpg',
    '/images/2023/NepaliBhasaClass/Graduation 1 (6).jpg',
    '/images/2023/NepaliBhasaClass/Graduation 1 (7).jpg',
    '/images/2023/NepaliBhasaClass/Graduation 1 (8).jpg',
    '/images/2023/NepaliBhasaClass/Graduation 1 (9).jpg',
    '/images/2023/NepaliBhasaClass/Graduation 1 (10).jpg'

  ],
  '2024': [
    '/images/2024/NepaliBhasaClass/2024 (1).jpeg',
    '/images/2024/NepaliBhasaClass/2024 (2).jpeg',
    '/images/2024/NepaliBhasaClass/2024 (3).jpeg',
    '/images/2024/NepaliBhasaClass/2024 (4).jpeg',
    '/images/2024/NepaliBhasaClass/2024 (5).jpeg',
    '/images/2024/NepaliBhasaClass/2024 (6).jpeg',
    '/images/2024/NepaliBhasaClass/2024 (7).jpeg',
    '/images/2024/NepaliBhasaClass/2024 (8).jpeg',
    '/images/2024/NepaliBhasaClass/2024 (9).jpeg',
    '/images/2024/NepaliBhasaClass/2024 (10).jpeg',
    '/images/2024/NepaliBhasaClass/2024 (11).jpeg',
    '/images/2024/NepaliBhasaClass/2024 (12).jpeg'

  ],
  '2025': [
    '/images/2025/Graduation2025/Flyer1.jpg',
    '/images/2025/Graduation2025/flyer2.jpg',
    '/images/2025/Graduation2025/1.jpg',
    //'/images/2025/Graduation2025/2.jpg',
    '/images/2025/Graduation2025/3.jpg',
    '/images/2025/Graduation2025/4.jpg',
    '/images/2025/Graduation2025/5.jpg',
    '/images/2025/Graduation2025/6.jpg',
    '/images/2025/Graduation2025/7.jpg',
    '/images/2025/Graduation2025/8.jpg',
    '/images/2025/Graduation2025/9.jpg',
    '/images/2025/Graduation2025/10.jpg',
    '/images/2025/Graduation2025/11.jpg',
    '/images/2025/Graduation2025/12.jpg',
    '/images/2025/Graduation2025/13.jpg',
    '/images/2025/Graduation2025/14.jpg',
    '/images/2025/Graduation2025/15.jpg',
    '/images/2025/Graduation2025/16.jpg',
  ]
};
