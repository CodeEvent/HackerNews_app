import { useState, useEffect } from 'react'
import { format } from "date-fns"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('programming')
  //programming is the default query which get research by default
  const [text, setText] = useState("")
  //this is what we will be checkin on our form
  const [largeTitle, setLargeTitle] = useState([])
  //it modifies the title of the article
  const [isLoading, setIsLoading] = useState(true)




  useEffect(() => {
    setIsLoading(true)



    const fetchArticles = async () => {
      const res = await fetch(`https://hn.algolia.com/api/v1/search?query=${query}`
        //query is "programmin" as per value passed on useState 
      )



      const data = await res.json()
      setItems(data.hits)
      //this is going to get all articles 
      setLargeTitle(data.hits[0])
      //this is going to get only the title of the article as per index 0 when we access the article
    }

    fetchArticles()
    setIsLoading(false)  //if true, it will keep spinning
  }, [query]) //this means if the query changes, the isLoading needs to run again and so the category will also change on the website


    const handleSubmit = (event) =>{
      event.preventDefault()

      if (!text){  //check if there is no text when you submit
        toast("Input is empty")
      } else {
        setQuery(text) //set the query into the text value
        setText("") //this changes the input when you submit the form
      }
    }





  return <>
    <section className="section">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input 
        type="text" 
        name="Search" 
        id="search" 
        placeholder="Search for something" 
        value={text}
        onChange={(event)=> setText(event.target.value)}
        
        />
        <button>Search</button>
      </form>

    <ToastContainer 
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      


      {isLoading ? (
        <div className="spinner"></div>
      ) : (

        //the ternarny function means "if" isLoading render the spinner, if not render the whole title section with title and headings sections
        <>
          <article className="title">
            <h1>{largeTitle.title}</h1>
            <a href={largeTitle.url} target="_blank" rel="noreferrer">Read Full Article</a>
          </article>


          <p className='category'>Category: <span>{query}</span> </p>
          {/* put the query on the span tag as per css */}




          <article className="cards">
            {items.map(({ author, created_at, title, url, objectId }) => (
              <div key={objectId}>
                <h2>{title}</h2>
                <ul>
                  <li>By {author}</li>
                  <li><a href={url} target="_blank" rel="noreferrer">Read full article</a></li>
                </ul>
                <p>{format(new Date(created_at), "dd MMMM yyyy")}</p>
              </div>
            ))}

          </article>
        </>
      )}
    </section>
  </>
}

export default App;
