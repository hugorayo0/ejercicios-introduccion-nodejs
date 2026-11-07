const fs = require('fs');
const path = require('path');
const pc = require('picocolors');

// --- Funciones auxiliares ---

function formatearTamano(bytes) {
  const kb = bytes / 1024;
  return `${kb.toFixed(1)} KB`;
}

function esOculto(nombre) {
  return nombre.startsWith('.');
}

function mostrarError(mensaje) {
  console.log(pc.bgRed(pc.white(` ${mensaje} `)));
  process.exit(1);
}

// --- Lógica principal ---

function listarCarpeta(ruta) {
  if (!fs.existsSync(ruta)) {
    mostrarError(`Error: la ruta "${ruta}" no existe.`);
  }

  const stat = fs.statSync(ruta);
  if (!stat.isDirectory()) {
    mostrarError(`Error: "${ruta}" no es una carpeta.`);
  }

  const entradas = fs.readdirSync(ruta, { withFileTypes: true });

  let totalCarpetas = 0;
  let totalArchivos = 0;
  let totalBytes = 0;

  console.log(pc.bold(pc.cyan(`=== Contenido de ${ruta} ===`)));
  console.log();

  for (const entrada of entradas) {
    const nombre = entrada.name;
    const rutaCompleta = path.join(ruta, nombre);

    if (esOculto(nombre)) {
      console.log(pc.gray(entrada.isDirectory() ? `${nombre}/` : nombre));
      if (entrada.isDirectory()) {
        totalCarpetas++;
      } else {
        totalArchivos++;
        totalBytes += fs.statSync(rutaCompleta).size;
      }
      continue;
    }

    if (entrada.isDirectory()) {
      totalCarpetas++;
      console.log(pc.blue(`${nombre}/`));
    } else {
      totalArchivos++;
      const tamano = fs.statSync(rutaCompleta).size;
      totalBytes += tamano;
      console.log(`${pc.green(nombre)}  ${pc.gray(formatearTamano(tamano))}`);
    }
  }

  console.log();
  console.log(
    pc.bold(
      `${totalCarpetas} carpetas, ${totalArchivos} archivos, ${formatearTamano(totalBytes)} en total`
    )
  );
}

// --- Punto de entrada ---

const rutaArgumento = process.argv[2] || '.';
listarCarpeta(rutaArgumento);
