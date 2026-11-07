# Ejercicios Introducción a Node.js

Repositorio con los ejercicios prácticos de introducción a Node.js.

## Estructura

```
ejercicios-introduccion-nodejs/
├── .gitignore
├── README.md
├── ejercicio1-informe-sistema/
│   ├── package.json
│   └── sistema.js
├── ejercicio2-explorador-carpetas/
│   ├── package.json
│   └── listar.js
└── ejercicio3-informe-archivo/
    ├── package.json
    └── informe.js
```

## Cómo ejecutar cada ejercicio

Cada ejercicio es un proyecto Node.js independiente con sus propias dependencias.

```bash
cd ejercicio1-informe-sistema
npm install
node sistema.js
```

```bash
cd ejercicio2-explorador-carpetas
npm install
node listar.js
```

```bash
cd ejercicio3-informe-archivo
npm install
node informe.js
```

## Ejercicio 1 · Informe del sistema

Muestra por consola un informe del sistema (equipo, SO, usuario, CPU, memoria
y tiempo activo) usando el módulo `os` y coloreando la salida con `picocolors`.

## Ejercicio 2 · Explorador de carpetas

Recibe una ruta como argumento (o usa la carpeta actual si no se indica
ninguna) y muestra su contenido con el módulo `fs`: las carpetas en azul con
una `/` al final, los archivos en verde con su tamaño en gris, y los
elementos ocultos (que empiezan por `.`) en gris. Al final muestra un resumen
con el número de carpetas, archivos y el tamaño total. Si la ruta no existe,
muestra un error con fondo rojo y termina con código de salida 1.

```bash
node listar.js ./mi-carpeta
node listar.js
```

## Ejercicio 3 · Informe de archivo

Amplía el ejercicio 1 para que, además de mostrar el informe por pantalla,
lo guarde en disco usando `fs`:

- `informe.txt`: se sobrescribe en cada ejecución con el informe actual
  (texto plano, sin códigos de color).
- `historial.log`: se añade una línea nueva por ejecución con el formato
  `AAAA-MM-DD HH:MM:SS | RAM usada: XX%`.

Al terminar, muestra en verde `✓ Informe guardado en informe.txt`.

## Integrantes

- Hugo Rayo
