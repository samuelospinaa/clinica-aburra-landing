import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { CountUp, Icon, Reveal } from './ui'
import { faqs, facts, images, insurers, quotes, specialties, steps, team } from '../data'

/* ---------- Sobre la clínica ---------- */
export function About() {
  return (
    <section>
      <div className="wrap">
        <div className="lede">
          <Reveal><span className="tag">Sobre la clínica</span><h2>Una clínica de barrio, con la tecnología de una grande.</h2></Reveal>
          <Reveal delay={0.1} as="p">Desde 2009 atendemos familias de El Poblado, Laureles y Envigado. Cada paciente tiene un médico de cabecera, una historia clínica digital y un equipo que contesta el teléfono.</Reveal>
        </div>
        <div className="facts">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08} className="fact">
              <b><CountUp value={f.value} prefix={f.prefix} suffix={f.suffix} /></b>
              <span>{f.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Cobertura (marquee) ---------- */
export function Coverage() {
  const items = [...insurers, ...insurers]
  return (
    <div className="coverage" aria-label="Aseguradoras con las que trabajamos">
      <p className="wrap"><span className="tag">Atendemos con</span></p>
      <div className="marquee">
        <div className="track">
          {items.map((n, i) => (
            <span key={i} className="insurer" aria-hidden={i >= insurers.length}>{n}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- Servicios ---------- */
function Spot({ children, className = '', ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Reveal className={`tile ${className}`} onMouseMove={onMove} as="article" {...rest}>
      {children}
    </Reveal>
  )
}

export function Services() {
  return (
    <section className="services" id="servicios">
      <div className="wrap">
        <div className="head">
          <Reveal><span className="tag">Servicios</span><h2>Todo en un solo lugar.</h2></Reveal>
          <Reveal delay={0.1} as="p">Del chequeo anual al examen de laboratorio, sin recorrer la ciudad de consultorio en consultorio.</Reveal>
        </div>
        <div className="bento">
          <Spot className="img t-a">
            <div className="bgimg" style={{ backgroundImage: `url(${images.general})` }} />
            <span className="chip">Más solicitado</span>
            <h3>Medicina general</h3>
            <p>Chequeos, control de presión y diabetes, certificados y orientación para toda la familia.</p>
          </Spot>
          {specialties.map((s, i) => (
            <Spot key={s.title} className={['t-b', 't-c', 't-d', 't-e'][i]} delay={0.05 * (i + 1)}>
              <div className="ico"><Icon name={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Spot>
          ))}
          <Spot className="img t-f">
            <div className="bgimg" style={{ backgroundImage: `url(${images.lab})` }} />
            <h3>Laboratorio clínico</h3>
            <p>Toma de muestra sin cita de 6:30 a 10:00 a. m. Resultados en tu correo el mismo día.</p>
          </Spot>
          <Spot className="img t-g">
            <div className="bgimg" style={{ backgroundImage: `url(${images.tele})` }} />
            <h3>Telemedicina</h3>
            <p>Consulta por video desde casa, con fórmula médica y seguimiento por WhatsApp.</p>
          </Spot>
        </div>
      </div>
    </section>
  )
}

/* ---------- Cómo funciona (secuencia real) ---------- */
export function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const line = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <section id="proceso">
      <div className="wrap">
        <div className="head">
          <Reveal><span className="tag">Cómo funciona</span><h2>De tu mensaje a tu consulta en tres pasos.</h2></Reveal>
          <Reveal delay={0.1} as="p">Sin formularios largos ni llamadas en espera. Todo ocurre por WhatsApp.</Reveal>
        </div>
        <ol className="steps" ref={ref}>
          <motion.span className="rail" style={{ scaleY: line }} aria-hidden="true" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={0.05} className="step">
              <span className="n">{i + 1}</span>
              <div><h3>{s.title}</h3><p>{s.text}</p></div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- Tecnología ---------- */
const months = ['Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct']
const heights = [38, 52, 46, 66, 60, 82, 96]
const rows = [
  { n: 'Ana María Restrepo', t: '8:00 a. m.', s: 'ok', l: 'Confirmada' },
  { n: 'Carlos Builes', t: '9:30 a. m.', s: 'ok', l: 'Atendida' },
  { n: 'Laura Posada', t: '11:00 a. m.', s: 'bad', l: 'Cancelada' },
]

export function Tech() {
  return (
    <section className="tech" id="tecnologia">
      <div className="wrap split">
        <Reveal>
          <span className="tag">Tecnología</span>
          <h2>Tu historia clínica, siempre a la mano.</h2>
          <p className="sub">Agenda, historia clínica y recordatorios viven en una sola plataforma. Menos filas, menos papeles y ningún resultado perdido.</p>
          <ul className="checks">
            <li>Recordatorio de cita por WhatsApp el día anterior</li>
            <li>Historia clínica digital con acceso solo para ti y tu médico</li>
            <li>Resultados de laboratorio en línea, sin ir a recogerlos</li>
            <li>Reprogramación en dos toques si no puedes asistir</li>
          </ul>
          <a href="#contacto" className="btn btn-primary">Agendar cita</a>
        </Reveal>
        <Reveal delay={0.1} y={50} className="panel-wrap">
          <motion.div className="panel" whileHover={{ y: -4 }} transition={{ duration: 0.4 }} aria-label="Vista del panel de citas de la clínica">
            <div className="bar"><span>Agenda de hoy</span><span className="pill soft">Consultorio 3</span></div>
            <div className="box">
              <small>Pacientes atendidos por mes</small>
              <div className="bars">
                {heights.map((h, i) => (
                  <motion.i
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
                  />
                ))}
              </div>
              <div className="mths">{months.map((m) => <span key={m}>{m}</span>)}</div>
            </div>
            <div className="box">
              {rows.map((r, i) => (
                <motion.div
                  className="row"
                  key={r.n}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 + i * 0.12 }}
                >
                  <b>{r.n}</b><span>{r.t}</span><span className={`pill ${r.s}`}>{r.l}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Equipo ---------- */
export function Team() {
  return (
    <section id="equipo">
      <div className="wrap">
        <div className="head">
          <Reveal><span className="tag">Equipo</span><h2>Médicos que te conocen por tu nombre.</h2></Reveal>
          <Reveal delay={0.1} as="p">Cada paciente tiene un médico de cabecera asignado. Siempre vuelves con la misma persona.</Reveal>
        </div>
        <div className="team">
          {team.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.08} className="doc">
              <div className="ph">
                <img loading="lazy" width="700" height="933" alt={d.name} src={d.img} />
                <span className="avail"><i />Cupo {d.slot.toLowerCase()}</span>
              </div>
              <h3>{d.name}</h3>
              <p>{d.role} · {d.school}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Testimonios ---------- */
export function Quotes() {
  return (
    <section className="quotes">
      <div className="wrap">
        <div className="head"><Reveal><span className="tag">Pacientes</span><h2>Lo que cuentan de nosotros.</h2></Reveal></div>
        <div className="qgrid">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.1} className="quote">
              <div>
                <div className="stars" aria-label="5 de 5 estrellas">★★★★★</div>
                <p>“{q.text}”</p>
              </div>
              <div className="who"><span className="av">{q.initials}</span><span><b>{q.name}</b>{q.place}</span></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Preguntas frecuentes ---------- */
export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="preguntas">
      <div className="wrap faq-wrap">
        <Reveal className="faq-head">
          <span className="tag">Preguntas frecuentes</span>
          <h2>Lo que más nos preguntan.</h2>
          <p>¿No ves tu duda? Escríbenos por WhatsApp y te respondemos.</p>
        </Reveal>
        <div className="faq">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 0.05} className={`qa ${isOpen ? 'open' : ''}`}>
                <h3>
                  <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                    {f.q}<span className="pm"><Icon name="plus" /></span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
