# THAI ID CARD Detection
The Project uses Google Vision Service to obtain the text from the Thai ID Cards and to store them in a NOSQL based 

# Overview

This project is a comprehensive solution leveraging the Google Cloud Vision API for extracting text from images of Thai ID cards. The extracted information undergoes a cleaning process using regular expressions and is then stored in a MongoDB database. The user-friendly React frontend empowers users to upload images, process them with the Google Cloud Vision API, and easily view the extracted details.

# Key Features
OCR Identification: Extracts details from Thai ID cards using Optical Character Recognition (OCR).
Data Management: Cleans and organizes the extracted data before storing it in MongoDB.
Interactive Frontend: Built with React, the frontend enables seamless image uploading and analysis.

### Installation

## Backend Setup
    cd Backend
    npm install
    npm run dev
    
## Frontend Setup
    cd Frontend
    npm install
    npm start

## Note
 - I have used my GCloud Vision API if you want to use yours put the json file in KEYS in ocr.js file which is located in Backend directory.

### Prerequisites
Install all the necessary dependencies using npm install in FRONTEND AND BACKEND Directories. 

## Usage
1. I used Google Cloud Vision API to detect text from the Identity card. Then I cleaned the data using Regex.
2. Took the input of identity card in Frontend(React) and for Database I used MongoDB.
3. MongoDB schema consists: Identification number, first name , last name , date of birth , issue date and expiry date.
4. For storing the data I have made some routes which will ensure easy posting and storing of the ID Card Data. 
5. When a user uploads an image from the frontend, the application saves it in the public/Images directory within the Backend. From this file location, the image is sent to the Vision API for processing. Upon clicking the "Extract" button, a POST request is triggered, and the API response containing the results is displayed on the frontend. This seamless flow ensures efficient handling of image data and provides users with quick access to the analyzed information.

## API Endpoints
- POST /api/users/upload Create a new ID card entry.


