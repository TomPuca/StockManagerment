// import React from "react";

let ReactSession = (function () {
  let SESSION_OBJECT_NAME = "__react_session__";
  let COOKIE_EXPIRATION_DAYS = 7; // TODO: Make this a prop?
  let SessionWriter = null;
  let sessionData = {};

  let get = function (key) {
    return SessionWriter.get(key);
  };

  let set = function (key, value) {
    SessionWriter.set(key, value);
  };

  let remove = function (key) {
    SessionWriter.remove(key);
  };

  let setStoreType = function (storeType) {
    if (
      !["memory", "cookie", "localstorage", "sessionstorage"].includes(
        storeType.toLowerCase()
      )
    ) {
      throw "Unknown store type";
    }
    SessionWriter = getSessionWriter(storeType);
  };

  let getSessionWriter = function (storeType) {
    switch (storeType.toLowerCase()) {
      case "memory":
        return MemoryWriter;
      case "cookie":
        return CookieWriter;
      case "localstorage":
        return LocalStorageWriter;
      case "sessionstorage":
        return SessionStorageWriter;
      default:
        return MemoryWriter;
    }
  };

  let MemoryWriter = {
    set: function (key, value) {
      sessionData[key] = value;
    },
    get: function (key) {
      return sessionData[key];
    },
    remove: function (key) {
      if (sessionData.hasOwnProperty(key)) {
        delete sessionData[key];
      }
    },
  };

  let LocalStorageWriter = {
    set: function (key, value) {
      setItem(localStorage, key, value);
    },
    get: function (key) {
      return getItem(localStorage, key);
    },
    remove: function (key) {
      removeItem(localStorage, key);
    },
  };

  let SessionStorageWriter = {
    set: function (key, value) {
      setItem(sessionStorage, key, value);
    },
    get: function (key) {
      return getItem(sessionStorage, key);
    },
    remove: function (key) {
      removeItem(sessionStorage, key);
    },
  };

  let CookieWriter = {
    set: function (key, value) {
      setCookieParam(key, value, COOKIE_EXPIRATION_DAYS);
    },
    get: function (key) {
      return getCookieParam(key);
    },
    remove: function (key) {
      deleteCookieParam(key);
    },
  };

  SessionWriter = MemoryWriter;

  let setItem = function (storageObject, key, value) {
    let item = getStorageItem(storageObject);
    item[key] = value;
    setStorageItem(storageObject, item);
  };

  let getItem = function (storageObject, key) {
    let item = getStorageItem(storageObject);
    return item[key];
  };

  let removeItem = function (storageObject, key) {
    let item = getStorageItem(storageObject);
    delete item[key];
    setStorageItem(storageObject, item);
  };

  let getStorageItem = function (storageObject) {
    let item = storageObject.getItem(SESSION_OBJECT_NAME);
    return item ? JSON.parse(item) : {};
  };

  let setStorageItem = function (storageObject, item) {
    storageObject.setItem(SESSION_OBJECT_NAME, JSON.stringify(item));
  };

  let getUpdatedTime = function (numDays) {
    let now = new Date();
    now.setTime(now.getTime() + numDays * 24 * 60 * 60 * 1000);
    return now.toUTCString();
  };

  let setCookieParam = function (key, value, numDays) {
    let expires = "expires=" + getUpdatedTime(COOKIE_EXPIRATION_DAYS);
    let existingCookie = getCookie(SESSION_OBJECT_NAME);
    let cookieJson = {};

    if (existingCookie) {
      cookieJson = JSON.parse(existingCookie);
    }

    cookieJson[key] = value;

    let cookieStr =
      SESSION_OBJECT_NAME + "=" + JSON.stringify(cookieJson) + ";";
    cookieStr += expires + ";path=/";
    document.cookie = cookieStr;
  };

  let getCookieParam = function (key) {
    let cookieParam = JSON.parse(getCookie(SESSION_OBJECT_NAME));
    return cookieParam[key];
  };

  let getCookie = function (cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];

      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  };

  let deleteCookieParam = function (key) {
    let expires = "expires=" + getUpdatedTime(COOKIE_EXPIRATION_DAYS);
    let existingCookie = getCookie(SESSION_OBJECT_NAME);
    let cookieJson = {};

    if (existingCookie) {
      cookieJson = JSON.parse(existingCookie);
      delete cookieJson[key];
    }

    let cookieStr =
      SESSION_OBJECT_NAME + "=" + JSON.stringify(cookieJson) + ";";
    cookieStr += expires + ";path=/";
    document.cookie = cookieStr;
  };

  return {
    getCookie: getCookie,
    setStoreType: setStoreType,
    remove: remove,
    get: get,
    set: set,
  };
})();

export default ReactSession;
