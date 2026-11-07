const os = require('os');
const fs = require('fs');
const path = require('path');
const pc = require('picocolors');

const RUTA_INFORME = path.join(__dirname, 'informe.txt');
const RUTA_HISTORIAL = path.join(__dirname, 'historial.log');

// --- Funciones auxiliares ---

function formatearBytes(bytes) {
  const gb = bytes / (1024 ** 3);
  return `${gb.toFixed(2)} GB`;
}

function formatearUptime(segundos) {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  return `${horas}h ${minutos}m`;
}

function nombreNivel(porcentaje) {
  if (porcentaje < 60) return 'verde';
  if (porcentaje <= 85) return 'amarillo';
  return 'rojo';
}

function colorearPorcentaje(porcentaje) {
  const texto = `${porcentaje.toFixed(1)}%`;
  const nivel = nombreNivel(porcentaje);
  if (nivel === 'verde') return pc.green(texto);
  if (nivel === 'amarillo') return pc.yellow(texto);
  return pc.red(texto);
}

function formatearFechaHora(fecha) {
  const pad = (n) => String(n).padStart(2, '0');
  const anio = fecha.getFullYear();
  const mes = pad(fecha.getMonth() + 1);
  const dia = pad(fecha.getDate());
  const horas = pad(fecha.getHours());
  const minutos = pad(fecha.getMinutes());
  const segundos = pad(fecha.getSeconds());
  return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}

// --- Recolección de datos ---

function obtenerDatosSistema() {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const porcentajeUsado = (usedMem / totalMem) * 100;
  const cpus = os.cpus();

  return {
    equipo: os.hostname(),
    sistema: `${os.type()} ${os.release()} (${os.arch()})`,
    usuario: os.userInfo().username,
    procesador: `${cpus[0].model} (${cpus.length} CPUs)`,
    memTotal: formatearBytes(totalMem),
    memLibre: formatearBytes(freeMem),
    memPorcentaje: porcentajeUsado,
    uptime: formatearUptime(os.uptime()),
  };
}

// --- Construcción del texto plano (sin colores) ---

function construirInformePlano(datos) {
  const lineas = [
    '=== Informe del Sistema ===',
    '',
    `Equipo:      ${datos.equipo}`,
    `Sistema:     ${datos.sistema}`,
    `Usuario:     ${datos.usuario}`,
    `Procesador:  ${datos.procesador}`,
    `Memoria:     ${datos.memTotal} total, ${datos.memLibre} libre, ${datos.memPorcentaje.toFixed(1)}% usado`,
    `Tiempo activo: ${datos.uptime}`,
  ];
  return lineas.join('\n') + '\n';
}

// --- Presentación coloreada por consola ---

function mostrarInformeConsola(datos) {
  const titulo = (t) => pc.bold(pc.cyan(t));
  const etiqueta = (t) => pc.dim(t);

  console.log(titulo('=== Informe del Sistema ==='));
  console.log();
  console.log(`${etiqueta('Equipo:')}      ${pc.white(datos.equipo)}`);
  console.log(`${etiqueta('Sistema:')}     ${pc.white(datos.sistema)}`);
  console.log(`${etiqueta('Usuario:')}     ${pc.white(datos.usuario)}`);
  console.log(`${etiqueta('Procesador:')}  ${pc.white(datos.procesador)}`);
  console.log(
    `${etiqueta('Memoria:')}     ${pc.white(datos.memTotal)} total, ` +
    `${pc.green(datos.memLibre)} libre, ` +
    `${colorearPorcentaje(datos.memPorcentaje)} usado`
  );
  console.log(`${etiqueta('Tiempo activo:')} ${pc.white(datos.uptime)}`);
}

// --- Persistencia en disco ---

function guardarInforme(textoPlano) {
  fs.writeFileSync(RUTA_INFORME, textoPlano, 'utf-8');
}

function anadirHistorial(datos) {
  const fecha = formatearFechaHora(new Date());
  const linea = `${fecha} | RAM usada: ${datos.memPorcentaje.toFixed(0)}%\n`;
  fs.appendFileSync(RUTA_HISTORIAL, linea, 'utf-8');
}

// --- Programa principal ---

function main() {
  const datos = obtenerDatosSistema();

  mostrarInformeConsola(datos);

  const textoPlano = construirInformePlano(datos);
  guardarInforme(textoPlano);
  anadirHistorial(datos);

  console.log();
  console.log(pc.green('✓ Informe guardado en informe.txt'));
}

main();
