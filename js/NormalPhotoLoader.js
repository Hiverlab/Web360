var g_userPhotoArray = [];
var g_teamPhotoArray = [];
var g_musketPhotoArray = [];
var g_currentPhotoArray = [];
var g_uploadedPhotoArray = [];
var g_photoMenuName = "local";
var g_selPhotoNum;
var g_urlPhotoThumb;

var g_cropPhotoW, g_cropPhotoL;

// Show normal photos container
function ShowAddPhotoContainer() {
	ShowLocalNormalPhotos();
    $("#normal-photo-container").removeClass("hidden");
    $("#normal-photo-container").addClass("visible");
}

// Hide normal photos container
function HideAddPhotoContainer() {
    $("#normal-photo-container").removeClass("visible");
    $("#normal-photo-container").addClass("hidden");
	
	$("#photo-thumb-container").removeClass("visible");
    $("#photo-thumb-container").addClass("hidden");
	
	$("#photointer-container").css("display", "none");
}

function OnCloseNormalPhotoDlg(){
	HideAddPhotoContainer();
	LightMenuBtns();
}

function InitNormalPhotosMenu(){
		
	//init media menu tabs
	$("#normal-photo-user-btn").find("img.media-menu-img").attr("src", "./images/assets/folder.png");
	$("#normal-photo-user-btn").find("label.media-menu-txt").css("color", "#666666");
	
	$("#normal-photo-team-btn").find("img.media-menu-img").attr("src", "./images/assets/share.png")
	$("#normal-photo-team-btn").find("label.media-menu-txt").css("color", "#666666");
	
	$("#normal-photo-musketeers-btn").find("img.media-menu-img").attr("src", "./images/assets/share.png")
	$("#normal-photo-musketeers-btn").find("label.media-menu-txt").css("color", "#666666");
}

function OnUploadNormalPhotos(){
	$("#photo-upload-container").removeClass("hidden");
	$("#photo-upload-container").addClass("visible");
	$("#photo-upload-container").find("button.upload-click-container").css("display", "flex");
	$("#photo-upload-container").find("div.uploaded-container").css("display", "none");
	$("#photo-upload-container").find("button.pop-upload-btn").css("opacity", "0.3");
	$("#photo-upload-container").find("button.pop-upload-btn").prop("disabled", true);
}

function OnClosePhotoUploadDlg(){
	$("#photo-upload-container").removeClass("visible");
	$("#photo-upload-container").addClass("hidden");
}

function OnPhotoOpenFileDialog(){
	var arrayPhoto = [];
	var uploadedName;
	g_uploadedPhotoArray = [];
	
	$('<input type="file" accept=".jpg, .png, .jpeg" multiple>').on('change', function () {
		var fileInfo = [];
		var path, name;
        var myfiles = this.files; //save selected files to the array
		for(let i=0; i<myfiles.length; i++){
			path = URL.createObjectURL(myfiles[i]).toString();
			name = myfiles[i].name.toString();
			fileInfo = [];
			fileInfo["path"] = path;
			fileInfo["name"] = name;
			arrayPhoto.push(fileInfo)
			
			if(i == 0)
				uploadedName = name + "...";
		}
		
		if(arrayPhoto.length > 0){
			g_uploadedPhotoArray = arrayPhoto;
			$("#photo-upload-container").find("button.upload-click-container").css("display", "none");
			$("#photo-upload-container").find("div.uploaded-container").css("display", "flex");
			$("#photo-upload-container").find("label.uploaded-content-txt").text(uploadedName);
			$("#photo-upload-container").find("button.pop-upload-btn").css("opacity", "1");
			$("#photo-upload-container").find("button.pop-upload-btn").prop("disabled",false);
		}
    }).click();
}

function OnUploadedNormalPhoto(){
	switch(g_photoMenuName){
		case "local":
    		g_userPhotoArray = g_userPhotoArray.concat(g_uploadedPhotoArray);
			LoadingNormalPhotos(g_userPhotoArray);
			break;
		case "team":
    		g_teamPhotoArray = g_teamPhotoArray.concat(g_uploadedPhotoArray);
			LoadingNormalPhotos(g_teamPhotoArray);
			break;
		case "musket":
    		g_musketPhotoArray = g_musketPhotoArray.concat(g_uploadedPhotoArray);
			LoadingNormalPhotos(g_musketPhotoArray);
			break;
		default:
    		g_userPhotoArray = g_userPhotoArray.concat(g_uploadedPhotoArray);
			LoadingNormalPhotos(g_userPhotoArray);
			break;
	}
	
	OnClosePhotoUploadDlg();
}

