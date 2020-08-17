var g_userVideoArray = [];
var g_teamVideoArray = [];
var g_musketVideoArray = [];
var g_userVideoThumbArray = [];
var g_teamVideoThumbArray = [];
var g_musketVideoThumbArray = [];

var g_currentVideoArray = [];
var g_uploadedVideoArray = [];
var g_videoMenuName = "local";
var g_selVideoNum;

var g_currentVideoThumbArray = [];
var g_uploadedVideoThumbArray = [];
var g_videoThumbMenuName = "local";
var g_selVideoThumbNum;

var g_urlVideoThumb;

var g_cropVideoW, g_cropVideoL;

// Show video container
function ShowAddVideoContainer() {
	ShowLocalVideos();
    $("#video-container").removeClass("hidden");
    $("#video-container").addClass("visible");
}

// Hide video container
function HideAddVideoContainer() {
    $("#video-container").removeClass("visible");
    $("#video-container").addClass("hidden");
	
	$("#video-thumb-container").removeClass("visible");
    $("#video-thumb-container").addClass("hidden");
	
	$("#video-thumb-edit-container").removeClass("visible");
    $("#video-thumb-edit-container").addClass("hidden");
	
	$("#videointer-container").css("display", "none");
}

function OnCloseVideoDlg(){
	HideAddVideoContainer();
	LightMenuBtns();
}

function InitVideosMenu(){
		
	//init media menu tabs
	$("#video-user-btn").find("img.media-menu-img").attr("src", "./images/assets/folder.png");
	$("#video-user-btn").find("label.media-menu-txt").css("color", "#666666");
	
	$("#video-team-btn").find("img.media-menu-img").attr("src", "./images/assets/share.png")
	$("#video-team-btn").find("label.media-menu-txt").css("color", "#666666");
	
	$("#video-musketeers-btn").find("img.media-menu-img").attr("src", "./images/assets/share.png")
	$("#video-musketeers-btn").find("label.media-menu-txt").css("color", "#666666");
}

function OnUploadVideos(){
	$("#video-upload-container").removeClass("hidden");
	$("#video-upload-container").addClass("visible");
	$("#video-upload-container").find("button.upload-click-container").css("display", "flex");
	$("#video-upload-container").find("div.uploaded-container").css("display", "none");
	$("#video-upload-container").find("button.pop-upload-btn").css("opacity", "0.3");
	$("#video-upload-container").find("button.pop-upload-btn").prop("disabled", true);
}

function OnCloseVideoUploadDlg(){
	$("#video-upload-container").removeClass("visible");
	$("#video-upload-container").addClass("hidden");
}

function OnVideoOpenFileDialog(){
	var arrayVideo = [];
	var uploadedName;
	g_uploadedVideoArray = [];
	
	$('<input type="file" accept=".avi, .mp4, .mpg" multiple>').on('change', function () {
		var fileInfo = [];
		var path, name;
        var myfiles = this.files; //save selected files to the array
		for(let i=0; i<myfiles.length; i++){
			path = URL.createObjectURL(myfiles[i]).toString();
			name = myfiles[i].name.toString();
			fileInfo = [];
			fileInfo["path"] = path;
			fileInfo["name"] = name;
			arrayVideo.push(fileInfo)
			
			if(i == 0)
				uploadedName = name + "...";
		}
		
		if(arrayVideo.length > 0){
			g_uploadedVideoArray = arrayVideo;
			$("#video-upload-container").find("button.upload-click-container").css("display", "none");
			$("#video-upload-container").find("div.uploaded-container").css("display", "flex");
			$("#video-upload-container").find("label.uploaded-content-txt").text(uploadedName);
			$("#video-upload-container").find("button.pop-upload-btn").css("opacity", "1");
			$("#video-upload-container").find("button.pop-upload-btn").prop("disabled",false);
		}
    }).click();
}

function OnUploadedVideo(){
	switch(g_videoMenuName){
		case "local":
    		g_userVideoArray = g_userVideoArray.concat(g_uploadedVideoArray);
			LoadingVideos(g_userVideoArray);
			break;
		case "team":
    		g_teamVideoArray = g_teamVideoArray.concat(g_uploadedVideoArray);
			LoadingVideos(g_teamVideoArray);
			break;
		case "musket":
    		g_musketVideoArray = g_musketVideoArray.concat(g_uploadedVideoArray);
			LoadingVideos(g_musketVideoArray);
			break;
		default:
    		g_userVideoArray = g_userVideoArray.concat(g_uploadedVideoArray);
			LoadingVideos(g_userVideoArray);
			break;
	}
	
	OnCloseVideoUploadDlg();
}

