// require rx-facebook.js

function RxFacebookApi(next) {
  return Rx.Observable.create(function (observer) {
    _RxFacebookApi(next, observer);
  });
}

function _RxFacebookApi(next, observer) {
  FB.api(next, function (response) {
    if (response.error) {
      observer.onError(response.error);
      return;
    }

    for (var i = 0; i < response.data.length; i++) {
      if (!observer.unsubscribed) {
        observer.onNext(response.data[i]);
      }
    }

    if (!observer.unsubscribed) {
      if (response.paging && response.paging.next) {
        _RxFacebookApi(response.paging.next, observer);
      } else {
        observer.onCompleted();
      }
    }
  });
}
