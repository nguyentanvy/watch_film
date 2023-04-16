// import React from 'react';

// class Comment extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state{

//         }
//     }
//     initFacebookSDK(){
//         if(window.FB){
//             window.FB.XFBML.parse();
//           }
//           window.fbAsyncInit = function() {
//             window.FB.init({
//               // appId      : '1234567890',
//               xfbml      : true,
//               version    : 'v16.0'
//             });
//           };
      
//           // Load the SDK's source asynchronously
//           (function(d, s, id) {
//             var js, fjs = d.getElementsByTagName(s)[0];
//             if (d.getElementById(id)) return;
//             js = d.createElement(s); js.id = id;
//             js.src = "https://connect.facebook.net/en_US/sdk.js";
//             fjs.parentNode.insertBefore(js, fjs);
//           }(document, 'script', 'facebook-jssdk'));
//     }
//     componentDidMount(){
//         this.initFacebookSDK();
//     }
//     render() {
//         let = {dataHref} =this.props;
//         return (
//             <>
//             <div className="fb-comments" data-href={dataHref} data-numposts="5"></div>
//             </>
//         )
//     }

// }


import React, { useEffect } from 'react';

function Comment(props) {
  const {currentUrl, category, id}  = props;

  const initFacebookSDK = () => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    window.fbAsyncInit = () => {
      window.FB.init({
        xfbml: true,
        version: 'v16.0',
      });
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  };

  useEffect(() => {
    initFacebookSDK();
  }, [category, id]);

  return <div className="fb-comments" data-href={currentUrl} data-width="100%" data-numposts="5"></div>;
}

export default Comment;