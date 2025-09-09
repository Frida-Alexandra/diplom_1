# Дипломный проект профессии «Fullstack-разработчик на Python»

Сайт: http://89.111.155.117:3000/

---

### Backend

1. `git clone https://github.com/Frida-Alexandra/diplom_1.git`
2. Переходим в папку `backend`:\
   `cd backend`
3. Создаем виртуальное окружение:\
   `python -m venv venv`
4. Активируем виртуальное окружение:\
   `venv/Scripts/activate`
5. Устанавливаем зависимости:\
   `pip install -r requirements.txt`
6. В папке `backend` создаем файл `.env`
7. Создаем базу данных, с учетом настроек указанных в файле `.env`:\
   `createdb -U <DB_USER> <DB_NAME>`\
   Пароль: `<DB_PASSWORD>`
8. Применяем миграции:\
   `python manage.py migrate`
9. Создаем администратора (суперпользователя) с указанными в файле `.env` данными:\
   `python manage.py create_superuser`
10. Запускаем сервер:\
   `python manage.py runserver` (при DEBUG=True)\
   `python manage.py runserver --insecure` (при DEBUG=False)

### Настройка .env
```bash
SECRET_KEY=your_secret_key
DEBUG=True
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
ALLOWED_HOSTS=localhost,127.0.0.1,89.111.155.117
```
---

### Frontend

1.  `cd frontend`
2. В папке `frontend` создаем файл `.env` и указываем в нем базовый URL:\
   `VITE_BASE_URL=http://localhost:8000/api`
3. Устанавливаем зависимости:\
   `npm i`
4. Запускаем приложение:\
   `npm run dev`
5. Проверяем доступность сайта по адресу:\
   `http://localhost:3000`
6. Проверяем доступность сайта администратора по адресу:\
   `http://localhost:8000/admin/`

---

### Развёртывание проекта

1. Запускаем терминал и подключаемся к серверу:\
   `ssh root@<ip адрес сервера>`\
2. Создаем нового пользователя:\
   `adduser <ИМЯ ПОЛЬЗОВАТЕЛЯ>`
3. Добавляем созданного пользователя в группу `sudo`:\
   `usermod <ИМЯ ПОЛЬЗОВАТЕЛЯ> -aG sudo`
4. Выходим из под пользователя `root`:\
   `logout`
5. Подключаемся к серверу под новым пользователем:\
   `ssh <ИМЯ ПОЛЬЗОВАТЕЛЯ>@<IP АДРЕС СЕРВЕРА>`
6. Скачиваем обновления пакетов `apt`, чтобы пользоваться их актуальными релизами:\
   `sudo apt update`
7. Устанавливаем необходимые пакеты:\
   `sudo apt install python3-venv python3-pip postgresql nginx`
8. Заходим в панель `psql` под пользователем `postgres`:\
   `sudo -u postgres psql`
9. Задаем пароль для пользователя `postgres`:\
   `ALTER USER postgres WITH PASSWORD 'postgres';`
10. Создаем базу данных:\
   `CREATE DATABASE mycloud;`
11. Выходим из панели `psql`:\
    `\q`
12. Клонируем репозиторий:\
   `git clone https://github.com/Frida-Alexandra/diplom_1.git`
13. Переходим в папку проекта `backend`:\
   `cd /home/<ИМЯ ПОЛЬЗОВАТЕЛЯ>/diplom_1/backend`
14. Устанавливаем виртуальное окружение:\
   `python3 -m venv venv`
15. Активируем виртуальное окружение:\
   `source venv/bin/activate`
16. Устанавливаем зависимости:\
   `pip install -r requirements.txt`
17. В папке `backend` создаем файл `.env` 
   `nano .env`
18. Применяем миграции:\
   `python manage.py migrate`
19. Создаем администратора (суперпользователя):\
   `python manage.py create_superuser`
20. Собираем весь статичный контент в одной папке (`static`) на сервере:\
   `python manage.py collectstatic`
21. Запускаем сервер:\
   `python manage.py runserver 0.0.0.0:8000`
---
23. Проверяем работу `gunicorn`:\
   `gunicorn mycloud.wsgi -b 0.0.0.0:8000`
24. Создаем файл `gunicorn.socket`:\
   `sudo nano /etc/systemd/system/gunicorn.socket`

      ```
      [Unit]
      Description=gunicorn socket

      [Socket]
      ListenStream=/run/gunicorn.sock

      [Install]
      WantedBy=sockets.target
      ```