//show Videos in choosing Image dlg
function LoadingVideos(arrayVideo = []){
	var itemHtml;
	
	g_currentVideoArray = arrayVideo;
	//clear media items in media gallery
	$("#video-grid-container").empty();

	for(let i = 0; i < arrayVideo.length; i++){
		var imageUrl, strName;
		var fileInfo = [];
		
		fileInfo = arrayVideo[i];
		imageUrl = fileInfo["path"];
		strName = fileInfo["name"];

		itemHtml = `<div class="col-md-4 media-logo" id="video-logo-container-`+ i +`">
						<button class="media-logo-btn" onclick="OnVideoSelect(`+ i +`);" >
							<img class="img-fluid media-logo-img" src="./images/assets/5.png" alt="">
						</button>
						<label class="media-menu-txt">` + strName + `</label>
					</div>`;
		$("#video-grid-container").append(itemHtml);
	}
	
	if(g_currentVideoArray.length > 0){
		OnVideoSelect(0);
	}
}

function ShowLocalVideos(){
	InitVideosMenu();
	
	g_videoMenuName = "local";
	$("#video-user-btn").find("img.media-menu-img").attr("src", "./images/assets/folder_selected.png");
	$("#video-user-btn").find("label.media-menu-txt").css("color", "#FBB03B");
	$("#searchVideoField").val("");
	LoadingVideos(g_userVideoArray);
}

function ShowTeamVideos(){
	InitVideosMenu();
	
	g_normalMenuName = "team";
	$("#video-team-btn").find("img.media-menu-img").attr("src", "./images/assets/share_selected.png")
	$("#video-team-btn").find("label.media-menu-txt").css("color", "#FBB03B");
	$("#searchVideoField").val("");
	LoadingVideos(g_teamVideoArray);
}

function ShowMusketeerVideos(){
	InitVideosMenu();
	
	g_normalMenuName = "musket";
	$("#video-musketeers-btn").find("img.media-menu-img").attr("src", "./images/assets/share_selected.png")
	$("#video-musketeers-btn").find("label.media-menu-txt").css("color", "#FBB03B");
	$("#searchVideoField").val("");
	LoadingVideos(g_musketVideoArray);
}

$("#searchVideoField").keyup(function() {
	var strKey;
	var arrayAllVideo = [], arraySearchVideo = [];
	var itemHtml;
	
	switch(g_videoMenuName){
		case "local":
    		arrayAllVideo = g_userVideoArray;
			break;
		case "team":
    		arrayAllVideo = g_teamVideoArray;
			break;
		case "musket":
    		arrayAllVideo = g_musketVideoArray;
			break;
		default:
    		arrayAllVideo = g_userVideoArray;
			break;
	}
	
	strKey = this.value.toString();
	if(strKey == ""){
		arraySearchVideo = arrayAllVideo;
	}
	else{
		for(let i = 0; i < arrayAllVideo.length; i++){
			var strName;
			var fileInfo = [];
			
			fileInfo = arrayAllVideo[i];
			strName = fileInfo["name"].toString();
			if(strName.includes(strKey))
				arraySearchVideo.push(arrayAllVideo[i]);
		}
	}
	
	LoadingVideos(arraySearchVideo);
	
});

function OnVideoSelect(i){
	var mediaLogImg;
	
	g_selVideoNum = i;
	
	for(let j=0; j<g_currentVideoArray.length; j++){
		mediaLogImg = $("#video-logo-container-" + j).find("img.media-logo-img");
		mediaLogImg.css("border", "0px");
	}
	
	mediaLogImg = $("#video-logo-container-" + i).find("img.media-logo-img");
	mediaLogImg.css({"border": "4px solid #FBB03B", "border-radius": "3px"});
}

///////////////////--------Thumb-----//////////////////////////////
function OnVideoThumbPage(){
	if(g_currentVideoArray.length < 1)
		return;
	HideAddVideoContainer();
	
	$("#video-thumb-container").removeClass("hidden");
    $("#video-thumb-container").addClass("visible");
	ShowLocalVideoThumbs();
}

function OnCloseVideoThumbDlg(){
	HideAddVideoContainer();
	LightMenuBtns();
}


