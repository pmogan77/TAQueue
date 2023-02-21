Todo: 
 - [ ] add about page link
 - [ ] add user fields to login/signup
 - [ ] add sms possibility
 - [ ] clean up database every year
 - [ ] forget password automation

Future Features
 - [ ] email
   - [ ] used for password resettig, login/signup
 - [ ] Next.js
 - [ ] minor bug fixes/UI changes?
 - [ ] seperate accounts for TAs/professors
 - [ ] implement better logging
 - [ ] implement Aria Labels
 - [ ] React Query for live reloading data w/ useQuery
 - [ ] HTTPS with nginx
 - [ ] research if there is a way to configure service # within docker-compose.yml

# Instructions to Run

## 1. Install [Docker](https://www.docker.com/products/docker-desktop/)


## 2. Clone the repository

```bash
git clone https://github.com/pmogan77/TAQueue.git
```

## 3. Run Docker Compose in the root directory

```bash
docker-compose up
```

You may specify the `-d` flag to run the containers in the background.

You may specify the '--scale' flag to run multiple containers for the web app.
 - frontend: `--scale frontend=2`
 - backend: `--scale backend=2`

```bash
docker-compose up -d --scale frontend=2 --scale backend=2
```

## 4. Open the app in your browser

```bash
http://localhost:80
```
