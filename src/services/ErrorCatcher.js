
const catchError = (er) => { 
    if(!er?.response){
        return "Could not contact the server"
    }else if(er.response?.status===400){
        return "Missing username"
    }else if(er.response?.status===401){
        return 'Unauthorized'
    }else if(er.response?.status===403){
        return 'Access denied'
    }else if(er.response?.status===404){
        return 'Not found'
    }else if(er.response?.status===408){
        return 'REQUEST TIMEOUT'
    }else if(er.response?.status===0){
        return 'Could not access the server'
    }else  {
        return 'Something went wrong and we did not catch the error'
    }
}

export default catchError