function InitVideosThumbMenu(){
		
	//init media menu tabs
	$("#video-thumb-user-btn").find("img.media-menu-img").attr("src", "./images/assets/folder.png");
	$("#video-thumb-user-btn").find("label.media-menu-txt").css("color", "#666666");
	
	$("#video-thumb-team-btn").find("img.media-menu-img").attr("src", "./images/assets/share.png")
	$("#video-thumb-team-btn").find("label.media-menu-txt").css("color", "#666666");
	
	$("#video-thumb-musketeers-btn").find("img.media-menu-img").attr("src", "./images/assets/share.png")
	$("#video-thumb-musketeers-btn").find("label.media-menu-txt").css("color", "#666666");
}

function OnUploadVideoThumbs(){
	$("#video-thumb-upload-container").removeClass("hidden");
	$("#video-thumb-upload-container").addClass("visible");
	$("#video-thumb-upload-container").find("button.upload-click-container").css("display", "flex");
	$("#video-thumb-upload-container").find("div.uploaded-container").css("display", "none");
	$("#video-thumb-upload-container").find("button.pop-upload-btn").css("opacity", "0.3");
	$("#video-thumb-upload-container").find("button.pop-upload-btn").prop("disabled", true);
}

function OnCloseVideoThumbUploadDlg(){
	$("#video-thumb-upload-container").removeClass("visible");
	$("#video-thumb-upload-container").addClass("hidden");
}

function OnVideoThumbOpenFileDialog(){
	var arrayVideoThumb = [];
	var uploadedName;
	g_uploadedVideoThumbArray = [];
	
	$('<input type="file" accept=".png, .jpg, .jpeg" multiple>').on('change', function () {
		var fileInfo = [];
		var path, name;
        var myfiles = this.files; //save selected files to the array
		for(let i=0; i<myfiles.length; i++){
			path = URL.createObjectURL(myfiles[i]).toString();
			name = myfiles[i].name.toString();
			fileInfo = [];
			fileInfo["path"] = path;
			fileInfo["name"] = name;
			arrayVideoThumb.push(fileInfo)
			
			if(i == 0)
				uploadedName = name + "...";
		}
		
		if(arrayVideoThumb.length > 0){
			g_uploadedVideoThumbArray = arrayVideoThumb;
			$("#video-thumb-upload-container").find("button.upload-click-container").css("display", "none");
			$("#video-thumb-upload-container").find("div.uploaded-container").css("display", "flex");
			$("#video-thumb-upload-container").find("label.uploaded-content-txt").text(uploadedName);
			$("#video-thumb-upload-container").find("button.pop-upload-btn").css("opacity", "1");
			$("#video-thumb-upload-container").find("button.pop-upload-btn").prop("disabled",false);
		}
    }).click();
}

function OnUploadedVideoThumb(){
	switch(g_videoThumbMenuName){
		case "local":
    		g_userVideoThumbArray = g_userVideoThumbArray.concat(g_uploadedVideoThumbArray);
			LoadingVideoThumbs(g_userVideoThumbArray);
			break;
		case "team":
    		g_teamVideoThumbArray = g_teamVideoThumbArray.concat(g_uploadedVideoThumbArray);
			LoadingVideoThumbs(g_teamVideoThumbArray);
			break;
		case "musket":
    		g_musketVideoThumbArray = g_musketVideoThumbArray.concat(g_uploadedVideoThumbArray);
			LoadingVideoThumbs(g_musketVideoThumbArray);
			break;
		default:
    		g_userVideoThumbArray = g_userVideoThumbArray.concat(g_uploadedVideoThumbArray);
			LoadingVideoThumbs(g_userVideoThumbArray);
			break;
	}
	
	OnCloseVideoThumbUploadDlg();
}

//show Videos in choosing Image dlg
function LoadingVideoThumbs(arrayVideo = []){
	var itemHtml;
	
	g_currentVideoThumbArray = arrayVideo;
	//clear media items in media gallery
	$("#video-thumb-grid-container").empty();

	for(let i = 0; i < arrayVideo.length; i++){
		var imageUrl, strName;
		var fileInfo = [];
		
		fileInfo = arrayVideo[i];
		imageUrl = fileInfo["path"];
		strName = fileInfo["name"];

		itemHtml = `<div class="col-md-4 media-logo" id="video-thumb-logo-container-`+ i +`">
						<button class="media-logo-btn" onclick="OnVideoThumbSelect(`+ i +`);" >
							<img class="img-fluid media-logo-img" src="`+ imageUrl +`" alt="">
						</button>
						<label class="media-menu-txt">` + strName + `</label>
					</div>`;
		$("#video-thumb-grid-container").append(itemHtml);
	}
	
	if(g_currentVideoThumbArray.length > 0){
		OnVideoThumbSelect(0);
	}
}

