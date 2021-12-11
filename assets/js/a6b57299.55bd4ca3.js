"use strict";(self.webpackChunkdocs_website=self.webpackChunkdocs_website||[]).push([[567],{4137:function(e,t,a){a.d(t,{Zo:function(){return h},kt:function(){return c}});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=r.createContext({}),s=function(e){var t=r.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},h=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,h=l(e,["components","mdxType","originalType","parentName"]),d=s(a),c=n,g=d["".concat(p,".").concat(c)]||d[c]||u[c]||o;return a?r.createElement(g,i(i({ref:t},h),{},{components:a})):r.createElement(g,i({ref:t},h))}));function c(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var s=2;s<o;s++)i[s]=a[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}d.displayName="MDXCreateElement"},973:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return h},default:function(){return d}});var r=a(7462),n=a(3366),o=(a(7294),a(4137)),i=["components"],l={title:"Getting Started",sidebar_label:"Getting Started",slug:"/api/graphql/getting-started",custom_edit_url:"https://github.com/linkedin/datahub/blob/master/docs/api/graphql/getting-started.md"},p="Getting Started",s={unversionedId:"docs/api/graphql/getting-started",id:"docs/api/graphql/getting-started",isDocsHomePage:!1,title:"Getting Started",description:"Get your feet wet with the DataHub GraphQL API",source:"@site/genDocs/docs/api/graphql/getting-started.md",sourceDirName:"docs/api/graphql",slug:"/api/graphql/getting-started",permalink:"/docs/api/graphql/getting-started",editUrl:"https://github.com/linkedin/datahub/blob/master/docs/api/graphql/getting-started.md",tags:[],version:"current",frontMatter:{title:"Getting Started",sidebar_label:"Getting Started",slug:"/api/graphql/getting-started",custom_edit_url:"https://github.com/linkedin/datahub/blob/master/docs/api/graphql/getting-started.md"},sidebar:"overviewSidebar",previous:{title:"Scalars",permalink:"/docs/graphql/scalars"},next:{title:"Querying Metadata Entities",permalink:"/docs/api/graphql/querying-entities"}},h=[{value:"Get your feet wet with the DataHub GraphQL API",id:"get-your-feet-wet-with-the-datahub-graphql-api",children:[],level:3},{value:"Introduction to GraphQL",id:"introduction-to-graphql",children:[],level:2},{value:"Setup",id:"setup",children:[],level:2},{value:"The DataHub GraphQL Endpoint",id:"the-datahub-graphql-endpoint",children:[{value:"Querying the Endpoint",id:"querying-the-endpoint",children:[],level:3},{value:"On the Horizon",id:"on-the-horizon",children:[],level:3}],level:2},{value:"GraphQL Explorer",id:"graphql-explorer",children:[],level:2},{value:"Where to go from here",id:"where-to-go-from-here",children:[],level:2},{value:"Feedback, Feature Requests, &amp; Support",id:"feedback-feature-requests--support",children:[],level:2}],u={toc:h};function d(e){var t=e.components,a=(0,n.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"getting-started"},"Getting Started"),(0,o.kt)("h3",{id:"get-your-feet-wet-with-the-datahub-graphql-api"},"Get your feet wet with the DataHub GraphQL API"),(0,o.kt)("h2",{id:"introduction-to-graphql"},"Introduction to GraphQL"),(0,o.kt)("p",null,"The GraphQL community provides many freely available resources for learning about GraphQL. We recommend starting with ",(0,o.kt)("a",{parentName:"p",href:"https://graphql.org/learn/"},"Introduction to GraphQL"),",\nwhich will introduce you to key concepts like ",(0,o.kt)("a",{parentName:"p",href:"https://graphql.org/learn/queries/"},"Queries, Mutations, Variables, Schemas & more"),". "),(0,o.kt)("p",null,"We'll reiterate a few important points before proceeding:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"GraphQL Operations are exposed via a single service endpoint, in the case of DataHub located at ",(0,o.kt)("inlineCode",{parentName:"li"},"/api/graphql"),". This will be described in more detail below. "),(0,o.kt)("li",{parentName:"ul"},"GraphQL supports reads using a top-level ",(0,o.kt)("strong",{parentName:"li"},"Query")," object, and writes using a top-level ",(0,o.kt)("strong",{parentName:"li"},"Mutation")," object."),(0,o.kt)("li",{parentName:"ul"},"GraphQL supports ",(0,o.kt)("a",{parentName:"li",href:"https://graphql.org/learn/introspection/"},"schema introspection"),", wherein clients can query for details about the GraphQL schema itself.")),(0,o.kt)("h2",{id:"setup"},"Setup"),(0,o.kt)("p",null,"The first thing you'll need to use the GraphQL API is a deployed instance of DataHub with some metadata ingested. Unsure how to do that? Check out the ",(0,o.kt)("a",{parentName:"p",href:"/docs/quickstart"},"Deployment Quickstart"),"."),(0,o.kt)("h2",{id:"the-datahub-graphql-endpoint"},"The DataHub GraphQL Endpoint"),(0,o.kt)("p",null,"Today, DataHub's GraphQL endpoint is available for use in multiple places. The one you choose to use depends on your specific use case. "),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"Metadata Service"),": The DataHub Metadata Service (backend) is the source-of-truth for the GraphQL endpoint. The endpoint is located at ",(0,o.kt)("inlineCode",{parentName:"li"},"/api/graphql")," path of the DNS address\nwhere your instance of the ",(0,o.kt)("inlineCode",{parentName:"li"},"datahub-gms")," container is deployed. For example, in local deployments it is typically located at ",(0,o.kt)("inlineCode",{parentName:"li"},"http://localhost:8080/api/graphql"),". By default,\nthe Metadata Service has no explicit authentication checks. However, it does have ",(0,o.kt)("em",{parentName:"li"},"Authorization checks"),". DataHub ",(0,o.kt)("a",{parentName:"li",href:"/docs/policies"},"Access Policies")," will be enforced by the GraphQL API. This means you'll need to provide an actor identity when querying the GraphQL API.\nTo do so, include the ",(0,o.kt)("inlineCode",{parentName:"li"},"X-DataHub-Actor")," header with an Authorized Corp User URN as the value in your request. Because anyone is able to set the value of this header, we recommend using this endpoint only in trusted environments, either by administrators themselves or programs that they own directly.\n"),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"Frontend Proxy"),": The DataHub Frontend Proxy Service (frontend) is a basic web server & reverse proxy to the Metadata Service. As such, the\nGraphQL endpoint is also available for query wherever the Frontend Proxy is deployed. In local deployments, this is typically ",(0,o.kt)("inlineCode",{parentName:"li"},"http://localhost:9002/api/graphql"),". By default,\nthe Frontend Proxy ",(0,o.kt)("em",{parentName:"li"},"does")," have Session Cookie-based Authentication via the PLAY_SESSION cookie set at DataHub UI login time. This means\nthat if a request does not have a valid PLAY_SESSION cookie obtained via logging into the DataHub UI, the request will be rejected. To use this API in an untrusted environment,\nyou'd need to a) log into DataHub, b) extract the PLAY_SESSION cookie that is set on login, and c) provide this Cookie in your HTTP headers when\ncalling the endpoint.\n")),(0,o.kt)("h3",{id:"querying-the-endpoint"},"Querying the Endpoint"),(0,o.kt)("p",null,"There are a few options when it comes to querying the GraphQL endpoint. The recommendation on which to use varies by use case."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Testing"),": ",(0,o.kt)("a",{parentName:"p",href:"https://learning.postman.com/docs/sending-requests/supported-api-frameworks/graphql/"},"Postman"),", GraphQL Explorer (described below), CURL"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Production"),": GraphQL ",(0,o.kt)("a",{parentName:"p",href:"https://graphql.org/code/"},"Client SDK")," for the language of your choice, or a basic HTTP client."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Important: The DataHub GraphQL endpoint only supports POST requests at this time. It does not support GET requests. If this is something\nyou need, let us know on Slack!")),(0,o.kt)("h3",{id:"on-the-horizon"},"On the Horizon"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Service Access Tokens"),": In the near future, the DataHub team intends to introduce service users, which will provide a way to generate and use API access\ntokens when querying both the Frontend Proxy Server and the Metadata Service. If you're interested in contributing, please ",(0,o.kt)("a",{parentName:"li",href:"https://datahubspace.slack.com/join/shared_invite/zt-nx7i0dj7-I3IJYC551vpnvvjIaNRRGw#/shared-invite/email"},"reach out on our Slack"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"DataHub Client SDKs"),": Libraries wrapping the DataHub GraphQL API on a per-language basis (based on community demand). ")),(0,o.kt)("h2",{id:"graphql-explorer"},"GraphQL Explorer"),(0,o.kt)("p",null,"DataHub provides a browser-based GraphQL Explorer Tool (",(0,o.kt)("a",{parentName:"p",href:"https://github.com/graphql/graphiql"},"GraphiQL"),") for live interaction with the GraphQL API. Today, this tool is available for use in multiple places (like the GraphQL endpoint itself):"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"Metadata Service"),": ",(0,o.kt)("inlineCode",{parentName:"li"},"http://<metadata-service-address>/api/graphiql"),". For local deployments, ",(0,o.kt)("inlineCode",{parentName:"li"},"http://localhost:8080/api/graphiql"),"."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"Frontend Proxy"),": ",(0,o.kt)("inlineCode",{parentName:"li"},"http://<frontend-service-address>/api/graphiql"),". For local deployments, ",(0,o.kt)("inlineCode",{parentName:"li"},"http://localhost:9002/api/graphiql"),".")),(0,o.kt)("p",null,"This interface allows you to easily craft queries and mutations against real metadata stored in your live DataHub deployment. For a detailed usage guide,\ncheck out ",(0,o.kt)("a",{parentName:"p",href:"https://www.gatsbyjs.com/docs/how-to/querying-data/running-queries-with-graphiql/"},"How to use GraphiQL"),". "),(0,o.kt)("p",null,"The same auth restrictions described in the section above apply to these endpoints as well. "),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"Pro Tip"),": We recommend you add a browser extension that will allow you to set custom HTTP headers (ie. ",(0,o.kt)("inlineCode",{parentName:"p"},"Cookies")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"X-DataHub-Actor"),") if you plan to use GraphiQL for testing. We like ",(0,o.kt)("a",{parentName:"p",href:"https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en"},"ModHeader")," for Google Chrome.")),(0,o.kt)("h2",{id:"where-to-go-from-here"},"Where to go from here"),(0,o.kt)("p",null,"Once you've gotten the API deployed and responding, proceed to ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/graphql/querying-entities"},"Querying Entities")," to learn how to read and write the Entities\non your Metadata Graph."),(0,o.kt)("h2",{id:"feedback-feature-requests--support"},"Feedback, Feature Requests, & Support"),(0,o.kt)("p",null,"Visit our ",(0,o.kt)("a",{parentName:"p",href:"https://datahubspace.slack.com/join/shared_invite/zt-nx7i0dj7-I3IJYC551vpnvvjIaNRRGw#/shared-invite/email"},"Slack channel")," to ask questions, tell us what we can do better, & make requests for what you'd like to see in the future. Or just\nstop by to say 'Hi'."))}d.isMDXComponent=!0}}]);