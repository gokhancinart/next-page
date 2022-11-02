import React from 'react';
import VideoPlayer from './video.player'

export default function Player({videoUrl}) {
  return (
    <div className="container">
      <VideoPlayer src={videoUrl} />
    </div>
  );
}