function ShowLocalVideoThumbs(){
	InitVideosThumbMenu();
	
	g_videoThumbMenuName = "local";
	$("#video-thumb-user-btn").find("img.media-menu-img").attr("src", "./images/assets/folder_selected.png");
	$("#video-thumb-user-btn").find("label.media-menu-txt").css("color", "#FBB03B");
	$("#searchVideoThumbField").val("");
	LoadingVideoThumbs(g_userVideoThumbArray);
}

function ShowTeamVideoThumbs(){
	InitVideosThumbMenu();
	
	g_videoThumbMenuName = "team";
	$("#video-thumb-team-btn").find("img.media-menu-img").attr("src", "./images/assets/share_selected.png")
	$("#video-thumb-team-btn").find("label.media-menu-txt").css("color", "#FBB03B");
	$("#searchVideoField").val("");
	LoadingVideoThumbs(g_teamVideoThumbArray);
}

function ShowMusketeerVideoThumbs(){
	InitVideosThumbMenu();
	
	g_videoThumbMenuName = "musket";
	$("#video-thumb-musketeers-btn").find("img.media-menu-img").attr("src", "./images/assets/share_selected.png")
	$("#video-thumb-musketeers-btn").find("label.media-menu-txt").css("color", "#FBB03B");
	$("#searchVideoField").val("");
	LoadingVideoThumbs(g_musketVideoThumbArray);
}

$("#searchVideoThumbField").keyup(function() {
	var strKey;
	var arrayAllVideoThumb = [], arraySearchVideoThumb = [];
	var itemHtml;
	
	switch(g_videoThumbMenuName){
		case "local":
    		arrayAllVideoThumb = g_userVideoThumbArray;
			break;
		case "team":
    		arrayAllVideoThumb = g_teamVideoThumbArray;
			break;
		case "musket":
    		arrayAllVideoThumb = g_musketVideoThumbArray;
			break;
		default:
    		arrayAllVideoThumb = g_userVideoThumbArray;
			break;
	}
	
	strKey = this.value.toString();
	if(strKey == ""){
		arraySearchVideoThumb = arrayAllVideoThumb;
	}
	else{
		for(let i = 0; i < arrayAllVideoThumb.length; i++){
			var strName;
			var fileInfo = [];
			
			fileInfo = arrayAllVideoThumb[i];
			strName = fileInfo["name"].toString();
			if(strName.includes(strKey))
				arraySearchVideoThumb.push(arrayAllVideoThumb[i]);
		}
	}
	
	LoadingVideoThumbs(arraySearchVideoThumb);
	
});

function OnVideoThumbSelect(i){
	var mediaLogImg;
	
	g_selVideoThumbNum = i;
	
	for(let j=0; j<g_currentVideoThumbArray.length; j++){
		mediaLogImg = $("#video-thumb-logo-container-" + j).find("img.media-logo-img");
		mediaLogImg.css("border", "0px");
	}
	
	mediaLogImg = $("#video-thumb-logo-container-" + i).find("img.media-logo-img");
	mediaLogImg.css({"border": "4px solid #FBB03B", "border-radius": "3px"});
}


function OnBackVideoPage(){
	HideAddVideoContainer();
	ShowAddVideoContainer();
}


////////--------------Thumb Edit-----------------//////////
//Next Page
function OnVideoThumbEditPage() {
	if(g_currentVideoThumbArray.length < 1)
		return;
	
	var strUrl;
	try{
		strUrl = g_currentVideoThumbArray[g_selVideoThumbNum]["path"].toString();
		HideAddVideoContainer();
		ShowEditVideoThumbPage(strUrl);
	}
	catch(Error){
		
	}
}

function OnCloseVideoEditThumbDlg(){
	HideAddVideoContainer();
	LightMenuBtns();
}