//show photos in choosing Image dlg
function LoadingNormalPhotos(arrayPhoto = []){
	var itemHtml;
	
	g_currentPhotoArray = arrayPhoto;
	//clear media items in media gallery
	$("#normal-photo-grid-container").empty();

	for(let i = 0; i < arrayPhoto.length; i++){
		var imageUrl, strName;
		var fileInfo = [];
		
		fileInfo = arrayPhoto[i];
		imageUrl = fileInfo["path"];
		strName = fileInfo["name"];

		itemHtml = `<div class="col-md-4 media-logo" id="photo-logo-container-`+ i +`">
						<button class="media-logo-btn" onclick="OnPhotoSelect(`+ i +`);" >
							<img class="img-fluid media-logo-img" src="` + imageUrl + `" alt="">
						</button>
						<label class="media-menu-txt">` + strName + `</label>
					</div>`;
		$("#normal-photo-grid-container").append(itemHtml);
	}
	
	if(g_currentPhotoArray.length > 0){
		OnPhotoSelect(0);
	}
}

function ShowLocalNormalPhotos(){
	InitNormalPhotosMenu();
	
	g_normalMenuName = "local";
	$("#normal-photo-user-btn").find("img.media-menu-img").attr("src", "./images/assets/folder_selected.png");
	$("#normal-photo-user-btn").find("label.media-menu-txt").css("color", "#FBB03B");
	$("#searchNormalPhotoField").val("");
	LoadingNormalPhotos(g_userPhotoArray);
}

function ShowTeamNormalPhotos(){
	InitNormalPhotosMenu();
	
	g_normalMenuName = "team";
	$("#normal-photo-team-btn").find("img.media-menu-img").attr("src", "./images/assets/share_selected.png")
	$("#normal-photo-team-btn").find("label.media-menu-txt").css("color", "#FBB03B");
	$("#searchNormalPhotoField").val("");
	LoadingNormalPhotos(g_teamPhotoArray);
}

function ShowMusketeerNormalPhotos(){
	InitNormalPhotosMenu();
	
	g_normalMenuName = "musket";
	$("#normal-photo-musketeers-btn").find("img.media-menu-img").attr("src", "./images/assets/share_selected.png")
	$("#normal-photo-musketeers-btn").find("label.media-menu-txt").css("color", "#FBB03B");
	$("#searchNormalPhotoField").val("");
	LoadingNormalPhotos(g_musketPhotoArray);
}

$("#searchNormalPhotoField").keyup(function() {
	var strKey;
	var arrayAllPhoto = [], arraySearchPhoto = [];
	var itemHtml;
	
	switch(g_photoMenuName){
		case "local":
    		arrayAllPhoto = g_userPhotoArray;
			break;
		case "team":
    		arrayAllPhoto = g_teamPhotoArray;
			break;
		case "musket":
    		arrayAllPhoto = g_musketPhotoArray;
			break;
		default:
    		arrayAllPhoto = g_userPhotoArray;
			break;
	}
	
	strKey = this.value.toString();
	if(strKey == ""){
		arraySearchPhoto = arrayAllPhoto;
	}
	else{
		for(let i = 0; i < arrayAllPhoto.length; i++){
			var strName;
			var fileInfo = [];
			
			fileInfo = arrayAllPhoto[i];
			strName = fileInfo["name"].toString();
			if(strName.includes(strKey))
				arraySearchPhoto.push(arrayAllPhoto[i]);
		}
	}
	
	LoadingNormalPhotos(arraySearchPhoto);
	
});

function OnPhotoSelect(i){
	var mediaLogImg;
	
	g_selPhotoNum = i;
	
	for(let j=0; j<g_currentPhotoArray.length; j++){
		mediaLogImg = $("#photo-logo-container-" + j).find("img.media-logo-img");
		mediaLogImg.css("border", "0px");
	}
	
	mediaLogImg = $("#photo-logo-container-" + i).find("img.media-logo-img");
	mediaLogImg.css({"border": "4px solid #FBB03B", "border-radius": "3px"});
}

