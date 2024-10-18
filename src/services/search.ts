import { type ApiSearchResponse, Data } from '../types';


export const searchData = async ( search: string ): Promise<[Error | null, Data?]> => {

   try {

    const resp = await fetch(`http://localhost:3000/api/users?q=${search}`);

    if(!resp.ok ) return [ new Error(`Error searching data: ${resp.statusText}`)];


    const json = await resp.json() as ApiSearchResponse;
    return [ null, json.data ];

   } catch (error) {
    if( error instanceof Error ) return [error];
   }

   return [new Error('Unkonown error')];

}