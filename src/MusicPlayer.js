import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const YouTubePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const playerRef = useRef(null);
  
  useEffect(() => {
    // Charge l'API YouTube
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Fonction appelée par l'API YouTube lorsqu'elle est prête
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: 'MNcDT53Z5Fs',  // ID de la vidéo
        height: '0',  // Cache l'iframe mais garde la fonctionnalité audio
        width: '0',   // Cache l'iframe mais garde la fonctionnalité audio
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: 'MNcDT53Z5Fs',  // Pour la boucle
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          mute: 1  // Démarrage en muet pour contourner les restrictions d'autoplay
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
            setIsPlaying(true);
            setIsMuted(true); // Commence en muet pour l'autoplay
            setIsLoaded(true);
            
            // Afficher les contrôles après un court délai
            setTimeout(() => setShowControls(true), 1000);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          },
          onError: (event) => {
            console.error("Erreur YouTube:", event.data);
          }
        }
      });
    };
    
    // Nettoyage
    return () => {
      delete window.onYouTubeIframeAPIReady;
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error("Erreur lors de la destruction du lecteur:", e);
        }
      }
    };
  }, []);

  const togglePlay = () => {
    if (!playerRef.current) return;
    
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (e) {
      console.error("Erreur lors du toggle play:", e);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    
    try {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    } catch (e) {
      console.error("Erreur lors du toggle mute:", e);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    
    if (playerRef.current && !isMuted) {
      try {
        playerRef.current.setVolume(newVolume);
      } catch (e) {
        console.error("Erreur lors du changement de volume:", e);
      }
    }
  };

  // Premier clic = activer le son
  const handleFirstInteraction = () => {
    if (isMuted && playerRef.current) {
      try {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
        setIsMuted(false);
      } catch (e) {
        console.error("Erreur lors de l'activation du son:", e);
      }
    }
  };

  return (
    <>
      {!isLoaded && (
        <LoadingOverlay>
          <LoadingSpinner />
          <LoadingText>Chargement de la musique...</LoadingText>
        </LoadingOverlay>
      )}
      
      <PlayerContainer $visible={showControls} onClick={handleFirstInteraction}>
        {/* Div invisible qui contiendra l'iframe YouTube */}
        <YouTubeContainer id="youtube-player" />
        
        <ControlButton onClick={togglePlay}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </ControlButton>
        
        <ControlButton onClick={toggleMute}>
          {isMuted ? <MuteIcon /> : <VolumeIcon />}
        </ControlButton>
        
        <VolumeControl>
          <VolumeSlider
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume}
            onChange={handleVolumeChange}
          />
        </VolumeControl>
        
        {isMuted && <InfoTooltip>🔊 Cliquez pour activer le son</InfoTooltip>}
      </PlayerContainer>
    </>
  );
};

// Icônes SVG
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#00ff66">
    <polygon points="8,5 8,19 19,12" />
  </svg>
);

const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#00ff66">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const VolumeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#00ff66">
    <path d="M6,9 L12,9 L12,15 L6,15 Z" />
    <path d="M14,6 L14,18 L21,12 Z" />
  </svg>
);

const MuteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff4444">
    <path d="M6,9 L12,9 L12,15 L6,15 Z" />
    <path d="M14,6 L14,18 L21,12 Z" />
    <line x1="3" y1="3" x2="21" y2="21" stroke="#ff4444" strokeWidth="2" />
  </svg>
);

// Styles
const PlayerContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(26, 26, 26, 0.9);
  border-radius: 30px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid #00cc00;
  z-index: 1000;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '20px'});
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const YouTubeContainer = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
`;

const VolumeSlider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 4px;
  background: #333;
  border-radius: 2px;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: #00ff66;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const InfoTooltip = styled.div`
  position: absolute;
  top: -40px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(26, 26, 26, 0.9);
  border-radius: 30px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid #00cc00;
  z-index: 1000;
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(0, 204, 0, 0.3);
  border-radius: 50%;
  border-top-color: #00cc00;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  color: white;
  font-size: 14px;
`;

export default YouTubePlayer;