//Next Page
function OnPhotoThumbEditPage() {
	if(g_currentPhotoArray.length < 1)
		return;
	
	var strUrl;
	strUrl = g_currentPhotoArray[g_selPhotoNum]["path"].toString();
	HideAddPhotoContainer();
	ShowEditThumbPage(strUrl);
}

function OnCloseNormalPhotoThumbDlg(){
	HideEditThumbPage();
	LightMenuBtns();
}

function OnSelectPhotoRate(index){
	var thumbTransp;
	
	for(let i=1; i<6; i++){
		$("#photo-thumbnail-rate-btn-" + i).css("color", "#E6E6E6");
		$("#photo-thumbnail-rate-btn-" + i).css("background-color", "#0E0F11");
	}
	
	$("#photo-thumbnail-rate-btn-" + index).css("color", "black");
	$("#photo-thumbnail-rate-btn-" + index).css("background-color", "#FBB03B");
	
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
	lW = $("#thumbP-Transp-left").width();
	rW = $("#thumbP-Transp-right").width();
	g_cropPhotoL = lW * 100 / $("#photo-thumb-img").width();
	g_cropPhotoW = ($("#photo-thumb-img").width() - lW - rW) * 100 / $("#photo-thumb-img").width();
}

function ShowEditThumbPage(strUrl){
	$("#photo-thumb-container").removeClass("hidden");
	$("#photo-thumb-container").addClass("visible");
	$("#photo-thumb-container").find("img.thumb-img").attr("src", strUrl);
	OnSelectPhotoRate(1);
	g_urlPhotoThumb = strUrl;
}

function HideEditThumbPage(){
	$("#photo-thumb-container").removeClass("visible");
	$("#photo-thumb-container").addClass("hidden");
}

function OnBcakPhotoPage(){
	HideEditThumbPage();
	ShowAddPhotoContainer();
}

function OnAddPhotoPage(){
	HideEditThumbPage();
	$("#photointer-container").css("display", "flex");
	$("#photointer-log-icon").attr("src", "./images/assets/image_icon.png");
	$("#photointer-log").attr("src", "./images/assets/image_icon.png");
	
	$("#nav-photo-container").children("div:first").remove();
	$("#nav-photo-container").prepend("<img class='interacitve-photo-log' id='interacitve-photo-img' src='images/assets/10.png'>");

	$("#interacitve-photo-img").attr("realsrc", g_urlPhotoThumb);
	$("#interacitve-photo-img").css({"width" : g_cropPhotoW+"%", "left" : g_cropPhotoL+"%"});
	$("#interacitve-photo-img").resizeAndCrop();
	
	$("#photo-inter-item-container").css("width", "50vw");
	$("#photo-inter-item-container").width($("#photo-inter-item-container").width() * g_cropPhotoW /100);
}

function OnSelectPhotoInterIcon(){
	$('<input type="file" accept=".png">').on('change', function () {
		var path;
		if(this.files.length > 0 ){
			path = URL.createObjectURL(this.files[0]).toString();
			$("#photointer-log-icon").attr("src", path);
			$("#photointer-log").attr("src", path);
		}
    }).click();
}

function OnDeletePhotoInter(){
	$("#photointer-container").hide();
	LightMenuBtns();
}

var isTPDragging = false;
var startTPX;
function checkMinMax(value){
	var max = $("#photo-thumb-img").width();
	if(value < 0)
		return 0;
	if(value > max)
		return max;
	return value;
}

$("#photo-thumb-container")
.mousedown(function (evt) {
	evt.preventDefault();
    isTPDragging = true;
    startTPX = evt.pageX;
})
.mousemove(function (evt) {
	evt.preventDefault();
	if(isTPDragging){
		var x, lW, rW;
		x = startTPX - evt.pageX;
		lW = checkMinMax($("#thumbP-Transp-left").width() - x);
		rW = checkMinMax($("#thumbP-Transp-right").width() + x);
		
		if(lW == 0){
			x = $("#thumbP-Transp-left").width();
			$("#thumbP-Transp-left").width(0);
			$("#thumbP-Transp-right").width($("#thumbP-Transp-right").width() + x);
			return;
		}
		if(rW == 0){
			x = $("#thumbP-Transp-right").width();
			$("#thumbP-Transp-right").width(0);
			$("#thumbP-Transp-left").width($("#thumbP-Transp-left").width() + x);
			return;
		}
		
		$("#thumbP-Transp-left").width(lW);
		$("#thumbP-Transp-right").width(rW);
		
		g_cropPhotoL = lW * 100 / $("#photo-thumb-img").width();
		g_cropPhotoW = ($("#photo-thumb-img").width() - lW - rW) * 100 / $("#photo-thumb-img").width();
	}
	startTPX = evt.pageX;
})
.mouseup(function (evt) {
	evt.preventDefault();
    isTPDragging = false;
    startTPX = 0;
});

