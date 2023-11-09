import axios from "axios";

const baseUrl = "http://localhost:3001/persons"


const getAll = () =>{
    const request = axios.get(baseUrl);
    return request.then( response => response.data);
}

const create = PersonObj => {
    const request = axios.post(baseUrl, PersonObj);
    return request.then (response => response.data);
}


const update = (id , personObj ) => {
    const request = axios.put(`${baseUrl}/${id}`, personObj);
    console.log(id);
    
    return request.then(response => response.data);
}

const remove = (person) => {
    const request = axios.delete(`${baseUrl}/${person.id}`);
    return (
        request.then(response => {
            response.data;
            console.log(`${person.name} successfully deleted`);                
        })
        
    )
}

export default { getAll, create, update, remove }