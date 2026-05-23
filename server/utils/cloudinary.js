const cloudinary = require('cloudinary').v2;

let uploadToCloudinary = null;

if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  /**
   * Upload a file buffer to Cloudinary.
   * @param {Buffer} fileBuffer - The file buffer to upload
   * @param {string} folder - The Cloudinary folder name
   * @param {object} options - Additional Cloudinary upload options
   * @returns {Promise<string>} The secure URL of the uploaded image
   */
  uploadToCloudinary = (fileBuffer, folder, options = {}) => {
    return new Promise((resolve, reject) => {
      const uploadOptions = {
        folder,
        resource_type: 'image',
        ...options,
      };

      const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      });

      stream.end(fileBuffer);
    });
  };
}

module.exports = uploadToCloudinary;
