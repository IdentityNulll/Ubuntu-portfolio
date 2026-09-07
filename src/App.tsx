import { PlayerProvider } from './context/PlayerContext'
import { BootScreen } from './components/shell/BootScreen'
import { DesktopBackground } from './components/shell/DesktopBackground'
import { TopBar } from './components/shell/TopBar'
import { Dock } from './components/shell/Dock'
import { DesktopCat } from './components/pet/DesktopCat'
import { MusicPlayer } from './components/music/MusicPlayer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/Footer'

function App() {
  return (
    <PlayerProvider>
      <div className="min-h-svh font-sans">
        <BootScreen />
        <DesktopBackground />
        <TopBar />
        <Dock />
        <DesktopCat />
        <MusicPlayer />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </PlayerProvider>
  )
}

export default App
