package com.example.seunghee.hello;

import android.content.SharedPreferences;
import android.nfc.Tag;
import android.os.Handler;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import static android.content.ContentValues.TAG;

public class TabFragment1 extends Fragment {
    public TabFragment1(){    }

    public WebView webView;
    private Handler handler = new Handler();

    TextView textView;
    EditText editText;
    Button button;

    private String current_ip; //환경변수에 저장된 ip주소
    private String smartmirror_ip; //스마트 미러의 할당받은 ip주소

    //환경변수. (DB를 사용하지 않고 간단히 저장하기 위해서 사용한다,)
    private SharedPreferences preferences;
    private SharedPreferences.Editor editor;

    boolean isUrlInputOpen = false;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        //return inflater.inflate(R.layout.tab_fragment_1, container, false);
        View v = inflater.inflate(R.layout.tab_fragment_1, container,false);

        textView = (TextView)v.findViewById(R.id.textView);
        editText = (EditText)v.findViewById(R.id.editText);
        button =(Button)v.findViewById(R.id.button);

        preferences = getActivity().getSharedPreferences("shlee", 0);
        editor = preferences.edit();

        preferences.getString("smartmirror_ip", "0.0.0.0");
        //editText.setText(textView);

        textView.setText(preferences.getString("smartmirror_ip", "0.0.0.0"));
        editText.setText(textView.getText());

        //webView
        webView = (WebView) v.findViewById(R.id.webView);
        webView.getSettings().setBuiltInZoomControls(true); //webView 확대, 축소를 위해
        webView.getSettings().setSupportZoom(true);

        WebSettings webSettings = webView.getSettings();
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);
        webSettings.setJavaScriptEnabled(true);
        webSettings.setSaveFormData(false);

        webView.setWebViewClient(new WebViewClient(){
            public void onPageFinished(WebView view, String url){
                Log.d(TAG, "onPageFinished() called.");
            }
        });
        //webView.setWebChromeClient(new WebBrowserClient());
        //webView.addJavascriptInterface(new JavaScriptMethods(), "sample");

        webView.loadUrl("http://192.168.1.135:8080/");  //기본 포트번호 설정-----------------------------------------------------------------------------------------------------


        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String urlStr = editText.getText().toString().trim();
                Log.d(urlStr, "url");
                smartmirror_ip = editText.getText().toString();
                editor.putString("smartmirror_ip", smartmirror_ip);
                editor.commit();
                Toast.makeText(getActivity(),"IP가"+smartmirror_ip+"로 설정되었습니다.",Toast.LENGTH_SHORT).show();
                if(urlStr.startsWith("www")){
                    urlStr = "http://"+urlStr;
                }else if(!urlStr.startsWith("http://")){
                        urlStr = "http://"+urlStr+":8080";
                }

                webView.loadUrl(urlStr);
            }
        });

       return  v;
    }

    final class WebBrowserClient extends WebChromeClient {
        public boolean onJsAlert(WebView view, String url, String message, JsResult result){
            result.confirm();
            return true;
        }
    }
}
