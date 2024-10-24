import { useEffect, useState } from 'react';
import { Data } from '../types';
import { searchData } from '../services/search';
import { toast } from "sonner";

export const Search = ( { initialData }: { initialData: Data; } ) => {


  const [ data, setData ] = useState<Data>( initialData );

  const [ search, setSearch ] = useState<string>( '' );

  const handleSearch = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    setSearch( event.target.value );
  };

  useEffect( () => {


    const newPathname = search === '' ? window.location.pathname : `?q=${ search }`;

    window.history.pushState( {}, '', newPathname );

    /* if(search === '' ){
      window.history.pushState({},  '', window.location.pathname );
      return;
    }

    window.history.pushState({},  '', `?q=${search}` ); */
  }, [ search ] );

  useEffect( () => {
    if ( !search ) {
      setData( initialData );
      return;
    }
    searchData( search ).then( ( response ) => {
      const [ error, newData ] = response;
      if ( error ) {
        toast.error( error.message );
        return;
      }
      if ( newData ) setData( newData );
      console.log( newData );
    } );

  }, [ search, initialData ] );



  return (
    <>
      <div>Search</div>
      <form>
        <input type="search" placeholder="Buscar..." value={ search } onChange={ handleSearch } />
      </form>
      <ul>
        {
          data.map( ( row ) => (
            <li key={ row.id }>
              <article>
                {
                  Object.entries( row ).map( ( [ key, value ] ) => <p key={key}><strong>{ key }: </strong>{ value }</p> )
                }
              </article>
            </li>
          ) )
        }
      </ul>
    </>
  );
};