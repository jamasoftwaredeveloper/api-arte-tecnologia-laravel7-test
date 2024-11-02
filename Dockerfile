# Usar una imagen base de PHP
FROM php:7.4-fpm

# Instalar dependencias del sistema y extensiones de PHP
RUN apt-get update && apt-get install -y \
    libzip-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libpq-dev \
    unzip \
    curl \
    gnupg2 \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_mysql

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Copiar archivos de la aplicación
COPY . .

# Copiar el script de entrada
COPY start.sh /usr/local/bin/start.sh

# Hacer el script ejecutable
RUN chmod +x /usr/local/bin/start.sh

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

# Instalar dependencias de PHP
RUN composer install --no-scripts --no-autoloader && \
    composer dump-autoload

# Hacer ejecutable el script de inicio
RUN chmod +x start.sh

# Exponer el puerto
EXPOSE 8000

# Configurar el script de entrada
ENTRYPOINT ["start.sh"]