function OnSelectVideoThumbRate(index){
	var thumbTransp;
	
	for(let i=1; i<6; i++){
		$("#video-thumbnail-rate-btn-" + i).css("color", "#E6E6E6");
		$("#video-thumbnail-rate-btn-" + i).css("background-color", "#0E0F11");
	}
	
	$("#video-thumbnail-rate-btn-" + index).css("color", "black");
	$("#video-thumbnail-rate-btn-" + index).css("background-color", "#FBB03B");
	
	switch(index){
		case 1:
			$(".thumb-Transp-container").css("width", "0%");
			break;
		case 2:
			$(".thumb-Transp-container").css("width", "15%");
			break;
		case 3:
			$(".thumb-Transp-container").css("width", "20%");
			break;
		case 4:
			$(".thumb-Transp-container").css("width", "25%");
			break;
		case 5:
			$(".thumb-Transp-container").css("width", "30%");
			break;
		default:
			$(".thumb-Transp-container").css("width", "0%");
			break;
	}
	
	var lW, rW;
	lW = $("#thumbV-Transp-left").width();
	rW = $("#thumbV-Transp-right").width();
	g_cropVideoL = lW * 100 / $("#video-thumb-img").width();
	g_cropVideoW = ($("#video-thumb-img").width() - lW - rW) * 100 / $("#video-thumb-img").width();
}

function ShowEditVideoThumbPage(strUrl){
	$("#video-thumb-edit-container").removeClass("hidden");
	$("#video-thumb-edit-container").addClass("visible");
	$("#video-thumb-edit-container").find("img.thumb-img").attr("src", strUrl);
	OnSelectVideoThumbRate(1);
	g_urlVideoThumb = strUrl;
}

function HideEditVideoThumbPage(){
	$("#video-thumb-edit-container").removeClass("visible");
	$("#video-thumb-edit-container").addClass("hidden");
}

function OnBackVideoThumbPage(){
	HideEditVideoThumbPage();
	OnVideoThumbPage();
}

function OnAddVideoPage(){
	HideEditVideoThumbPage();
	$("#videointer-container").css("display", "flex");
	$("#videointer-log").attr("src", "./images/assets/video_icon.png");
	$("#videointer-log-icon").attr("src", "./images/assets/video_icon.png");
	
//	$("#interacitve-video-img").attr("src", g_urlVideoThumb);
	$("#nav-video-container").children("div:first").remove();
	$("#nav-video-container").prepend("<img class='interacitve-photo-log' id='interacitve-video-img' src='images/assets/10.png'>");

	$("#interacitve-video-img").attr("realsrc", g_urlVideoThumb);
	$("#interacitve-video-img").css({"width" : g_cropVideoW+"%", "left" : g_cropVideoL+"%"});
	$("#interacitve-video-img").resizeAndCrop();
	
	$("#video-inter-item-container").css("width", "50vw");
	$("#video-inter-item-container").width($("#video-inter-item-container").width() * g_cropVideoW /100);
}

function OnSelectVideoInterIcon(){
	$('<input type="file" accept=".png">').on('change', function () {
		var path;
		if(this.files.length > 0 ){
			path = URL.createObjectURL(this.files[0]).toString();
			$("#videointer-log-icon").attr("src", path);
			$("#videointer-log").attr("src", path);
		}
    }).click();
}

function OnDeleteVideoInter(){
	$("#videointer-container").hide();
	LightMenuBtns();
}

var isTVDragging = false;
var startTVX;
function checkMinMax(value){
	var max = $("#video-thumb-img").width();
	if(value < 0)
		return 0;
	if(value > max)
		return max;
	return value;
}

$("#video-thumb-edit-container")
.mousedown(function (evt) {
	evt.preventDefault();
    isTVDragging = true;
    startTVX = evt.pageX;
})
.mousemove(function (evt) {
	evt.preventDefault();
	if(isTVDragging){
		var x, lW, rW;
		x = startTVX - evt.pageX;
		lW = checkMinMax($("#thumbV-Transp-left").width() - x);
		rW = checkMinMax($("#thumbV-Transp-right").width() + x);
		
		if(lW == 0){
			x = $("#thumbV-Transp-left").width();
			$("#thumbV-Transp-left").width(0);
			$("#thumbV-Transp-right").width($("#thumbV-Transp-right").width() + x);
			return;
		}
		if(rW == 0){
			x = $("#thumbV-Transp-right").width();
			$("#thumbV-Transp-right").width(0);
			$("#thumbV-Transp-left").width($("#thumbV-Transp-left").width() + x);
			return;
		}
		
		$("#thumbV-Transp-left").width(lW);
		$("#thumbV-Transp-right").width(rW);
		
		g_cropVideoL = lW * 100 / $("#video-thumb-img").width();
		g_cropVideoW = ($("#video-thumb-img").width() - lW - rW) * 100 / $("#video-thumb-img").width();
	}
	startTVX = evt.pageX;
})
.mouseup(function (evt) {
	evt.preventDefault();
    isTVDragging = false;
    startTVX = 0;
});

