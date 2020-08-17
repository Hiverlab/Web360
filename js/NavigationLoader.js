var posNavX, posNavY, startNavX, startNavY, rotationNav;
var isNav3DDragging;

$("#navigate-3d-gizmo").css("visibility", "hidden");

$('.delete-inter-btn')
.on('mouseenter', function() {
    $('.delete-log').attr('src', '../images/assets/delete_black.png');
})
.on('mouseleave', function() {
    $('.delete-log').attr('src', '../images/assets/delete_red.png');
});

function OnSelectNavigationIcon(){
	$('<input type="file" accept=".png">').on('change', function () {
		var path;
		if(this.files.length > 0 ){
			path = URL.createObjectURL(this.files[0]).toString();
			$("#navigate-log-icon").attr("src", path);
			$("#navigate-log").attr("src", path);
		}

    }).click();
}

function OnDeleteNavigation(){
	$("#navigate-container").hide();
	LightMenuBtns();
}

$(document).click(function(event) {
    console.log(event.target);
});

$('#navigate-container')
.on('mousedown', function(event) {
	posNavX = event.pageX;
	posNavY = event.pageY;
});

$('#navigate-container')
.on('mouseup', function(event) {
    event.preventDefault();   
	isNav3DDragging = false;
    if($('#navigate-container .interacitve-item.move-log').data('isMouseMoveDragStart') === true) {
        $('#navigate-container .interacitve-item.move-log').data('isMouseMoveDragStart', false);  
		$('#navigate-container .interacitve-item.move-log').data("isShow", true);
        $('#navigate-container .interacitve-main-dlg').css('visibility', 'visible');
        $('#navigate-container .interacitve-item.rotate-log').css('opacity', '100%');
        $('#navigate-container .interacitve-item.resize-log').css('opacity', '100%');   
    }
	
	if($('#navigate-container .interacitve-item.resize-log').data('isMouseMoveDragStart') === true) {
        $('#navigate-container .interacitve-item.resize-log').data('isMouseMoveDragStart', false);  
		$('#navigate-container .interacitve-item.resize-log').data("isShow", true);
        $('#navigate-container .interacitve-main-dlg').css('visibility', 'visible');
        $('#navigate-container .interacitve-item.move-log').css('opacity', '100%');   
        $('#navigate-container .interacitve-item.rotate-log').css('opacity', '100%');
    }
});

$('#navigate-container')
.on('mousemove', function(event) {
	 event.preventDefault();  
	
    if($('#navigate-container .interacitve-item.move-log').data('isMouseMoveDragStart') === true) { 
		if($('#navigate-container .interacitve-item.resize-log').css("opacity") == 1 || $('#navigate-container .interacitve-item.rotate-log').css("opacity") == 1)
			return;
        posX = event.clientX - window.innerWidth * 0.19;
        posY = event.clientY - window.innerWidth * 0.17;
        $('#nav-pos-container').css({left: posX, top: posY});
//		posX = event.clientX - $("#naviagte-item-container").width();
//        posY = event.clientY - window.innerWidth * 0.17;
//        $('#nav-pos-container').css({left: posX, top: posY});
    }
	
	if($('#navigate-container .interacitve-item.resize-log').data('isMouseMoveDragStart') === true) {
		if($('#navigate-container .interacitve-item.move-log').css("opacity") == 1 || $('#navigate-container .interacitve-item.rotate-log').css("opacity") == 1)
			return;
		
        var w, h, d;
		w = $("#naviagte-item-container").width();
		h = $("#naviagte-item-container").height();
		d = (Math.abs(posNavX-event.pageX) + Math.abs(posNavY-event.pageY))/2;
		if(posNavX < event.pageX && posNavY > event.pageY){
			w = w- d;
			h = h - d;
			console.log(event.pageX + "-:-" + event.pageY);
		}
		else if(posNavX > event.pageX && posNavY < event.pageY){
			w = w + d;
			h = h + d;
			console.log(event.pageX + "+:+" + event.pageY);
		}
		$("#naviagte-item-container").width(w);
		$("#naviagte-item-container").height(h);
		posNavX = event.pageX;
		posNavY = event.pageY;
    }
});

