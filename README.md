<h3><b>PASO A PASO</b><h3>

<b>REQUERIMIENTOS.</b>
Contar con npm, php "^7.2.5|^8.0", composer

1. Descargar el proyecto en formato zip o clonar el respositorio.
2. Revisar en la raiz del proyecto y buscar con nombre archivo con nombre .env,
si no buscar el archivo con nombre .env.example y hacerle una copia y ponerle el nombre .env
3. Crear una base datos.
4. Diligenciar archivo .env, respecto a la configuración de la base datos.
5. Abrir la consola del sistema y ejecutar el siguiente comando "composer install".
6. Abrir la consola del sistema y ejecutar el siguiente comando "npm i".
7. Abrir la consola del sistema y ejecutar el siguiente comando "php artisan key:generate".
8. Ejecutar por consol php artisan migrate --seed
9.  php artisan jwt:secret
10.  php artisan optimize
11. Ejecutar por consola php artisan serve e ingresar al navegador con la url dada
12. usuario de prueba usuario: admin@test.com, contraseña: 123456789

