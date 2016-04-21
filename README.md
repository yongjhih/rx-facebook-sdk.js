# rx-facebook.js

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
    for (it in response.data) {
      func(it);
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

```js
RxFacebookApi("/me/feed").take(3).subscribe(function (post) {
  console.log(post);
});
```

### get comments of my posts:

Before:

```js
FbApi("/me/feed", function (post) {
  FbApi(posts[i].id + "/comments?fields=from,message,created_time&filter=stream", function (comment) {
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
<script src="rx-facebook.js"></script>
```
