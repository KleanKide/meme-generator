'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Header() {
    const pathName = usePathname()
  return (
   
    <nav className="w-full flex gap-8 justify-center py-6 bg-white shadow-sm list-none">
        <li className={`   px-4 py-2 rounded-md transition-colors duration-300 ${pathName==='/' ? 'bg-gray-400 text-white' : 'text-gray-600 hover:bg-gray-100'} `}><Link className='' href={"/"}>Main</Link></li>
        <li className={`  px-4 py-2 rounded-md transition-colors duration-300 ${pathName==='/memes' ? 'bg-gray-400 text-white' : 'text-gray-600 hover:bg-gray-100'}`}><Link  href={'/memes'}>Memes</Link></li>
    </nav>

  )
}

export default Header