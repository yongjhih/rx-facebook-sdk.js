# rx-facebook.js

rxjs for facebook

## Usage

get my all posts:

Before:

```js
var posts = FbApi("/me/feed");

function FbApi(next) {
    FB.api("/me/feed", function (response) {
        var posts = new Array();
        if (response.paging && response.paging.next) {
            posts.concat(FbApi(response.paging.next));
        } else {
            posts.concat(response.data);
        }
        return posts;
    }
}
```

After:

```js
rxFbApi("/me/feed").subscribe(function (post) {
  console.log(post);
});
```

get 3 posts of my all posts:

```js
rxFbApi("/me/feed").take(3).subscribe(function (post) {
  console.log(post);
});
```

get comments of my posts:

```js
rxFbApi("/me/feed").flatMap(function (post) {
  return rxFbApi(post.id + "/comments?fields=from,message,created_time&filter=stream"));
}).subscribe(function (comment) {
  console.log(comment);
});
```

## Installation

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/4.1.0/rx.all.min.js"></script>
<script src="rx-facebook.js"></script>
```
