/*
 *   Copyright (c) 2024 Andrew Halliwell

 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.

 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.

 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeFork, faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { faReact, faFontAwesome, faNodeJs, faNpm } from '@fortawesome/free-brands-svg-icons'
import Translate from './components/Translate'
import Footer from './components/Footer'
import './App.css'

function App() {

  return (
    <>
      <div className='container px-4 mx-auto max-w-6xl'>
        <section className="px-6 sm:px-2 xs:px-1 pt-8">
          <div className="py-8 px-4 bg-white dark:bg-gray-900 rounded-lg text-left mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
              <h1 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">Binary Translator</h1>
              <p className="mb-4 font-bold">This is a front-end React application written in Typescript.</p>
              <p className="mb-4 font-medium">This app takes the text input and writes it to the metadata of a newly created PNG file that is generated from the HTML canvas. The image is an 8bit integer array of binary code translated from the entered text. There is a toggle that determines whether the data will be embedded with 128 bit AES encryption or as plain text. Once you click Save, the file will be downloaded to your computer. Whomever you share the image with would be able to extract and decipher the text by dragging the PNG file into the drop zone and entering the passkey you provide them, if it's encrypted. </p>
              <p className='mb-4 font-medium'>I realise that nobody asked for this, I just made it as a fun, gimmicky way to send secret messages to the people who visit my site <a className='text-blue-900 hover:underline' href='https://www.alifeinbinary.com'>alifeinbinary.com</a> and thought it would be a fun project to share as open source for those who are wanting to learn about the technology within.</p>
              <div className='mb-4'>
                <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Technology involved:</h2>
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                  <li>
                    Typescript
                  </li>
                  <li>
                    React
                  </li>
                  <li>
                    HTML Canvas
                  </li>
                  <li>
                    Encryption in the browser
                  </li>
                  <li>
                    Image generation and consumption
                  </li>
                  <li>
                    Embedding metadata in files
                  </li>
                </ul>
              </div>
              <h3 className='mb-4 text-lg tracking-tight font-bold text-gray-900 dark:text-white'>Created with:</h3>
              <div className='text-3xl flex flex-row'>
                <FontAwesomeIcon icon={faReact} className='hover:text-blue-900' />
                <FontAwesomeIcon icon={faNodeJs} className="ml-2 hover:text-blue-900" />
                <FontAwesomeIcon icon={faFontAwesome} className="ml-2 hover:text-blue-900" />
                <FontAwesomeIcon icon={faNpm} className="ml-2 hover:text-blue-900" />
              </div>
            </div>
          </div>
        </section>
        <span className='flex-row flex pt-2 px-6 justify-between text-white'>
          <div className='grid grid-cols-2 xs:grid-cols-1 w-full'>
            <p className='mb-4 ml-2 xs:ml-0 xs:mb-1 font-medium col-span-1 text-left xs:text-center'><FontAwesomeIcon className='text-sm' icon={faCodeFork} /> Fork this project on <a className='text-blue-100 hover:text-blue-200 hover:underline' href='https://github.com/alifeinbinary/binary-translate' target='_blank'>Github</a></p>
            <p className='font-medium mr-2 xs:mr-0 col-span-1 text-right xs:text-center'>Like my work? <a href='https://www.alifeinbinary.com/contact' target='_blank' className='text-blue-100 hover:text-blue-200 hover:underline'>Hire me</a> <FontAwesomeIcon icon={faFaceSmile} className="ml-1 text-lg text-yellow-200" /></p>
          </div>
        </span>
        <Translate />
      </div>
      <Footer />
    </>
  )
}

export default App
