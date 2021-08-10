import './imageUploader.css'
import Button from '../FormElements/Button'
import {useEffect, useRef,useState} from 'react'

const ImageUploader=(props)=>{
    const[file,setfile]=useState()
    const[previewUrl,setPreviewUrl]=useState()
    const[isValid,setIsValid]=useState(false)

    useEffect(()=>{
        if(!file){
            return
        }
    
            const fileReader=new FileReader()
            //create file reader to read input file types
            fileReader.onload=()=>{setPreviewUrl(fileReader.result)}
            // use onload to obtain the file in the file reader since thers is not promise on fileReader.readAsDataUrl
            fileReader.readAsDataURL(file)
            //converts file to URL
        
    },[file])
    const pickHandler=(event)=>{
        console.log(event.target.files)
        let pickedfile
        let fileIsValid=isValid
        if(event.target.files&&event.target.files.length===1){
            pickedfile=event.target.files[0]
            console.log(pickedfile)
            setfile(pickedfile)
            setIsValid(true)
            fileIsValid=true
            

        }
        else{
            setIsValid(false)
            fileIsValid=false
        }
        console.log(pickedfile)
        props.onInput(props.id,pickedfile,fileIsValid)
    }
    const imageUploadRef=useRef()

    const openImageUploadHandler=()=>{
        imageUploadRef.current.click()
    }
    return(<div className="form-control"><input
        type='file' ref={imageUploadRef} id={props.id} onChange={pickHandler} style={{display:"none"}} accept=".png,.jpeg,.jpg"
        
    />
    <div className={`image-upload ${props.center&&'center'}`} >
        <div className="image-upload__preview">
        {previewUrl&&<img src={previewUrl} alt="preview"/>}
        {!previewUrl&&<p>Please put an image</p>}
        </div>
        <Button type="button" onClick={openImageUploadHandler}>Pick image</Button>
    </div>
    {!isValid&&<p>{props.errorText}</p>}
    </div>)
}

export default ImageUploader