25. Создаем файл `gunicorn.service`:\
   `sudo nano /etc/systemd/system/gunicorn.service`

      ```
      [Unit]
      Description=gunicorn daemon
      Requires=gunicorn.socket
      After=network.target

      [Service]
      User=<ИМЯ ПОЛЬЗОВАТЕЛЯ>
      Group=www-data
      WorkingDirectory=/home/<ИМЯ ПОЛЬЗОВАТЕЛЯ>/diplom_1/backend
      ExecStart=/home/<ИМЯ ПОЛЬЗОВАТЕЛЯ>/diplom_1/backend/venv/bin/gunicorn \
               --access-logfile - \
               --workers 3 \
               --bind unix:/run/gunicorn.sock \
               mycloud.wsgi:application

      [Install]
      WantedBy=multi-user.target
      ```
26. Запускаем файл `gunicorn.socket`:\
   `sudo systemctl start gunicorn.socket`\
   `sudo systemctl enable gunicorn.socket`
27. Проверяем статус `gunicorn`:\
   `sudo systemctl status gunicorn`
---
28. Создаем модуль `nginx`:\
   `sudo nano /etc/nginx/sites-available/mycloud`

      ```
      server {
         listen 80;
         server_name <ИМЯ ДОМЕНА ИЛИ IP АДРЕС СЕРВЕРА>;

         location = /favicon.ico {
            access_log off;
            log_not_found off;
         }

         location /static/ {
            root /home/<ИМЯ ПОЛЬЗОВАТЕЛЯ>/diplom_1/backend;
         }

         location / {
            include proxy_params;
            proxy_pass http://unix:/run/gunicorn.sock;
         }
      }
      ```
29. Создаем символическую ссылку:\
   `sudo ln -s /etc/nginx/sites-available/mycloud /etc/nginx/sites-enabled`
30. Добавляем пользователя `www-data` в группу текущего пользователя:\
   `sudo usermod -a -G ${USER} www-data`
31. Диагностируем `nginx` на предмет ошибок в синтаксисе:\
   `sudo nginx -t`
32. Перезапускаем веб-сервер:\
   `sudo systemctl restart nginx`
33. Проверяем статус `nginx`:\
   `sudo systemctl status nginx`
34. При помощи `firewall` даем полные права `nginx` для подключений:\
   `sudo ufw allow 'Nginx Full'`
---
36. Устанавливаем [Node Version Manager] (nvm):\
   `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash`
37. Добавляем переменную окружения:

      ```
      export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
      [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
      ```
38. Проверяем версию `nvm`:\
   `nvm -v`
39. Устанавливаем нужную версию `node`:\
   `nvm install <НОМЕР ВЕРСИИ>`
40. Проверяем версию `node`:\
   `node -v`
41. Проверяем версию `npm`:\
   `npm -v`
42. Переходим в папку проекта `frontend`:\
   `cd /home/<ИМЯ ПОЛЬЗОВАТЕЛЯ>/diplom_1/frontend`
43. В папке `frontend` создаем файл `.env` и указываем в нем базовый URL:\
   `nano .env`\
   `VITE_BASE_URL=http://<IP АДРЕС СЕРВЕРА>/api`
44. Устанавливаем зависимости:\
   `npm i`
45. Создаем файл `start.sh`:\
   `nano start.sh`

      ```
      #!/bin/bash
      . /home/<ИМЯ ПОЛЬЗОВАТЕЛЯ>/.nvm/nvm.sh
      npm run dev
      ```
46. Делаем файл `start.sh` исполняемым:\
   `chmod +x /home/<ИМЯ ПОЛЬЗОВАТЕЛЯ>/diplom_1/frontend/start.sh`
47. Создаем файл `frontend.service`:\
   `sudo nano /etc/systemd/system/frontend.service`

      ```
      [Unit]
      Description=frontend service
      After=network.target

      [Service]
      User=<ИМЯ ПОЛЬЗОВАТЕЛЯ>
      Group=www-data
      WorkingDirectory=/home/<ИМЯ ПОЛЬЗОВАТЕЛЯ>/diplom_1/frontend
      ExecStart=/home/<ИМЯ ПОЛЬЗОВАТЕЛЯ>/diplom_1/frontend/start.sh

      [Install]
      WantedBy=multi-user.target
      ```
48. Запускаем сервис `frontend`:\
   `sudo systemctl start frontend`\
   `sudo systemctl enable frontend`
49. Проверяем статус сервиса `frontend`:\
   `sudo systemctl status frontend`
---
48.  Проверяем доступность сайта по адресу:\
   `http://<IP АДРЕС СЕРВЕРА>:3000`
49.  Проверяем доступность сайта администратора по адресу:\
   `http://<IP АДРЕС СЕРВЕРА>/admin/`
50. Собираем всё через docker и запускаем:\
    `docker-compose up -d --build`
    `docker-compose up -d`
