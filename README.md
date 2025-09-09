# Дипломный проект профессии «Fullstack-разработчик на Python»

Сайт: http://89.111.155.117:3000/

### Backend

```bash
git clone https://github.com/Frida-Alexandra/diplom_1.git 
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

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

```bash
python manage.py migrate
python manage.py runserver
```
### Frontend

```bash
cd frontend
npm install
npm run build
```

### Установка окружения на сервере

```bash
sudo apt update && sudo apt install python3 python3-pip python3-venv postgresql nginx nodejs npm -y
```

### Развёртывание проекта

```bash
git clone https://github.com/Frida-Alexandra/diplom_1.git
cd diplom_1
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
```
