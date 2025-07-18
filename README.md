Чтобы собрать проект нужно скачать его в какую-нибудь папку из GitHub, прописать npm install в консоли или терминале в WebStorm, чтобы установились все зависимости.
Далее нужно зайти в файл ваша папка/package.json и там запустить билды или же прописать эти команды:
"build:builder": "npm run --workspace=@app/builder build",
"build:kit:dev": "npm run --workspace=@app/kit build:dev",
"build:front-modules:dev": "npm run --workspace=@app/front-modules build:dev",
"build:ui:dev": "npm run --workspace=@app/ui build:dev",

Далее можно запустить проект нужно в этом же файле запустить
"dev:frontend": "npm run --workspace=@app/frontend run:dev -- --host 0.0.0.0",
