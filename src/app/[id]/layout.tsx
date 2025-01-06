import Navbar from '@/components/navbar'

export default function AppLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className='max-w-screen-xl mx-auto'>
      <Navbar />
      {children}
    </section>
  )
}
