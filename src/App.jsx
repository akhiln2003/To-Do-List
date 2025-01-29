import './App.css'
import InputBox from './components/InputBox'

export const App = () => {
  return (
    <>
      <div className='flex flex-row justify-center items-center w-full h-screen bg-yellow-900'> 
        <div className='rounded-md bg-black/70 w-2/6 h-[30rem] flex flex-col'> 
          <h1 className='text-center text-6xl font-serif text-white listTop border-b border-white mb-10 pb-3'>
            To-Do List
          </h1>
          
          <div className='flex-1 overflow-auto scrollbar-hide '>
            <InputBox />
          </div>
        </div>
      </div>
    </>
  )
}

export default App;