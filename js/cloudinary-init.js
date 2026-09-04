// cloudinary-init.js
// Uploads Scene 3 images to Cloudinary (free tier, no card needed)
// and hands back their URLs. form-handler.js calls
// window.uploadJourneyImages(files) — same interface it used for
// Firebase Storage — so nothing else about the submission flow
// had to change.

// ---- Fill these in from your Cloudinary dashboard ----
var CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME';
var CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';

window.uploadJourneyImages = async function (files) {
  var urls = [];

  for (var i = 0; i < files.length; i++) {
    var formData = new FormData();
    formData.append('file', files[i]);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'journey-uploads');

    var response = await fetch(
      'https://api.cloudinary.com/v1_1/' + CLOUDINARY_CLOUD_NAME + '/image/upload',
      { method: 'POST', body: formData }
    );

    var data = await response.json();

    if (data.secure_url) {
      urls.push(data.secure_url);
    } else {
      console.error('Cloudinary upload failed:', data);
      throw new Error('Image upload failed');
    }
  }

  return urls;
};
