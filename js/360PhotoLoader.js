var g_user360Array = [];
var g_team360Array = [];
var g_musket360Array = [];
var g_current360Array = [];
var g_uploaded360Array = [];
var g_360MenuName = "local";

function GetUserPhotosFromServer(){
	var photoUrls = ["./images/backgrounds/conference room_00000.jpg", "./images/backgrounds/education_00000.jpg", "./images/backgrounds/entrance 2_00000.jpg", "./images/backgrounds/entrance_00000.jpg", "./images/backgrounds/industry 4_00000.jpg", "./images/backgrounds/main area_00000.jpg", "./images/backgrounds/retail_00000.jpg", "./images/backgrounds/room_00000.jpg", "./images/backgrounds/Viewpoint C 2310.png", "./images/backgrounds/Viewpoint E 2310.png"];
	
	return photoUrls;
}

// Show 360 photos container
function ShowAddSceneContainer() {
	ShowLocal360Photos();
    $("#360-photo-container").removeClass("hidden");
    $("#360-photo-container").addClass("visible");
}

// Hide 360 photos container
function HideAddSceneContainer() {
    $("#360-photo-container").removeClass("visible");
    $("#360-photo-container").addClass("hidden");
}

function OnClose360PhotoDlg(){
	HideAddSceneContainer();
}

function Init360PhotosMenu(){
		
	//init media menu tabs
	$("#360-photo-user-btn").find("img.media-menu-img").attr("src", "../images/assets/folder.png");
	$("#360-photo-user-btn").find("label.media-menu-txt").css("color", "#666666");
	
	$("#360-photo-team-btn").find("img.media-menu-img").attr("src", "../images/assets/share.png")
	$("#360-photo-team-btn").find("label.media-menu-txt").css("color", "#666666");
	
	$("#360-photo-musketeers-btn").find("img.media-menu-img").attr("src", "../images/assets/share.png")
	$("#360-photo-musketeers-btn").find("label.media-menu-txt").css("color", "#666666");
}

function OnUpload360Photos(){
	$("#360-upload-container").removeClass("hidden");
	$("#360-upload-container").addClass("visible");
	
	$("#360-upload-container").find("button.upload-click-container").css("display", "flex");
	$("#360-upload-container").find("div.uploaded-container").css("display", "none");
	$("#360-upload-container").find("button.pop-upload-btn").css("opacity", "0.3");
	$("#360-upload-container").find("button.pop-upload-btn").prop("disabled", true);
}


function OnClose360UploadDlg(){
	$("#360-upload-container").removeClass("visible");
	$("#360-upload-container").addClass("hidden");
}

function On360OpenFileDialog(){
	var arrayPhoto = [];
	var uploadedName;
	g_uploaded360Array = [];
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
			g_uploaded360Array = arrayPhoto;
			$("#360-upload-container").find("button.upload-click-container").css("display", "none");
			$("#360-upload-container").find("div.uploaded-container").css("display", "flex");
			$("#360-upload-container").find("label.uploaded-content-txt").text(uploadedName);
			$("#360-upload-container").find("button.pop-upload-btn").css("opacity", "1");
			$("#360-upload-container").find("button.pop-upload-btn").prop("disabled",false);
		}
    }).click();
}

function OnUploaded360Photo(){
	switch(g_360MenuName){
		case "local":
    		g_user360Array = g_user360Array.concat(g_uploaded360Array);
			Loading360Photos(g_user360Array);
			break;
		case "team":
    		g_team360Array = g_team360Array.concat(g_uploaded360Array);
			Loading360Photos(g_team360Array);
			break;
		case "musket":
    		g_musket360Array = g_musket360Array.concat(g_uploaded360Array);
			Loading360Photos(g_musket360Array);
			break;
		default:
    		g_user360Array = g_user360Array.concat(g_uploaded360Array);
			Loading360Photos(g_user360Array);
			break;
	}
	
	OnClose360UploadDlg();
}

//show 360 photos in choosing 360 photo dlg
function Loading360Photos(arrayPhoto = []){
	var itemHtml;
	
	g_current360Array = arrayPhoto;
	//clear media items in media gallery
	$("#360-photo-grid-container").empty();

	for(let i = 0; i < arrayPhoto.length; i++){
		var imageUrl, strName;
		var fileInfo = [];
		
		fileInfo = arrayPhoto[i];
		imageUrl = fileInfo["path"];
		strName = fileInfo["name"];

		itemHtml = `<div class="col-md-4 media-logo" id="360-logo-container-`+ i +`">
						<button class="media-logo-btn" onclick="OnMediaSelect(`+ i +`);" >
							<img class="img-fluid media-logo-img" src="` + imageUrl + `" alt="">
						</button>
						<label class="media-menu-txt">` + strName + `</label>
						<img class="check-img hidden" src="images/assets/check.png">
					</div>`;
		$("#360-photo-grid-container").append(itemHtml);
	}
}

