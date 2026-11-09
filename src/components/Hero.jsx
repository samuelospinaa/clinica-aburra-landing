import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { images, nextSlot, openStatus } from '../data'
import { Icon } from './ui'

const ease = [0.2, 0.7, 0.2, 1]

function useContours() {
  return useMemo(() => {
    const out = []
    for (let k = 0; k < 22; k++) {
      const base = 40 + k * 21
      const pts = []
      for (let i = 0; i <= 120; i++) {
        const a = (i / 120) * Math.PI * 2
        const r = base * (1 + 0.13 * Math.sin(3 * a + k * 0.12) + 0.07 * Math.sin(5 * a + 1.7 + k * 0.07) + 0.04 * Math.sin(8 * a + k * 0.2))
        pts.push(`${(Math.cos(a) * r * 1.1).toFixed(1)},${(Math.sin(a) * r * 0.85).toFixed(1)}`)
      }
      out.push('M' + pts.join('L') + 'Z')
    }
    return out
  }, [])
}

const words = ['La', 'salud', 'de', 'Medellín,', 'cerca', 'de', 'ti.']

export default function Hero() {
  const contours = useContours()
  const { scrollY } = useScroll()
  const photoY = useTransform(scrollY, [0, 800], [0, 120])
  const topoY = useTransform(scrollY, [0, 800], [0, -60])
  const [status, setStatus] = useState({ open: openStatus(), slot: nextSlot() })

  useEffect(() => {
    const t = setInterval(() => setStatus({ open: openStatus(), slot: nextSlot() }), 60000)
    return () => clearInterval(t)
  }, [])

  return (
    <header className="hero" id="top">
      <motion.div
        className="photo"
        role="img"
        aria-label="Vista de Medellín con las montañas del Valle de Aburrá"
        style={{ backgroundImage: `url(${images.hero})`, y: photoY }}
        initial={{ scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease }}
      />
      <div className="tint" />
      <div className="tint2" />

      <motion.svg className="topo" viewBox="-500 -500 1000 1000" aria-hidden="true" style={{ y: topoY }}>
        {contours.map((d, k) => (
          <motion.path
            key={k}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 - k * 0.03 }}
            transition={{ duration: 2.4, delay: 0.3 + k * 0.07, ease: 'easeOut' }}
          />
        ))}
      </motion.svg>

      <div className="coords mono" aria-hidden="true">6°12′N 75°34′O<br />1.495 m · Valle de Aburrá</div>

      <div className="wrap inner">
        <motion.div className="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease }}>
          <span className={`dot ${status.open ? '' : 'off'}`} />
          {status.open ? 'Abierto ahora en El Poblado, Medellín' : 'Cerrado ahora · Atendemos lun–vie 7:00 a. m. – 6:00 p. m.'}
        </motion.div>

        <h1 aria-label={words.join(' ')}>
          {words.map((w, i) => (
            <span className="w-mask" key={i} aria-hidden="true">
              <motion.span
                className={`w ${i >= 4 ? 'accent' : ''}`}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.55 + i * 0.07, ease }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p className="lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1, ease }}>
          Medicina general, especialistas, laboratorio y telemedicina en El Poblado. Agenda hoy y te confirmamos por WhatsApp en minutos.
        </motion.p>

        <motion.div className="cta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.25, ease }}>
          <a href="#contacto" className="btn btn-white">Agendar cita <Icon name="arrow" className="btn-arrow" /></a>
          <a href="#servicios" className="btn btn-ghost">Ver servicios</a>
        </motion.div>

        <motion.aside className="slot" aria-label="Próximo cupo disponible" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 1.5, ease }}>
          <span className="slot-ico"><Icon name="clock" /></span>
          <span>
            <small>Próximo cupo · Medicina general</small>
            <b>{status.slot}</b>
          </span>
        </motion.aside>

        <motion.div className="giant" aria-hidden="true" initial={{ y: '40%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.3, delay: 0.9, ease }}>
          <span>ABU</span>RRÁ
        </motion.div>
      </div>
    </header>
  )
}
