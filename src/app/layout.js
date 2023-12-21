import Navbar from './components/navbar/Navbar.jsx'
import './globals.css'


export default function RootLayout({ children }) {
 

  return (
    <html lang="en">
      <body>
       
        <Navbar />
        {children}
       
        </body>
    </html>
  )
}
