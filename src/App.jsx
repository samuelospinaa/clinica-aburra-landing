import Nav from './components/Nav'
import Hero from './components/Hero'
import { About, Coverage, Services, Process, Tech, Team, Quotes, Faq } from './components/Sections'
import { Contact, Footer, WhatsAppFab } from './components/Contact'

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Coverage />
        <Services />
        <Process />
        <Tech />
        <Team />
        <Quotes />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
