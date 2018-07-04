package com.benmu.wx.activity;

import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;

import com.benmu.framework.activity.MainActivity;

public class homeActivity extends MainActivity {
    private static final String TAG = "===>";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public boolean onTouchEvent(MotionEvent e) {
        int button = e.getButtonState();
        int action = e.getAction();
        if (button == MotionEvent.BUTTON_BACK && action == MotionEvent.ACTION_POINTER_UP) {//  右键
            Log.i(TAG, "onTouchEvent:返回");
            return true;
        }
        return super.onTouchEvent(e);
    }
}
