// Get references to the file input and the preview element
const fileInput = document.querySelector("input[type='file']");
const preview = document.querySelector("label[for='upload'] img");
const submit_btn = document.querySelector('#update-form button[type="submit"]');
const img = document.querySelector("#profile img");
const user_name = document.getElementById('name');

console.log(submit_btn);

// Add an event listener to the file input to handle file selection
fileInput.addEventListener('change', function () {
    // Check if any file is selected
    if (fileInput.files && fileInput.files[0]) {
        // Get the selected file
        const file = fileInput.files[0];

        // Check if the selected file is an image
        if (file.type.startsWith('image/')) {
            // Create a FileReader instance
            const reader = new FileReader();

            // Set up the FileReader to read the selected file as a data URL
            reader.onload = function (e) {
                preview.src = e.target.result;
            };

            // Read the selected file as a data URL
            reader.readAsDataURL(file);
        } else {
            // If the selected file is not an image, display a message
            preview.innerHTML = '<p>Selected file is not an image.</p>';
        }
    } else {
        // If no file is selected, clear the preview
        preview.innerHTML = '';
    }
});


$("#update-form").submit(function (event) {
    event.preventDefault();
    let url = "/user/update";
    $.ajax({
        url: url,
        type: "POST",
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: (data) => {
            console.log(data);
            img.src = data.data.src;
            user_name.innerText = data.data.name;
            console.log(data.data.src);
            $("#update-form")[0].reset();
            $("#update-form").slideToggle(500);
        },
        error: (error) => {
            console.log(error.responseText);
        },
    })
})

$("#edit-button").click(function (event) {
    event.preventDefault();
    $("#update-form").slideToggle(500);
})

$("#cancel").click(function (event) {
    event.preventDefault();
    $("#update-form").slideToggle(500);
})