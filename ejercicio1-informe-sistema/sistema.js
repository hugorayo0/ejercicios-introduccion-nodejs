const os = require('os');
const pc = require('picocolors');

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

function colorearPorcentaje(porcentaje) {
  const texto = `${porcentaje.toFixed(1)}%`;
  if (porcentaje < 60) return pc.green(texto);
  if (porcentaje <= 85) return pc.yellow(texto);
  return pc.red(texto);
}

function titulo(texto) {
  return pc.bold(pc.cyan(texto));
}

function etiqueta(texto) {
  return pc.dim(texto);
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

// --- Presentación del informe ---

function mostrarInforme() {
  const datos = obtenerDatosSistema();

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

mostrarInforme();
