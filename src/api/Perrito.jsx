import { useState } from 'react'
import { useEffect } from 'react';

export const Perrito = () => {
  const [dogImage, setDog] = useState("");
  const fetchImage = async () => {
    try {
      const response = await fetch("https://random.dog/woof.json");
      const perro = await response.json();

      if (!perro.url.endsWith(".mp4")) {
        setDog(perro.url)
      } else {
        fetchImage()
      }
      console.log(perro)
    } catch (err) {
      console.log("Errooooor" + err)
    }
  };
  
  useEffect(() => {
    fetchImage()
  }, [])

  return (
    <div className="row justify-content-md-center">
      <div className="col-2" />
      <div className="col-8">
        <div className='row gap-3'>
          {dogImage ? (<img src={dogImage} alt="¿Y el perro?" className='imgperro' />) : (
            <p>Guau?...</p>)}
        </div>
        <button type="button" onClick={fetchImage} className="btn btn-outline-danger mt-3">Más perros!</button>
      </div>
      <div className="col-2" />
    </div>
  )
}
