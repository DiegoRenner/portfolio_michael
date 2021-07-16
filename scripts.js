var indices = [];
var id = null;
var id1 = null;
var dir_array = [];
var height_array = [];
var rows_to_fill_page = 0;
var project_dropdown_toggle = false
var search_dropdown_toggle = false
var result_dropdown_toggle = false
function myFunction(imgs) {
	// Get the expanded image 
	var expandImg = document.getElementById("expandedImg");
	// Get the image text
	var imgText = document.getElementById("imgtext");
	// Use the same src in the expanded image as the image being clicked on from the grid
	expandImg.src = imgs.src;
	// Use the value of the alt attribute of the clickable image as text inside the expanded image
	imgText.innerHTML = imgs.alt;
	// Show the container element (hidden with CSS)
	expandImg.parentElement.style.display = "block";
}
// Helper function to get an element's exact position
function getPosition(el) {
	var xPos = 0;
	var yPos = 0;

	while (el) {
		if (el.tagName == "BODY") {
			// deal with browser quirks with body/window/document and page scroll
			var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
			var yScroll = el.scrollTop || document.documentElement.scrollTop;

			xPos += (el.offsetLeft - xScroll + el.clientLeft);
			yPos += (el.offsetTop - yScroll + el.clientTop);
		} else {
			// for all other non-BODY elements
			xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
			yPos += (el.offsetTop - el.scrollTop + el.clientTop);
		}

		el = el.offsetParent;
	}
	return {
		x: xPos,
		y: yPos
	};
}

// deal with the page getting resized or scrolled
//window.addEventListener("scroll", updatePosition, false);
//window.addEventListener("resize", updatePosition, false);


