package com.example.seunghee.hello;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.nfc.Tag;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;

public class TabFragment2 extends Fragment{
    public TabFragment2(){    }

    boolean checkClicked;
    ImageButton imgBtn_basic;
    ImageButton imgBtn_col;
    TextView textSmile;
    TextView textTalk;
    TextView inputText; //음성 받은부분 출력

    private Intent intent;
    private SpeechRecognizer mRecognizer;
    private SharedPreferences preferences;
    private String smartmirror_ip;
    private String enCommand;
    private String inputSpeech;

    private final int MY_PERMISSIONS_RECORD_AUDIO = 1;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.tab_fragment_2, container, false);

        preferences = getActivity().getSharedPreferences("shlee", Context.MODE_PRIVATE);
        smartmirror_ip = preferences.getString("smartmirror_ip", "0.0.0.0");

        checkClicked = true;
        imgBtn_basic = (ImageButton)v.findViewById(R.id.imgBtn_basic);
        imgBtn_col = (ImageButton)v.findViewById(R.id.imgBtn_col);
        inputText = (TextView)v.findViewById(R.id.inputText);

        if(ContextCompat.checkSelfPermission(getActivity(), Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED){

            if (
                    ActivityCompat.shouldShowRequestPermissionRationale(getActivity(),Manifest.permission.RECORD_AUDIO))
            {
            }else{
                this.requestPermissions(new String[]{Manifest.permission.RECORD_AUDIO},MY_PERMISSIONS_RECORD_AUDIO);
            }
        }
        intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH); //create intent
        intent.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, getActivity().getPackageName()); // 호출한 패키지
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE,"en-US"); //인식할 언어 설정
        mRecognizer = SpeechRecognizer.createSpeechRecognizer(getActivity());
        mRecognizer.setRecognitionListener(listener);

       final TextView textSmile = (TextView)v.findViewById(R.id.textSmile);
        textSmile.setText(": -)");
        imgBtn_basic.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (checkClicked == true) {
                    textSmile.setText(": -D");
                    inputText.setText("음성인식 시작");
                    checkClicked = false;

                    mRecognizer.startListening(intent);

                } else {
                    textSmile.setText(": -)");
                    Toast.makeText(getActivity(), "음성인식 중단!",Toast.LENGTH_SHORT).show();
                    checkClicked = true;
                    mRecognizer.stopListening();
                    mRecognizer.cancel();
                }
            }
        });
        return v;
    }
    private RecognitionListener listener = new RecognitionListener() {
        @Override
        public void onReadyForSpeech(Bundle params) {
            //음성인식 준비 완료
        }

        @Override
        public void onBeginningOfSpeech() {
            //음성인식 시작
            Toast.makeText(getActivity(), "음성인식 시작!",Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onRmsChanged(float rmsdB) {
            //입력 소리 변경시
        }

        @Override
        public void onBufferReceived(byte[] buffer) {
            //더 많은 소리를 받을 경우
        }

        @Override
        public void onEndOfSpeech() {
            //음성인식 끝남
        }

        @Override
        public void onError(int error) {
            //에러발생
        }

        @Override
        public void onResults(Bundle results) {
            //음성인식 결과 받음

            Toast.makeText(getActivity(), "음성인식 onResults!",Toast.LENGTH_SHORT).show();
            String key = "";
            key = SpeechRecognizer.RESULTS_RECOGNITION;

            ArrayList<String> mResult = results.getStringArrayList(key);
            String[] rs = new String[mResult.size()];
            mResult.toArray(rs);
            inputSpeech = results.getStringArrayList(key).get(0);
            inputText.setText(rs[0]);

            /*
            key = SpeechRecognizer.RESULTS_RECOGNITION;

            inputText.setText(""+rs[0]);
            inputSpeech = results.getStringArrayList(key).get(0);

            if(inputText.equals("정지")){
                Toast.makeText(getActivity(),"STOP STT", Toast.LENGTH_SHORT).show();
                mRecognizer.destroy();
                inputSpeech = "";
                return;
            }
            */
/*
            try {
                enCommand = URLEncoder.encode(inputSpeech, "UTF-8");

                String urlRasp = smartmirror_ip + enCommand;
                Log.d("urlRasp : ", urlRasp);
                URL url = new URL(urlRasp);
                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            }catch(Exception e){
                e.printStackTrace();
            }*/

        }

        @Override
        public void onPartialResults(Bundle partialResults) {
            //음성인식 일부유효
            String key = "";
            key = SpeechRecognizer.RESULTS_RECOGNITION;
            String inputSpeech = partialResults.getStringArrayList(key).get(0);
            inputText.setText(""+inputSpeech);
            Toast.makeText(getActivity(),"일부유효: "+inputSpeech, Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onEvent(int eventType, Bundle params) {
        }
    };

}
