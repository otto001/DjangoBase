function enterFullscreen(element) {
    if(element.requestFullscreen) 
    {
        element.requestFullscreen();
    } 
    else if(element.mozRequestFullScreen) 
    {
        element.mozRequestFullScreen();
    } 
    else if(element.msRequestFullscreen) 
    {
        element.msRequestFullscreen();
    } 
    else if(element.webkitRequestFullscreen) 
    {
        element.webkitRequestFullscreen();
    }
}


function exitFullscreen() {

    if(document.exitFullscreen) 
    {
        document.exitFullscreen();
    } 
    else if(document.mozCancelFullScreen) 
    {
        document.mozCancelFullScreen();
    } 
    else if(document.webkitExitFullscreen) 
    {
        document.webkitExitFullscreen();
    }
}


if (document.addEventListener)
{
    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
}

function exitHandler()
{
    //console.log(document.webkitIsFullScreen);
    //console.log(document.mozFullScreen);
    //console.log(document.msFullscreenElement);
    if (document.webkitIsFullScreen || document.mozFullScreen || (document.msFullscreenElement && document.msFullscreenElement !== null))
    {
        //console.log("FULLSCREEN exitHandler");
        //console.log(document.webkitIsFullScreen);
        //console.log(document.mozFullScreen);
        //console.log(document.msFullscreenElement !== null);
        if (document.onEnterFullscreen)
        {
            document.onEnterFullscreen();
        }
    }
    else
    {
        if (document.onExitFullscreen)
        {
            document.onExitFullscreen();
        }
    }
}