$('#navigate-container .interacitve-item.move-log')
.click(function(event) {
	if($('#navigate-container .interacitve-item.move-log').css("opacity") == 0.35)
		return;
	
    event.preventDefault();
    if($(this).data("isShow") === true || typeof $(this).data("isShow") === "undefined"){
		$('#navigate-container .interacitve-main-dlg').css('visibility', 'hidden');
		$('#navigate-container .interacitve-item.rotate-log').css('opacity', '35%');
		$('#navigate-container .interacitve-item.resize-log').css('opacity', '35%');
		$(this).data("isMouseClicked", true);
		$(this).data("isShow", false);
    } else {
        $('#navigate-container .interacitve-main-dlg').css('visibility', 'visible');
        $('#navigate-container .interacitve-item.rotate-log').css('opacity', '100%');
        $('#navigate-container .interacitve-item.resize-log').css('opacity', '100%');
        $(this).data("isMouseClicked", false);
        $(this).data("isShow", true);
    }    
});

$('#navigate-container .interacitve-item.move-log')
.on('mousedown', function(event) {
	if($('#navigate-container .interacitve-item.move-log').css("opacity") == 0.35)
		return;
	
    if($(this).data('isMouseClicked') === true) {
        $(this).data('isMouseMoveDragStart', true);
        event.preventDefault();        
    }
});

$('#navigate-container .interacitve-item.move-log')
.on('mouseup', function(event) {
	if($('#navigate-container .interacitve-item.move-log').css("opacity") == 0.35)
		return;
	
    event.preventDefault();
    if($(this).data('isMouseMoveDragStart') === true){        
        $(this).data('isMouseMoveDragStart', false);  
        $('#navigate-container .interacitve-main-dlg').css('visibility', 'visible');
        $('#navigate-container .interacitve-item.rotate-log').css('opacity', '35%');
        $('#navigate-container .interacitve-item.resize-log').css('opacity', '35%');        
    }  
});

$('#navigate-container .interacitve-item.resize-log')
.click(function(event) {
	if($('#navigate-container .interacitve-item.resize-log').css("opacity") == 0.35)
		return;
	
    event.preventDefault();
    if($(this).data("isShow") === true || typeof $(this).data("isShow") === "undefined"){
		$('#navigate-container .interacitve-main-dlg').css('visibility', 'hidden');
		$('#navigate-container .interacitve-item.move-log').css('opacity', '35%');
		$('#navigate-container .interacitve-item.rotate-log').css('opacity', '35%');
		$(this).data("isMouseClicked", true);
		$(this).data("isShow", false);
    } else {
        $('#navigate-container .interacitve-main-dlg').css('visibility', 'visible');
        $('#navigate-container .interacitve-item.move-log').css('opacity', '100%');
        $('#navigate-container .interacitve-item.rotate-log').css('opacity', '100%');
        $(this).data("isMouseClicked", false);
        $(this).data("isShow", true);
    } 
});

$('#navigate-container .interacitve-item.resize-log')
.on('mousedown', function(event) {
	if($('#navigate-container .interacitve-item.resize-log').css("opacity") == 0.35)
		return;
	
    if($(this).data('isMouseClicked') === true) {
        $(this).data('isMouseMoveDragStart', true);
        event.preventDefault();        
    }
});

$('#navigate-container .interacitve-item.resize-log')
.on('mouseup', function(event) {
	if($('#navigate-container .interacitve-item.resize-log').css("opacity") == 0.35)
		return;
	
    event.preventDefault();
    if($(this).data('isMouseMoveDragStart') === true){        
        $(this).data('isMouseMoveDragStart', false);  
        $('#navigate-container .interacitve-main-dlg').css('visibility', 'visible');
        $('#navigate-container .interacitve-item.rotate-log').css('opacity', '35%');
        $('#navigate-container .interacitve-item.move-log').css('opacity', '35%');        
    }  
});

