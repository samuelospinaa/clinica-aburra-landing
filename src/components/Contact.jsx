import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon, Reveal, WhatsAppGlyph } from './ui'
import { services, waLink } from '../data'

export function Contact() {
  const [sent, setSent] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const msg = `Hola, soy ${f.get('nombre')} (${f.get('celular')}). Quiero pedir cita de ${f.get('servicio')}.${f.get('mensaje') ? ' ' + f.get('mensaje') : ''}`
    window.open(waLink(msg), '_blank', 'noopener')
    setSent(f.get('nombre'))
  }

  return (
    <section id="contacto">
      <div className="wrap">
        <div className="head">
          <Reveal><span className="tag">Contacto</span><h2>Agenda tu cita hoy.</h2></Reveal>
          <Reveal delay={0.1} as="p">Déjanos tus datos y te escribimos por WhatsApp para confirmar fecha y hora.</Reveal>
        </div>
        <div className="contact">
          <Reveal className="form-card">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div key="ok" className="sent" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <motion.span className="sent-ico" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}><Icon name="check" /></motion.span>
                  <h3>Listo, {sent.split(' ')[0]}.</h3>
                  <p>Abrimos WhatsApp con tu solicitud. Si no se abrió, escríbenos directamente.</p>
                  <a className="btn btn-primary" href={waLink()} target="_blank" rel="noopener noreferrer">Abrir WhatsApp</a>
                  <button className="link" onClick={() => setSent(null)}>Enviar otra solicitud</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="two">
                    <div><label htmlFor="n">Nombre</label><input id="n" name="nombre" required autoComplete="name" placeholder="Ej. Laura Restrepo" /></div>
                    <div><label htmlFor="t">Celular</label><input id="t" name="celular" type="tel" required autoComplete="tel" inputMode="tel" pattern="[0-9 +()\-]{7,}" title="Escribe tu número de celular, solo dígitos" placeholder="Ej. 310 555 0142" /></div>
                  </div>
                  <label htmlFor="s">Servicio</label>
                  <select id="s" name="servicio">{services.map((s) => <option key={s}>{s}</option>)}</select>
                  <label htmlFor="m">¿Algo que debamos saber?</label>
                  <textarea id="m" name="mensaje" rows="3" placeholder="Ej. Prefiero cita en la mañana" />
                  <button className="btn btn-primary full" type="submit"><WhatsAppGlyph /> Pedir cita por WhatsApp</button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          <Reveal delay={0.1} className="info">
            <h3>Visítanos en El Poblado</h3>
            <dl>
              <div><dt>Dirección</dt><dd>Carrera 43A # 7-50, Medellín</dd></div>
              <div><dt>Horario</dt><dd>Lunes a viernes 7:00 a. m. – 6:00 p. m.<br />Sábados 8:00 a. m. – 1:00 p. m.</dd></div>
              <div><dt>Teléfono y WhatsApp</dt><dd>(604) 555 0120 · 310 555 0142</dd></div>
            </dl>
            <div className="map"><iframe title="Mapa de la clínica en El Poblado, Medellín" loading="lazy" src="https://maps.google.com/maps?q=6.2085,-75.5700&z=15&output=embed" /></div>
            <a className="maplink" href="https://www.google.com/maps/search/?api=1&query=6.2085,-75.5700" target="_blank" rel="noopener noreferrer">Abrir en Google Maps →</a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="cols">
          <div><div className="brand">Aburrá</div><p>Clínica Aburrá S.A.S.<br />Carrera 43A # 7-50, El Poblado, Medellín</p></div>
          <div><h4>Clínica</h4><ul><li><a href="#servicios">Servicios</a></li><li><a href="#proceso">Cómo funciona</a></li><li><a href="#equipo">Equipo</a></li></ul></div>
          <div><h4>Contacto</h4><ul><li><a href="#contacto">Agendar cita</a></li><li>(604) 555 0120</li><li>citas@clinicaaburra.co</li></ul></div>
          <div><h4>Escríbenos</h4><ul><li><a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li><li><a href="https://www.google.com/maps/search/?api=1&query=6.2085,-75.5700" target="_blank" rel="noopener noreferrer">Cómo llegar</a></li></ul></div>
        </div>
        <div className="copy"><span>© 2026 Clínica Aburrá. Todos los derechos reservados.</span><span>Sitio de ejemplo · Fotos: Unsplash</span></div>
      </div>
    </footer>
  )
}

export function WhatsAppFab() {
  return (
    <motion.a
      className="wa"
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 2 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <WhatsAppGlyph />
    </motion.a>
  )
}
