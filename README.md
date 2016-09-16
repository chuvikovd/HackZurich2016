# Express Socket.js Angular 2 ToDo list
 
## Tutorial:
```
git clone
npm install
typings install
gulp
```

Gulp watches .ts files in /client and /server 
directories, and automatically restarts application 
and refreshes browser.

## To do:
- [x] Setup repo

Configure gulp:
- [x] Nodemon
- [x] Server compilation
- [x] Client (angular) compilation
- [ ] Configure SCSS compilation


- [x] Configure typings

### Typings
Typings folder is included to the repo, because ~~I'm noob~~ (yes).

Typings structure:

    .
    ├── typings                   # Typings folder
    │   ├── main                  # Typings for Backend
    │   ├── browser               # Typings for Frontend
    │   ├── main.d.ts             # File to include in backend
    │   ├── browser.d.ts          # File to include in frontend


To avoid duplicate identificators at compilation,
after installing new typing add it to main.d.ts or browser.d.ts.