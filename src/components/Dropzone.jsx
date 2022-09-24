import {useCallback, useEffect,useState} from 'react'
import {useDropzone} from 'react-dropzone'
import cardStyle from '../assets/css/DropZone.module.css'
import {BiImage as Icon} from 'react-icons/bi'

export function Dropzone({onChange,change_funct,drop_text,multiple,editable}) {

  const onDrop = useCallback(acceptedFiles => {
    handleUpload(multiple===true?acceptedFiles:acceptedFiles[0])
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    disabled:editable
  })
  const [error,setError]=useState('')
  const [uploading,setUploading]=useState(false)
  const [file,setFile]=useState(null)
  let timer
  
  useEffect(()=>{
    clearTimeout(timer)
    if(error!==''){
      timer = setTimeout(function() {
        setError('')
      }, 3000);
    }
  },[error])

  useEffect(()=>{
    if(file===null){
      return;
    }
    if(onChange){
      onChange(file)
    }
    return () =>{
      if(!file){
        return;
      }
      URL.revokeObjectURL(file)
    }
  },[file])

  const handleUpload=async (file_acepted) =>{
    setUploading(true)
    try{
      const formData = new FormData()
      formData.append('file',file_acepted)
      const response=await change_funct(formData)
      if(file){
        URL.revokeObjectURL(file)
      }
      setFile(URL.createObjectURL(file_acepted))
      setError({success:true,message:(drop_text&&drop_text)+" updated"})
    }catch (error){
      setError({success:false,message:(drop_text&&drop_text)+" update failed"})
    }
    setUploading(false)
  }


  return (
    <div className={cardStyle.zone} {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
            <div className={`${cardStyle.dropping} ${cardStyle.message}`} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
                Drop the {drop_text?drop_text:'file'} here ...
            </div> :
            <div role="button" className={`input-group mb-3 ${cardStyle.not_dropping}`}>
                <span className="input-group-text" id="basic-addon2"><Icon size={25}/></span>
                <div className={`form-control btn-sm `} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
                      {uploading?
                        'Uploading...'
                        :
                        <span>
                          {editable?(
                            <span className={`${cardStyle.message} ${cardStyle.error}`}>{`You can't change the ${drop_text}`}</span>
                            ):
                            <span>
                              {error===''?
                                <span >Drop your {drop_text?drop_text:'file'} here, or click to select one</span>
                              :
                                <span className={`${cardStyle.message} 
                                ${error.success?cardStyle.success:cardStyle.error}`}>{error.message}</span>
                              }
                            </span>
                          }
                        </span>
                      }
                </div>
            </div>
      }
    </div>
  )
}