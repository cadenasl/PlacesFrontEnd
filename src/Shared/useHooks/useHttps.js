
import {useState,useCallback,useRef,useEffect} from "react"



const useHttps=()=>{

    const[isLoading,setIsLoading]=useState(false)
    const[error,setError]=useState()
    const activeHttpRequests=useRef([])

    const request=useCallback(async(url,method="GET",headers,body)=>{
        setIsLoading(true)
       //creates an abort controller for the custom hooks and adds it to our ref array 
        const abortController= new AbortController()
        activeHttpRequests.current.push(abortController)
        try{const response=await fetch(url,{
        method,
        headers,
        body,
        signal:activeHttpRequests.signal
        //we need put our abort controller on the signal property 
      })
    const responseData=await response.json();

    if(!response.ok){
      throw new Error(responseData.message)
    }
    activeHttpRequests.current.filter(abortctrl=>{return abortctrl!==abortController})
    // removes the abort controller if it succeeds
    setIsLoading(false)
    console.log(responseData)
    return responseData
    
    }catch(err){
        console.error(err)
        setIsLoading(false)
       setError(err.message||"something went wrong, please try again")
       throw err
      }


    },[])

    const clearErrorHandler=()=>{
        setError(null)
        console.log("clicked")
    }
    useEffect(()=>{
        return()=>{activeHttpRequests.current.forEach(controller=>controller.abort())
        //if we leave the page it aborts all request in our active http requests
        } 
    },[])

    return{isLoading,error,request,clearErrorHandler}
}

export default useHttps