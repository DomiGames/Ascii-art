"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
function imageToAscii(imagePath_1) {
    return __awaiter(this, arguments, void 0, function* (imagePath, outputWidth = 100) {
        try {
            // Load the image and get its metadata
            const image = (0, sharp_1.default)(imagePath);
            const metadata = yield image.metadata();
            // Check if width and height are defined
            if (!metadata.width || !metadata.height) {
                throw new Error('Image metadata is not available or the image is unsupported.');
            }
            // Resize the image
            const resizedImage = yield image.resize(outputWidth).raw().toBuffer();
            // Define the character set for ASCII art (from darkest to lightest)
            const charSet = '@%#*+=-:. ';
            const width = outputWidth; // Use the output width
            const height = Math.floor((outputWidth * metadata.height) / metadata.width); // Maintain aspect ratio
            let asciiArt = '';
            // Loop through each pixel and convert to ASCII
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const index = (y * width + x) * 3; // 3 channels (RGB)
                    const r = resizedImage[index];
                    const g = resizedImage[index + 1];
                    const b = resizedImage[index + 2];
                    // Calculate brightness (average of RGB values)
                    const brightness = (r + g + b) / 3;
                    // Map brightness to a character in the charSet
                    const charIndex = Math.floor((brightness / 255) * (charSet.length - 1));
                    const char = charSet[charIndex];
                    // Add the character to the ASCII art
                    asciiArt += char;
                }
                // Add a newline at the end of each row
                asciiArt += '\n';
            }
            // Print the ASCII art to the console
            console.log(asciiArt);
        }
        catch (error) {
            console.error('Error processing the image:', error);
        }
    });
}
// Usage: Convert an image to ASCII art
const imagePath = 'lain.jpg'; // Image is in the root folder 
imageToAscii(imagePath, 100);
