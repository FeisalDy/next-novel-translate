// // 'use client'
// // import { Dropzone, FileMosaic } from '@files-ui/react'
// // import * as React from 'react'

// // export default function Page () {
// //   const [files, setFiles] = React.useState([])
// //   const updateFiles = incommingFiles => {
// //     //do something with the files
// //     console.log('incomming files', incommingFiles)
// //     setFiles(incommingFiles)
// //     //even your own upload implementation
// //   }
// //   const removeFile = id => {
// //     setFiles(files.filter(x => x.id !== id))
// //   }

// //   console.log(files)

// //   return (
// //     <Dropzone onChange={updateFiles} value={files}>
// //       {files.map(file => (
// //         <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
// //       ))}
// //     </Dropzone>
// //   )
// // }
// 'use client'
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from '@/components/ui/table'
// import { getBooks } from '@/server/books'
// import { useQuery } from '@tanstack/react-query'

// export default function Page () {
//   const { data, isPending } = useQuery({
//     queryKey: ['books'],
//     queryFn: () => getBooks({})
//   })

//   return (
//     <div className='p-4'>
//       <Table className=''>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Image</TableHead>
//             <TableHead>Title</TableHead>
//             <TableHead>Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {isPending && (
//             <TableRow>
//               <TableCell>Loading...</TableCell>
//             </TableRow>
//           )}
//           {data?.data &&
//             data?.data?.map(book => (
//               <TableRow key={book.id}>
//                 <TableCell>
//                   <img src={book.cover} className='w-[150px] h-[200px]' />
//                 </TableCell>
//                 <TableCell className='align-text-top text-2xl capitalize'>
//                   {book.title}
//                 </TableCell>
//                 <TableCell className=''>{book.wordCount}</TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }

export default function Page () {
  return <></>
}
