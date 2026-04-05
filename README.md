# 🐾 PruebaApp - Aplicación de Gestión de Animales

Una aplicación móvil y web completa para la gestión de animales. Utiliza **Quasar** en el frontend y **Nuxt 3** en el backend, con **Drizzle ORM** para la base de datos.

---

## 📋 Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Requisitos Previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
5. [Levantando el Backend](#levantando-el-backend)
6. [Configuración de IP y CORS](#configuración-de-ip-y-cors)
7. [Levantando el Frontend](#levantando-el-frontend)
8. [Comandos Disponibles](#comandos-disponibles)
9. [Estructura del Proyecto](#estructura-del-proyecto)
10. [Troubleshooting (Solución de Errores)](#troubleshooting-solución-de-errores)

---

## 📱 Descripción del Proyecto

**PruebaApp** es una aplicación completa que permite:
- ✅ Gestionar un listado de animales.
- ✅ Ver detalles de cada animal.
- ✅ Crear y editar animales (con validación de datos).
- ✅ Guardar animales favoritos.
- ✅ Sistema de autenticación (login/registro).
- ✅ Disponible en web y como aplicación móvil (Android).

**Stack Tecnológico:**
- **Frontend**: Quasar + Vue 3 + Capacitor (para mobile).
- **Backend**: Nuxt 3.
- **Base de Datos**: SQLite gestionado con Drizzle ORM y dBe Studio.
- **Autenticación**: JWT (JSON Web Tokens).

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu máquina:

- **Node.js** (versión 20 o superior) - [Descargar](https://nodejs.org/)
- **npm** o **pnpm** (gestor de paquetes)
- **Git** (para clonar el repositorio)
- **Android Studio** (solo si quieres compilar la versión móvil para Android)

**Verificar instalaciones:**
```bash
node --version
npm --version
```

💾 Instalación
Paso 1: Clonar el Repositorio Frontend
```bash
git clone <URL_DEL_REPOSITORIO_FRONTEND>
cd Proyecto-Quasar-frontend--Nuxt-backend-
```
Paso 2: Instalar Dependencias del Frontend
El workspace está configurado con pnpm. Instala las dependencias:
```bash
pnpm install
```
o 
```bash
npm install
```
Paso 3: Instalar Dependencias del Backend
En otra carpeta, clona el repositorio del backend (Nuxt), accede a él e instala las dependencias:
```bash
git clone [https://github.com/ScarlettToala/gitAuth-NUXT.git](https://github.com/ScarlettToala/gitAuth-NUXT.git)
cd gitAuth-NUXT
pnpm install
```
🗄️ Configuración de la Base de Datos
Para que la aplicación funcione correctamente, necesitas crear las tablas e insertar datos iniciales en la base de datos SQLite.

Pasos:

Abre la terminal del backend. En la ruta server/db/datosEjemplo.sql encontrarás un script SQL que facilita la inserción de datos de prueba para iniciar el proyecto.

Crea las tablas ejecutando Drizzle:
```bash
npx drizzle-kit push
```
Abre el editor visual de tu base de datos:
```bash
npx drizzle-kit studio
```
Ejecuta los inserts: Haz las inserciones manualmente copiando el contenido de datosEjemplo.sql en dBe Studio o ejecutándolo desde el propio Drizzle Studio.

🚀 Levantando el Backend
El backend es el motor de la aplicación. Debes levantar el backend PRIMERO antes de iniciar el frontend.

Paso 1: Configura las Variables de Entorno
En la carpeta raíz del backend, crea un archivo .env y añade las siguientes claves:

```bash
# Configuración de Sesión y GitHub OAuth
NUXT_SESSION_PASSWORD=b958846bb17248f899891eab3e18ef28
NUXT_OAUTH_GITHUB_CLIENT_ID="TuClientID"
NUXT_OAUTH_GITHUB_CLIENT_SECRET="TuClientSecret" 

# Puerto y Entorno
NUXT_PORT=3000
NODE_ENV=development
```
Paso 2: Inicia el Backend

```bash
npm run dev
# o
pnpm dev
```
Espera a que veas un mensaje como:

[nuxt] ✨ Ready in 3000ms

[nuxt] Local: http://localhost:3000

(Nota: El backend tardará entre 20-30 segundos en iniciarse la primera vez. ¡Sé paciente!)

🌐 Configuración de IP y CORS
⚠️ ADVERTENCIA: Este paso es crucial para que el frontend pueda comunicarse con el backend a través de la red local, especialmente cuando desarrollas para mobile (Android).

Si es la primera vez que ejecutas el proyecto, es posible que el firewall de tu ordenador bloquee las conexiones. Asegúrate de permitir el tráfico en los puertos 3000 (Backend) y 9000 (Frontend).

1. Obtener tu IP Local
Necesitas tu IP local (Ej: 192.168.1.XX). No uses localhost o 127.0.0.1 para desarrollo móvil.

Windows: Ejecuta ipconfig en PowerShell (busca IPv4).

Mac/Linux: Ejecuta ifconfig o hostname -I.

2. Configurar CORS en el Backend (Nuxt 3)
Para permitir que Quasar lea tu API desde otra IP, configura las routeRules en tu archivo nuxt.config.ts:

```bash
export default defineNuxtConfig({
  routeRules: {
    // Permite conexiones CORS para todas las rutas de la API
    '/api/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*', // O tu IP específica: '[http://192.168.1.](http://192.168.1.)XX:9000'
        'Access-Control-Allow-Methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
        'Access-Control-Allow-Headers': '*'
      }
    }
  }
})
```
3. Configurar la IP en el Frontend (Quasar)
En Quasar, modifica el archivo boot/axios.js para que apunte a la IP de tu backend:
```bash
import axios from 'axios'

export default ({ app }) => {
  app.config.globalProperties.$axios = axios
  // Usa la IP local de tu máquina + el puerto del backend
  axios.defaults.baseURL = '[http://192.168.1.](http://192.168.1.)XX:3000' 
}
```

💻 Levantando el Frontend
Opción 1: Desarrollo Web
Una vez que el backend esté corriendo:
```bash
pnpm dev
```
Abre tu navegador en: http://localhost:9000 (O en tu IP local: http://192.168.1.XX:9000).

Opción 2: Desarrollo Mobile (Android)

```bash
pnpm dev:android
# o usando el CLI de Quasar directamente:
npx quasar dev -m capacitor -T android -H 0.0.0.0 -p 9000
```

Esto abrirá Android Studio y compilará la app para el emulador o tu dispositivo físico.

🔐 Autenticación con JWT
La aplicación utiliza jsonwebtoken para manejar la sesión.

Instalación de dependencias (Backend)
Si necesitas instalarlo manualmente en el backend, asegúrate de instalar también los tipos de TypeScript para que no marque errores:

```bash
npm install jsonwebtoken bcryptjs
npm install -D @types/jsonwebtoken
```

🐛 Troubleshooting (Solución de Errores)
❌ Error 500 (Server Error) al Crear o Editar un Animal
Síntoma: Al guardar, Quasar arroja un "Network Error 500" y la consola de Nuxt muestra un error con un valor NaN.
Causa: Generalmente ocurre cuando el frontend envía una fecha inválida o vacía en el campo seenAt y Drizzle ORM intenta convertir un Invalid Date a un número (generando un NaN que rompe SQLite).
Solución: Asegúrate de validar los datos en tu backend y usar una fecha por defecto (fallback) si la que llega es inválida:

```bash
// En tu server/api/animals/[id].put.ts
let fechaGuardar = new Date(); // Por defecto, hoy
if (body.seenAt) {
  const fechaParseada = new Date(body.seenAt);
  if (!isNaN(fechaParseada.getTime())) {
    fechaGuardar = fechaParseada; // Si es válida, usa la del usuario
  }
}
// Usa 'fechaGuardar' en tu db.update().set(...)
```

❌ Error: "Blocked by CORS policy"
Síntoma: El navegador bloquea la petición diciendo que el Access-Control-Allow-Origin no coincide.
Solución: Verifica que el archivo nuxt.config.ts tenga las routeRules configuradas correctamente (con el asterisco * o tu IP local) y asegúrate de reiniciar el servidor de Nuxt después de hacer el cambio.

❌ Error: "Cannot connect to backend"
Solución:

Verifica que el backend esté corriendo (http://localhost:3000).

Comprueba que la IP en boot/axios.js coincida con tu IP local actual (192.168.1.XX).

Asegúrate de que el firewall de Windows no esté bloqueando el puerto 3000.

❌ El emulador de Android es muy lento
Soluciones:

Aumenta la RAM del emulador desde el Device Manager en Android Studio.

Activa la aceleración de hardware.

Alternativa recomendada: Conecta un dispositivo Android físico vía USB y activa la Depuración USB.

👨‍💻 Autor
Scarlett Toalá Email: scarlett.toala.7e8@itb.cat

🤝 Contribuciones
Las contribuciones son bienvenidas. Por favor:

Haz un fork del proyecto.

Crea una rama para tu feature (git checkout -b feature/nueva-feature).

Haz commit de tus cambios (git commit -m 'Añade nueva feature').

Haz push a la rama (git push origin feature/nueva-feature).

Abre un Pull Request.

¡Gracias por usar PruebaApp!