/////-----------photo interactive------------------------/////
var posPhotoX, posPhotoY, startPhotoX, startPhotoY, rotationPhoto;
var isPhoto3DDragging;

$("#photo-3d-gizmo").css("visibility", "hidden");

$(document).click(function(event) {
    console.log(event.target);
});

$('#photointer-container')
.on('mousedown', function(event) {
	posPhotoX = event.pageX;
	posPhotoY = event.pageY;
});

$('#photointer-container')
.on('mouseup', function(event) {
    event.preventDefault();   
	isPhoto3DDragging = false;
    if($('#photo-inter-item-container .inter-property-tap.tap-move-log').data('isMouseMoveDragStart') === true) {
        $('#photo-inter-item-container .inter-property-tap.tap-move-log').data('isMouseMoveDragStart', false);  
		$('#photo-inter-item-container .inter-property-tap.tap-move-log').data("isShow", true);
        $('#photointer-main-dlg').css('visibility', 'visible');
        $('#photo-inter-item-container .inter-property-tap.tap-rotate-log').css('opacity', '100%');
        $('#photo-inter-item-container .inter-property-tap.tap-resize-log').css('opacity', '100%');   
    }
	
	if($('#photo-inter-item-container .inter-property-tap.tap-resize-log').data('isMouseMoveDragStart') === true) {
        $('#photo-inter-item-container .inter-property-tap.tap-resize-log').data('isMouseMoveDragStart', false);  
		$('#photo-inter-item-container .inter-property-tap.tap-resize-log').data("isShow", true);
        $('#photointer-main-dlg').css('visibility', 'visible');
        $('#photo-inter-item-container .inter-property-tap.tap-move-log').css('opacity', '100%');   
        $('#photo-inter-item-container .inter-property-tap.tap-rotate-log').css('opacity', '100%');
    }
});

$('#photointer-container')
.on('mousemove', function(event) {
	 event.preventDefault();  
	
    if($('#photo-inter-item-container .inter-property-tap.tap-move-log').data('isMouseMoveDragStart') === true) { 
        posX = event.clientX - window.innerWidth * 0.57;
        posY = event.clientY - window.innerWidth * 0.013;
        $('#photo-pos-container').css({left: posX, top: posY});
    }
	
	if($('#photo-inter-item-container .inter-property-tap.tap-resize-log').data('isMouseMoveDragStart') === true) {
		if($('#photo-inter-item-container .inter-property-tap.tap-move-log').css("opacity") == 1 || $('#photo-inter-item-container .inter-property-tap.tap-rotate-log').css("opacity") == 1)
			return;
		
        var w, h, d;
		w = $("#photo-inter-item-container").width();
		h = $("#photo-inter-item-container").height();
		d = (Math.abs(posPhotoX-event.pageX) + Math.abs(posPhotoY-event.pageY))/2;
		if(posPhotoX < event.pageX && posPhotoY > event.pageY){
			w = w- d;
			h = h - d;
			console.log(event.pageX + "-:-" + event.pageY);
		}
		else if(posPhotoX > event.pageX && posPhotoY < event.pageY){
			w = w + d;
			h = h + d;
			console.log(event.pageX + "+:+" + event.pageY);
		}
		$("#photo-inter-item-container").width(w);
		$("#photo-inter-item-container").height(h);
		posPhotoX = event.pageX;
		posPhotoY = event.pageY;
    }
});

