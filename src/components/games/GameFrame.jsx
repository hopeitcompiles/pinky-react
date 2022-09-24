import { useEffect } from "react";
import { Button, InputGroup, ProgressBar } from "react-bootstrap";
import { Unity, useUnityContext } from "react-unity-webgl";
import {Loading} from "../Loading"
import cardStyle from '../../assets/css/cards/Game.module.css'
import { getGameFilesById } from "../../services/GameService";
import { useState } from "react";

const MAX_UNITY_STABLE_YEAR=2020
export function GameFrame({files}) {
    const [error,setError]=useState('')
    
    const { unityProvider, isLoaded, loadingProgression,requestFullscreen } = useUnityContext({
      loaderUrl: files?.loader,
      dataUrl: files?.data,
      frameworkUrl: files?.framework,
      codeUrl: files?.wasm,
    });    
    
    // We'll round the loading progression to a whole number to represent the
    // percentage of the Unity Application that has loaded.
    const loadingPercentage = Math.round(loadingProgression * 100);
    useEffect(()=>{
      if(!files?.loader || !files?.data || !files?.framework || !files?.wasm){
        setError("There's some files missing for this game")
      }
      return function clean_up(){
        if(true){
          document.location.reload(false)
        }
      }
  },[])

  function handleClickEnterFullscreen() {
    requestFullscreen(true);
  }
  if(error!==''){
    return <h1>{error}</h1>
  }
    return (
      <div className={cardStyle.container_game}>
        {isLoaded === false && (
          // We'll conditionally render the loading overlay if the Unity
          // Application is not loaded.
          <div className={cardStyle.loading}>
            <Loading/>
            <p>{loadingPercentage} %</p>
            <ProgressBar now={loadingPercentage}/>
          </div>
        )}
        <div>
          <Unity className={cardStyle.frame}
            unityProvider={unityProvider}
            devicePixelRatio={devicePixelRatio}
          />
          </div>
          <Button onClick={handleClickEnterFullscreen}>Full Screen</Button>  
        </div>
    );
  }

