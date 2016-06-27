# rx-facebook-sdk.js

rxjs for facebook

## Usage

### get my all posts:

Before:

```js
FbApi("/me/feed", function (post) {
  console.log(post);
});

function FbApi(next, func) {
  FB.api("/me/feed", function (response) {
    for (var it in response.data) {
      var predicate = func(it);
      if (predicate) return;
    }
    if (response.paging && response.paging.next) {
      FbApi(response.paging.next, func);
    }
  }
}
```

After:

```js
RxFacebookApi("/me/feed").subscribe(function (post) {
  console.log(post);
});
```

### get 3 posts of my all posts:

Before:

```js
var i = 0;
FbApi("/me/feed", function (post) {
  if (i > 3) return true;
  i++;
  console.log(post);
  return false;
});
```

After:

```js
RxFacebookApi("/me/feed").take(3).subscribe(function (post) {
  console.log(post);
});
```

### get comments of my posts:

Before:

```js
FbApi("/me/feed", function (post) {
  FbApi(post.id + "/comments?fields=from,message,created_time&filter=stream", function (comment) {
    console.log(comment);
  });
});
```

After:

```js
RxFacebookApi("/me/feed").flatMap(function (post) {
  return RxFacebookApi(post.id + "/comments?fields=from,message,created_time&filter=stream"));
}).subscribe(function (comment) {
  console.log(comment);
});
```

## Installation

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/4.1.0/rx.all.min.js"></script>
<script src="rx-facebook-sdk.js"></script>

<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : 'your-app-id',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
```