$('#photo-inter-item-container .inter-property-tap.tap-move-log')
.click(function(event) {
	if($('#photo-inter-item-container .inter-property-tap.tap-move-log').css("opacity") == 0.35)
		return;
	
    event.preventDefault();
    if($(this).data("isShow") === true || typeof $(this).data("isShow") === "undefined"){
		$('#photointer-main-dlg').css('visibility', 'hidden');
		$('#photo-inter-item-container .inter-property-tap.tap-rotate-log').css('opacity', '35%');
		$('#photo-inter-item-container .inter-property-tap.tap-resize-log').css('opacity', '35%');
		$(this).data("isMouseClicked", true);
		$(this).data("isShow", false);
    } else {
        $('#photointer-main-dlg').css('visibility', 'visible');
        $('#photo-inter-item-container .inter-property-tap.tap-rotate-log').css('opacity', '100%');
        $('#photo-inter-item-container .inter-property-tap.tap-resize-log').css('opacity', '100%');
        $(this).data("isMouseClicked", false);
        $(this).data("isShow", true);
    }    
});

$('#photo-inter-item-container .inter-property-tap.tap-move-log')
.on('mousedown', function(event) {
	if($('#photo-inter-item-container .inter-property-tap.tap-move-log').css("opacity") == 0.35)
		return;
	
    if($(this).data('isMouseClicked') === true) {
        $(this).data('isMouseMoveDragStart', true);
        event.preventDefault();        
    }
});

$('#photo-inter-item-container .inter-property-tap.tap-move-log')
.on('mouseup', function(event) {
	if($('#photo-inter-item-container .inter-property-tap.tap-move-log').css("opacity") == 0.35)
		return;
	
    event.preventDefault();
    if($(this).data('isMouseMoveDragStart') === true){        
        $(this).data('isMouseMoveDragStart', false);  
        $('#photointer-main-dlg').css('visibility', 'visible');
        $('#photo-inter-item-container .inter-property-tap.tap-rotate-log').css('opacity', '35%');
        $('#photo-inter-item-container .inter-property-tap.tap-resize-log').css('opacity', '35%');        
    }  
});

$('#photo-inter-item-container .inter-property-tap.tap-resize-log')
.click(function(event) {
	if($('#photo-inter-item-container .inter-property-tap.tap-resize-log').css("opacity") == 0.35)
		return;
	
    event.preventDefault();
    if($(this).data("isShow") === true || typeof $(this).data("isShow") === "undefined"){
		$('#photointer-main-dlg').css('visibility', 'hidden');
		$('#photo-inter-item-container .inter-property-tap.tap-move-log').css('opacity', '35%');
		$('#photo-inter-item-container .inter-property-tap.tap-rotate-log').css('opacity', '35%');
		$(this).data("isMouseClicked", true);
		$(this).data("isShow", false);
    } else {
        $('#photointer-main-dlg').css('visibility', 'visible');
        $('#photo-inter-item-container .inter-property-tap.tap-move-log').css('opacity', '100%');
        $('#photo-inter-item-container .inter-property-tap.tap-rotate-log').css('opacity', '100%');
        $(this).data("isMouseClicked", false);
        $(this).data("isShow", true);
    } 
});

$('#photo-inter-item-container .inter-property-tap.tap-resize-log')
.on('mousedown', function(event) {
	if($('#photo-inter-item-container .inter-property-tap.tap-resize-log').css("opacity") == 0.35)
		return;
	
    if($(this).data('isMouseClicked') === true) {
        $(this).data('isMouseMoveDragStart', true);
        event.preventDefault();        
    }
});

$('#photo-inter-item-container .inter-property-tap.tap-resize-log')
.on('mouseup', function(event) {
	if($('#photo-inter-item-container .inter-property-tap.tap-resize-log').css("opacity") == 0.35)
		return;
	
    event.preventDefault();
    if($(this).data('isMouseMoveDragStart') === true){        
        $(this).data('isMouseMoveDragStart', false);  
        $('#photointer-main-dlg').css('visibility', 'visible');
        $('#photo-inter-item-container .inter-property-tap.tap-rotate-log').css('opacity', '35%');
        $('#photo-inter-item-container .inter-property-tap.tap-move-log').css('opacity', '35%');        
    }  
});

