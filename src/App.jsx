import { MapContainer, TileLayer, } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import arrow from './images/icon-arrow.svg'
import bgImage from './images/pattern-bg-desktop.png'
import { useState, useEffect } from 'react'
import MarkerPosition from './MarkerPosition'
// import dotenv from 'dotenv';
// dotenv.config();

// https://geo.ipify.org/api/v2/country?apiKey=at_65NvoX9zU8BZsGSADPJIbdtPQ3KRf&ipAddress=8.8.8.8
//https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_65NvoX9zU8BZsGSADPJIbdtPQ3KRf&ipAddress=8.8.8.8
function App() {
  const [address, setAddress] = useState(null)
  //const [ipAddress, setIpAddress] = useState("")
  //const apiKey = import.meta.env.REACT_APP_API_KEY
  // const map = useMap()
  const apiKey = 'at_65NvoX9zU8BZsGSADPJIbdtPQ3KRf'

  useEffect(() => {
    try {
      const getInitialData = async() => {
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&ipAddress=8.8.8.8`)
        const data = await res.json()
        console.log(data)
        setAddress(data)
      }

      getInitialData()
    }catch {
      console.log("error")
    }
  }, [])

  // const position = {address.location.lat, address.location.lng}

  // useEffect(() => {
  //   map.flyTo(position, 13) {
  //     animate: true
  //   }
  // }, [map, position])
  return (
    <>
      <section>
        <div className='absolute'>
          <img src={bgImage} alt="" className='w-full h-80 object-cover'/>
        </div>
        <article className='relative p-8'>
          <h1 className='text-2xl lg:text-4xl text-center text-white font-bold mb-8'>IP Address Tracker</h1>
          <form className='flex justify-center max-w-2xl mx-auto'>
            <input type="text" name='ip-address' id='ip-address' placeholder='Search for any IP address or domain'className='py-2 px-4 rounded-l-lg w-full'/>
            <button type='submit' className='bg-black p-4 rounded-r-lg hover:opacity-60'>
              <img src={arrow} alt="" />
            </button>
          </form>
        </article>

        {address && <>
          <article className='relative bg-white rounded-lg shadow p-8 mx-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl xl:mx-auto text-center md:text-left lg:-mb-16' style={{zIndex: 10000}}>
          <div className='lg:border-r lg:border-slate-300'>
            <h2 className='uppercase text-sm font-bold text-slate-400 tracking-wider mb-3'>Ip Address</h2>
            <p className='font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl'>{address.ip}</p>
          </div>
          <div className='lg:border-r lg:border-slate-300'>
            <h2 className='uppercase text-sm font-bold text-slate-400 tracking-wider mb-3'>location</h2>
            <p className='font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl'>{address.location.city}, {address.location.region}</p>
          </div>
          <div className='lg:border-r lg:border-slate-300'>
            <h2 className='uppercase text-sm font-bold text-slate-400 tracking-wider mb-3'>timezone</h2>
            <p className='font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl'>UTC {address.location.timezone}</p>
          </div>
          <div>
            <h2 className='uppercase text-sm font-bold text-slate-400 tracking-wider mb-3'>ISP</h2>
            <p className='font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl'>{address.isp}</p>
          </div>
        </article>

        <MapContainer center={[address.location.lat, address.location.lng]} zoom={13} scrollWheelZoom={true} style={{ height: "100vh", width: "100vw"}}>
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerPosition address={address}/>
        </MapContainer>
        </>}

      </section>
    </>
  )
}

export default App
