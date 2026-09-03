import { DesktopBackground } from './components/shell/DesktopBackground'
import { TopBar } from './components/shell/TopBar'
import { Dock } from './components/shell/Dock'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-svh font-sans">
      <DesktopBackground />
      <TopBar />
      <Dock />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
