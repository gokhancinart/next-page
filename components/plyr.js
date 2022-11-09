import React from 'react';
import VideoPlayer from './video.player'

export default function Player({videoUrl, posterUrl}) {
  return (
    <div className="container">
      <VideoPlayer src={videoUrl} poster={posterUrl} />
    </div>
  );
}
