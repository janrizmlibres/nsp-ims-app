<img src="logo.png" alt="XU-NSP logo" width="80" height="80">

# XU-NSP Information Management System

An information management system for the Night School Program of Xavier University - Ateneo de Cagayan. The program's staff tracked students, volunteers and classes in spreadsheets. This replaces them with one web app that holds that data, checks it as it's entered, and shows enrollment numbers on a dashboard. Staff only see the parts their permissions allow, and every change lands in an audit trail.

We built it as a team of six for a university course, with the Night School Program as our client. It was meant to run on the program's own Windows machines without an internet connection.

## What it covers

- **Dashboard.** Metrics from student data, such as enrollment trends and demographic breakdowns, filtered by year.
- **Students.** Add, view and update student records and their requirement status, and export them.
- **Enrollment.** Add, view and update enrollment records.
- **Volunteers.** Add, view and update student and professional volunteers, and export them.
- **Classes.** Each class has learning strands (subjects). In a strand, staff manage modules and learning activity sheets, student submissions, sessions and attendance, and grades. Classes also hold schedules and a student roster.
- **Configuration.** Define an academic term by its start and end dates, and the Grade School and Junior High School levels are created for it. Learning strands, student requirements and student categories are managed here too.
- **Users.** Add and edit staff accounts, passwords and permissions, see each user's last login, and export the list.
- **Audit trail.** Who did what, and when.

## Stack

- Frontend: Vue 3, Vite, Pinia, Vue Router, PrimeVue and Tailwind CSS
- Backend: Express with Sequelize on MariaDB, JWT auth and Swagger docs
- Docker Compose to run all three

## Running it

You need [Docker](https://www.docker.com/products/docker-desktop/).

```bash
git clone https://github.com/janrizmlibres/nsp-ims-app.git
cd nsp-ims-app
docker compose watch
```

That builds and starts MariaDB, the API and the frontend, and syncs your edits into the containers.

- The app is at <http://localhost:3000>.
- The API is at <http://localhost:8080>, with Swagger docs at <http://localhost:8080/api-docs>.

The backend rebuilds the database and fills it with sample data every time it starts, so nothing you enter survives a restart. Sign in with the seeded administrator, ID `91267` and password `rootpass`.

The backend's controller tests use Mocha, Chai and Sinon. Run `npx mocha --timeout 10000 tests` in `backend/`, since plain `npm test` looks in `test/`. The frontend has Vitest tests for login and terms in `frontend/tests/`.

## Authors

- **Nazib Dimal**, class management
- **Joy Etom**, configuration management
- **Clint Jonathan Galendez**, enrollment management and user authentication
- **Janriz Mathew Libres**, user management and audit trails
- **Carlos Roy Perez**, student information management
- **Xander Allen Rola**, data dashboard and volunteer information management

## License

Released under the CC0 1.0 Universal license. See [LICENSE](LICENSE).