$('#navigate-container .interacitve-item.rotate-log')
.click(function(event) {    
	if($('#navigate-container .interacitve-item.rotate-log').css("opacity") == 0.35)
		return;
	
    event.preventDefault();
    if($(this).data("isShow") === true || typeof $(this).data("isShow") === "undefined"){
		var w;
		w = $("#navigate-3d-gizmo").height();
		$("#navigate-3d-gizmo").width(w);
		$("#navigate-circle-canvas").attr("width", w);
		$("#navigate-circle-canvas").attr("height", w);
		
		$("#navigate-3d-gizmo").css("visibility", "visible");
		drawNavCircle(false);
		$("#nav-h-line-canvas").css("background-color", "#00FF0A");
		$("#nav-v-line-canvas").css("background-color", "#1971FF");
		$("#nav-h-line-canvas").data("isSel", false);
		$("#nav-v-line-canvas").data("isSel", false);
		$("#nav-circle-canvas").data("isSel", false);
			
		$('#navigate-container .interacitve-main-dlg').css('visibility', 'hidden');
		$('#navigate-container .interacitve-item.move-log').css('opacity', '35%');
		$('#navigate-container .interacitve-item.resize-log').css('opacity', '35%');
		$(this).data("isMouseClicked", true);
		$(this).data("isShow", false);
    } else {
		$("#navigate-3d-gizmo").css("visibility", "hidden");
        $('#navigate-container .interacitve-main-dlg').css('visibility', 'visible');
        $('#navigate-container .interacitve-item.move-log').css('opacity', '100%');
        $('#navigate-container .interacitve-item.resize-log').css('opacity', '100%');
        $(this).data("isMouseClicked", false);
        $(this).data("isShow", true);
    } 
});

function drawNavCircle(flag){
	var canvas=document.getElementById("nav-circle-canvas");
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

$("#nav-circle-canvas").click(function(event){
	if($("#nav-h-line-canvas").data("isSel") === true || $("#nav-v-line-canvas").data("isSel") === true){
		return;
	}
	
	if($(this).data("isSel") === true || typeof $(this).data("isSel") === "undefined"){
		drawNavCircle(false);
		$(this).data("isSel", false);
	}
	else{
		drawNavCircle(true);
		$(this).data("isSel", true);
	}
});

$("#nav-h-line-canvas").click(function(event){
	if($("#nav-circle-canvas").data("isSel") === true || $("#nav-v-line-canvas").data("isSel") === true){
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

$("#nav-v-line-canvas").click(function(event){
	if($("#nav-circle-canvas").data("isSel") === true || $("#nav-h-line-canvas").data("isSel") === true){
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

function checkNavMinMax(val){
	var ret;
	var min, max;
	min = 20;
	max = $("#navigate-3d-gizmo").width();
	
	ret = val;
	if(ret > max)
		ret = max;
	if(ret < min)
		ret = min;
	
	return ret;
}

$("#navigate-3d-gizmo")
.mousedown(function (evt) {
	evt.preventDefault();
    isNav3DDragging = true;
    startNavX = evt.pageX;
	startNavY = evt.pageY;
})
.mousemove(function (evt) {
	console.log(evt.pageX + ":" + evt.pageY);
	evt.preventDefault();
	if(isNav3DDragging){
		var x, y, w, h;
		x = startNavX - evt.pageX;
		y = startNavY - evt.pageY;
		w = $("#navigate-log-container").width();
		h = $("#navigate-log-container").height();
		
		if($("#nav-h-line-canvas").data("isSel") === true){
			w = checkNavMinMax(w + x);
		}
		else if($("#nav-v-line-canvas").data("isSel") === true){
			h = checkNavMinMax(h + y);
		}
		else if($("#nav-circle-canvas").data("isSel") === true){
			rotationNav = (rotationNav + x) % 360;
			$("#navigate-log").css({"transform" : "rotate(" + rotationNav + "deg)"});
		}

		$("#navigate-log-container").width(w);
		$("#navigate-log-container").height(h);
	}
	startNavX = evt.pageX;
	startNavY = evt.pageY;
})
.mouseup(function (evt) {
	evt.preventDefault();
    isNav3DDragging = false;
});

function reset3dgizmoNav(){
	$("#navigate-log-container").css("width", "70%");
	$("#navigate-log-container").css("height", "70%");
	rotationNav = 0;
	$("#navigate-log").css({"transform" : "rotate(" + rotationNav + "deg)"});
	$("#nav-h-line-canvas").data("isSel", false);
	$("#nav-v-line-canvas").data("isSel", false);
	$("#nav-circle-canvas").data("isSel", false);
	$("#nav-h-line-canvas").css("background-color", "#00FF0A");
	$("#nav-v-line-canvas").css("background-color", "#1971FF");
	drawNavCircle(false);
}