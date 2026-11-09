const U = (id, w = 1400, extra = '') =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75${extra}`

export const WA_NUMBER = '573105550142'
export const waLink = (text) =>
  `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const images = {
  hero: U('1715503234327-b57d32e5da0f', 2200),
  general: U('1631217868264-e5b90bb7e133'),
  lab: U('1606206591513-adbfbdd7a177', 1200),
  tele: U('1666886573531-48d2e3c2b684'),
}

export const nav = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'proceso', label: 'Cómo funciona' },
  { id: 'equipo', label: 'Equipo' },
  { id: 'preguntas', label: 'Preguntas' },
  { id: 'contacto', label: 'Contacto' },
]

export const facts = [
  { value: 15, suffix: ' años', label: 'cuidando familias del Valle de Aburrá' },
  { value: 22, suffix: ' mil', label: 'pacientes con historia clínica activa' },
  { value: 24, suffix: '', label: 'especialistas en 12 áreas' },
  { value: 48, prefix: '< ', suffix: ' h', label: 'para conseguir cita con un especialista' },
]

export const specialties = [
  { title: 'Cardiología', text: 'Electrocardiograma y prueba de esfuerzo en la misma consulta.', icon: 'heart' },
  { title: 'Pediatría', text: 'Control de crecimiento, vacunación y urgencias del niño.', icon: 'user' },
  { title: 'Dermatología', text: 'Diagnóstico de piel y procedimientos menores sin hospitalización.', icon: 'drop' },
  { title: 'Ortopedia', text: 'Rodilla, columna y lesiones deportivas con rehabilitación incluida.', icon: 'bone' },
]

export const steps = [
  { title: 'Escríbenos', text: 'Cuéntanos por WhatsApp qué necesitas y cuándo te queda bien. Respondemos en menos de 10 minutos en horario de atención.' },
  { title: 'Confirmamos tu cita', text: 'Te asignamos médico y hora, y el día anterior te enviamos un recordatorio con la dirección.' },
  { title: 'Te atendemos', text: 'Llegas, te atienden a tu hora y recibes tu historia clínica y resultados en línea el mismo día.' },
]

export const insurers = ['Sura', 'Sanitas', 'Colsanitas', 'Coomeva', 'Allianz', 'Medplus', 'Axa Colpatria', 'Particular']

export const team = [
  { name: 'Dra. Valentina Ospina', role: 'Medicina general', school: 'U. de Antioquia', img: U('1623854767648-e7bb8009f0db', 700, '&h=933'), slot: 'Hoy' },
  { name: 'Dr. Andrés Londoño', role: 'Cardiología', school: 'CES', img: U('1622253692010-333f2da6031d', 700, '&h=933'), slot: 'Mañana' },
  { name: 'Dra. Camila Arango', role: 'Pediatría', school: 'U. Pontificia Bolivariana', img: U('1659353888906-adb3e0041693', 700, '&h=933'), slot: 'Hoy' },
  { name: 'Dr. Mauricio Zapata', role: 'Ortopedia', school: 'U. de Antioquia', img: U('1758691461516-7e716e0ca135', 700, '&h=933'), slot: 'Mañana' },
]

export const quotes = [
  { text: 'Llegué con la presión alta y salí con un plan claro. La doctora me escribió a la semana para ver cómo iba.', name: 'María Gómez', place: 'Laureles', initials: 'MG' },
  { text: 'Agendé por WhatsApp un martes y el jueves ya estaba con el cardiólogo. Sin filas ni papeleo.', name: 'Juan David Mejía', place: 'El Poblado', initials: 'JD' },
  { text: 'Los resultados del laboratorio me llegaron al correo antes del almuerzo. Mi mamá también lo usa.', name: 'Sofía Lopera', place: 'Envigado', initials: 'SL' },
]

export const faqs = [
  { q: '¿Necesito autorización de mi EPS?', a: 'Para consulta particular no. Si vas por convenio con tu EPS o prepagada, te decimos por WhatsApp qué documentos llevar antes de tu cita.' },
  { q: '¿Cuánto cuesta una consulta de medicina general?', a: 'La consulta particular de medicina general cuesta $90.000. Con prepagada o seguro depende de tu plan; te confirmamos el valor al agendar.' },
  { q: '¿Atienden urgencias?', a: 'No somos un servicio de urgencias. Si tienes una emergencia, llama al 123. Para molestias que no pueden esperar a una cita programada, escríbenos y buscamos un cupo el mismo día.' },
  { q: '¿Cómo recibo mis resultados de laboratorio?', a: 'Te llegan al correo y quedan en tu historia clínica digital, normalmente el mismo día de la toma de muestra.' },
  { q: '¿Puedo reprogramar o cancelar mi cita?', a: 'Sí, respondiendo al recordatorio de WhatsApp hasta 4 horas antes. Así liberamos el cupo para otro paciente.' },
]

export const services = [
  'Medicina general', 'Cardiología', 'Pediatría', 'Dermatología', 'Ortopedia', 'Laboratorio clínico', 'Telemedicina',
]

// Horario en hora de Medellín (UTC-5, sin horario de verano)
const bogota = (d = new Date()) => new Date(d.getTime() - 5 * 3600 * 1000)
const hoursFor = (day) => (day === 0 ? null : day === 6 ? [8, 13] : [7, 18])

export function openStatus() {
  const b = bogota()
  const range = hoursFor(b.getUTCDay())
  const h = b.getUTCHours() + b.getUTCMinutes() / 60
  return !!range && h >= range[0] && h < range[1]
}

const fmt = (h, m) => {
  const ap = h >= 12 ? 'p. m.' : 'a. m.'
  const hh = h % 12 === 0 ? 12 : h % 12
  return `${hh}:${String(m).padStart(2, '0')} ${ap}`
}
const DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

// Próximo cupo: al menos 90 min desde ahora, en múltiplos de 30 min, dentro del horario
export function nextSlot() {
  const now = bogota()
  const start = bogota(new Date(Date.now() + 90 * 60 * 1000))
  start.setUTCSeconds(0, 0)
  const min = start.getUTCMinutes()
  if (min === 0) { /* ya está en punto */ } else if (min <= 30) start.setUTCMinutes(30)
  else { start.setUTCMinutes(0); start.setUTCHours(start.getUTCHours() + 1) }
  const dayKey = (d) => d.toISOString().slice(0, 10)
  const todayKey = dayKey(now)
  const tomorrowKey = dayKey(new Date(now.getTime() + 86400000))
  for (let i = 0; i < 7 * 48; i++) {
    const t = new Date(start.getTime() + i * 30 * 60 * 1000)
    const range = hoursFor(t.getUTCDay())
    const h = t.getUTCHours() + t.getUTCMinutes() / 60
    if (range && h >= range[0] && h <= range[1] - 0.5) {
      const k = dayKey(t)
      const when = k === todayKey ? 'hoy' : k === tomorrowKey ? 'mañana' : `el ${DAYS[t.getUTCDay()]}`
      return `${when} a las ${fmt(t.getUTCHours(), t.getUTCMinutes())}`
    }
  }
  return 'esta semana'
}
