import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

export default function VideoPlayer({ src, poster }) {
  
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    // console.log(video);
    if (!video) return
    video.setAttribute('data-poster', `${poster}`) // poster
    video.controls = true
    const defaultOptions = {};
    // setup the player
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
    } else if (Hls.isSupported()) {
      var hls = new Hls({autoStartLoad: false}) // do not start loading until we attach the video element
      hls.loadSource(src)
      const player = new Plyr(video, defaultOptions); 
      hls.attachMedia(video)
    } else {
      // no native support for HLS, use HLS.js
      var nativeHLS = video.canPlayType('application/vnd.apple.mpegurl'); //check if browser supports native HLS
	    video.src = nativeHLS ? hlsUrl : fallbackUrl; //fallback to MP4 if HLS is not supported
      console.error(
        'This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'
      )
    }

    video.addEventListener('play', function() {
      hls.startLoad();// start loading the stream
    }, {once: true}); // only once
    
  }, [src,videoRef])  // only re-run the effect if src changes
  

  return (
    <>
      <video ref={videoRef} />
      <style jsx>{`
        video {
          max-width: 100%;
        }
      `}</style>
    </>
  )
}
