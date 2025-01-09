const regexList = [
  {
    regex: '/第[一二三四五六七八九十百千零\\d]+章/',
    description:
      "Match chapter titles like '第一章' not just number but also characters"
  },
  {
    regex: '/^第\\d+节/',
    description: "Match chapter titles start with like '第1节' only numbers"
  },
  {
    regex: '/^第\\d+章/',
    description: "Match chapter titles start with like '第1章'"
  },
  {
    regex: '/^(\\d+)\\.(.*?)(?:\\.(.*))?$/',
    description:
      "Match chapter titles start with like '1. Title' or '1.1. Title' or '1.1.1. Title'"
  }
]

export default function RegexExampleForChapter () {
  return (
    <div className='prose-base p-4'>
      <h1>Regex Example for Chapter</h1>
      <p>
        Here are some regex examples for matching chapter titles in a text file.
      </p>
      <ul className='p-0'>
        {regexList.map(({ regex, description }) => (
          <li key={regex} className='border-b border-gray-200'>
            <h2 className='text-green-400'>{regex}</h2>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