$('#photo-inter-item-container .inter-property-tap.tap-rotate-log')
.click(function(event) {    
	if($('#photo-inter-item-container .inter-property-tap.tap-rotate-log').css("opacity") == 0.35)
		return;
	
    event.preventDefault();
    if($(this).data("isShow") === true || typeof $(this).data("isShow") === "undefined"){
		var w;
		w = $("#photo-3d-gizmo").height();
		$("#photo-3d-gizmo").width(w);
		$("#photo-circle-canvas").attr("width", w);
		$("#photo-circle-canvas").attr("height", w);
		
		$("#photo-3d-gizmo").css("visibility", "visible");
		drawPhotoCircle(false);
		$("#photo-h-line-canvas").css("background-color", "#00FF0A");
		$("#photo-v-line-canvas").css("background-color", "#1971FF");
		$("#photo-h-line-canvas").data("isSel", false);
		$("#photo-v-line-canvas").data("isSel", false);
		$("#photo-circle-canvas").data("isSel", false);
			
		$('#photointer-main-dlg').css('visibility', 'hidden');
		$('#photo-inter-item-container .inter-property-tap.tap-move-log').css('opacity', '35%');
		$('#photo-inter-item-container .inter-property-tap.tap-resize-log').css('opacity', '35%');
		$(this).data("isMouseClicked", true);
		$(this).data("isShow", false);
    } else {
		$("#photo-3d-gizmo").css("visibility", "hidden");
        $('#photointer-main-dlg').css('visibility', 'visible');
        $('#photo-inter-item-container .inter-property-tap.tap-move-log').css('opacity', '100%');
        $('#photo-inter-item-container .inter-property-tap.tap-resize-log').css('opacity', '100%');
        $(this).data("isMouseClicked", false);
        $(this).data("isShow", true);
    } 
});

function drawPhotoCircle(flag){
	var canvas=document.getElementById("photo-circle-canvas");
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

$("#photo-circle-canvas").click(function(event){
	if($("#photo-h-line-canvas").data("isSel") === true || $("#photo-v-line-canvas").data("isSel") === true){
		return;
	}
	
	if($(this).data("isSel") === true || typeof $(this).data("isSel") === "undefined"){
		drawPhotoCircle(false);
		$(this).data("isSel", false);
	}
	else{
		drawPhotoCircle(true);
		$(this).data("isSel", true);
	}
});

$("#photo-h-line-canvas").click(function(event){
	if($("#photo-circle-canvas").data("isSel") === true || $("#photo-v-line-canvas").data("isSel") === true){
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

$("#photo-v-line-canvas").click(function(event){
	if($("#photo-circle-canvas").data("isSel") === true || $("#photo-h-line-canvas").data("isSel") === true){
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

function checkPhotoMinMax(val){
	var ret;
	var min, max;
	min = 20;
	max = $("#photo-3d-gizmo").width();
	
	ret = val;
	if(ret > max)
		ret = max;
	if(ret < min)
		ret = min;
	
	return ret;
}

$("#photo-3d-gizmo")
.mousedown(function (evt) {
	evt.preventDefault();
    isPhoto3DDragging = true;
    startPhotoX = evt.pageX;
	startPhotoY = evt.pageY;
})
.mousemove(function (evt) {
	console.log(evt.pageX + ":" + evt.pageY);
	evt.preventDefault();
	if(isPhoto3DDragging){
		var x, y, w, h;
		x = startPhotoX - evt.pageX;
		y = startPhotoY - evt.pageY;
		w = $("#nav-photo-container").width();
		h = $("#nav-photo-container").height();
		
		if($("#photo-h-line-canvas").data("isSel") === true){
			w = checkPhotoMinMax(w + x);
		}
		else if($("#photo-v-line-canvas").data("isSel") === true){
			h = checkPhotoMinMax(h + y);
		}
		else if($("#photo-circle-canvas").data("isSel") === true){
			rotationPhoto = (rotationPhoto + x) % 360;
			$("#navigate-log").css({"transform" : "rotate(" + rotationPhoto + "deg)"});
		}

		$("#nav-photo-container").width(w);
		$("#nav-photo-container").height(h);
	}
	startPhotoX = evt.pageX;
	startPhotoY = evt.pageY;
})
.mouseup(function (evt) {
	evt.preventDefault();
    isPhoto3DDragging = false;
});

function reset3dgizmoPhoto(){
	rotationPhoto = 0;
	$("#navigate-log").css({"transform" : "rotate(" + rotationPhoto + "deg)"});
	$("#photo-h-line-canvas").data("isSel", false);
	$("#photo-v-line-canvas").data("isSel", false);
	$("#photo-circle-canvas").data("isSel", false);
	$("#photo-h-line-canvas").css("background-color", "#00FF0A");
	$("#photo-v-line-canvas").css("background-color", "#1971FF");
	drawPhotoCircle(false);
}