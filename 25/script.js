var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let video
let ambientLight

let animationHasEnded = false
let playerState

const videoId = 'qC0vDKVPCrw'

function onYouTubeIframeAPIReady() {
  video = new YT.Player('video', {
    videoId,
    playerVars: {
      'html5': 1,
      'rel': 0,
      'controls': 0,
      'wmode': 'opaque',
      'fs': 0,
      'modestbranding': 1,
      'showinfo': 0,
      'disablekb': 1,
      'origin': 'http://example.com'
    },
    events: {
      onStateChange: handleVideoStateChange
    }
  })
}

function initAmbientLight() {
  if (!animationHasEnded) return;

  ambientLight = new YT.Player('ambient-light', {
    videoId,
    playerVars: {
      'html5': 1,
      'rel': 0,
      'controls': 0,
      'wmode': 'opaque',
      'fs': 0,
      'modestbranding': 1,
      'showinfo': 0,
      'disablekb': 1,
      'origin': 'http://example.com'
    },
    events: {
      onStateChange: handleAmbientLightStateChange,
    }
  })
}

function handleVideoStateChange(event) {
  if (!ambientLight) return

  switch (event.data) {
    case YT.PlayerState.PLAYING:
      ambientLight?.seekTo(event?.target?.getCurrentTime())
      ambientLight?.playVideo()
      break
    case YT.PlayerState.PAUSED:
      ambientLight?.seekTo(event?.target?.getCurrentTime())
      ambientLight?.pauseVideo()
      break
  }
}

function handleAmbientLightStateChange(event) {
  switch (event.data) {
    case YT.PlayerState.BUFFERING:
    case YT.PlayerState.PLAYING:
      event?.target?.mute()
      const qualityLevels = event.target.getAvailableQualityLevels();
      if (!!qualityLevels?.length) {
        qualityLevels?.reverse()
        const lowestLevel = qualityLevels.find(l => l !== 'auto');
        event.target.setPlaybackQuality(lowestLevel)
      }
      break
  }
}

const app = document.querySelector('#app')

app?.addEventListener('animationend', (e) => {
  if (e.animationName !== 'startup') return

  animationHasEnded = true
  initAmbientLight()
})