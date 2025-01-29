import './App.css'
import InputBox from './components/InputBox'

export const App = () => {
  return (
    <div className='flex flex-row justify-center items-center w-full min-h-screen bg-yellow-900 p-4'> 
      <div className='rounded-md bg-black/70 w-full max-w-3xl mx-auto h-[90vh] md:h-[80vh] flex flex-col'> 
        <h1 className='text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white listTop border-b border-white mb-4 sm:mb-6 md:mb-8 lg:mb-10 pb-2 sm:pb-3 px-2'>
          To-Do List
        </h1>
        
        <div className='flex-1 overflow-auto scrollbar-hide'>
          <InputBox />
        </div>
      </div>
    </div>
  )
}

export default App;