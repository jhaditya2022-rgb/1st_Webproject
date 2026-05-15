const fileInput = document.getElementById('file-upload');
const imagePreview = document.getElementById('image-preview');
const previewWrapper = document.getElementById('preview-wrapper');
const instructionText = document.getElementById('instruction-text');
const removeBtn = document.getElementById('remove-img');
const inputSection = document.getElementById('input-section');
const predictBtn = document.getElementById('predict-btn');

// 1. Show image preview when a file is selected
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            previewWrapper.style.display = 'block';
            instructionText.style.display = 'none';
            inputSection.style.display = 'none'; 
        }
        reader.readAsDataURL(file);
    }
});

// 2. Remove image logic
removeBtn.addEventListener('click', function() {
    fileInput.value = ""; 
    imagePreview.src = "";
    previewWrapper.style.display = 'none';
    instructionText.style.display = 'block';
    instructionText.innerText = "Please Upload The Clear Image"; // Reset text
    inputSection.style.display = 'flex'; 
});

// 3. Predict button logic
// ... tumhara purana code (preview logic same rahega)

predictBtn.addEventListener('click', async function() {
    if (fileInput.files.length === 0) {
        alert("Please upload an image first!");
        return;
    }

    instructionText.style.display = 'block';
    instructionText.innerText = "AI is analyzing... please wait.";

    const formData = new FormData();
    // DHAYAN DEIN: Key 'image' honi chahiye jo Flask me use ki hai
    formData.append('image', fileInput.files[0]); 

    try {
        // Local testing ke liye: http://127.0.0.1:5000/predict
        // Hosting ke baad: 'https://your-api-link.com/predict'
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error("Server Error");

        const data = await response.json();

        // Tumhara UI color logic yahan aayega
        let boxColor = "#2294E3"; // Default Blue
        if (data.prediction === "Melanoma" || data.prediction === "Carcinoma") {
            boxColor = "#ff4d4d"; // Red for Danger
        }

        instructionText.innerHTML = `
            <div style="background: ${boxColor}; color: white; padding: 20px; border-radius: 15px; font-weight: bold;">
                <h3 style="margin:0;">Result: ${data.prediction}</h3>
                <p style="margin:5px 0 0 0;">${data.message}</p>
                <small>Confidence: ${data.confidence}</small>
            </div>
        `;
        
    } catch (error) {
        console.error("Error:", error);
        instructionText.innerText = "Error: Backend server is not responding!";
        instructionText.style.color = "yellow";
    }
});