# web_project_api_full

## Descripción

Este es el proyecto final del sprint. La aplicación permite registrar usuarios, iniciar sesión, editar el perfil, agregar tarjetas, eliminarlas y dar like.

El proyecto está dividido en dos partes:

- `backend/` para el servidor con Node.js y Express
- `frontend/` para la aplicación con React

## Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose
- React
- Vite
- JWT
- Nginx
- PM2

## Instalación

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Variables de entorno

En producción, el archivo `.env` se usa solo en el servidor.

```env
NODE_ENV=production
PORT=3000
JWT_SECRET=tu_clave_secreta
MONGO_URL=tu_cadena_de_conexion
```

## Dominios

- Frontend: `chonicilla.chickenkiller.com`
- Frontend con www: `www.chonicilla.chickenkiller.com`
- API: `api.chonicilla.chickenkiller.com`