function ShowLocal360Photos(){
	Init360PhotosMenu();
	
	g_360MenuName = "local";
	$("#360-photo-user-btn").find("img.media-menu-img").attr("src", "../images/assets/folder_selected.png");
	$("#360-photo-user-btn").find("label.media-menu-txt").css("color", "#FBB03B");
	$("#search360PhotoField").val("");
	Loading360Photos(g_user360Array);
}

function ShowTeam360Photos(){
	Init360PhotosMenu();
	
	g_360MenuName = "team";
	$("#360-photo-team-btn").find("img.media-menu-img").attr("src", "../images/assets/share_selected.png")
	$("#360-photo-team-btn").find("label.media-menu-txt").css("color", "#FBB03B");
	$("#search360PhotoField").val("");
	Loading360Photos(g_team360Array);
}

function ShowMusketeer360Photos(){
	Init360PhotosMenu();
	
	g_360MenuName = "musket";
	$("#360-photo-musketeers-btn").find("img.media-menu-img").attr("src", "../images/assets/share_selected.png")
	$("#360-photo-musketeers-btn").find("label.media-menu-txt").css("color", "#FBB03B");
	$("#search360PhotoField").val("");
	Loading360Photos(g_musket360Array);
}

$("#search360PhotoField").keyup(function() {
	var strKey;
	var arrayAllPhoto = [], arraySearchPhoto = [];
	var itemHtml;
	
	switch(g_360MenuName){
		case "local":
    		arrayAllPhoto = g_user360Array;
			break;
		case "team":
    		arrayAllPhoto = g_team360Array;
			break;
		case "musket":
    		arrayAllPhoto = g_musket360Array;
			break;
		default:
    		arrayAllPhoto = g_user360Array;
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
	
	Loading360Photos(arraySearchPhoto);
	
});

function IsCheckedMedia(i){
	var checkImg;
	checkImg = $("#360-logo-container-" + i).find("img.check-img");
	if(checkImg.hasClass("hidden"))
		return false;
	else
		return true;
}

function OnMediaSelect(i){
	var mediaLogImg, checkImg;
	
	mediaLogImg = $("#360-logo-container-" + i).find("img.media-logo-img");
	checkImg = $("#360-logo-container-" + i).find("img.check-img");
	
	if(IsCheckedMedia(i)){
		mediaLogImg.css("border", "0px");	
		checkImg.addClass("hidden");
	}
	else{
		checkImg.removeClass("hidden");
		mediaLogImg.css({"border": "4px solid #FBB03B", "border-radius": "3px"});
	}
}

function getSelected360Photos(){
	var arrayAllPhoto = [], arraySelPhoto = [];
	
	arrayAllPhoto = g_current360Array;
	
	for(let i=0; i<arrayAllPhoto.length; i++){
		if(IsCheckedMedia(i) == false)
			continue;
		
		arraySelPhoto.push(arrayAllPhoto[i]);
	}
	
	return arraySelPhoto;
}

//Add Scene in Scene list
function AddSceneFrom360Photo(){
	var fileInfo = [];
	var itemHtml;
	var arraySelPhoto = [];
	var sceneNum, firstSceneNum;
	
	sceneNum = g_arrayScene.length;
	arraySelPhoto = getSelected360Photos();
	
	for(let i = 0; i < arraySelPhoto.length; i++){
		var imageUrl, strName;
		var index = 0;
		
		index = sceneNum + i;
		
		if(i == 0)
			firstSceneNum = index;
		
		fileInfo = arraySelPhoto[i];
		imageUrl = fileInfo["path"];
		strName = "scene-" + (index+1).toString();
		
		itemHtml = `<div class="scene-item-container" id="scene-item-container-`+ index +`">
						<div class="scene-btn-container">
							<button class="scene-logo-btn" onclick="OnSceneSelect(`+ index +`);">
								<img class="img-fluid scene-logo-img" src="`+ imageUrl +`">
							</button>
							<button class="edit-btn" onclick="OnEditSceneTitle(`+ index +`);"></button>
							<button class="delete-btn" onclick="OnDeleteScene(`+ index +`);"></button>
						</div>
						<input class="scene-titleField" value="`+ strName +`" maxlength="50" readonly>
					</div>`;
		
		$("#scene-scroll-container").append(itemHtml);
		g_arrayScene.push(arraySelPhoto[i]);
		g_arraySceneCamera.push("0 0 0");
	}

	HideAddSceneContainer();

	ShowDefaultScene();
	OnSceneSelect(firstSceneNum);

}