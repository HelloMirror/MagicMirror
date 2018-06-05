package com.example.seunghee.hello;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Notification;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.os.StrictMode;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.util.Log;

import org.apache.http.client.*;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import java.io.*;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.*;
import java.net.URLEncoder;

@SuppressLint({"NewApi", "OverrideAbstract"})
@TargetApi(Build.VERSION_CODES.JELLY_BEAN_MR2)
public class NotiListenService extends NotificationListenerService {
    public NotiListenService() {
        Log.d("public notification Lis","noti");
    }

    private static final String TAG = NotiListenService.class.getSimpleName();

    private String smartmirror_ip; //스마트 미러의 할당받은 ip주소
    private SharedPreferences preferences; //환경변수
    private SharedPreferences.Editor editor;

    @Override
    public void onCreate() {
        super.onCreate();
        Log.i("notification Lis", "noti onCreate()");
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.i("NotificationListener", "[JHeart] onStartCommand()");
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.i("NotificationListener", "[JHeart] onDestroy()");
    }

    @TargetApi(Build.VERSION_CODES.KITKAT)
    @Override
    public void onNotificationPosted (StatusBarNotification sbn){
        Log.i("NotificationListener", "[JHeart] onNotificationPosted() - " + sbn.toString());
        Log.i("NotificationListener", "[JHeart] PackageName:" + sbn.getPackageName());
        Log.i("NotificationListener", "[JHeart] PostTime:" + sbn.getPostTime());

        Notification notificatin = sbn.getNotification();
        Bundle extras = notificatin.extras;
        String title = extras.getString(Notification.EXTRA_TITLE);//이름, 사용자, 전화번호 등...
        String Pack = "";
        //int smallIconRes = extras.getInt(Notification.EXTRA_SMALL_ICON);
        //Bitmap largeIcon = ((Bitmap) extras.getParcelable(Notification.EXTRA_LARGE_ICON));
        CharSequence text = extras.getCharSequence(Notification.EXTRA_TEXT);//내용
        CharSequence subText = extras.getCharSequence(Notification.EXTRA_SUB_TEXT);

        preferences = getBaseContext().getSharedPreferences("shlee", Context.MODE_PRIVATE);
        smartmirror_ip = preferences.getString("smartmirror_ip", "0.0.0.0");
        editor = preferences.edit();
        String smartmirror_url = "";

        Log.d("smartmirror IP: ", smartmirror_ip);

        Log.i("NotificationListener", "[JHeart] Title:" + title);
        Log.i("NotificationListener", "[JHeart] Text:" + text);
        Log.i("NotificationListener", "[JHeart] Sub Text:" + subText);

        Log.i("smartmirror IP: ", smartmirror_ip);

        String strPackage = sbn.getPackageName(); //패키지 이름

        if (title == null) title = "";
        if (text == null) text = "";
        Log.i("[noti] get:", "package :" + strPackage + "//title" + title + "//text : " + text);

        if (strPackage.equals("com.android.mms") || strPackage.equals("com.kakao.talk") || strPackage.equals("com.google.android.gm")
                || strPackage.equals("com.lge.incallui") || strPackage.equals("com.android.server.telecom")) {
            try {
                String enPackage = URLEncoder.encode(strPackage, "UTF-8");
                String enTitle = URLEncoder.encode(title, "UTF-8");
                String enText = URLEncoder.encode(text.toString(), "UTF-8");

                if (enPackage.equals("com.android.mms")){
                    Pack = "mms";
                }else if(enPackage.equals("com.kakao.talk")){
                    Pack = "kakao";
                }else if(enPackage.equals("com.google.android.gm")){
                    Pack = "gmail";
                }else if(enPackage.equals("com.lge.incallui")){
                    Pack = "call";
                }else if(enPackage.equals("com.android.server.telecom")){
                    Pack = "call";
                }
                /*else{
                    Pack = "kakao";
                }*/
                String RaspUrl = "http://" + smartmirror_ip + ":8080/noti.do?package=" + Pack + "&title=" + enTitle + "&text=" + enText;
                Log.d("smartmirror url : ", RaspUrl);
                URL url = new URL(RaspUrl);
                smartmirror_url = url.toString();
                Log.d("smartmirror_url :", smartmirror_url);
                editor.putString("smartmirror_url", smartmirror_url);
                editor.commit();

                StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
                StrictMode.setThreadPolicy(policy);

                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

                Log.i("---------------------","urlconnection");

                if(urlConnection.getResponseCode() != HttpURLConnection.HTTP_OK){
                    Log.i("err","noti error");
                    return;

                }
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
                Log.i("bufferReader", "BFRD OK");
                String response = null;

                while (true) {
                    response = bufferedReader.readLine();
                    if (response == null) break;
                        Log.d("[noti] response : ", response);
                }
                urlConnection.disconnect();

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
    @Override
    public void onNotificationRemoved (StatusBarNotification sbn){
        // super.onNotificationRemoved(sbn);
    }
    @Override
    public IBinder onBind (Intent intent){
        return super.onBind(intent);
    }
}