import Link from 'next/link'

export default function Navbar () {
  return (
    <div className='min-h-8 bg-green-500'>
      <Link href='/'>
        <p>Home</p>
      </Link>
    </div>
  )
}
