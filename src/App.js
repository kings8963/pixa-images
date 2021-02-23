import React, {useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

  const [ busqueda,guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);
  useEffect(()=>{
    const consultarApi = async () =>{
      if(busqueda ==='')return;

      const imagenesPorPagina = 30;
      const key = '20343204-2bcc78e911646eb03840f66fd';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);
      //calculamos total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits/imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      //Mover pantalla 
      const  jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'});
    }
    consultarApi();
  }, [busqueda, paginaactual])
  //definomos la pagina anterior
  const paginaAnterior = () =>{
    const nuevaPaginaActual = paginaactual - 1;

    if(nuevaPaginaActual === 0)
    {
      return;
    }

    guardarPaginaActual(nuevaPaginaActual);
  }
  //definimos pagina siguiente
  const paginaSiguiente = () =>{
    const nuevaPaginaActual = paginaactual + 1;

    if(nuevaPaginaActual > totalpaginas)
    {
      return;
    }

    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
        <div className="jumbotron">
          <p className = "lead text-center">Buscador de imagenes</p>
         
          <Formulario
            guardarBusqueda={guardarBusqueda}
          />
        </div>
        <div className="row justify-content-center">
            <ListadoImagenes
              imagenes={imagenes}
            />
            {(paginaactual === 1) ? null: (
              <button 
                  type="button" className="bbtn btn-info mr-1" onClick={paginaAnterior}>
                  &laquo; Anterior   
               </button>
            )}

            {(paginaactual == totalpaginas) ? null :(
                 <button type="button" className="bbtn btn-info mr-1" onClick={paginaSiguiente}>
                 Siguiente &raquo;  
                </button>
            )}
        </div>
    </div>
  );
}

export default App;
