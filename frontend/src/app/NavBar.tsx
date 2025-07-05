import Link from 'next/link'
import React from 'react'
import { CgGoogleTasks } from 'react-icons/cg'

const NavBar = () => {
  const links = [
    { label: 'Tasks', href: '/tasks/' },
    { label: 'Projects', href: '/projects/' },
  ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href="/"><CgGoogleTasks /></Link>
      {links.map((link) => (
        <Link 
          key={link.href} 
          className='text-zinc-500 hover:text-zinc-800 transform-colors'
          href={link.href}>{link.label}</Link>
      ))}
    </nav>
  )
}

export default NavBar