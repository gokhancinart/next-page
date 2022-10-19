import React from 'react';
import VideoPlayer from './video.player'

export default function Player({videoUrl}) {
  console.log(videoUrl, 'plyr.js')
  return (
    <div className="container">
      <VideoPlayer src={videoUrl} />
    </div>
  );
}
