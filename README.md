# Digit Recognizer
Digit Recognizer is a web application that identifies hand written digits. (Drawing by mouse is currently the only supported input method.) The user has the option of telling Digit Recognizer whether the digit was correctly identified. The information is saved in a database.

## Live on the Web
The app is running (at least some of the time) on Heroku [here](https://digit-reader.herokuapp.com/).

## Implementation
Digit Recognizer is a React app with a Python Flask backend. The backend uses a convolutional neural network implemented and trained in Keras on the MNIST dataset with custom augmentation.

## Documentation
[Using Digit Recognizer](https://github.com/juhamyllari/digit-recognizer/blob/master/documentation/usage.md)

[Project time use](https://github.com/juhamyllari/digit-recognizer/blob/master/documentation/time_use.md)
