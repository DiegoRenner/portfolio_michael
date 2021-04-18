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
		document.getElementById("debugging").innerHTML = position.y;
//	}

	// add your code to update the position when your browser
	// is resized or scrolled
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}




