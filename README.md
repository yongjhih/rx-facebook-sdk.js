# rx-facebook.js

rxjs for facebook

## Usage

get my all posts:

```js
rx_fb_api("/me/feed").subscribe(function (post) {
  console.log(post);
});
```

get 3 posts of my all posts:

```js
rx_fb_api("/me/feed").take(3).subscribe(function (post) {
  console.log(post);
});
```

get comments of my posts:

```js
rx_fb_api("/me/feed").flatMap(function (post) {
  return rx_fb_api(post.id + "/comments?fields=from,message,created_time&filter=stream"));
}).subscribe(function (comment) {
  console.log(comment);
});
```

## Installation

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/4.1.0/rx.all.min.js"></script>
<script src="rx-facebook.js"></script>
```
