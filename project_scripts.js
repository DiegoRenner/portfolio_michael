var current_image = 0;

function init_image(image_dirs){
    gallery = document.getElementById("gallery");
    gallery.innerHTML = "<img onclick='next_image(project_images)' src=" + image_dirs[0] + ">"
    this.current_image = 0;
}

function next_image(image_dirs){
    this.current_image = (this.current_image+1)%image_dirs.length;
    gallery = document.getElementById("gallery");
    gallery.innerHTML = "<img onclick='next_image(project_images)'src=" + image_dirs[this.current_image] + ">"
}

function set_text(txt_dir){
    //txt_el = document.getElementById("text");
    //txt_el.innerHTML = "<object id='temp' width=auto height=auto type='text/plain' data='" + txt_dir +"'> </object>"
    //temp_el = document.getElementById("temp")
    //alert(temp_el.)
    //       "<p> " + fileReader.result + " </p>";
    //    var file = File(txt_dir)
    //var fileReader = new FileReader();
    //fileReader.readAsText()
    //fileReader.onload = function (e) {
    //    var fileContents = document.getElementById("text");
    //    //filecontents is a div in the html that displays the file.
    //}
    //txt= fileReader.readAsText(txt_dir)
    //fileReader.readAsText(file);


}