String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function enterTextInputState(input, selectionStart=0, selectionEnd=null) {
  if (selectionEnd == null)
  {
    selectionEnd = selectionStart;
  }

  if (input.setSelectionRange) 
  {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  } 
  else if (input.createTextRange) 
  {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}



function getSelectedValue(parent) {
  var radioBtns = $(parent).children().children();
  for(var i = 0; i < radioBtns.length; i++){
    if(radioBtns[i].checked){
      return radioBtns[i].value; 
    }
  }
}

function getCheckbox(checkbox) {
    return $(checkbox)[0].checked;
}

function hideOnClickOutside(selector) {

  const outsideClickListener = (event) => {
    if (!$(event.target).closest(selector).length) {

      if ($(selector).is(':visible')) {
        $(selector).hide()
        removeClickListener()
      }
    }
  }

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener)
  }


  document.addEventListener('click', outsideClickListener)
}


function httpGetAsync(theUrl, callback=null)
{
    var xmlHttp = new XMLHttpRequest();

    if (callback == "log")
    {
      xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
        {
          console.log(xmlHttp.responseText);
        }
      }
    }
    else if (callback != null)
    {
      xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
        {
          callback(xmlHttp.responseText);
        }
      }
    }

    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
function get_system_time() {
    return (new Date()).getTime() / 1000;
}
class Timer {
    constructor(duration, start=false) {
        this.duration = 0;
        this.time_begin = get_system_time();
        this.time_pause_offset = 0;
        this.is_paused = true;

        this.time_pause_offset = self.duration = duration
        if (start) {
            this.restart();
        }
    }


    get_time_left() {
        if (this.is_paused) {
            return this.time_pause_offset;
        } else {
            return this.time_begin + this.duration - get_system_time();
        }
    }

    resume_pause(playing) {
        if (this.is_paused && !playing) {
            return;
        }
        if (!this.is_paused) {
            this.time_pause_offset = this.get_time_left();
        } else {
            this.time_begin = get_system_time() - (this.duration - this.time_pause_offset);
            this.time_pause_offset = 0;
        }
        this.is_paused = !playing;
    }

    resume() {
        this.resume_pause(true);
    }

    pause() {
        this.resume_pause(false);
    }

    reset() {
        this.pause();
        this.time_pause_offset = this.duration;
    }
    restart() {
        this.time_pause_offset = this.duration;
        this.resume();
    }

    set(val) {
        this.duration = val;
        let buf = this.is_paused;
        this.reset();
        if (!buf) {
            this.resume();
        }
    }

    get_time_left_formatted() {
        let date = new Date(null);
        let time = this.get_time_left();

        let text = "";
        if (time < 0)
        {
            time -= 1;
            text = "-";
        }
        date.setSeconds(Math.abs(time));

        text += date.toISOString().substr(11, 8);
        return text;
    }
}

