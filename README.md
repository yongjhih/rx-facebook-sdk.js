# rx-facebook.js

rxjs for facebook

## Usage

### get my all posts:

Before:

```js
var posts = FbApi("/me/feed");

for (var i = 0; i < posts.length; i++) {
  console.log(posts[i]);
}

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
RxFacebookApi("/me/feed").subscribe(function (post) {
  console.log(post);
});
```

### get 3 posts of my all posts:

```js
RxFacebookApi("/me/feed").take(3).subscribe(function (post) {
  console.log(post);
});
```

### get comments of my posts:

Before:

```js
var posts = FbApi("/me/feed");
var comments = new Array();

for (var i = 0; i < posts.length; i++) {
    comments.concat(FbApi(posts[i].id + "/comments?fields=from,message,created_time&filter=stream"));
}

for (var i = 0; i < comments.length; i++) {
  console.log(comments[i]);
}
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
<script src="rx-facebook.js"></script>
```
