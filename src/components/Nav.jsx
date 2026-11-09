import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { nav } from '../data'
import { Icon } from './ui'

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    nav.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a href="#main" className="skip">Saltar al contenido</a>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <motion.nav
        className={solid || open ? 'solid' : ''}
        aria-label="Principal"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <a href="#top" className="logo" onClick={() => setOpen(false)}>Aburrá</a>
        <ul>
          {nav.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} className={active === n.id ? 'on' : ''}>{n.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contacto" className="btn btn-white nav-cta">Agendar cita</a>
        <button className="burger" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div className="sheet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <ul>
              {nav.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)}>{n.label}</a>
                </motion.li>
              ))}
            </ul>
            <a href="#contacto" className="btn btn-primary" onClick={() => setOpen(false)}>Agendar cita</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