function updatePosition() {
	//	while (true) {
	sleep(5000);
	var myElement = document.getElementById("7");
	var position = getPosition(myElement);
	//alert("The image is located at: " + position.x + ", " + position.y);
	//	}
	//document.getElementById("debugging").innerHTML = position.x;
	// add your code to update the position when your browser
	// is resized or scrolled
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function myMove() {
	var container = document.getElementById("background");
	var pos = 0;
	container.style.top = pos + 'px';

	//clearInterval(id);
	id = setInterval(frame, 15);
	function frame() {
		container = document.getElementById("background");

		var height = 0;
		for (var i = 0; i < rows_to_fill_page; i++) {
			row_id = "row" + i;
			row = document.getElementById(row_id);
			height += row.offsetHeight;
		}
		var row_height = height/rows_to_fill_page;
		//document.getElementById("debugging").innerHTML = height + " " + pos + " " + rows_to_fill_page + " " + window.innerHeight;
		if (pos <= -height) {
			// clearInterval(id);
			//image_set_container.innerHTML = "";
			//document.getElementById("debugging").innerHTML = dir_array;
			//indices.splice(0,6);
			var entries_to_move = (rows_to_fill_page)*6;
			for (var i = 0; i < entries_to_move; i++){
				indices[i] = indices[i+entries_to_move];
				//indices.push(Math.floor(Math.random() * dir_array.length));
			}
			for (var i = 0; i < indices.length; i++) {
				var img_id = "img" + i;
				var image_container = document.getElementById(img_id);
				//alert(image_container)
				var inner_index = indices[i];
				//alert(inner_index)
				image_container.src = dir_array[inner_index];
			}
			//if (n_pictures >=24) {
			//	break;
			//}
			pos = 0;
			container.style.top = pos + 'px';
			var new_entries = indices.length-entries_to_move;
			var images_in_db = dir_array.length;
			indices.splice((rows_to_fill_page)*6, new_entries)
			for (var i = 0; i < new_entries/6-1; i++){
				var perm_indices=[];
				var seq_indices=[];
				var j = 0;
				if (i%2 == 0){
					for (j = 0; j < images_in_db; j++) {
						seq_indices.push(j);
					}
					j = images_in_db;
					while (j--) {
						k = Math.floor(Math.random() * (j+1));
						perm_indices.push(seq_indices[k]);
						seq_indices.splice(k,1);
					}
					indices.push(...perm_indices);
				}
			}
			if (new_entries/6%2 == 1){
				var perm_indices=[];
				var seq_indices=[];
				var j = 0;
				for (j = 0; j < images_in_db; j++) {
					seq_indices.push(j);
				}
				j = 6
				while (j--) {
					k = Math.floor(Math.random() * (j+1));
					perm_indices.push(seq_indices[k]);
					seq_indices.splice(k,1);
				}
				indices.push(...perm_indices);
			}

			for (var i = entries_to_move; i < indices.length; i++) {
				var img_id = "img" + i;
				var image_container = document.getElementById(img_id);
				//alert(image_container)
				var inner_index = indices[i];
				//alert(inner_index)
				image_container.src = dir_array[inner_index];
			}
		} else {
			pos -= row_height/90;
			container.style.top = pos + 'px';
			// elem.style.left = pos + 'px';
		}
	}
}

function addImages() {
	var elem = document.getElementById("background");
	var height = elem.offsetHeight;
	//document.getElementById("debugging").innerHTML = height + " " + screen.height;
	var i;
	for (i = 0; i < 3; i++) {
		//document.getElementById("debugging").innerHTML = height + " " + screen.height;
		var images = document.createElement("image_set");
		elem.appendChild(images);
		var height = elem.offsetHeight;
	}
}


function fillImageSetContainer(dir_array, height_array) {

	this.dir_array = dir_array;
	this.height_array = height_array;
	var image_set_container = document.getElementById("image_set_container");
	var background = document.getElementById("background");
	//document.getElementById("debugging").innerHTML = dir_array;
	var page_full = false;
	var second_page_full = false;
	var page_almost_full = false;
	var n_pictures = 0;
	var n_rows = 0;
	var rows_to_fill_unset = true;
	var row_string = "";
	var finished = false;
	var safety = false;
	indices = [];
	image_set_container.innerHTML = "";
	var images_in_db = dir_array.length;
	var seq_indices = [];
	var perm_indices = [];
	var count_indices = 0;
	while (!finished) {
		//alert(window.innerHeight);
		if ( n_pictures%6 == 0) {
			row_string += "<div id=row" + n_rows + " class='row'>\n";
			n_rows++;
			//if ( n_pictures%12 == 0) {
			//row_string += "<div id=row" + n_rows + " class='row'>\n";
			var i =0;
			for (i = 0; i < images_in_db; i++) {
				seq_indices.push(i);
			}
			perm_indices=[];
			while (i--) {
				j = Math.floor(Math.random() * (i+1));
				perm_indices.push(seq_indices[j]);
				seq_indices.splice(j,1);
			}
			count_indices = 0;
			//}
		}
		indices.push(perm_indices[count_indices]);
		row_string += "<div class='column'>\n <img id='img" + n_pictures + "' src=" + dir_array[perm_indices[count_indices]] +" height=" + window.innerWidth/6*Math.sqrt(2) + " alt='Nature' onclick='myFunction(this);'>\n </div>\n";
		if ( n_pictures%6 == 5) {
			row_string += "</div>";
			var test = test;
			image_set_container.innerHTML += row_string;
			row_string = ""
			var height = image_set_container.offsetHeight;
			/*if (page_almost_full) {
				page_full = true;
			}
			page_almost_full = height > screen.height;*/
			page_full = height > window.innerHeight;
			second_page_full = height > 2*window.innerHeight;
			finished = second_page_full && safety;
			if (second_page_full) {
				safety=true;
			}
			if (page_full && rows_to_fill_unset) {
				rows_to_fill_page = n_rows;
				rows_to_fill_unset = false;

			}
			//document.getElementById("debugging").innerHTML = height + " " + screen.height;
		}
		n_pictures++;
		count_indices++;
		//if (n_pictures >=24) {
		//	break;
		//}

	}
}

function dropdown_menu() {

	var menu_dropdown = document.getElementById("menu_dropdown")
	var search_dropdown = document.getElementById("search_dropdown")
	var result_dropdown = document.getElementById("result_dropdown")
	var pos1 = menu_dropdown.offsetTop;
	//alert(menu_dropdown.style.top)

	if (search_dropdown_toggle) {
		search_dropdown.style.top = -search_dropdown.offsetHeight + "px";
		search_dropdown_toggle = false
		result_dropdown.style.top = -result_dropdown.offsetHeight + "px";
		result_dropdown_toggle = false
	}
	if (project_dropdown_toggle){
		menu_dropdown.style.top = -menu_dropdown.offsetHeight + "px";
		project_dropdown_toggle = false
	} else {
		id1 = setInterval(frame, 15);
		function frame() {
			pos1 = menu_dropdown.offsetTop
			if (pos1 < 0) {
				pos1 = pos1 + 7;
				menu_dropdown.style.top = pos1 + "px";
			} else {
				clearInterval(id1);
			}
		}
		project_dropdown_toggle = true
	}

}

function fillDropdownMenu(project_names, project_ids) {

	var menu_dropdown = document.getElementById("menu_dropdown");
	menu_dropdown.innerHTML = "";
	num_projects = project_names.length
	for (var i = 0; i<num_projects; i++ ) {
		link="location.href='project.php?project_id=" + project_ids[i] + "&num_projects=" + num_projects + "';"
		menu_dropdown.innerHTML += "<div onclick="+link+" class= menu_dropdown_button> \n <p>" + project_names[i] +"</p> \n </div>"
	}
}
function dropdown_result() {

	var menu_dropdown = document.getElementById("menu_dropdown")
	var search_dropdown = document.getElementById("search_dropdown")
	var result_dropdown = document.getElementById("result_dropdown")
	var pos1 = search_dropdown.offsetTop;
	//alert(menu_dropdown.style.top)

	if (project_dropdown_toggle) {
		menu_dropdown.style.top = -menu_dropdown.offsetHeight + "px";
		project_dropdown_toggle = false
	}
	if (result_dropdown_toggle){
		result_dropdown.style.top = -result_dropdown.offsetHeight + "px";
		result_dropdown_toggle = false
	}
	id1 = setInterval(frame, 15);
	function frame() {
		pos1 = result_dropdown.offsetTop
		if (pos1 < 0) {
			pos1 = pos1 + 7;
			result_dropdown.style.top = pos1 + "px";
		} else {
			clearInterval(id1);
		}
	}
	result_dropdown_toggle = true


}
function dropdown_search() {

	var menu_dropdown = document.getElementById("menu_dropdown")
	var search_dropdown = document.getElementById("search_dropdown")
	var result_dropdown = document.getElementById("result_dropdown")
	var pos1 = search_dropdown.offsetTop;
	//alert(menu_dropdown.style.top)

	if (project_dropdown_toggle) {
		menu_dropdown.style.top = -menu_dropdown.offsetHeight + "px";
		project_dropdown_toggle = false
	}
	if (search_dropdown_toggle){
		search_dropdown.style.top = -search_dropdown.offsetHeight + "px";
		search_dropdown_toggle = false
		result_dropdown.style.top = -result_dropdown.offsetHeight + "px";
		result_dropdown_toggle = false
	} else {
		id1 = setInterval(frame, 15);
		function frame() {
			pos1 = search_dropdown.offsetTop
			if (pos1 < 0) {
				pos1 = pos1 + 7;
				search_dropdown.style.top = pos1 + "px";
			} else {
				clearInterval(id1);
			}
		}
		search_dropdown_toggle = true
	}

}

function fillResultDropdown(results) {

	var result_dropdown = document.getElementById("result_dropdown");
	result_dropdown.innerHTML = "";
	num_projects = project_names.length
	for (var i in results) {
		var proj_id = project_ids.indexOf(results[i])
		var proj_name = project_names[proj_id]
		var link="location.href='project.php?project_id=" + results[i] + "&num_projects=" + num_projects + "';"
		result_dropdown.innerHTML += "<div onclick="+link+" class= result_dropdown_button> \n <p>" + proj_name +"</p> \n </div>"
	}
}

function submitEvent() {
	event.preventDefault();
	var keyword = document.getElementById("keyword");
	console.log(keyword.value);
	var data = new URLSearchParams();
  	data.append('keyword', keyword.value);
  	var result;
  	fetch("search.php", {method: 'post', body:data})
		.then(res => res.text())
		.then(text => text.split(","))
		.then(arr => fillResultDropdown(arr))
		.then(() =>dropdown_result())
}

