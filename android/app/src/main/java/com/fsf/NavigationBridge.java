package com.fsf;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.Promise;

public class NavigationBridge extends ReactContextBaseJavaModule {

    public NavigationBridge(final ReactApplicationContext reactContext) { super(reactContext); }

    private static boolean jumpToDonations = false;

    @Override
    public String getName() {
        return "NavigationBridge";
    }

    @ReactMethod
    public void getLandingScreen(final Promise result) {
        if (jumpToDonations) {
            result.resolve("donations");
        } else {
            result.resolve("main");
        }
    }

    public static void setJumpToDonations() {
        jumpToDonations = true;
    }
}