//////-----------video interactive page------------////////
var posVideoX, posVideoY, startVideoX, startVideoY, rotationVideo;
var isVideo3DDragging;

$("#video-3d-gizmo").css("visibility", "hidden");

$(document).click(function(event) {
    console.log(event.target);
});

$('#videointer-container')
.on('mousedown', function(event) {
	posVideoX = event.pageX;
	posVideoY = event.pageY;
});

$('#videointer-container')
.on('mouseup', function(event) {
    event.preventDefault();   
	isVideo3DDragging = false;
    if($('#video-inter-item-container .inter-property-tap.tap-move-log').data('isMouseMoveDragStart') === true) {
        $('#video-inter-item-container .inter-property-tap.tap-move-log').data('isMouseMoveDragStart', false);  
		$('#video-inter-item-container .inter-property-tap.tap-move-log').data("isShow", true);
        $('#videointer-main-dlg').css('visibility', 'visible');
        $('#video-inter-item-container .inter-property-tap.tap-rotate-log').css('opacity', '100%');
        $('#video-inter-item-container .inter-property-tap.tap-resize-log').css('opacity', '100%');   
    }
	
	if($('#video-inter-item-container .inter-property-tap.tap-resize-log').data('isMouseMoveDragStart') === true) {
        $('#video-inter-item-container .inter-property-tap.tap-resize-log').data('isMouseMoveDragStart', false);  
		$('#video-inter-item-container .inter-property-tap.tap-resize-log').data("isShow", true);
        $('#videointer-main-dlg').css('visibility', 'visible');
        $('#video-inter-item-container .inter-property-tap.tap-move-log').css('opacity', '100%');   
        $('#video-inter-item-container .inter-property-tap.tap-rotate-log').css('opacity', '100%');
    }
});

$('#videointer-container')
.on('mousemove', function(event) {
	 event.preventDefault();  
	
    if($('#video-inter-item-container .inter-property-tap.tap-move-log').data('isMouseMoveDragStart') === true) { 
        posX = event.clientX - window.innerWidth * 0.57;
        posY = event.clientY - window.innerWidth * 0.013;
        $('#video-pos-container').css({left: posX, top: posY});
    }
	
	if($('#video-inter-item-container .inter-property-tap.tap-resize-log').data('isMouseMoveDragStart') === true) {
		if($('#video-inter-item-container .inter-property-tap.tap-move-log').css("opacity") == 1 || $('#video-inter-item-container .inter-property-tap.tap-rotate-log').css("opacity") == 1)
			return;
		
        var w, h, d;
		w = $("#video-inter-item-container").width();
		h = $("#video-inter-item-container").height();
		d = (Math.abs(posVideoX-event.pageX) + Math.abs(posVideoY-event.pageY))/2;
		if(posVideoX < event.pageX && posVideoY > event.pageY){
			w = w- d;
			h = h - d;
			console.log(event.pageX + "-:-" + event.pageY);
		}
		else if(posVideoX > event.pageX && posVideoY < event.pageY){
			w = w + d;
			h = h + d;
			console.log(event.pageX + "+:+" + event.pageY);
		}
		$("#video-inter-item-container").width(w);
		$("#video-inter-item-container").height(h);
		posVideoX = event.pageX;
		posVideoY = event.pageY;
    }
});

$('#video-inter-item-container .inter-property-tap.tap-move-log')
.click(function(event) {
	if($('#video-inter-item-container .inter-property-tap.tap-move-log').css("opacity") == 0.35)
		return;
	
    event.preventDefault();
    if($(this).data("isShow") === true || typeof $(this).data("isShow") === "undefined"){
		$('#videointer-main-dlg').css('visibility', 'hidden');
		$('#video-inter-item-container .inter-property-tap.tap-rotate-log').css('opacity', '35%');
		$('#video-inter-item-container .inter-property-tap.tap-resize-log').css('opacity', '35%');
		$(this).data("isMouseClicked", true);
		$(this).data("isShow", false);
    } else {
        $('#videointer-main-dlg').css('visibility', 'visible');
        $('#video-inter-item-container .inter-property-tap.tap-rotate-log').css('opacity', '100%');
        $('#video-inter-item-container .inter-property-tap.tap-resize-log').css('opacity', '100%');
        $(this).data("isMouseClicked", false);
        $(this).data("isShow", true);
    }    
});

