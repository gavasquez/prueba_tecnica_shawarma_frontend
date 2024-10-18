import { ApiUpdloadResponse, Data } from '../types';


export const uploadFile = async ( file: File ): Promise<[Error | null, Data?]> => {

  const formData = new FormData();
  formData.append('file', file);
   try {

    const resp = await fetch(`http://localhost:3000/api/files`, {
      method: 'POST',
      body: formData
    });

    if(!resp.ok ) return [ new Error(`Error uploading file: ${resp.statusText}`)];


    const json = await resp.json() as ApiUpdloadResponse;
    return [ null, json.data ];

   } catch (error) {
    if( error instanceof Error ) return [error];
   }

   return [new Error('Unkonown error')];

}