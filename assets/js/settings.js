// Get references to the file input and the preview element
const fileInput = document.querySelector("input[type='file']");
const preview = document.getElementById('preview');
const submit_btn = document.querySelector('#update-form button[type="submit"]');
const img = document.querySelector("body>img");
const greet = document.querySelector("body>h2");

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
                preview.innerHTML = `<p>here is the preview:</p>
                <img src="${e.target.result}" alt="Preview">`;
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
            greet.innerText = "hello " + data.data.name;
            $("#update-form")[0].reset();
            preview.innerHTML = "";
        },
        error: (error) => {
            console.log(error.responseText);
        },
    })
})