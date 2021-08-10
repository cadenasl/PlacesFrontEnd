import {useCallback,useReducer } from "react";

const reducer=(state,action)=>{
    switch(action.type){
        case 'INPUT_CHANGE':
            let formIsValid=true
            for( const input in state.inputs){
                if(!state.inputs[input]){
                    continue
                }
                
                
                if(input===action.inputId){
                    
                    formIsValid=formIsValid&&action.isValid
                    
                }
                else{formIsValid=formIsValid&&state.inputs[input].isValid}
            }
            return{
                

                ...state,
                inputs:{
                    ...state.inputs,
                    [action.inputId]:{value:action.value,isValid:action.isValid}
                },
                isValid:formIsValid
             
                

            }

            case "SET_DATA":
                return{
                    inputs:action.inputs,
                    isValid:action.formIsValid
                }
            default:
                return state
    }
}


export const useForm=(intialInputs,intialFormValidity)=>{

    const[reducerState,dispatch]=useReducer(reducer,{
        inputs:intialInputs,
        isValid:intialFormValidity
    })

    
    const InputHandler=useCallback((id,value,isValid)=>{
        console.log(isValid)
        dispatch({type:'INPUT_CHANGE',value:value,inputId:id,isValid:isValid})
    },[])

    const setFormData=useCallback((inputData,formValidity)=>{
        dispatch({
            type:'SET_DATA',
            inputs:inputData,
            formIsValid:formValidity
        })
    },[])

return[reducerState,InputHandler,setFormData]
}


export default useForm