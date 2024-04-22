// import React, {useState} from 'react';
// import AgoraUIKit from 'agora-rn-uikit';
// import {StyleSheet, Text, View} from 'react-native';

// const App = () => {
//   const [videoCall, setVideoCall] = useState(true);
//   const connectionData = {
//     appId: '76c850beef4a4acfab612e2363e29085',
//     channel: 'test',
//     token:
//       '007eJxSYAg5Z3djipNr45XnS5L/uOpV6jT7mrW+axL+H3y6/85W5yMKDOZmyRamBkmpqWkmiSaJyWmJSWaGRqlGxmbGqUaWBhamUT5qaQxTTMsPbjrMzMjAyMDCwMgA4jOBSWYwyQIlS1KLSxgYAAEAAP//TA0lqg==',
//   };

//   const callbacks = {
//     EndCall: () => setVideoCall(false),
//   };

//   return videoCall ? (
//     <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
//   ) : (
//     <Text onPress={() => setVideoCall(true)}>Start Call</Text>
//   );
// };

// export default App;

// App.js
