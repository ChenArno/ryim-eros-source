package com.benmu.wx;

import android.app.Application;

import com.benmu.framework.BMInitConfig;
import com.benmu.framework.BMWXApplication;
import com.benmu.framework.BMWXEngine;
import com.vanz.ryim.ImApp;

import io.rong.imkit.RongIM;

/**
 * Created by Carry on 2017/8/23.
 */

public class App extends BMWXApplication {
    public Application mInstance;

    @Override
    public void onCreate() {
        super.onCreate();
        mInstance = this;

        ImApp.getImApp(this);
    }

}
