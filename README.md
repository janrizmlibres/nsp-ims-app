<br />
<div align="center">
  <a href="https://github.com/2302-CSCC22-A/groupCL/blob/develop/frontend/src">
    <img src="logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">XU-NSP Information Management System</h3>

  <p align="justify">
    Welcome to the Xavier University Night School Program Information Management System (XU-NSP IMS)! Our goal is to develop an efficient and comprehensive information management system tailored to the specific needs of Xavier University’s Night School Program staff and administrators. Our system addresses two key requirements: storing student, volunteer, staff and class related data, and providing intuitive metrics analysis based on student information while ensuring robust security measures and audit trail functionalities.
    <br />
    <br />
    The XU-NSPMS aims to streamline enrollment processes through a user-friendly interface, simplifying data entry and management compared to traditional spreadsheet methods. Our intuitive dashboard offers at-a-glance insights into enrollment trends, student distributions, and demographic breakdowns, enhancing decision-making capabilities for staff.
    <br />
    <br />
    To ensure data accuracy and integrity, the system implements input validation mechanisms, restricting users to inputting only valid data. Additionally, role-based access control guarantees that each staff member has appropriate permissions, enhancing security and confidentiality. The system also features search options, filters, and export capabilities, empowering users to efficiently access and manipulate necessary data.
    <br />
    <br />
    Technologically, the XU-NSP IMS leverages JavaScript, Vue.js, Tailwind CSS, and MariaDB, optimizing performance while maintaining compatibility with Windows-based environments. It operates entirely offline, meeting client requirements for local deployment without internet connectivity, and adheres to hardware constraints outlined by Xavier University’s Night School Program.
  </p>
</div>

## Features

| Features                         | Specifications                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| User Authentication              | Can log user into their account <br> Can extend user session                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Data Dashboard                   | Can display metrics based on student data <br> Can filter which year the student data metrics should be from                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Student Information Management   | Can add student data <br> Can view student data <br> Can update student data <br> Can update student’s requirement status <br> Can export data                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Enrollment Management            | Can add student enrollment data <br> Can update student enrollment data <br> Can view student enrollment data                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Volunteer Information Management | Can add volunteer data <br> Can update volunteer data <br> Can view volunteer data <br> Can export data                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Class Management                 | Can add modules/learning activity sheets in a learning strand <br> Can view lists of modules/learning activity sheets in a learning strand <br> Can update modules/learning activity sheets in a learning strand <br> Can delete modules/learning activity sheets <br> Can view lists of module submissions of Students in a learning strand <br> Can update student’s module submissions in a learning strand <br> Can add sessions in a learning strand <br> Can view lists of sessions in a learning strand <br> Can update a session in a learning strand <br> Can delete a session in a learning strand <br> Can view lists of attendances of students in a session of a learning strand <br> Can update attendances of students in a session of a learning strand <br> Can view student grades in a learning strand <br> Can update student grades in a learning strand <br> Can add a learning strand class schedule in a class <br> Can view lists of class schedules per learning strand of a class <br> Can update a class schedule of a class <br> Can delete class schedules of a class <br> Can view lists of students in a class <br> Can view a class profile of a student in a class |
| Configuration Management         | Can create an academic term by defining the start and end dates <br> Can automatically create class or levels (Grade School and Junior High School) in the defined academic term <br> Can automatically get the existing learning strands (subjects) per class <br> Can create a new learning strand (subject) <br> Can view a list of existing learning strands <br> Can edit the details of an existing learning strand (Code and Name) <br> Can delete a learning strand <br> Can create a new student requirement <br> Can view a list of existing student requirements <br> Can edit the details of an existing student requirement <br> Can delete a new student requirement <br> Can create a student category <br> Can view a list of existing student categories <br> Can edit the details of an existing student category <br> Can delete a student category                                                                                                                                                                                                                                                                                                                               |
| User Management                  | Can add user, including its password and permissions <br> Can view user records page <br> Can view user edit page <br> Can update user information <br> Can update staff permissions <br> Can update user password <br> Can track last login of user <br> Can export data <br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Audit Trails                     | Can view audit trails of user activities, displaying information such as the user’s name, the type of operation or activity, and the date and time of the activity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

|

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine. See deployment for notes on deploying
the project on a live system.

### Prerequisites

Requirements for the software and other tools to build

- [Docker](https://www.docker.com/products/docker-desktop/)

### Installing

A step by step series of examples that tell you how to get a development
environment running

1. Clone the repository to your local machine
2. Install Docker through the link provided
3. Navigate to frontend `cd front` and run `npm i` to install dependencies
4. Navigate to backend `cd ../backend` and run `npm i` to install dependencies
5. Run `docker-compose watch` to start the containers
6. Open your web browser and navigate to `http://localhost:8080` to access the system

## Deployment

Add additional notes to deploy this on a live system

## Built With

- [![Vue][Vue.js]][Vue-url]
- [![Express][Express.js]][Express-url]
- [![MariaDB][MariaDB]][MariaDB-url]
- [![Javascript][Javascript]][Javascript-url]
- [![TailwindCSS][TailwindCSS]][TailwindCSS-url]

## Versioning

We use [Semantic Versioning](http://semver.org/) for versioning. For the versions
available, see the [tags on this
repository](https://github.com/PurpleBooth/a-good-readme-template/tags).

## Authors

- **Dimal, Nazib** - Class Management Feature
- **Etom, Joy** - Configuration Management
- **Galendez, Clint Jonathan** - Enrollment Management & User Authentication
- **Libres, Janriz Mathew** - User Management & Audit Trails
- **Perez, Carlos Roy** - Student Information Management
- **Rola, Xander Allen** - Data Dashboard & Volunteer Information Management

## License

This project is licensed under the [CC0 1.0 Universal](LICENSE.md)
Creative Commons License

## Acknowledgments

- Hat tip to anyone whose code is used
- Inspiration
- etc

[Vue.js]: https://img.shields.io/badge/Vue.js-4FC08D?logo=vuedotjs&logoColor=fff
[Vue-url]: https://vuejs.org/
[TailwindCSS]: https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Javascript]: https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000
[Javascript-url]: https://javascript.info/
[Express.js]: https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[MariaDB]: https://img.shields.io/badge/MariaDB-003545?logo=mariadb&logoColor=white
[MariaDB-url]: https://mariadb.org/