$('#video-inter-item-container .inter-property-tap.tap-move-log')
.on('mousedown', function(event) {
	if($('#video-inter-item-container .inter-property-tap.tap-move-log').css("opacity") == 0.35)
		return;
	
    if($(this).data('isMouseClicked') === true) {
        $(this).data('isMouseMoveDragStart', true);
        event.preventDefault();        
    }
});

$('#video-inter-item-container .inter-property-tap.tap-move-log')
.on('mouseup', function(event) {
	if($('#video-inter-item-container .inter-property-tap.tap-move-log').css("opacity") == 0.35)
		return;
	
    event.preventDefault();
    if($(this).data('isMouseMoveDragStart') === true){        
        $(this).data('isMouseMoveDragStart', false);  
        $('#videointer-main-dlg').css('visibility', 'visible');
        $('#video-inter-item-container .inter-property-tap.tap-rotate-log').css('opacity', '35%');
        $('#video-inter-item-container .inter-property-tap.tap-resize-log').css('opacity', '35%');        
    }  
});

$('#video-inter-item-container .inter-property-tap.tap-resize-log')
.click(function(event) {
	if($('#video-inter-item-container .inter-property-tap.tap-resize-log').css("opacity") == 0.35)
		return;
	
    event.preventDefault();
    if($(this).data("isShow") === true || typeof $(this).data("isShow") === "undefined"){
		$('#videointer-main-dlg').css('visibility', 'hidden');
		$('#video-inter-item-container .inter-property-tap.tap-move-log').css('opacity', '35%');
		$('#video-inter-item-container .inter-property-tap.tap-rotate-log').css('opacity', '35%');
		$(this).data("isMouseClicked", true);
		$(this).data("isShow", false);
    } else {
        $('#videointer-main-dlg').css('visibility', 'visible');
        $('#video-inter-item-container .inter-property-tap.tap-move-log').css('opacity', '100%');
        $('#video-inter-item-container .inter-property-tap.tap-rotate-log').css('opacity', '100%');
        $(this).data("isMouseClicked", false);
        $(this).data("isShow", true);
    } 
});

$('#video-inter-item-container .inter-property-tap.tap-resize-log')
.on('mousedown', function(event) {
	if($('#video-inter-item-container .inter-property-tap.tap-resize-log').css("opacity") == 0.35)
		return;
	
    if($(this).data('isMouseClicked') === true) {
        $(this).data('isMouseMoveDragStart', true);
        event.preventDefault();        
    }
});

$('#video-inter-item-container .inter-property-tap.tap-resize-log')
.on('mouseup', function(event) {
	if($('#video-inter-item-container .inter-property-tap.tap-resize-log').css("opacity") == 0.35)
		return;
	
    event.preventDefault();
    if($(this).data('isMouseMoveDragStart') === true){        
        $(this).data('isMouseMoveDragStart', false);  
        $('#videointer-main-dlg').css('visibility', 'visible');
        $('#video-inter-item-container .inter-property-tap.tap-rotate-log').css('opacity', '35%');
        $('#video-inter-item-container .inter-property-tap.tap-move-log').css('opacity', '35%');        
    }  
});

$('#video-inter-item-container .inter-property-tap.tap-rotate-log')
.click(function(event) {    
	if($('#video-inter-item-container .inter-property-tap.tap-rotate-log').css("opacity") == 0.35)
		return;
	
    event.preventDefault();
    if($(this).data("isShow") === true || typeof $(this).data("isShow") === "undefined"){
		var w;
		w = $("#video-3d-gizmo").height();
		$("#video-3d-gizmo").width(w);
		$("#video-circle-canvas").attr("width", w);
		$("#video-circle-canvas").attr("height", w);
		
		$("#video-3d-gizmo").css("visibility", "visible");
		drawVideoCircle(false);
		$("#video-h-line-canvas").css("background-color", "#00FF0A");
		$("#video-v-line-canvas").css("background-color", "#1971FF");
		$("#video-h-line-canvas").data("isSel", false);
		$("#video-v-line-canvas").data("isSel", false);
		$("#video-circle-canvas").data("isSel", false);
			
		$('#videointer-main-dlg').css('visibility', 'hidden');
		$('#video-inter-item-container .inter-property-tap.tap-move-log').css('opacity', '35%');
		$('#video-inter-item-container .inter-property-tap.tap-resize-log').css('opacity', '35%');
		$(this).data("isMouseClicked", true);
		$(this).data("isShow", false);
    } else {
		$("#video-3d-gizmo").css("visibility", "hidden");
        $('#videointer-main-dlg').css('visibility', 'visible');
        $('#video-inter-item-container .inter-property-tap.tap-move-log').css('opacity', '100%');
        $('#video-inter-item-container .inter-property-tap.tap-resize-log').css('opacity', '100%');
        $(this).data("isMouseClicked", false);
        $(this).data("isShow", true);
    } 
});

