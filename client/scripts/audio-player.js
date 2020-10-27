(function() {
  // Cache DOM
  var infoBtn  = document.querySelector('.header__info');
  var playBtn  = document.querySelectorAll('.play__btn');
  var podcast  = document.querySelector('.podcast__entry');
  var podcasts = document.querySelectorAll('.podcast__entry');
  // Custom Audio Player
  var audioplayer = {

    elements: {
      track: '.player__track',
      buttons: '.play__button',
      time: '.times__current',
      container: '.player__controls',
      duration: '.times__total',
      seekbar: '.player__seekbar',
      progress: '.seekbar__progress',
      buffered: '.player__buffered',
      handle: '.seekbar__handle',
      vContainer: '.volume__controls',
      vSeekbar: '.volume__seekbar',
      vProgress: '.volume__progress',
      vHandle: '.volume__handle',
      vButton: '.volume__button'
    },

    init: function(parent) {
      this.parent = parent;
      if (/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) {
        this.isMobile = true;
        this.mousedown = 'touchstart';
        this.mousemove = 'touchmove';
        this.mouseup = 'touchend';
      }
      else {
        this.isMobile = false;
        this.mousedown = 'mousedown';
        this.mousemove = 'mousemove';
        this.mouseup = 'mouseup';
      }
      this.cacheDOM();
      this.bindEvents();
      this.track.volume = 1;
      this.updateVolume(this.track.volume);
    },

    cacheDOM: function() {
      for(var el in this.elements) {
        var domPropery = "this.parent.querySelector(this.elements[el])";
        eval("this." + el + " = " + domPropery);
      }
    },

    getTouch: function(e) {
      return (this.isMobile) ? e.changedTouches[0].pageX : e.pageX;
    },

    bindEvents: function() {
      if (this.track.readyState >= 2) this.getDuration();
      this.track.addEventListener("loadedmetadata", this.getDuration.bind(this));
      this.track.addEventListener('progress', this.getBuffered.bind(this));
      this.buttons.addEventListener('click', this.playorpause.bind(this));
      this.seekbar.addEventListener(this.mousedown, this.skip.bind(this));
      this.container.addEventListener(this.mousedown, this.skip.bind(this));
      this.vContainer.addEventListener(this.mousedown, this.volumeUp.bind(this));
      this.vSeekbar.addEventListener(this.mousedown, this.volumeUp.bind(this));
      this.vButton.addEventListener('click', this.volumeMuteUnmute.bind(this));
    },

    updateVolume: function(volume) {
      var handleWidth = this.vHandle.offsetWidth;
      var seekbarWidth = this.vSeekbar.offsetWidth;
      var currentWidth = volume * seekbarWidth;
      this.vProgress.style.width =  currentWidth + "px";
      this.vHandle.style.left = currentWidth - (handleWidth/2)  + "px";
    },

    volumeMuteUnmute: function() {

      if(this.track.volume === 0 && this.currentVolume === 0) return;
      if(this.track.volume !== 0 || this.currentVolume === 0) {
        this.currentVolume = this.track.volume;
        this.track.volume = 0;
        this.vButton.style.backgroundImage = `url(${require('../images/mute_icon.svg')})`;
      }
      else {
        this.track.volume = this.currentVolume || 0;
        this.vButton.style.backgroundImage = `url(${require('../images/volume_icon.svg')})`;
      }
      this.updateVolume(this.track.volume);
    },

    volumeUp: function(e) {
      var mousemove = this.mousemove;
      var volumeDrag = this.volumeDrag.bind(this);
      var currentWidth = this.getTouch(e) - this.vSeekbar.getBoundingClientRect().left;
      var seekbarWidth = this.vSeekbar.offsetWidth;
      if(currentWidth < 0) currentWidth = 0;
      if(currentWidth >= seekbarWidth) currentWidth = seekbarWidth;
      this.track.volume = currentWidth/seekbarWidth;
      this.updateVolume(this.track.volume);
      window.addEventListener(mousemove, volumeDrag);
      window.addEventListener(this.mouseup, function() {
        window.removeEventListener(mousemove, volumeDrag);
      });
    },

    volumeDrag: function(e) {
      var trackVolume = this.track.volume;
      var currentWidth = this.getTouch(e) - this.vSeekbar.getBoundingClientRect().left;
      var seekbarWidth = this.vSeekbar.offsetWidth;
      if(currentWidth < 0) currentWidth = 0;
      if(currentWidth >= seekbarWidth) currentWidth = seekbarWidth;
      this.vButton.style.backgroundImage = (trackVolume) ? `url(${require('../images/volume_icon.svg')})` : `url(${require('../images/mute_icon.svg')})`;
      this.track.volume = currentWidth/seekbarWidth;
      this.updateVolume(this.track.volume);
    },

    getDuration: function() {
      var duration = this.formatTime(this.track.duration);
      this.duration.innerHTML = duration;
    },

    getBuffered: function() {
      // if (this.track.readyState >= 2) {
      //   var range = 0;
      //   var bf = this.track.buffered;
      //   var time = this.track.currentTime;
      //   while(!(bf.start(range) <= time && time <= bf.end(range))) { range += 1; }
      //   var loadStartPercentage = bf.start(range) / this.track.duration;
      //   var loadEndPercentage = bf.end(range) / this.track.duration;
      //   var loadPercentage = loadEndPercentage - loadStartPercentage;
      //   this.buffered.style.width = loadPercentage * 100 + "%";
      // }
    },

    playorpause: function() {
      var track = this.track;
      var button = this.buttons.style;

      if(!track.paused && !track.ended) {
        track.pause();
        button.backgroundImage = `url(${require('../images/play_icon.svg')})`;
        window.clearInterval(this.interval);
      }
      else {
        track.play();
        button.backgroundImage = `url(${require('../images/pause_icon.svg')})`;
        this.interval = setInterval(this.update.bind(this), 200);
        this.update();
      }
    },

    update: function() {
      var duration     = this.track.duration;
      var currentTime  =  this.track.currentTime;
      var seekbarWidth = this.seekbar.offsetWidth;
      var progressWidth = currentTime*seekbarWidth/duration;

      if(!this.track.ended) {
        this.time.innerHTML = this.formatTime(currentTime);
        this.progress.style.width = progressWidth + "px";
        this.handle.style.left = progressWidth - (this.handle.offsetWidth/2) + "px";
      }
      else {
        this.time.innerHTML = "0:00";
        this.track.pause();
        this.progress.style.width = seekbarWidth + "px";
        this.handle.style.left = seekbarWidth  - (this.handle.offsetWidth/2) + "px"; // just added
        this.buttons.style.backgroundImage = `url(${require('../images/play_icon.svg')})`;
        window.clearInterval(this.interval);
      }
    },

    move: function(e) {
      var timelineWidth = this.seekbar.offsetWidth;
      var newMargLeft = this.getTouch(e) - this.seekbar.getBoundingClientRect().left;
      var newCurrentTime = newMargLeft*this.track.duration/this.seekbar.offsetWidth;

      if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        this.track.currentTime = newCurrentTime;
        this.update();
      }
      if (newMargLeft < 0) this.handle.style.left = "0px";
      if (newMargLeft > timelineWidth) this.handle.style.left = timelineWidth  - (this.handle.offsetWidth/2) + "px";
    },

    skip: function(e) {
      var self = this;
      var mousemove = this.mousemove;
      var x =(this.getTouch(e) - this.seekbar.getBoundingClientRect().left);
      var z = x*this.track.duration/this.seekbar.offsetWidth;
      this.track.currentTime = z;
      if(!this.track.paused) this.playorpause();
      this.update();

      var events = this.move.bind(this);
      window.addEventListener(mousemove, events);
      window.addEventListener(this.mouseup, function(e) {
        window.removeEventListener(mousemove, events);
        if(e.target != this.buttons && !self.track.ended) {
          if(self.track.paused) self.playorpause();
        }
      });
    },

    formatTime: function(time) {
      var mins = parseInt(time/60);
      var secs = parseInt(time%60);
      if(secs<10) secs = "0" + secs;
      return mins + ":" + secs;
    }

  };

 // Play Track Function
 function playTrack(parent, e) {
   var track   = parent.querySelector('.player__track');
   var tracks  = document.querySelectorAll('.player__track');

   if(e && e.target.tagName === "A") {
     tracks.forEach(function(single) {
       single.src = "";
       single.parentNode.parentNode.parentNode.classList.remove('episode--show');
     });
     track.src = 'https://api.soundcloud.com/tracks/' + parent.dataset.track + '/stream?client_id=99bwMlCt7cxnR65zfXwrIvPMQykyRlzh';
     parent.classList.add('episode--show');
     audioplayer.init(parent);
     audioplayer.playorpause();
   }

   if(!e && track.currentSrc !== "") {
     audioplayer.init(parent);
     audioplayer.playorpause();
   }

 }

 // Info Modal Event Handler
 if(infoBtn) {

   var body    = document.querySelector('body');
   var overlay = document.querySelector('.modal__overlay');
   var content = overlay.querySelector('.modal__content');
   var close   = overlay.querySelector('.modal__close');

   var toggleModal = function() {
     body.classList.toggle('modal--open');
   };

   close.addEventListener('click', toggleModal);
   overlay.addEventListener('click', toggleModal);

   content.addEventListener('click', function(e) {
     e.stopPropagation();
   }, false);

   infoBtn.addEventListener('click', function(e) {
     e.preventDefault();
     window.scrollTo(0, 0);
     body.classList.toggle('modal--open');
   });
 }

 // Play Button Event Handler
 if(playBtn) {
   playBtn.forEach(function(item) {
     item.addEventListener('click', function(e) {
       e.preventDefault();
       var parent = this.parentNode.parentNode.parentNode;
       playTrack(parent, e);
     });
   });
 }

 // Animate Podcasts In.
 if(podcasts) {
   podcasts.forEach(function(podcast) {
     podcast.classList.add('is-visible');
   });
 }

 // If single track autoplay
 playTrack(podcast);

})();