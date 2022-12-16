
window.onload = function() {
    var refresherButton = document.getElementById('iframeRefresher');
    if (refresherButton.addEventListener)
        refresherButton.addEventListener('click', refreshIframes, false);
    else
        refresherButton.attachEvent('click', refreshIframes);
}

function refreshIframes() {
	var infoLogIframe = document.getElementsByName('infoLogIframe')[0];
	var errorLogIframe = document.getElementsByName('errorLogIframe')[0];
	infoLogIframe.src = infoLogIframe.src;
	errorLogIframe.src = errorLogIframe.src;
} 