function drawVideoCircle(flag){
	var canvas=document.getElementById("video-circle-canvas");
    var ctx=canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;

	ctx.lineWidth=2;
	ctx.beginPath();
	ctx.arc(w/2, h/2, h/2, 0, 2 * Math.PI);
	if(flag == true){
		ctx.strokeStyle="#FFFF00";
	}
	else
	{
		ctx.strokeStyle="red";
	}
	ctx.stroke();
}

$("#video-circle-canvas").click(function(event){
	if($("#video-h-line-canvas").data("isSel") === true || $("#video-v-line-canvas").data("isSel") === true){
		return;
	}
	
	if($(this).data("isSel") === true || typeof $(this).data("isSel") === "undefined"){
		drawVideoCircle(false);
		$(this).data("isSel", false);
	}
	else{
		drawVideoCircle(true);
		$(this).data("isSel", true);
	}
});

$("#video-h-line-canvas").click(function(event){
	if($("#video-circle-canvas").data("isSel") === true || $("#video-v-line-canvas").data("isSel") === true){
		return;
	}
	
	if($(this).data("isSel") === true || typeof $(this).data("isSel") === "undefined"){
		$(this).css("background-color", "#00FF0A");
		$(this).data("isSel", false);
	}
	else{
		$(this).css("background-color", "#FFFF00");
		$(this).data("isSel", true);
	}
});

$("#video-v-line-canvas").click(function(event){
	if($("#video-circle-canvas").data("isSel") === true || $("#video-h-line-canvas").data("isSel") === true){
		return;
	}
	
	if($(this).data("isSel") === true || typeof $(this).data("isSel") === "undefined"){
		$(this).css("background-color", "#1971FF");
		$(this).data("isSel", false);
	}
	else{
		$(this).css("background-color", "#FFFF00");
		$(this).data("isSel", true);
	}
});

function checkVideoMinMax(val){
	var ret;
	var min, max;
	min = 20;
	max = $("#video-3d-gizmo").width();
	
	ret = val;
	if(ret > max)
		ret = max;
	if(ret < min)
		ret = min;
	
	return ret;
}

$("#video-3d-gizmo")
.mousedown(function (evt) {
	evt.preventDefault();
    isVideo3DDragging = true;
    startVideoX = evt.pageX;
	startVideoY = evt.pageY;
})
.mousemove(function (evt) {
	console.log(evt.pageX + ":" + evt.pageY);
	evt.preventDefault();
	if(isVideo3DDragging){
		var x, y, w, h;
		x = startVideoX - evt.pageX;
		y = startVideoY - evt.pageY;
		w = $("#nav-video-container").width();
		h = $("#nav-video-container").height();
		
		if($("#video-h-line-canvas").data("isSel") === true){
			w = checkVideoMinMax(w + x);
		}
		else if($("#video-v-line-canvas").data("isSel") === true){
			h = checkVideoMinMax(h + y);
		}
		else if($("#video-circle-canvas").data("isSel") === true){
			rotationVideo = (rotationVideo + x) % 360;
			$("#navigate-log").css({"transform" : "rotate(" + rotationVideo + "deg)"});
		}

		$("#nav-video-container").width(w);
		$("#nav-video-container").height(h);
	}
	startVideoX = evt.pageX;
	startVideoY = evt.pageY;
})
.mouseup(function (evt) {
	evt.preventDefault();
    isVideo3DDragging = false;
});

function reset3dgizmoVideo(){
	rotationVideo = 0;
	$("#navigate-log").css({"transform" : "rotate(" + rotationVideo + "deg)"});
	$("#video-h-line-canvas").data("isSel", false);
	$("#video-v-line-canvas").data("isSel", false);
	$("#video-circle-canvas").data("isSel", false);
	$("#video-h-line-canvas").css("background-color", "#00FF0A");
	$("#video-v-line-canvas").css("background-color", "#1971FF");
	drawVideoCircle(false);
}