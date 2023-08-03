export default function Footer() {
    return (
      <div className='py-7 bg-[#1b252d] text-white grid grid-cols-1 place-items-center w-full'>
        <div className="shadow-lg">
          <div>
            <div className='mb-4 text-white'>
              <p className='font-semibold'>Subscribe to Newsletter</p>
              <p>Get emails from me about web development, tech, and early access to new articles</p>
            </div>
            <div className='relative'>
            <input placeholder='tim@apple.com' className='p-3 text-[#4b586e] rounded-tl-full rounded-bl-full outline-none'/>
            <button className='p-3 bg-[#4b586e] text-white rounded-tr-full rounded-br-full outline-none hover:bg-[#1b252e]'>
              Subscribe</button>
            </div>
          </div>
          <div className='mt-4'>
          <ul className='flex'>
            <li className='px-4'>Facebook</li>
            <li className='px-4'>Instagram</li>
            <li className='px-4'>Twitter</li>
          </ul>
        </div>
        </div>
      </div>
    )
  }