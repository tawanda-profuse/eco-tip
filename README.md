# About EcoTip

EcoTip is a web application that gives advice about efficient and better ways to live life. The messages are insightful and serve as a guideline to a healthier, cheaper, and more fulfilling lifestyle.

## User Interface

The frontend is made with React which renders one component called Home (**/frontend/src/components/Home.js**). CSS makes the web page adapt to different screen sizes (**/frontend/src/index.css**).

**Desktop view of the application UI**:
![Desktop view of the application user interface](/frontend/public/images/desktop-ui.png)

**Mobile view of the application UI**:
![Mobile view of the application user interface](/frontend/public/images/mobile-ui.png)

## Notifications API

The Notifications API interface is a JavaScript API used to configure and display desktop notifications to the user. In this specific application, it is used with the React useState hook to notify users who have turned notifications on in their browser📲.

The code is available in **/frontend/src/components/Home.js** under the function name **notifyUser()**. Every new notification has a title, icon, and body text which is the text from the new notification. The icon is available in **/frontend/public/images/logo.png**

## Contributing🫡

This code is shared as open-source under the ISC license as specified in **/frontend/package.json** and **/backend/package.json**. Feel free to suggest new features by opening a new pull request or contacting me via this [form](https://andrewtech.onrender.com/#contact). The name 'EcoTip' is not the final decision therefore new ideas💡 for the apps name are welcome.

To access the source code or contribute to this repository follow the steps below:

1. Fork this GitHub repository.
2. Create your own branch.
3. Open a pull request.
4. Wait for the PR to be merged.

### Good First Issues

- The app logo needs to be redesigned.
- Add any additional features that will improve the user experience.
- The app needs a more descriptive name.
- For backend developers, access all the server side code in the **/backend** folder which is based on Node.js/Express.
